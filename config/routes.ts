﻿export default [
  {name: "主页", path: '/', icon: 'smile', component: './Index'},
  {name: "查看接口", path: '/interface_info/:id', icon: 'smile', component: './InterfaceInfo',hideInMenu: true},

  {name: "登录", path: '/user', layout: false, routes: [{path: '/user/login', component: './User/Login'}]},
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name: "管理员页面",
    routes: [
      {icon: 'table', path: '/admin/interface_info', component: './Admin/interfaceInfo', name: "接口管理"},
      // {path: '/admin', redirect: '/admin/sub-page'},
      // {path: '/admin/sub-page', component: './Admin'},
    ],
  },

  //{path: '/', redirect: '/welcome'},
  {path: '*', layout: false, component: './404'},
];
