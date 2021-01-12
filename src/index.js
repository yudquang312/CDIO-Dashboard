import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "antd/dist/antd.css";
import { DataProvider } from "./globalState";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import axios from "axios";
axios.defaults.withCredentials = true;
ReactDOM.render(
	<BrowserRouter>
		<DataProvider>
			<Switch>
				<Route
					path="/admin"
					render={(props) => <AdminLayout {...props} />}
				/>
				<Route
					path="/auth"
					render={(props) => <AuthLayout {...props} />}
				/>
				<Redirect from="/" to="/admin/index" />
			</Switch>
		</DataProvider>
	</BrowserRouter>,
	document.getElementById("root")
);
