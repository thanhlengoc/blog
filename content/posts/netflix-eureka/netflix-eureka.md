---
title: Spring Cloud Netflix Eureka
date: 2020-07-28T22:40:32.169Z
description: Client-side discovery service
---

![0](0.png)

### Nhu cầu truy tìm dịch vụ (Service Discovery):

Mỗi service instance trong một ứng dụng microservice đều được gán một ví trí mạng và chúng có khuynh hướng thay đổi linh hoạt vì những tác động khác mang đến. Do đó, việc client xác định vị trí của service cần gọi tới trở nên phức tạp hơn.

Có 2 mô hình chủ yếu để sử dụng truy tìm dịch vụ, đó là: client-side discovery và server-side discovery.

Client-side discovery và server-side discovery là hai mô hình tìm kiếm dịch vụ chủ yếu được áp dụng. Trong hệ thống với mô hình client-side discovery, các client truy vấn đến SR, chọn một thực thể khả dụng và gửi yêu cầu đi. Trong hệ thống áp dụng mô hình server-side discovery, các client gửi yêu cầu đến dịch vụ khả dụng thông qua một thiết bị định tuyến (router). Router có nhiệm vụ truy vấn đến SR và chuyển tiếp yêu cầu từ client đến thực thể đang hoạt động.

Trong bài này chúng ta cùng tìm hiểu mô hình client-side discovery:

![ServiceRegistry](1.png)

Mô hình này quy định rằng các client sẽ phải xác định ví trí mạng của các available service và yêu cầu load balancing. Để làm được điều này client cần truy vấn một cơ sở dữ liệu gọi là Service Registry. Đây là nơi chứa các thông tin và vị trí mạng của các service instance. Sau khi truy vấn được địa chỉ của service, client sử dụng thuật toán cân bằng tải (Ribbon) giúp chọn ra service available để gửi request.



Mô hình này giúp giải quyết vấn đề địa chỉ mạng liên tục thay đổi của các service bằng cách:

- Khi service instance bắt đầu khởi động, nó sẽ ghi vị trí mạng của chính nó vào Service Registry và xoá bỏ khi service này kết thúc.
- Áp dụng kỹ thuật tín hiệu tuần hoàn (heartbeat mechanism) về việc cập nhật địa chỉ mạng của các service.


May thay, Netflix OSS đã cung cấp một ví dụ tuyệt vời của mô hình client-side discovery.

Netflix Eureka là một Service Registry (SR). Nó cung cấp bộ REST API cho việc quản lý và đăng ký các service instance và cho việc truy vấn các instance có sẵn.

Một service instance sử dụng lệnh POST để đăng ký địa chỉ mạng của nó và cứ mỗi 30 giây nó tiếp tục dùng lệnh PUT để gửi yêu cầu cập nhật đến SR. Thông tin của một service sẽ tự động xoá bỏ nếu không cập nhật trong vòng 30s và nó cũng sẽ bị xoá khi dùng HTTP DELETE. Client có thể sử dụng HTTP GET để lấy ví trị mạng của service.



### Architecture:

![2](2.png)

- Service Registry: service này đóng vai trò là discovery server và cung cấp dịch vụ truy tìm service (Eureka server).
- Service instance: đóng vai trò và eureka client và nó sẽ tự đăng ký tới eureka server.
- Các trạng thái Heartbeats: UP, DOWN, OUT_OF_SERVICE.

### Ưu điểm của Eureka:

1. Điểm mạnh là tập trung vào đảm bảo các service có thể tìm thấy nhau trong các tình huống như nằm ngoài phân vùng mạng hoặc máy chủ gặp lỗi.
2. High Available được thể hiện qua 2 tính năng:
    - Server cluster – cho phép thiết lập cụm máy chủ để tránh trường hợp single point failure.
    - Client side caching – bộ nhớ đệm phía client (client sẽ truy xuất thông tin vị trí mạng từ eureka server và lưu vào bộ nhớ cache, phòng trong trường hợp tất cả máy chủ gặp sự cố thì client vẫn giữ lại snapshot cuối cùng để request).
    - DNS - Netflix sử dụng cấu hình DNS để quản lý động danh sách Máy chủ Eureka mà không ảnh hưởng đến các ứng dụng sử dụng Eureka. Đây là thiết lập được đề xuất trên môi trường production.
    - Server self preservation mode – Eureka server có tính năng tự bảo vệ: trong trường hợp một số instance nhất định không gửi được Heartbeats trong một khoảng thời gian xác định, Máy chủ sẽ không xóa chúng khỏi sổ đăng ký. Nó coi rằng một phân vùng mạng đã xảy ra và sẽ đợi các instance này quay trở lại. Tính năng này rất hữu ích trong triển khai trên cloud và có thể bị tắt đối với các Services in a private data center.
    - Non-JVM Service integration – there are two approach: REST API, Sidecar.
3. Eureka được build để làm việc với Amazone Web Service (AWS) nên hỗ trợ triển khai trên AWS tốt.
4. Hỗ trợ giao diện dashboad để quan sát trạng thái của client và server.

![3](3.png)

### Example:

[Alphabet Village](https://github.com/thanhlengoc/springclould-netflix-eureka/tree/master)
Sử dụng Spring Cloud + Netflix Eureka
- Add Dependency in pom.xml
```xml
<dependencies>   
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
   </dependency>
   <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
   </dependency>
 
   <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-test</artifactId>
      <scope>test</scope>
      <exclusions>
         <exclusion>
            <groupId>org.junit.vintage</groupId>
            <artifactId>junit-vintage-engine</artifactId>
         </exclusion>
      </exclusions>
   </dependency>
</dependencies>
```

- Main Class of Discovery service:

```java
@EnableEurekaServer
@SpringBootApplication
public class DiscoveryServiceApplication {
 
   public static void main(String[] args) {
      SpringApplication.run(DiscoveryServiceApplication.class, args);
   }
 
}
```

- application.yml configure of Eureka server 

```yaml
eureka:
    instance:
        hostname: localhost
    client:
        fetch-registry: false
        register-with-eureka: false
    service-url:
        default-zone: http://${eureka.instance.hostname}:${server.port}/eureka/
 
logging:
    level:
        com:
            netflix:
                discovery: 'OFF'
                eureka: 'OFF'
 
server:
    port: 8761
```

- Main class of business service (Eureka client)

```java
@EnableEurekaClient
@SpringBootApplication
public class MotoServiceApplication {
 
   public static void main(String[] args) {
      SpringApplication.run(MotoServiceApplication.class, args);
   }
 
}
```

- application.yml configure of Eureka client 

```yaml
server:
    port: 8090
 
spring:
    application:
        name: car-service
 
eureka:
    client:
        fetch-registry: true
        register-with-eureka: true
```

#### Kết luận:

> Trong một ứng dụng microservices, xu hướng của các service instance đang chạy là thay đổi linh động. 
> Các thực thể được gán vị trí mạng không cố định. Do đó, các client cần áp dụng kỹ thuật truy tìm dịch vụ để gửi request đến.
> Một bộ phận rất quan trọng trong truy tìm dịch vụ đó là Service Registry. 
> Đây là một cơ sở dữ liệu của các thực thể dịch vụ đang được kích hoạt. 
> Service registry cung cấp các API giúp quản lý ghi xóa và truy vấn thông tin dịch vụ.