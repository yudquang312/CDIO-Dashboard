import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
	const [token, setToken] = useState("");
	const [isLogin, setIsLogin] = useState(false);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const firstLogin = localStorage.getItem("firstLogin");
		if (firstLogin || isLogin) {
			setLoading(true);
			const refreshToken = async () => {
				const res = await axios.post(
					"http://localhost:3001/user/refresh_token"
				);
				console.log(res);
				setToken(res.data.access_token);
				setLoading(false);
			};
			refreshToken();
		}
	}, [isLogin]);

	const state = {
		token: [token, setToken],
		isLogin: [isLogin, setIsLogin],
		loading: [loading, setLoading],
	};

	return (
		<GlobalState.Provider value={state}>{children}</GlobalState.Provider>
	);
};
