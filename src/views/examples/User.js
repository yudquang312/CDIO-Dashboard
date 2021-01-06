import React, { useState } from "react";
import axios from "axios";

import {
  Container,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Header from "components/Headers/Header.js";

const FormUser = (props) => {
  const [content, setContent] = useState({
    USER_ID: "",
    USER_NAME: "",
    PASSWORD: "",
    EMAIL: "",
    ACTIVE: "",
  });

  const handleChange = (e) => {
    console.log(e.target.id, e.target.value);
    setContent({ ...content, [e.target.id]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    axios.post("http://localhost:6969/payroll/users/add", content);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios.post("http://localhost:6969/payroll/users/delete", {
      USER_ID: content.USER_ID,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.post("http://localhost:6969/payroll/users/update", content);
  };

  return (
    <>
      <Header></Header>
      <Container className="mt--80" fluid>
        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="USER_ID">USER_ID</Label>
                <Input
                  type="number"
                  name="USER_ID"
                  id="USER_ID"
                  placeholder=""
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="USER_NAME">USER_NAME</Label>
                <Input
                  type="text"
                  name="USER_NAME"
                  id="USER_NAME"
                  placeholder=""
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="PASSWORD">PASSWORD</Label>
                <Input
                  type="password"
                  name="PASSWORD"
                  id="PASSWORD"
                  placeholder=""
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="EMAIL">EMAIL</Label>
                <Input
                  type="email"
                  name="EMAIL"
                  id="EMAIL"
                  placeholder=""
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="ACTIVE">ACTIVE</Label>
                <Input
                  type="number"
                  name="ACTIVE"
                  id="ACTIVE"
                  placeholder=""
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
            </Col>
          </Row>

          <Button onClick={(e) => handleAdd(e)}>Add</Button>
          <Button onClick={(e) => handleUpdate(e)}>Update</Button>
          <Button onClick={(e) => handleDelete(e)}>Delete</Button>
        </Form>
      </Container>
    </>
  );
};

export default FormUser;
