import React from "react";
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
import { GET_USERS } from "../../../query/user";
import { queryData } from "../../../common";
import { Table as TableAntd, Popconfirm, message, Space, Tag } from "antd";
import formatDate from "../../../utils/index.js";

export default function UserPage() {
  const [users, setUsers] = React.useState([]);
  const [filter, setFilter] = React.useState("");

  const fetchData = async () => {
    queryData(GET_USERS)
      .then(({ data: { users } }) => {
        console.log(users);
        setUsers(users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  function cancel(e) {}
  function confirmDelete(id) {
    message.error("Delete failed.");
    // axios
    //   .delete("http://localhost:3001/user/delete/" + id)
    //   .then((res) => {
    //     console.log(res);
    //     message.success("Delete successful.");
    //     fetchData();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     message.error("Delete failed.");
    //   });
  }
  const roleTag = {
    ADMIN: "warning",
    STORE: "processing",
    MEMBER: "success",
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => <Tag color={roleTag[role]}>{role}</Tag>,
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
          <Link to={"/admin/manage-user/" + user.id}>
            <Button size="sm">View</Button>
          </Link>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => confirmDelete(user.id)}
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
      element.id.toLowerCase().includes(filter) ||
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
