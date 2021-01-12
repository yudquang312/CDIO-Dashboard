import React, { useContext, useState } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Row,
	Col,
} from "reactstrap";
import { GlobalState } from "globalState";

function Login(props) {
	const userNameRef = React.createRef();
	const passwordRef = React.createRef();
	const [checkLogin, setCheckLogin] = useState(false);
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();
	const state = useContext(GlobalState);
	const [isLogin, setIsLogin] = state.isLogin;
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("QUANG");
		console.log(userNameRef.current.value, passwordRef.current.value);
		axios
			.post("http://localhost:3001/user/admin/login", {
				email: userNameRef.current.value,
				password: passwordRef.current.value,
			})
			.then((res) => {
				localStorage.setItem("firstLogin", true);
				setIsLogin(true);
				history.push("/");
			})
			.catch((err) => {
				console.log(err.response.data.msg);
			});
		// if (res?.data?.users?.length) {
		// 	this.setState({ checkLogin: true });
		// }
	};

	return (
		<>
			{checkLogin ? (
				<Redirect from="*" to="/admin/index"></Redirect>
			) : null}
			<Col lg="5" md="7">
				<Card className="bg-secondary shadow border-0">
					<CardHeader className="bg-transparent pb-5">
						<div className="text-center text-muted mb-4">
							<small>Sign in with credentials</small>
						</div>
					</CardHeader>
					<CardBody className="px-lg-5 py-lg-5">
						<Form role="form" onSubmit={(e) => handleSubmit(e)}>
							<FormGroup className="mb-3">
								<InputGroup className="input-group-alternative">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-email-83" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										placeholder="Username"
										type="text"
										autoComplete="new-email"
										innerRef={userNameRef}
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup>
								<InputGroup className="input-group-alternative">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-lock-circle-open" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										placeholder="Password"
										type="password"
										autoComplete="new-password"
										innerRef={passwordRef}
									/>
								</InputGroup>
							</FormGroup>
							<div className="custom-control custom-control-alternative custom-checkbox">
								<input
									className="custom-control-input"
									id=" customCheckLogin"
									type="checkbox"
								/>
								<label
									className="custom-control-label"
									htmlFor=" customCheckLogin"
								>
									<span className="text-muted">
										Remember me
									</span>
								</label>
							</div>
							<div className="text-center">
								<Button
									className="my-4"
									color="primary"
									type="submit"
								>
									Sign in
								</Button>
							</div>
						</Form>
					</CardBody>
				</Card>
				<Row className="mt-3">
					<Col xs="6">
						<a
							className="text-light"
							href="#pablo"
							onClick={(e) => e.preventDefault()}
						>
							<small>Forgot password?</small>
						</a>
					</Col>
					<Col className="text-right" xs="6">
						<a
							className="text-light"
							href="#pablo"
							onClick={(e) => e.preventDefault()}
						>
							<small>Create new account</small>
						</a>
					</Col>
				</Row>
			</Col>
		</>
	);
}

export default Login;
