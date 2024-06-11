import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/websitePages/HomeView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import ExampleView from "../views/ExampleView.vue";

import SignupView from "../views/Authentification/SignupView.vue";
import LoginView from "../views/Authentification/LoginView.vue";
import ProfileView from "../views/Authentification/ProfileView.vue";

import HomeWebView from "../views/websitePages/HomeWebView.vue";
import AboutUsView from "../views/websitePages/AboutUsView.vue";
import ServicesView from "../views/websitePages/ServicesView.vue";
import ContactUsView from "../views/websitePages/ContactUsView.vue";


import AddnewrestComp from "../components/restaurant/AddnewrestComp.vue";
import DeleteRestaurantComp from "../components/restaurant/DeleteRestaurantComp.vue";
import UpdaterestComp from "../components/restaurant/UpdaterestComp.vue";


import MenuView from "../views/dashboardRestPages/MenuView.vue";


import AddNewCatgoryComp from "../components/restaurant/Menu/Categories/AddNewCatgoryComp.vue";
import ShowListCatgoriesComp from "../components/restaurant/Menu/ShowListCatgoriesComp.vue";
import UpdateCategory from "@/components/restaurant/Menu/Categories/UpdateCategory.vue";
import DeleteCategory from "@/components/restaurant/Menu/Categories/DeleteCategory.vue";
import DeleteCategoryALL from "@/components/restaurant/Menu/Categories/DeleteCategoryALL.vue";


import UpadteItemsComp from "@/components/restaurant/Menu/Categories/items/UpadteItemsComp.vue";
import AddItemsComp from "@/components/restaurant/Menu/Categories/items/AddItemsComp.vue";
import DeletetItemsComp from "@/components/restaurant/Menu/Categories/items/DeletetItemsComp.vue";

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/",
    name: "HomeWebView",
    component: HomeWebView,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupView,
  },

  {
    path: "/AboutUsView",
    name: "AboutUsView",
    component: AboutUsView,
  },
  {
    path: "/Login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/Profile",
    name: "Profile",
    component: ProfileView,
  },
  {
    path: "/ServicesView",
    name: "ServicesView",
    component: ServicesView,
  },
  {
    path: "/ContactUsView",
    name: "ContactUsView",
    component: ContactUsView,
  },
  {
    path: "/add",
    name: "addres",
    component: AddnewrestComp,
  },
  {
    path: "/delete/:RestId",
    name: "DeleteRestaurant",
    component: DeleteRestaurantComp,
  },
  {
    path: "/UpdateRest/:RestId",
    name: "Updaterestaurant",
    component: UpdaterestComp,
  },
  {
    path: "/menu/:RestId",
    name: "Menu",
    component: MenuView,
  },
  {
    path: "/NewCategory/Restaurant/Catgories/:RestId",
    name: "AddNewCatgoryComp",
    component: AddNewCatgoryComp,
  },
  {
    path: "/Restaurant/menu/Catgories/:RestId",
    name: "ShowListCatgoriesComp",
    component: ShowListCatgoriesComp,
  },
  {
    path: "/Restaurant/menu/Catgories/UpdateCategory/:RestId/:CatId",
    name: "UpdateCategory",
    component: UpdateCategory,
  },
  {
    path: "/Restaurant/menu/Catgories/DeleteCategory/:RestId/item/:CatId",
    name: "DeleteCategory",
    component: DeleteCategory,
  },
  ,
  {
    path: "/Restaurant/menu/Catgories/DeleteCategoryALL/all/:RestId",
    name: "DeleteCategoryALL",
    component: DeleteCategoryALL,
  },

  ,
  {
    path: "/Restaurant/menu/Catgories/AddItemsComp/items/restaurantidIs/:RestId",
    name: "AddItemsComp",
    component: AddItemsComp,
  },

  {
    path: "/UpadteItemsComp/:itemsId/restaurantId/:RestId",
    name: "UpadteItemsComp",
    component: UpadteItemsComp,
  },

  {
    path: "/DeletetItemsComp/:itemsId/resaurantId/:RestId",
    name: "DeletetItemsComp",
    component: DeletetItemsComp,
  },
  {
    path: "/:catcheAll(.*)",
    name: "Errorpage",
    component: NotFoundView,
  },
  {
    path: "/ExampleView",
    name: "ExampleView",
    component: ExampleView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.params.paragTitle !== undefined) {
    document.title = `${to.name} | ${to.params.paragTitle} | ${process.env.VUE_APP_TITLE}`;
  } else {
    if (to.name == null) {
      document.title = `unknow page | ${process.env.VUE_APP_TITLE}`;
    } else {
      document.title = `${to.name} |  ${process.env.VUE_APP_TITLE}`;
    }
  }
  next();
  // console.log(to);
  // console.log(from);
  // console.log(next)
});

export default router;
