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
  Card,
  CardHeader,
} from "reactstrap";

import {
  // Modal,
  // message,
  // Popconfirm,
  Select,
  Tag,
  // Form as FormAntd,
} from "antd";
import UploadImage from "./UploadImage";
// import Header from "components/Headers/Header.js";
// import formatDate from "../../../utils/index.js";
import {
  // PRODUCT_ENDPOINT,
  TYPE_PRODUCT_ENDPOINT,
  MATERIAL_ENDPOINT,
  STYLE_ENDPOINT,
  CATEGORY_ENDPOINT,
  COLOR_ENDPOINT,
  SIZE_ENDPOINT,
} from "../../../constants/endpoint";
import { on } from "gulp";

export default function ProductPage() {
  const [product, setProduct] = React.useState({});
  const [sizeAmount, setSizeAmount] = React.useState({});

  const [productTypes, setProductTypes] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [styles, setStyles] = React.useState([]);
  const [materials, setMaterials] = React.useState([]);
  const [colors, setColors] = React.useState([]);
  const [sizes, setSizes] = React.useState([]);

  const fetchData = async (endpoint, setState) => {
    const { data } = await axios.get(endpoint);
    console.log(endpoint, data);
    setState(data);
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

  const handleCreate = async () => {};

  const handleChange = (e) => {
    console.log(e.target.value);
    // console.log(e.target.value);
    setProduct({ ...product, [e.target.id]: e.target.value });
  };

  const handleSizeAmountChange = (e) => {
    setSizeAmount({ ...sizeAmount, [e.target.id]: +e.target.value });
  };

  const onChange = (value) => {
    console.log(value);
  };

  React.useEffect(() => {
    fetchData(MATERIAL_ENDPOINT, setMaterials);
    fetchData(STYLE_ENDPOINT, setStyles);
    fetchData(TYPE_PRODUCT_ENDPOINT, setProductTypes);
    fetchData(CATEGORY_ENDPOINT, setCategories);
    fetchData(COLOR_ENDPOINT, setColors);
    fetchData(SIZE_ENDPOINT, setSizes);
  }, []);

  React.useEffect(() => {
    setSizeAmount(
      sizes.reduce((obj, size) => {
        obj[size._id] = 0;
        return obj;
      }, {})
    );
  }, [sizes]);

  React.useEffect(() => {
    console.log("sizeAmount", sizeAmount);
  }, [sizeAmount]);

  const fillSizes = () => {
    return sizes.map((size) => (
      <Col
        key={size._id}
        xs={6}
        sm={4}
        md={2}
        lg={2}
        xl={2}
        // className="mb-4"
      >
        <Label for={size._id}>{size.name}</Label>
        <Input
          type="number"
          id={size._id}
          name={size._id}
          value={
            sizeAmount[size._id] < 0 || !sizeAmount[size._id]
              ? 0
              : sizeAmount[size._id]
          }
          onChange={handleSizeAmountChange}
        />
      </Col>
    ));
  };

  React.useEffect(() => {
    console.log("Re-render");
  });

  return (
    <>
      <Container className="mt-10 mb-10" fluid>
        <Row className="mt-10 mb-10">
          <Col className="mt-4 mb-4 ">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h1 className="mb-0">Create Product</h1>
                  </div>
                </Row>
              </CardHeader>
              <Container fluid>
                <Form>
                  <FormGroup>
                    <Label>Images</Label>
                    <UploadImage
                      images={product.images ? product.images : []}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter product name"
                      value={product.name ? product.name : ""}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="code">Code</Label>
                    <Input
                      type="text"
                      name="code"
                      id="code"
                      placeholder="Enter product code"
                      value={product.code ? product.code : ""}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col xs={12} sm={6} md={3} lg={3}>
                        <Label for="description">Type</Label>
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="Select a type"
                          optionFilterProp="children"
                          onChange={onChange}
                          value={null}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {fillOptions(productTypes)}
                        </Select>
                      </Col>
                      <Col xs={12} sm={6} md={3} lg={3}>
                        <Label for="description">Category</Label>
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="Select a category"
                          optionFilterProp="children"
                          onChange={onChange}
                          value={null}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {fillOptions(categories)}
                        </Select>
                      </Col>
                      <Col xs={12} sm={6} md={3} lg={3}>
                        <Label for="description">Material</Label>
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="Select a material"
                          optionFilterProp="children"
                          onChange={onChange}
                          value={null}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {fillOptions(materials)}
                        </Select>
                      </Col>
                      <Col xs={12} sm={6} md={3} lg={3}>
                        <Label for="description">Style</Label>
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="Select a style"
                          optionFilterProp="children"
                          onChange={onChange}
                          value={null}
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
                      value={null}
                      style={{ width: "100%" }}
                      onChange={onChange}
                      placeholder="Select product color"
                      // options={options}
                    >
                      {fillOptions(colors)}
                    </Select>
                  </FormGroup>
                  <FormGroup>
                    <Label>Sizes</Label>
                    <Row>{fillSizes()}</Row>
                  </FormGroup>
                  <FormGroup>
                    <Label for="description">Description</Label>

                    <Input
                      type="textarea"
                      name="text"
                      id="description"
                      placeholder="Enter product description"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button onClick={handleCreate}>Create</Button>
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
