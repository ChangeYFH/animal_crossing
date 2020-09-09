import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/home";
import Clothes from "@/pages/clothes";
import Fish from "@/pages/fish";
import Insects from "@/pages/insects";
import Villagers from "@/pages/villagers";
import RegisterAndLogin from "@/pages/registerAndLogin";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path:"/clothes",
      name:Clothes,
      component:Clothes
    },
    {
      path:"/fish",
      name:Fish,
      component:Fish
    },
    {
      path:"/insects",
      name:"Insects",
      component:Insects
    },
    {
      path:"/villagers",
      name:"Villagers",
      component:Villagers
    },
    {
      path:"/registerAndLogin",
      name:"RegisterAndLogin",
      component:RegisterAndLogin
    }
  ]
});
