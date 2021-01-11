import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Col, Row, Card, CardHeader } from "reactstrap";

import { Table as TableAntd } from "antd";
import formatDate from "../../../utils/index.js";
import { USER_ENDPOINT } from "../../../constants/endpoint.js";

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
  ];

  return (
    <>
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
              <TableAntd columns={columns} dataSource={users} />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
