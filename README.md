#Ribeiro框架

#布局
https://medium.com/how-to-react/create-a-sidebar-menu-in-react-js-3463b306ca9a

#代码使我头疼之React初学习
https://zhuanlan.zhihu.com/p/450137852

#React 项目配置 & Win10 WSL
https://juejin.cn/post/6844903808363921415

#tab bars
https://web.archive.org/web/20090406212254/http://azadcreative.com/2009/03/bulletproof-css-sliding-doors/

#其他框架
https://expressjs.com/
https://nextjs.org/

#docker(https://mherman.org/blog/dockerizing-a-react-app/)
docker run -itd --name zyjs_admin -p 30080:30080 -v ./:/app --restart=always node:18-alpine3.17
docker run -itd --name zyjs_admin -p 30000:30000 -v {$PWD}:/app --restart=always node:18-alpine3.17

#ui example
https://versions.bulma.io/0.4.4/documentation/elements/button/

#admin template
https://demos.creative-tim.com/paper-dashboard-pro-react/?_ga=2.41656610.1065156433.1693385433-527350151.1692432745#/admin/extended-forms

浅红：#ffb3b3
浅蓝：#72d0eb
钱绿：#b1dfbb
葡萄褐：rgb(163,153,153)
━ ✚

1  React Route Dom 子路由组织问题，缺少Outlet，坑了半天
2  元素点击删除（不是display=none），属于元素以外的区域，坑了一天

/// https://stackoverflow.com/questions/48846289/why-is-my-react-component-is-rendering-twice
// You are running your app in strict mode. Go to index.js and comment strict mode tag. You will find a single render.
//
// This happens is an intentional feature of the React.StrictMode. It only happens in development mode and should help to find accidental side effects in the render phase.
//
// From the docs:
//
// Strict mode can’t automatically detect side effects for you, but it can help you spot them by making them a little more deterministic. This is done by intentionally double-invoking the following functions:...
//
// ^ In this case the render function.
//
// Official documentation of what might cause re-rendering when using React.StrictMode:
//
// https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects