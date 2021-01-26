import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Container,
  Col,
  Row,
  Button,
  Card,
  CardHeader,
  Input,
  Label,
} from "reactstrap";

import { Table as TableAntd, Typography, Tag } from "antd";
// import Header from "components/Headers/Header.js";
import formatDate from "../../../utils/index.js";
import formatCurrency from "../../../utils/formatCurrency.js";

import { ORDER_ENDPOINT } from "../../../constants/endpoint";

const END_POINT = ORDER_ENDPOINT;

export default function UserPage() {
  const [orders, setOrders] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const [type, setType] = React.useState("all");
  const [status, setStatus] = React.useState("all");

  const fetchData = async (endpoint, setState) => {
    const { data } = await axios.get(endpoint);
    console.log(data);
    setState(data);
  };

  React.useEffect(() => {
    fetchData(END_POINT + "?limit=100", setOrders);
  }, []);

  const typeOfPayment = {
    0: "Trực tiếp",
    1: "Online",
  };
  const statusTag = {
    "-1": { text: "Đang chờ xác nhận", color: "warning" },
    0: { text: "Đang chờ lấy hàng", color: "processing" },
    1: { text: "Đang giao", color: "processing" },
    2: { text: "Đã giao", color: "success" },
  };

  const sortByTime = (arr) => {
    arr.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return arr;
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      fixed: "left",
      width: 110,
      render: (id) => <Typography.Text strong>{id.slice(-8)}</Typography.Text>,
    },
    {
      title: "Date orders",
      dataIndex: "dateOrder",
      key: "dateOrder",
      width: 170,
      render: (date) => formatDate(date),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 160,
      render: (status) => (
        <Tag color={statusTag[status].color}>{statusTag[status].text}</Tag>
      ),
    },
    {
      title: "Payment",
      dataIndex: "typePayment",
      key: "typePayment",
      width: 100,
      render: (type) => typeOfPayment[type],
    },
    {
      title: "Fee Ship",
      dataIndex: "shipMoney",
      key: "shipMoney",
      align: "right",
      width: 120,
      render: (money) => formatCurrency(money),
    },
    {
      title: "Price",
      dataIndex: "intoMoney",
      key: "intoMoney",
      width: 120,
      align: "right",
      render: (money) => formatCurrency(money),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: 120,
      align: "right",
      render: (money) => formatCurrency(money),
    },
    {
      title: "User Name",
      dataIndex: "user",
      key: "name",
      width: 150,
      render: (user) => user?.name,
    },
    {
      title: "Email",
      dataIndex: "user",
      key: "email",
      width: 200,
      render: (user) => user?.email,
    },
    {
      title: "Phone",
      dataIndex: "recipientPhone",
      key: "recipientPhone",
      width: 120,
    },
    {
      title: "Recipient Name",
      dataIndex: "recipientName",
      key: "recipientName",
      width: 120,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    // {
    //   title: "Created At",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   render: (createdAt) => formatDate(createdAt),
    // },
    // {
    //   title: "Updated At",
    //   dataIndex: "updatedAt",
    //   key: "updatedAt",
    //   render: (updatedAt) => formatDate(updatedAt),
    // },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 80,
      render: (text, order) => (
        <Link to={"/admin/manage-order/" + order._id}>
          <Button size="sm">View</Button>
        </Link>
      ),
    },
  ];
  const filterCallback = (element) => {
    return (
      element._id.toLowerCase().includes(filter) ||
      element.recipientPhone.toLowerCase().includes(filter) ||
      element.recipientName.toLowerCase().includes(filter)
    );
  };

  const filterType = (element) => {
    return type === "all" || element.typePayment === +type;
  };

  const filterStatus = (element) => {
    return status === "all" || element.status === +status;
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
                    <h2 className="mb-0">Orders</h2>
                  </div>
                  <div className="col">
                    <Label>
                      <strong>Type</strong>
                    </Label>

                    <Input
                      type="select"
                      id="type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value={0}>Trực Tiếp</option>
                      <option value={1}>Online</option>
                    </Input>
                  </div>
                  <div className="col">
                    <Label>
                      <strong>Status</strong>
                    </Label>
                    <Input
                      type="select"
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value={-1}>Đang chờ xác nhận</option>
                      <option value={0}>Đang chờ lấy hàng</option>
                      <option value={1}>Đang giao</option>
                      <option value={2}>Đã giao</option>
                    </Input>
                  </div>
                  <div className="col">
                    <Label>
                      <strong>Search</strong>
                    </Label>

                    <Input
                      type="text"
                      placeholder="Enter id or phone or email or recipient name to find"
                      id="filterName"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    ></Input>
                  </div>
                </Row>
              </CardHeader>
              <TableAntd
                columns={columns}
                dataSource={sortByTime(orders)
                  .filter(filterCallback)
                  .filter(filterType)
                  .filter(filterStatus)}
                scroll={{ x: 1920, y: 700 }}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
