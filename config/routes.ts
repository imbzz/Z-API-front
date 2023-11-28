export default [
  {name: "登录", path: '/user', layout: false, routes: [{path: '/user/login', component: './User/Login'}]},
  //{name: "欢迎登录", path: '/welcome', icon: 'smile', component: './Welcome'},
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name: "管理员页面",
    routes: [
      {icon: 'table', path: '/admin/interface_info', component: './interfaceInfo', name: "表格页面"},
      {path: '/admin', redirect: '/admin/sub-page'},
      {path: '/admin/sub-page', component: './Admin'},
    ],
  },

  //{path: '/', redirect: '/welcome'},
  {path: '*', layout: false, component: './404'},
];
