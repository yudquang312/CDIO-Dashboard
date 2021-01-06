/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index";
// import Register from "views/examples/Register.js";
import Login from "views/examples/Login";
import Tables from "views/examples/Tables";
import BenefitPlan from "views/examples/BenefitPlan";
import Employee from "views/examples/Employee";
import Personal from "views/examples/Personal";
import User from "views/examples/User";
import EmPer from "views/examples/EmPer";
import ColorPage from "views/examples/DinoDashboard/ColorPage";
import StylePage from "views/examples/DinoDashboard/StylesPage";
import MaterialPage from "views/examples/DinoDashboard/MaterialPage";
import TypePage from "views/examples/DinoDashboard/TypePage";
import ProductPage from "views/examples/DinoDashboard/ProductPage";
import OrderPage from "views/examples/DinoDashboard/OrderPage";
import ProductAddPage from "views/examples/DinoDashboard/ProductAddPage";
import ProductUpdatePage from "views/examples/DinoDashboard/ProductUpdatePage";
import CategoryPage from "views/examples/DinoDashboard/CategoryPage";
// import UploadImage from "views/examples/DinoDashboard/UploadImage";
import UploadFile from "views/examples/DinoDashboard/UploadFile";
import UserPage from "views/examples/DinoDashboard/UserPage";
import UserDetailPage from "views/examples/DinoDashboard/UserDetailPage";
import OrderDetailPage from "views/examples/DinoDashboard/OrderDetailPage";
import Icons from "views/examples/Icons.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin",
  // },
  // {
  //   path: "/BenefitPlans",
  //   name: "Benefit Plans",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: BenefitPlan,
  //   layout: "/admin",
  // },
  // {
  //   path: "/Employees",
  //   name: "Employees",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Employee,
  //   layout: "/admin",
  // },
  // {
  //   path: "/Personals",
  //   name: "Personals",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Personal,
  //   layout: "/admin",
  // },
  // {
  //   path: "/EmPer",
  //   name: "EmPer",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: EmPer,
  //   layout: "/admin",
  // },
  // {
  //   path: "/User",
  //   name: "User",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: User,
  //   layout: "/admin",
  // },
  {
    path: "/manage-product",
    name: "Product",
    icon: "ni ni-bullet-list-67 text-red",
    component: ProductPage,
    layout: "/admin",
    exact: true,
  },
  {
    path: "/manage-product/add",
    name: "Product",
    icon: "ni ni-bullet-list-67 text-red",
    component: ProductAddPage,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/manage-product/update",
    name: "Product",
    icon: "ni ni-bullet-list-67 text-red",
    component: ProductUpdatePage,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/manage-order",
    name: "Order",
    icon: "ni ni-bullet-list-67 text-red",
    component: OrderPage,
    layout: "/admin",
    exact: true,
  },
  {
    path: "/manage-order/:orderId",
    name: "Order",
    icon: "ni ni-bullet-list-67 text-red",
    component: OrderDetailPage,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/manage-user",
    name: "User",
    icon: "ni ni-bullet-list-67 text-red",
    component: UserPage,
    layout: "/admin",
    exact: true,
  },
  {
    path: "/manage-user/:userId",
    name: "User",
    icon: "ni ni-bullet-list-67 text-red",
    component: UserDetailPage,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/manage-color",
    name: "Color",
    icon: "ni ni-bullet-list-67 text-red",
    component: ColorPage,
    layout: "/admin",
  },
  {
    path: "/manage-style",
    name: "Style",
    icon: "ni ni-bullet-list-67 text-red",
    component: StylePage,
    layout: "/admin",
  },
  {
    path: "/manage-material",
    name: "Material",
    icon: "ni ni-bullet-list-67 text-red",
    component: MaterialPage,
    layout: "/admin",
  },
  {
    path: "/manage-type",
    name: "Type",
    icon: "ni ni-bullet-list-67 text-red",
    component: TypePage,
    layout: "/admin",
  },
  {
    path: "/manage-category",
    name: "Category",
    icon: "ni ni-bullet-list-67 text-red",
    component: CategoryPage,
    layout: "/admin",
  },
  {
    path: "/upload-image",
    name: "Upload Image",
    icon: "ni ni-bullet-list-67 text-red",
    component: UploadFile,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/login",
    name: "Logout",
    icon: "ni ni-circle-08 text-pink",
    component: Login,
    layout: "/auth",
  },
];
export default routes;
