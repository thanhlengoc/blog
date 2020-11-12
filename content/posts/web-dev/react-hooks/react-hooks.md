---
title: React Hooks
description: The first post is the most memorable one.
postImage: https://res.cloudinary.com/dpijfwgsf/image/upload/v1605170772/blog/1_R-oovJm4IQBLDjZy6DvbBg_taspol.png
tag: Front-end
date: 2020-11-11T11:00:00.000Z
---

## Introduce

- Hooks là khái niệm mới mẻ trong phiên bản React 16.8 được release gần đây.
- Hooks hướng chúng ta sử dụng <span style="background-color: #eee; padding: 4px; font-weight:500">functional component</span> 
thay vì <span style="background-color: #eee; padding: 4px; font-weight:500">class component</span> như trước đây.
- Những cải tiến giúp <span style="background-color: #eee; padding: 4px; font-weight:500">staless component</span> trở nên mạnh mẽ hơn.

![react-api-hook](react-hook.png)

## State Hook

Khi hook ra đời thì nó cung cấp cho chúng ta api gọi là 
<span style="background-color: #eee; padding: 4px; font-weight:500">useState</span> và chính 
<span style="background-color: #eee; padding: 4px; font-weight:500">useState</span> đã giúp 
<span style="background-color: #eee; padding: 4px; font-weight:500">stateless component</span> trở thành 
<span style="background-color: #eee; padding: 4px; font-weight:500">stateful component.</span>

Đây là ví dụ nhỏ về cách sử dụng <span style="background-color: #eee; padding: 4px; font-weight:500">useState</span>. Khi button được click thì biến count sẽ tăng giá trị lên 1:

```js
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
Ở đây, <span style="background-color: #eee; padding: 4px; font-weight:500">useState</span> là một Hook. 
Chúng ta gọi nó bên trong một <span style="background-color: #eee; padding: 4px; font-weight:500">functional component</span> để thêm một số local state vào nó. 
React sẽ duy trì state này giữa các lần render. 
<span style="background-color: #eee; padding: 4px; font-weight:500">useState</span> trả về một cặp: 
- Giá trị trạng thái hiện tại 
- Một hàm cho phép bạn cập nhật nó. 

Chúng ta có thể gọi hàm này từ một event handler hoặc một nơi khác. 
Nó tương tự như <span style="background-color: #eee; padding: 4px; font-weight:500">this.setState</span> trong một class component, ngoại trừ nó không hợp nhất state cũ và mới với nhau. 
(Chúng ta sẽ hiển thị một ví dụ so sánh <span style="background-color: #eee; padding: 4px; font-weight:500">useState</span> với <span style="background-color: #eee; padding: 4px; font-weight:500">this.state</span> trong Sử dụng State Hook.)

Đối số duy nhất truyền vào useState là <span style="background-color: #eee; padding: 4px; font-weight:500">initState</span> (trạng thái ban đầu). 
Trong ví dụ trên, nó là 0 vì bộ đếm của chúng ta bắt đầu từ 0. Lưu ý rằng không giống như <span style="background-color: #eee; padding: 4px; font-weight:500">this.state</span>, trạng thái ở đây không nhất thiết phải là một đối tượng - mặc dù nó có thể nếu bạn muốn. 
Đối số trạng thái ban đầu chỉ được sử dụng trong lần hiển thị đầu tiên.

<p style="color: #6C757D">Khai báo nhiều biến trạng thái</p>

Bạn có thể sử dụng nhiều State Hook trong một <span style="background-color: #eee; padding: 4px; font-weight:500">function component</span>:

```js
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}
```

Cú pháp cấu trúc mảng cho phép chúng ta đặt các tên khác nhau cho các biến trạng thái mà chúng ta đã khai báo bằng cách gọi <span style="background-color: #eee; padding: 4px; font-weight:500">useState</span>. 
Những tên này không phải là một phần của API <span style="background-color: #eee; padding: 4px; font-weight:500">useState</span>. Thay vào đó, React giả định rằng nếu bạn gọi useState nhiều lần, bạn thực hiện theo thứ tự giống nhau trong mỗi lần hiển thị. 
Chúng ta sẽ quay lại lý do tại sao điều này hoạt động và khi nào điều này hữu ích sau.

<p style="color: #6C757D">Nhưng Hook là gì?</p>

<span style="background-color: #eee; padding: 4px; font-weight:500">Hooks</span> là các hàm cho phép bạn “kết nối” trạng thái React và các tính năng vòng đời từ các thành phần của hàm. 
Hooks không hoạt động bên trong các <span style="background-color: #eee; padding: 4px; font-weight:500">class</span> - chúng cho phép bạn sử dụng React mà không cần lớp. 
(React không khuyến khích bạn nên viết lại các thành phần hiện có của mình, nhưng bạn có thể bắt đầu sử dụng Hooks trong các thành phần mới nếu muốn.) 

React cung cấp một vài Hooks tích hợp sẵn như <span style="background-color: #eee; padding: 4px; font-weight:500">useState</span>. 
Bạn cũng có thể tạo Hook của riêng mình để sử dụng lại <span style="background-color: #eee; padding: 4px; font-weight:500">stateful behavior</span> giữa các components khác nhau. 
Trước tiên, chúng ta sẽ xem xét các Hooks tích hợp sẵn.

## Effect Hook

Bạn có thể đã thực hiện <span style="background-color: #eee; padding: 4px; font-weight:500">data fetching</span>, đăng ký hoặc thay đổi thủ công DOM từ các <span style="background-color: #eee; padding: 4px; font-weight:500">React components</span> trước đây. 
React gọi những thao tác này là “side effects” (hay gọi tắt là “effects”) vì chúng có thể ảnh hưởng đến các thành phần khác và không thể thực hiện được trong quá trình rendering.

<span style="background-color: #eee; padding: 4px; font-weight:500">useEffect</span>, thêm khả năng thực hiện các hiệu ứng phụ từ một <span style="background-color: #eee; padding: 4px; font-weight:500">function component</span>. 
Nó phục vụ cùng mục đích như <span style="background-color: #eee; padding: 4px; font-weight:500">componentDidMount</span>, 
<span style="background-color: #eee; padding: 4px; font-weight:500">componentDidUpdate</span> và 
<span style="background-color: #eee; padding: 4px; font-weight:500">componentWillUnmount</span> trong các React class, nhưng được hợp nhất thành một API duy nhất.

Ví dụ: component này đặt tiêu đề của document sau khi React cập nhật DOM:

```js
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

Khi bạn gọi <span style="background-color: #eee; padding: 4px; font-weight:500">useEffect</span>, 
bạn đang yêu cầu React chạy chức năng "effect" sau khi thực hiện các thay đổi đối với DOM. 
Các hiệu ứng được khai báo bên trong component để chúng có quyền truy cập vào các props và state của nó. 
Theo mặc định, React chạy các hiệu ứng sau mỗi lần render - bao gồm cả lần render đầu tiên.  

Các effect cũng có thể tùy chọn chỉ định cách “dọn dẹp” sau khi chúng trả về một hàm. 
Ví dụ: component này sử dụng effect để đăng ký trạng thái trực tuyến của một người bạn và làm sạch bằng cách hủy đăng ký khỏi đó:

```js
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

Trong ví dụ này, React sẽ hủy đăng ký khỏi ChatAPI của chúng ta khi thành phần này ngắt kết nối, cũng như trước khi chạy lại hiệu ứng do một lần hiển thị tiếp theo. 
(Nếu bạn muốn, có một cách để yêu cầu React bỏ qua việc đăng ký lại nếu props.friend.id mà chúng ta đã chuyển cho ChatAPI không thay đổi.)

Cũng giống như <span style="background-color: #eee; padding: 4px; font-weight:500">useState</span>, bạn có thể sử dụng nhiều hơn một effect trong một component:

```js
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  // ...
}
```

Hooks cho phép bạn tổ chức các effect phụ trong một component theo các phần có liên quan (chẳng hạn như thêm và xóa đăng ký), 
thay vì buộc phải phân chia dựa trên các lifecycle.

## Rules of Hooks

Hook là các hàm JavaScript, nhưng chúng áp đặt hai quy tắc bổ sung: 
    - Chỉ gọi Hook ở cấp cao nhất. Không gọi các Hook bên trong vòng lặp, điều kiện hoặc các hàm lồng nhau. 
    - Chỉ gọi các Hook từ các <span style="background-color: #eee; padding: 4px; font-weight:500">function component</span> React. 
    Không gọi các Hook từ các hàm JavaScript thông thường. (Chỉ có một nơi hợp lệ khác để gọi Hooks - Hooks tùy chỉnh của riêng bạn.) 
    
React cung cấp một plugin linter để thực thi các quy tắc này một cách tự động. Những quy tắc này thoạt đầu có vẻ hạn chế hoặc khó hiểu, 
nhưng chúng rất cần thiết để làm cho Hooks hoạt động tốt.

## Building Your Own Hooks

Đôi khi, chúng ta muốn sử dụng lại một số logic state giữa các thành phần. Theo truyền thống, có hai giải pháp phổ biến cho vấn đề này: các [higher-order components](https://reactjs.org/docs/higher-order-components.html) và [render props](https://reactjs.org/docs/render-props.html). 
Các móc tùy chỉnh cho phép chúng ta làm điều này, nhưng không cần thêm các thành phần khác vào cây.

Trong ví dụ trên, chúng ta đã có một component là <span style="background-color: #eee; padding: 4px; font-weight:500">FriendStatus</span> gọi useState và useEffect Hooks để đăng ký trạng thái trực tuyến của một người bạn. 
Giả sử chúng ta cũng muốn sử dụng lại logic đăng ký này trong một component khác.

Đầu tiên, chúng ta sẽ trích xuất logic này vào một Hook tùy chỉnh được gọi là <span style="background-color: #eee; padding: 4px; font-weight:500">useFriendStatus</span>:

```js
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

Nó lấy friendID làm đối số và trả về việc bạn của chúng ta có trực tuyến hay không. 
Bây giờ chúng ta có thể sử dụng nó từ cả hai thành phần:

```js
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

```js
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

State của mỗi component là hoàn toàn độc lập. Hook là một cách để sử dụng lại logic trạng thái, không phải chính trạng thái. 
Trên thực tế, mỗi lệnh gọi tới một Hook có một trạng thái hoàn toàn bị cô lập - vì vậy ta thậm chí có thể sử dụng cùng một Hook tùy chỉnh hai lần trong một thành phần.

Các móc tùy chỉnh mang tính quy ước hơn là một tính năng. Nếu tên của một hàm bắt đầu bằng "use" và nó gọi các Hook khác, React gọi nó là Hook tùy chỉnh. 
Quy ước đặt tên một cái gì đó là cách plugin linter của react có thể tìm thấy lỗi trong code bằng cách sử dụng Hooks.

Chúng ta có thể viết các Hook tùy chỉnh bao gồm một loạt các trường hợp sử dụng như xử lý biểu mẫu, hoạt ảnh, đăng ký khai báo, bộ hẹn giờ và có thể nhiều thứ khác... 

## Other Hooks

Có một số <span style="background-color: #eee; padding: 4px; font-weight:500">Hooks</span> gắn sẵn ít được sử dụng hơn mà ta có thể thấy hữu ích. 
Ví dụ: <span style="background-color: #eee; padding: 4px; font-weight:500">useContext</span> cho phép đăng ký bối cảnh React mà không cần giới thiệu lồng ghép:

```js
function Example() {
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
  // ...
}
```

Và <span style="background-color: #eee; padding: 4px; font-weight:500">useReducer</span> cho phép quản lý local state của các complex component với reducer:

```js
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer);
  // ...
}
```

## Conclusion

> Thông qua các khái niệm và ví dụ của useState() và useEffect() đã giúp chúng ta hiểu
> về function component và cách giúp chúng hoạt động giống như một class component.
