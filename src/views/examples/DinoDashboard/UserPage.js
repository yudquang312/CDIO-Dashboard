import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Container,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Card,
  CardHeader,
} from "reactstrap";

import { Modal, message, Popconfirm } from "antd";
// import Header from "components/Headers/Header.js";
import formatDate from "../../../utils/index.js";

import { USER_ENDPOINT } from "../../../constants/endpoint";

const END_POINT = USER_ENDPOINT;

export default function UserPage() {
  const [users, setUsers] = React.useState([]);

  const fetchData = async (endpoint, setState) => {
    const { data } = await axios.get(endpoint);
    console.log(data);
    setState(data);
  };

  React.useEffect(() => {
    fetchData(END_POINT, setUsers);
  }, []);

  function confirmDelete(id) {
    axios
      .delete(END_POINT + id)
      .then((res) => {
        console.log(res);
        fetchData();
        message.success("Delete successful.");
      })
      .catch((err) => {
        console.log(err);
        message.error("Delete failed.");
      });
  }

  const fillDataInToTable = () => {
    let res = [];
    for (let [index, user] of users.entries()) {
      res.push(
        <tr key={Math.random() * 1000}>
          <th scope="row">{index + 1}</th>
          <td>{user._id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>

          <td>{formatDate(user.createdAt)}</td>
          <td>{formatDate(user.updatedAt)}</td>
          <td>
            <Button size="sm">
              <Link to={"/admin/manage-user/" + user._id}>
                <div style={{ color: "#5e72e4 !important" }}>View</div>
              </Link>
            </Button>
          </td>
        </tr>
      );
    }
    return res;
  };
  return (
    <>
      {/* <Header></Header> */}
      <Container className="mt-10 mb-10" fluid>
        <Row className="mt-10 mb-10">
          <Col className="mt-4 mb-4 ">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Users</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table
                className="align-items-center table-flush"
                responsive
                style={{ borderRadius: "10px" }}
              >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>{fillDataInToTable()}</tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
