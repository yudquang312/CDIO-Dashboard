import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {queryData} from "../../common";
import {LOGIN} from "../../query/user"
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
  Col,
} from "reactstrap";

function Login() {
  const userNameRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const [checkLogin, setCheckLogin] = React.useState(false);

  React.useEffect(() => {
    userNameRef.current.value = "vanthaodhdt@gmail.com";
    passwordRef.current.value = "ta210402";
    sessionStorage.removeItem("isLogged");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("QUANG");
    console.log(userNameRef.current.value, passwordRef.current.value);
    console.log(await queryData(LOGIN, {phone: "0964555151", password: "Duyquang01", type: true}))
    axios
      .post("http://localhost:3001/user/login/", {
        email: userNameRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        console.log(res.data?.user);
        if (res.data?.user?.role) {
          sessionStorage.setItem("isLogged", true);
          setCheckLogin(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      {checkLogin ? <Redirect from="*" to="/admin/index"></Redirect> : null}
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent text-center">
            <h4 className="text-uppercase ls-1 mb-1">Sign in</h4>
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
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default Login;
