import Login from "views/examples/Login";
import ProductPage from "views/examples/DinoDashboard/ProductPage";
import CategoryPage from "views/examples/DinoDashboard/CategoryPage";
import UserPage from "views/examples/DinoDashboard/UserPage";
import UserDetailPage from "views/examples/DinoDashboard/UserDetailPage";
import AddProduct from "views/examples/DinoDashboard/AddProduct";
import UpdateProduct from "views/examples/DinoDashboard/UpdateProduct";

var routes = [
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
    component: AddProduct,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/manage-product/:productId",
    name: "Product",
    icon: "ni ni-bullet-list-67 text-red",
    component: UpdateProduct,
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
    path: "/manage-category",
    name: "Category",
    icon: "ni ni-bullet-list-67 text-red",
    component: CategoryPage,
    layout: "/admin",
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
