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

import { ORDER_ENDPOINT } from "../../../constants/endpoint";

const END_POINT = ORDER_ENDPOINT;

const stickyColumnAtRight = { right: 0, position: "sticky" };
const stickyColumnAtLeft = { left: 0, position: "sticky" };

export default function UserPage() {
  const [orders, setOrders] = React.useState([]);

  const fetchData = async (endpoint, setState) => {
    const { data } = await axios.get(endpoint);
    console.log(data);
    setState(data);
  };

  React.useEffect(() => {
    fetchData(END_POINT, setOrders);
  }, []);

  const typeOfPayment = {
    0: "Trực tiếp",
    1: "Online",
  };

  const fillDataInToTable = () => {
    let res = [];
    for (let [index, order] of orders.entries()) {
      res.push(
        <tr key={Math.random() * 1000}>
          <th
            scope="row"
            style={{ ...stickyColumnAtLeft, backgroundColor: "#ffffff" }}
          >
            {index + 1}
          </th>
          <td>{order._id}</td>
          <td>{formatDate(order.dateOrder)}</td>
          <td>{typeOfPayment[order.typePayment]}</td>
          <td>{order.address}</td>
          <td>{order.shipMoney}</td>
          <td>{order.intoMoney}</td>
          <td>{order.total}</td>
          <td>{order.user?.name}</td>
          <td>{order.user?.email}</td>
          <td>{order.status}</td>

          <td>{formatDate(order.createdAt)}</td>
          <td>{formatDate(order.updatedAt)}</td>
          <td style={{ ...stickyColumnAtRight, backgroundColor: "#ffffff" }}>
            <Button size="sm">
              <Link to={"/admin/manage-order/" + order._id}>
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
                    <h3 className="mb-0">Orders</h3>
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
                    <th scope="col" style={stickyColumnAtLeft}>
                      #
                    </th>
                    <th scope="col">ID</th>
                    <th scope="col">Date orders</th>
                    <th scope="col">Type Of Payment</th>
                    <th scope="col">Address</th>
                    <th scope="col">Fee Ship</th>
                    <th scope="col">Price</th>
                    <th scope="col">Total</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Status</th>

                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col" style={stickyColumnAtRight}>
                      Action
                    </th>
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
