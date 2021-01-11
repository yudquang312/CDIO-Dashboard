import React from "react";
import axios from "axios";

import { Container, Col, Row, Button, Card, CardHeader } from "reactstrap";

import { message, Popconfirm, Table as TableAntd } from "antd";
import formatDate from "../../../utils/index.js";
import { PRODUCT_ENDPOINT } from "../../../constants/endpoint";
import { Link } from "react-router-dom";

const END_POINT = PRODUCT_ENDPOINT;

export default function ProductPage() {
  const [products, setProducts] = React.useState([]);

  const fetchData = async (endpoint, setState) => {
    const { data } = await axios.get(endpoint);
    console.log(endpoint, data);
    setState(data);
  };

  const fetchProduct = async (endpoint, setState) => {
    const {
      data: { products },
    } = await axios.get(endpoint);
    console.log("Products", products);
    setState(products);
  };

  React.useEffect(() => {
    fetchProduct(PRODUCT_ENDPOINT + "?limit=100", setProducts);
  }, []);

  function confirmDelete(id) {
    axios
      .delete(END_POINT + id)
      .then((res) => {
        console.log(res);
        message.success("Delete successful.");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        message.error("Delete failed.");
      });
  }

  function cancel(e) {}

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      fixed: "left",
      render: (id) => (
        <Link to={"/admin/manage-product/" + id}>{id.slice(-8)}</Link>
      ),
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 300,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Style",
      dataIndex: "style",
      key: "style",
      render: (style) => style.name,
    },
    {
      title: "Material",
      dataIndex: "material",
      key: "material",
      render: (material) => material.name,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category.name,
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
      render: (text, product) => (
        <Popconfirm
          title="Are you sure to delete this product?"
          onConfirm={() => confirmDelete(product._id)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button color="danger" size="sm">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];
  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <>
      <Container className="mt-10 mb-10" fluid>
        <Row className="mt-10 mb-10">
          <Col className="mt-4 mb-4 ">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Products</h3>
                  </div>
                  <div className="col text-right">
                    <Link to="/admin/manage-product/add">
                      <Button color="primary" size="sm">
                        Create
                      </Button>
                    </Link>
                  </div>
                </Row>
              </CardHeader>
              <TableAntd
                columns={columns}
                dataSource={products}
                scroll={{ x: 1500 }}
                onChange={onChange}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
