import React from 'react';
import { Redirect } from 'react-router-dom';
import { queryData } from '../../common';
import { LOGIN } from '../../query/user';
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
} from 'reactstrap';
import { message } from 'antd';
import { useNotification } from 'hooks';

function Login() {
    const userNameRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const [checkLogin, setCheckLogin] = React.useState(false);

    React.useEffect(() => {
        userNameRef.current.value = 'huydoan@gmail.com';
        passwordRef.current.value = 'ta210402';
        sessionStorage.removeItem('isLogged');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        queryData(LOGIN, {
            email: userNameRef.current.value,
            password: passwordRef.current.value,
            type: false,
        })
            .then(({ data: { login } }) => {
                // console.log(login);
                if (login.user.role === 'ADMIN') {
                    sessionStorage.setItem('isLogged', true);
                    sessionStorage.setItem('userId', login.user.id);
                    localStorage.setItem('token', login.token);
                    // useNotification(login.user.id);
                    localStorage.setItem('refreshToken', login.refreshToken);
                    message.success('Đăng nhập thành công');
                    setCheckLogin(true);
                }
            })
            .catch((err) => {
                // console.log(err);
                message.error('Đăng nhập thất bại');
            });
    };
    return (
        <>
            {checkLogin ? (
                <Redirect from="*" to="/admin/index"></Redirect>
            ) : null}
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
            </Col>
        </>
    );
}

export default Login;
