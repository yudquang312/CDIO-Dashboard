import React from "react";
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
  Table,
  Card,
  CardHeader,
} from "reactstrap";

import {
  Modal,
  message,
  Popconfirm,
  Select,
  Tag,
  Form as FormAntd,
} from "antd";
import UploadImage from "./UploadImage";
// import Header from "components/Headers/Header.js";
import formatDate from "../../../utils/index.js";
import {
  PRODUCT_ENDPOINT,
  TYPE_PRODUCT_ENDPOINT,
  MATERIAL_ENDPOINT,
  STYLE_ENDPOINT,
  CATEGORY_ENDPOINT,
  COLOR_ENDPOINT,
} from "../../../constants/endpoint";

const END_POINT = PRODUCT_ENDPOINT;
const stickyColumnAtRight = { right: 0, position: "sticky" };
const stickyColumnAtLeft = { left: 0, position: "sticky" };

export default function ProductPage() {
  const [products, setProducts] = React.useState([]);
  const [modalProduct, setModalProduct] = React.useState({
    create: false,
    product: {},
  });
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [productTypes, setProductTypes] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [styles, setStyles] = React.useState([]);
  const [materials, setMaterials] = React.useState([]);
  const [colors, setColors] = React.useState([]);

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

  const handleDisplay = () => {
    setModalProduct({
      create: true,
      product: {},
    });
    setIsModalVisible(true);
  };

  const showModal = (index) => () => {
    console.log(index);
    console.log(products[index]);
    setModalProduct({
      create: false,
      product: products[index],
    });
    setIsModalVisible(true);
  };

  const fillOptions = (values) => {
    return values.map((value) => (
      <Select.Option key={value._id} value={value._id}>
        {value.name}
      </Select.Option>
    ));
  };

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    // console.log(props);
    return (
      <Tag
        color={label === "white" ? "black" : label}
        // closable={closable}
        // onClose={onClose}
        style={{ marginRight: 3 }}
        onClick={onClose}
      >
        {label}
      </Tag>
    );
  };

  const handleChange = (e) => {
    // console.log(e.target.value);
    // console.log(e.target.value);
    setModalProduct({ ...modalProduct, [e.target.id]: e.target.value });
  };

  const handleCreate = async () => {
    axios
      .post(END_POINT, modalProduct)
      .then((res) => {
        console.log(res);
        message.success("Create successful.");
        fetchData();
        setIsModalVisible(false);
      })
      .catch((err) => {
        message.error("Create failed.");
        console.log(err);
      });
  };

  const handleUpdate = async () => {
    // setIsModalVisible(false);
    axios
      .put(END_POINT + modalProduct.id, modalProduct)
      .then((res) => {
        console.log(res);
        message.success("Update successful.");
        fetchData();
        setIsModalVisible(false);
      })
      .catch((err) => {
        message.error("Create failed.");
        console.log(err);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalProduct({
      create: true,
      product: {},
    });
  };

  React.useEffect(() => {
    fetchProduct(PRODUCT_ENDPOINT, setProducts);
    fetchData(MATERIAL_ENDPOINT, setMaterials);
    fetchData(STYLE_ENDPOINT, setStyles);
    fetchData(TYPE_PRODUCT_ENDPOINT, setProductTypes);
    fetchData(CATEGORY_ENDPOINT, setCategories);
    fetchData(COLOR_ENDPOINT, setColors);
  }, []);

  React.useEffect(() => {
    console.log("Re-render");
  });

  React.useEffect(() => {
    console.log(isModalVisible);
  }, [isModalVisible]);
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

  function cancel(e) {}
  const fillDataInToTable = () => {
    console.log(products);
    let res = [];
    for (let [index, product] of products.entries()) {
      res.push(
        <tr key={Math.random() * 1000}>
          <th
            scope="row"
            style={{ ...stickyColumnAtLeft, backgroundColor: "#ffffff" }}
          >
            {index + 1}
          </th>
          <td>{product._id}</td>
          <td>{product.name}</td>
          <td>{product.code}</td>
          <td>{product.sold}</td>
          <td>{product.amount}</td>
          <td>{product.salePrice}</td>
          <td>{product.style.name}</td>
          <td>{product.material.name}</td>
          <td>{product.category.name}</td>

          <td>{formatDate(product.createdAt)}</td>
          <td>{formatDate(product.updatedAt)}</td>
          <td style={{ ...stickyColumnAtRight, backgroundColor: "#ffffff" }}>
            <Button onClick={showModal(index)} size="sm">
              Update
            </Button>
            <Popconfirm
              title="Are you sure to delete this color?"
              onConfirm={() => confirmDelete(product._id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button color="danger" size="sm">
                Delete
              </Button>
            </Popconfirm>
          </td>
        </tr>
      );
    }
    return res;
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
                    <h3 className="mb-0">Products</h3>
                  </div>
                  <div className="col text-right">
                    <Button color="primary" onClick={handleDisplay} size="sm">
                      Create
                    </Button>
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
                    <th scope="col">Name</th>
                    <th scope="col">Code</th>
                    <th scope="col">Sold</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Sell Price</th>
                    <th scope="col">Style</th>
                    <th scope="col">Material</th>
                    <th scope="col">Category</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col" style={stickyColumnAtRight}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>{fillDataInToTable()}</tbody>
              </Table>
              <Modal
                title={modalProduct.create ? "Create" : "Update"}
                visible={isModalVisible}
                onOk={modalProduct.create ? handleCreate : handleUpdate}
                onCancel={handleCancel}
                okText={modalProduct.create ? "Create" : "Update"}
                style={{ top: 50 }}
                width={1000}
              >
                <Form>
                  {modalProduct.create ? null : (
                    <FormGroup>
                      <Label for="_id">Id</Label>
                      <Input
                        type="text"
                        name="_id"
                        id="_id"
                        placeholder=""
                        value={
                          modalProduct.product._id
                            ? modalProduct.product._id
                            : ""
                        }
                        onChange={handleChange}
                        plaintext={true}
                      />
                    </FormGroup>
                  )}
                  <FormGroup>
                    <Label>Images</Label>
                    <UploadImage
                      images={
                        modalProduct.product.images
                          ? modalProduct.product.images
                          : []
                      }
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder=""
                      value={
                        modalProduct.product.name
                          ? modalProduct.product.name
                          : ""
                      }
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="code">Code</Label>
                    <Input
                      type="text"
                      name="code"
                      id="code"
                      placeholder=""
                      value={
                        modalProduct.product.code
                          ? modalProduct.product.code
                          : ""
                      }
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col xs={12} sm={6} md={3} lg={3} className="mb-4">
                        <Label for="description">Type</Label>
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="Select a type"
                          optionFilterProp="children"
                          // onChange={onChange}
                          // onFocus={onFocus}
                          // onBlur={onBlur}
                          // onSearch={onSearch}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {fillOptions(productTypes)}
                        </Select>
                      </Col>
                      <Col xs={12} sm={6} md={3} lg={3} className="mb-4">
                        <Label for="description">Category</Label>
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="Select a category"
                          optionFilterProp="children"
                          // onChange={onChange}
                          // onFocus={onFocus}
                          // onBlur={onBlur}
                          // onSearch={onSearch}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {fillOptions(categories)}
                        </Select>
                      </Col>
                      <Col xs={12} sm={6} md={3} lg={3} className="mb-4">
                        <Label for="description">Material</Label>
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="Select a material"
                          optionFilterProp="children"
                          // onChange={onChange}
                          // onFocus={onFocus}
                          // onBlur={onBlur}
                          // onSearch={onSearch}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {fillOptions(materials)}
                        </Select>
                      </Col>
                      <Col xs={12} sm={6} md={3} lg={3} className="mb-4">
                        <Label for="description">Style</Label>
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="Select a style"
                          optionFilterProp="children"
                          // onChange={onChange}
                          // onFocus={onFocus}
                          // onBlur={onBlur}
                          // onSearch={onSearch}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {fillOptions(styles)}
                        </Select>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Label for="description">Color</Label>

                    <Select
                      mode="multiple"
                      showArrow
                      tagRender={tagRender}
                      // defaultValue={["gold", "cyan"]}
                      style={{ width: "100%" }}
                      // options={options}
                    >
                      {fillOptions(colors)}
                    </Select>
                  </FormGroup>
                  <FormGroup>
                    <Label>Sizes</Label>
                    <Row>
                      <Col
                        xs={6}
                        sm={4}
                        md={2}
                        lg={1}
                        className="mb-4"
                        // style={{
                        //   display: "flex",
                        //   justifyContent: "center",
                        //   alignItems: "center",
                        //   flexDirection: "column",
                        // }}
                      >
                        <Label for="description">36</Label>
                        <Input type="number" defaultValue={0} />
                      </Col>
                      <Col xs={6} sm={4} md={2} lg={1} className="mb-4">
                        <Label for="description">37</Label>
                        <Input type="number" defaultValue={0} />
                      </Col>
                      <Col xs={6} sm={4} md={2} lg={1} className="mb-4">
                        <Label for="description">38</Label>
                        <Input type="number" defaultValue={0} />
                      </Col>
                      <Col xs={6} sm={4} md={2} lg={1} className="mb-4">
                        <Label for="description">39</Label>
                        <Input type="number" defaultValue={0} />
                      </Col>
                      <Col xs={6} sm={4} md={2} lg={1} className="mb-4">
                        <Label for="description">40</Label>
                        <Input type="number" defaultValue={0} />
                      </Col>
                      <Col xs={6} sm={4} md={2} lg={1} className="mb-4">
                        <Label for="description">41</Label>
                        <Input type="number" defaultValue={0} />
                      </Col>
                      <Col xs={6} sm={4} md={2} lg={1} className="mb-4">
                        <Label for="description">42</Label>
                        <Input type="number" defaultValue={0} />
                      </Col>
                      <Col xs={6} sm={4} md={2} lg={1} className="mb-4">
                        <Label for="description">43</Label>
                        <Input type="number" defaultValue={0} />
                      </Col>
                      <Col xs={6} sm={4} md={2} lg={1} className="mb-4">
                        <Label for="description">44</Label>
                        <Input type="number" defaultValue={0} />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Label for="description">Description</Label>

                    <Input type="textarea" name="text" id="description" />
                  </FormGroup>
                </Form>
              </Modal>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
