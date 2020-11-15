---
title: Code-Splitting in ReactJS
date: 2020-11-10T22:40:32.169Z
postImage: https://res.cloudinary.com/dpijfwgsf/image/upload/v1605170254/blog/maxresdefault_xk7hba.jpg
tag: Front-end
description: How to code splitting in reactJS?
---

##### Table of Contents
> 1. Bundling
> 2. Code Splitting
> 3. Import()
> 4. React.lazy
> 5. Error boundaries
> 6. Route-based code splitting
> 7. Name Export
> 8. Demo
> 9. Conclusion

<hr class="mt-4 mb-4" />

## 1. Bundling

Hầu hết các ứng dụng React sẽ có các file của chúng được “đóng gói” bằng cách sử dụng các công cụ như [Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/) hoặc [Browserify](http://browserify.org/). 
Đóng gói là quá trình theo dõi các file đã import và hợp nhất chúng thành một file duy nhất: “bundle”. Sau đó, gói này có thể được đưa vào trang web để tải toàn bộ ứng dụng cùng một lúc.

<h6 style="color: #6d6d6d">Example:<h6>

###### App: 
```js
// app.js
import { add } from './math.js';
console.log(add(16, 26)); // 42
```
```js
// math.js
export function add(a, b) {
  return a + b;
}
```
###### Bundle:
 ```js
 function add(a, b) {
   return a + b;
 }
 console.log(add(16, 26)); // 42
 ```

<hr class="mt-4 mb-4" />

## 2. Code Splitting

Tính năng đóng gói này tốt, nhưng khi ứng dụng phát triển thì bundle cũng lớn theo. Đặc biệt là sử dụng thư viện bên thứ ba.
Nên trong quá trình phát triển ứng dụng sẽ phát sinh vấn đề là vô tình làm cho mã code của ứng dụng lớn lên một cách không cần thiết 
và phải mất nhiều thời gian để tải bundle khi render trang web.

![Chunking code or Code splitting](bundle.png)

=> Chính vì vậy, ta cần phải Code-Splitting khi phát triển ứng dụng ReactJS.

Code-Splitting là một tính năng được hỗ trợ bởi các thư viện như Webpack, Rollup và Browserify, có thể tạo nhiều gói bundle và được tải động trong thời gian chạy.

- Việc tách mã này giúp “lazy-load” những thứ mà người dùng đang cần => cải thiện hiệu suất.

- Mặc dù chưa giảm tổng lượng code nhưng giúp tránh tải code mà người dùng chưa cần và giảm lượng lớn code cần thiết tải trong lần đầu tiên.

![Splitting chunk](split-bundle.png)

<hr class="mt-4 mb-4" />

## 3. import()

Cách tốt nhất để đưa tính năng code-splitting vào ứng dụng là thông qua cú pháp dynamic <span style="background-color: #eee; padding: 4px; font-weight:500">import()</span>

###### Before:
```js
import { add } from './math';

console.log(add(16, 26));
```

###### After:
```js
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```

Khi Webpack gặp cú pháp này, nó sẽ tự động bắt đầu phân tách mã ứng dụng. Nếu sử dụng Create React App, điều này đã được định cấu hình sẵn và có thể bắt đầu sử dụng nó ngay lập tức. 

<hr class="mt-4 mb-4" />

## 4. React.lazy

React.lazy cho phép render dynamic import như một component thông thường.

###### Before:
```js
import OtherComponent from './OtherComponent';
```

###### After:
```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```

- Điều này sẽ tự động tải bundle của OtherComponent khi thành phần này được hiển thị lần đầu tiên. 
- React.lazy nhận hàm import() theo kiểu nhập động. Nó trả về một Promise phân giải thành một module có default export là React component.

Sau đó, lazy component sẽ được hiển thị bên trong Suspense component, cho phép hiển thị nội dung dự phòng (vd: loading indicator) trong khi chờ lazy component tải xong.

```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

Suspense fallback hỗ trợ chấp nhận bất kỳ React component nào mà mình muốn hiển thị trong khi chờ loading, và có thể đặt Suspense ở bất kỳ đâu phía ngoài lazy component. Thậm chí có thể bao bọc nhiều lazy component với một Suspense duy nhất.

```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```

<hr class="mt-4 mb-4" />

## 5. Error boundaries

Nếu một module không tải được (ví dụ: do lỗi mạng), nó sẽ gây ra lỗi. Ta có thể xử lý lỗi này để trải nghiệm người dùng tốt hơn và quản lý quá trình khôi phục bằng Error Boundaries. Khi đã tạo Error boundaries, có thể sử dụng nó ở bất kỳ đâu phía trên các lazy component của mình để hiển thị trạng thái lỗi khi có lỗi mạng.

<h6 style="color: #6d6d6d">Example:<h6>

```js
import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```

<hr class="mt-4 mb-4" />

## 6. Route-based code splitting

Hầu hết mọi người khi làm việc với ứng dụng React đã biết tới <span style="background-color: #eee; padding: 4px; font-weight:500">react-route</span>, để định tuyến(routing) các web view trong ứng dụng.

Trong code-splitting chúng ta sẽ muốn chia đều các bundle cho các routes để trải nghiệm người dùng được tốt hơn. 

Dưới đây là ví dụ về cách thiết lập code splitting dựa trên Route vào App bằng cách sử dụng các thư viện như <span style="background-color: #eee; padding: 4px; font-weight:500">[React Router](https://reactrouter.com/web/guides/quick-start)</span> với <span style="background-color: #eee; padding: 4px; font-weight:500">React.lazy</span>.

```js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```

<hr class="mt-4 mb-4" />

## 7. Named Exports

React.lazy hiện chỉ hỗ trợ export default. Nếu muốn import một component lazy để sử dụng, có thể tạo một module trung gian export module đó default. 
Điều này đảm bảo các Component tiếp tục hoạt động mà không kéo các thành phần không sử dụng vào.

<h6 style="color: #6d6d6d">Example:<h6>

```js
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;

```
```js
// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";
```
```js
// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```

## 8. Demo

Setup demo in Build Management, set network to Slow 3G. 
We can see react lazy load bundle when route page has changes.

<video controls
    src="https://res.cloudinary.com/dpijfwgsf/video/upload/v1605063586/blog/demo-code-splitting_s10bw8.mp4">
Sorry, your browser doesn't support embedded videos, 
but don't worry, you can <a href="https://res.cloudinary.com/dpijfwgsf/video/upload/v1605063586/blog/demo-code-splitting_s10bw8.mp4">download it</a> 
and watch it with your favorite video player!
</video>

## 9. Conclusion

> Việc code-splitting trong React App sẽ giúp chúng ta cải thiện hiệu suất đáng kể cho ứng dụng, 
> tránh tải những mã code không cần thiết trong lúc render, giúp trải nghiệm người dùng tốt hơn ngay cả trong điều kiện network kém.