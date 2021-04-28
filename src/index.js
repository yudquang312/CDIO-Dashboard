import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {ApolloProvider} from '@apollo/client';
import {Client} from "../src/config"

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "assets/quang/quang.css";
import "antd/dist/antd.css";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

ReactDOM.render(
  <ApolloProvider client={Client}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Redirect from="/" to="/auth/login" />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
  ,
  document.getElementById("root")
);
