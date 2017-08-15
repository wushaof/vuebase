import Home from './view/Home.vue'
export default[
  {path:'/',redirect:'/home/'},
  {path:'*',redirect:'/home/'},
  {path:'/home/',component:Home}
]
