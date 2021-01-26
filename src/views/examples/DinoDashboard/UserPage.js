import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Col,
  Row,
  Card,
  CardHeader,
  Button,
  Input,
} from "reactstrap";

import { Table as TableAntd, Popconfirm, message, Space } from "antd";
import formatDate from "../../../utils/index.js";
import { USER_ENDPOINT } from "../../../constants/endpoint.js";

const END_POINT = USER_ENDPOINT;

export default function UserPage() {
  const [users, setUsers] = React.useState([]);
  const [filter, setFilter] = React.useState("");

  const fetchData = async (endpoint, setState) => {
    const { data } = await axios.get(endpoint);
    console.log(data);
    setState(data);
  };

  React.useEffect(() => {
    fetchData(END_POINT, setUsers);
  }, []);

  function cancel(e) {}
  function confirmDelete(id) {
    axios
      .delete("http://localhost:3001/user/delete/" + id)
      .then((res) => {
        console.log(res);
        message.success("Delete successful.");
        fetchData(END_POINT, setUsers);
      })
      .catch((err) => {
        console.log(err);
        message.error("Delete failed.");
      });
  }
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (id) => (
        <Link to={"/admin/manage-user/" + id}>{id.slice(-8)}</Link>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => formatDate(createdAt),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => formatDate(updatedAt),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 90,
      render: (text, user) => (
        <Space size="small">
          <Link to={"/admin/manage-user/" + user._id}>
            <Button size="sm">View</Button>
          </Link>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => confirmDelete(user._id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button color="danger" size="sm">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const filterCallback = (element) => {
    return (
      element._id.toLowerCase().includes(filter) ||
      element.email.toLowerCase().includes(filter) ||
      element.name.toLowerCase().includes(filter)
    );
  };

  return (
    <>
      <Container className="mt-10 mb-10" fluid>
        <Row className="mt-10 mb-10">
          <Col className="mt-4 mb-4 ">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">Users</h2>
                  </div>
                  <div className="col">
                    <Input
                      type="text"
                      placeholder="Enter id or name to find"
                      id="filterName"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    ></Input>
                  </div>
                </Row>
              </CardHeader>
              <TableAntd
                columns={columns}
                dataSource={users.filter(filterCallback)}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
