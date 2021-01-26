import React from "react";
import axios from "axios";

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

import { message, Popconfirm, Table as TableAntd, Space } from "antd";
// import formatDate from "../../../utils/index.js";
import {
  PRODUCT_ENDPOINT,
  TYPE_PRODUCT_ENDPOINT,
  MATERIAL_ENDPOINT,
  STYLE_ENDPOINT,
  CATEGORY_ENDPOINT,
} from "../../../constants/endpoint";
import { Link } from "react-router-dom";

const END_POINT = PRODUCT_ENDPOINT;

export default function ProductPage() {
  const [products, setProducts] = React.useState([]);
  const [productTypes, setProductTypes] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [styles, setStyles] = React.useState([]);
  const [materials, setMaterials] = React.useState([]);
  const [type, setType] = React.useState("all");
  const [category, setCategory] = React.useState("all");
  const [style, setStyle] = React.useState("all");
  const [material, setMaterial] = React.useState("all");
  const [filter, setFilter] = React.useState("");
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
    fetchData(MATERIAL_ENDPOINT, setMaterials);
    fetchData(STYLE_ENDPOINT, setStyles);
    fetchData(TYPE_PRODUCT_ENDPOINT, setProductTypes);
    fetchData(CATEGORY_ENDPOINT, setCategories);
    fetchProduct(PRODUCT_ENDPOINT + "?limit=100", setProducts);
  }, []);

  function confirmDelete(id) {
    axios
      .delete(END_POINT + id)
      .then((res) => {
        console.log(res);
        message.success("Delete successful.");
        fetchProduct(PRODUCT_ENDPOINT + "?limit=100", setProducts);
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
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => type.name,
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
      width: 150,
      render: (text, product) => (
        <Space size="small">
          <Link to={"/admin/manage-product/" + product._id}>
            <Button size="sm">View</Button>
          </Link>
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
        </Space>
      ),
    },
  ];
  const filterCallback = (elements) => {
    return (
      elements.name.toLowerCase().includes(filter) ||
      elements._id.toLowerCase().includes(filter)
    );
  };

  const filterType = (element) => {
    return type === "all" || element.type._id === type;
  };
  const filterStyle = (element) => {
    return style === "all" || element.style._id === style;
  };
  const filterMaterial = (element) => {
    return material === "all" || element.material._id === material;
  };
  const filterCategory = (element) => {
    return category === "all" || element.category._id === category;
  };

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
                    <h2 className="mb-0">Products</h2>
                    <Link to="/admin/manage-product/add">
                      <Button color="primary" size="md">
                        Create
                      </Button>
                    </Link>
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
                      {productTypes.map((e) => (
                        <option value={e._id}>{e.name}</option>
                      ))}
                    </Input>
                  </div>
                  <div className="col">
                    <Label>
                      <strong>Style</strong>
                    </Label>

                    <Input
                      type="select"
                      id="style"
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                    >
                      <option value="all">All</option>
                      {styles.map((e) => (
                        <option value={e._id}>{e.name}</option>
                      ))}
                    </Input>
                  </div>
                  <div className="col">
                    <Label>
                      <strong>Material</strong>
                    </Label>

                    <Input
                      type="select"
                      id="type"
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                    >
                      <option value="all">All</option>
                      {materials.map((e) => (
                        <option value={e._id}>{e.name}</option>
                      ))}
                    </Input>
                  </div>
                  <div className="col">
                    <Label>
                      <strong>Category</strong>
                    </Label>
                    <Input
                      type="select"
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="all">All</option>
                      {categories.map((e) => (
                        <option value={e._id}>{e.name}</option>
                      ))}
                    </Input>
                  </div>
                  <div className="col">
                    <Label>
                      <strong>Search</strong>
                    </Label>

                    <Input
                      type="text"
                      placeholder="Enter id or name to find"
                      id="filterName"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    ></Input>
                  </div>
                  {/* <div className="col text-right">
                    <Link to="/admin/manage-product/add">
                      <Button color="primary" size="sm">
                        Create
                      </Button>
                    </Link>
                  </div> */}
                </Row>
              </CardHeader>
              <TableAntd
                columns={columns}
                dataSource={products
                  .filter(filterCallback)
                  .filter(filterStyle)
                  .filter(filterMaterial)
                  .filter(filterType)
                  .filter(filterCategory)}
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
