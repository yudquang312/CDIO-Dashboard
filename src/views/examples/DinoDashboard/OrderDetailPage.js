import React from "react";
import { useParams, useHistory } from "react-router-dom";
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
  Card,
  CardHeader,
  Table,
} from "reactstrap";

import { message, Popconfirm } from "antd";
import { ORDER_ENDPOINT } from "../../../constants/endpoint";
import formatDate from "../../../utils/index.js";
// import formatCurrency from "../../../utils/formatCurrency.js"
// const formatMoney = formatCurrency(",");

const statusName = {
  "-1": "Đang chờ xác nhận",
  0: "Đang chờ lấy hàng",
  1: "Đang giao",
  2: "Đã giao",
};

export default function OrderDetail() {
  const { orderId } = useParams();
  const history = useHistory();
  const [order, setOrder] = React.useState({ products: [] });
  const [status, setStatus] = React.useState(-1);

  const fetchData = async (endpoint, setState) => {
    const { data } = await axios.get(endpoint);
    console.log(endpoint, data);
    setState(data);
  };

  React.useEffect(() => {
    fetchData(ORDER_ENDPOINT + orderId, setOrder);
  }, []);

  React.useEffect(() => {
    setStatus(order.status);
  }, [order]);

  const fillInformationIntoOrder = () => {
    const { products } = order;
    console.log(products);
    if (!products) return [];
    let res = [];
    for (let [index, product] of products.entries()) {
      console.log(product);
      res.push(
        <tr key={Math.random() * 1000}>
          <th scope="row">{index + 1}</th>
          <td>{product._id}</td>
          <td
            style={{
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "50px",
                height: "50px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                backgroundImage: 'url("' + product.productId.images[0] + '")',
                // borderRadius: "50%",
                // color: "transparent",
              }}
            ></div>
          </td>
          <td>{product.productId.name}</td>
          <td>{product.productId.code}</td>
          <td>{product.sizeId.name}</td>
          <td>{product.amount}</td>
          <td>{product.price}</td>
        </tr>
      );
    }
    return res;
  };
  const handleChangeStatus = (e) => {
    console.log(e.target.value);
    setStatus(e.target.value);
  };
  const cancel = (e) => {};
  const confirmDelete = () => {
    axios
      .put(ORDER_ENDPOINT + "confirm/" + orderId, { confirm: -1 })
      .then(() => {
        message.success("Order has been canceled");
        history.goBack();
      })
      .catch((err) => {
        console.log(err);
        message.error("Delete order failed");
      });
  };
  // fillInformationIntoOrder();
  const handleUpdate = () => {
    axios
      .put(ORDER_ENDPOINT + orderId, { status: status })
      .then(({ data }) => {
        console.log("data", data);
        message.success("Update order successful");
        fetchData(ORDER_ENDPOINT + orderId, setOrder);
      })
      .catch((err) => {
        console.log(err);
        message.error("Update order failed");
      });
  };

  const handleConfirm = () => {
    axios
      .put(ORDER_ENDPOINT + "confirm/" + orderId, { confirm: 1 })
      .then(() => {
        message.success("Confirm order successful");
        fetchData(ORDER_ENDPOINT + orderId, setOrder);
      })
      .catch((err) => {
        console.log(err);
        message.error("Confirm order failed");
      });
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
                    <h1 className="mb-0">Order Detail</h1>
                  </div>
                </Row>
              </CardHeader>
              <Container fluid>
                <Form>
                  <FormGroup>
                    <Row>
                      <Col xs={12} sm={6} md={6} lg={6}>
                        <Label for="name">Order Id</Label>
                        <Input
                          type="text"
                          name="id"
                          id="id"
                          defaultValue={order._id}
                          disabled
                        />
                      </Col>
                      <Col xs={12} sm={6} md={6} lg={6}>
                        <Label for="date">Date Order</Label>
                        <Input
                          type="text"
                          name="date"
                          id="date"
                          defaultValue={formatDate(order.dateOrder)}
                          disabled
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col xs={12} sm={6} md={4} lg={4}>
                        <Label for="name">Type Of Payment</Label>
                        <Input
                          type="text"
                          name="typePayment"
                          id="typePayment"
                          defaultValue={
                            order.typePayment ? "Online" : "Trực Tiếp"
                          }
                          disabled
                        />
                      </Col>
                      <Col xs={12} sm={6} md={4} lg={4}>
                        <Label for="name">Confirm</Label>
                        <Input
                          type="text"
                          name="confirm"
                          id="confirm"
                          value={
                            order.confirm ? "Đã Xác Nhận" : "Chưa Xác Nhận"
                          }
                          disabled
                        />
                      </Col>
                      <Col xs={12} sm={6} md={4} lg={4}>
                        <Label for="name">Status</Label>
                        {order.confirm ? (
                          <Input
                            type="select"
                            value={status}
                            disabled={status === 2}
                            onChange={handleChangeStatus}
                          >
                            {[0, 1, 2].map((status) => (
                              <option value={+status} key={status}>
                                {statusName[status]}
                              </option>
                            ))}
                          </Input>
                        ) : (
                          <Input
                            type="text"
                            name="status"
                            id="status"
                            defaultValue={statusName[status]}
                            disabled
                          />
                        )}
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col xs={6} sm={6} md={3} lg={3}>
                        <Label for="name">Fee Shipping</Label>
                        <Input
                          type="text"
                          name="typePayment"
                          id="typePayment"
                          defaultValue={order.shipMoney }
                          disabled
                        />
                      </Col>
                      <Col xs={6} sm={6} md={3} lg={3}>
                        <Label for="name">Price</Label>
                        <Input
                          type="text"
                          name="confirm"
                          id="confirm"
                          defaultValue={order.intoMoney}
                          disabled
                        />
                      </Col>
                      <Col xs={6} sm={6} md={3} lg={3}>
                        <Label for="name">VAT</Label>
                        <Input
                          type="text"
                          name="VAT"
                          id="VAT"
                          defaultValue={order.VAT}
                          disabled
                        />
                      </Col>
                      <Col xs={6} sm={6} md={3} lg={3}>
                        <Label for="name">Total</Label>
                        <Input
                          type="text"
                          name="confirm"
                          id="confirm"
                          defaultValue={order.total }
                          disabled
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <Label for="name">Name</Label>
                        <Input
                          type="text"
                          name="typePayment"
                          id="typePayment"
                          defaultValue={order.recipientName}
                          disabled
                        />
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <Label for="name">Phone Number</Label>
                        <Input
                          type="text"
                          name="phone"
                          id="phone"
                          defaultValue={order.recipientPhone}
                          disabled
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Label for="name">Address</Label>
                    <Input
                      type="text"
                      name="address"
                      id="address"
                      defaultValue={order.address}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Table
                      className="align-items-center table-flush"
                      responsive
                      style={{ borderRadius: "10px" }}
                    >
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">ID</th>
                          <th scope="col">Image</th>
                          <th scope="col">Name</th>
                          <th scope="col">Code</th>
                          <th scope="col">Size</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Price</th>
                        </tr>
                      </thead>
                      <tbody>{fillInformationIntoOrder()}</tbody>
                    </Table>
                  </FormGroup>
                  <FormGroup>
                    {order.confirm ? (
                      <Button onClick={handleUpdate} disabled={status === 2}>
                        Update
                      </Button>
                    ) : (
                      <Button onClick={handleConfirm}>Confirm</Button>
                    )}
                    <Popconfirm
                      title="Are you sure to delete this order?"
                      onConfirm={confirmDelete}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button color="danger">Delete</Button>
                    </Popconfirm>
                  </FormGroup>
                </Form>
              </Container>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
