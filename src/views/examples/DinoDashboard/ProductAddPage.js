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
  message,
  Select,
  Tag,
} from "antd";
import UploadImage from "./UploadImage";
import {
  PRODUCT_ENDPOINT,
  TYPE_PRODUCT_ENDPOINT,
  MATERIAL_ENDPOINT,
  STYLE_ENDPOINT,
  CATEGORY_ENDPOINT,
  COLOR_ENDPOINT,
  SIZE_ENDPOINT,
} from "../../../constants/endpoint";

export default function ProductPage() {
  const [product, setProduct] = React.useState({
    name: "LUCKY LUKE PATTAS - LL MORRIS WHITE",
    code: "A61094",
    description:
      "Phiên bản bất ngờ dành riêng cho bộ sản phẩm Ananas x Lucky Luke nhằm mục đích tôn vinh nét vẽ tài hoa của tác giả Morris. Với việc xuất hiện đầy đủ các nhân vật tuyến chính trong bộ truyện và theo nhiều chi tiết tinh tế được bố trí khắp nơi, sản phẩm được ra mắt với số lượng giới hạn trong một chiếc hộp đặc biệt hấp dẫn, đáng để bạn rinh về nhà.",
    sold: 0,
    inputPrice: 300000,
    salePrice: 450000,
    createBy: "5fbe0aca81bd88108607f69b",
  });
  const [images, setImages] = React.useState([
    "https://ananas.vn/wp-content/uploads/pro_A61094_1.jpg",
    "https://ananas.vn/wp-content/uploads/pro_A61094_2.jpg",
    "https://ananas.vn/wp-content/uploads/pro_A61094_3.jpg",
    "https://ananas.vn/wp-content/uploads/pro_A61094_4.jpg",
  ]);
  const [style, setStyle] = React.useState("");
  const [type, setType] = React.useState("");
  const [material, setMaterial] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [color, setColor] = React.useState([]);
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
    const { label, onClose } = props;
    // console.log(props);
    return (
      <Tag
        color={label === "white" ? "black" : label}
        style={{ marginRight: 3 }}
        onClick={onClose}
      >
        {label}
      </Tag>
    );
  };

  const handleCreate = async () => {
    axios
      .post(PRODUCT_ENDPOINT, {
        ...product,
        colors: color,
        style: style,
        material: material,
        type: type,
        category: category,
        sizes: Object.keys(sizeAmount).map((id) => ({
          sizeId: id,
          amount: sizeAmount[id],
        })),
        amount: Object.keys(sizeAmount).reduce((totalAmount, id) => {
          return totalAmount + sizeAmount[id];
        }, 0),
        images: images,
      })
      .then(() => {
        message.success("Create product successful");
      })
      .catch((err) => {
        console.log(err);
        message.error("Create product failed");
      });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    // console.log(e.target.value);
    setProduct({ ...product, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (value, setState) => {
    setState(value);
  };
  const handleSelectColorChange = (value) => {
    setColor([...value]);
  };

  const handleSizeAmountChange = (e) => {
    setSizeAmount({ ...sizeAmount, [e.target.id]: +e.target.value });
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
  React.useEffect(() => {
    console.log("images", images);
  }, [images]);

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
                      images={images ? images : []}
                      setImages={setImages}
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
                    <Row>
                      <Col xs={12} sm={12} md={6}>
                        <Label for="code">Code</Label>
                        <Input
                          type="text"
                          name="code"
                          id="code"
                          placeholder="Enter product code"
                          value={product.code ? product.code : ""}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col xs={12} sm={12} md={6}>
                        <Label for="salePrice">Price</Label>
                        <Input
                          type="number"
                          name="salePrice"
                          id="salePrice"
                          placeholder="Enter product code"
                          value={product.salePrice ? product.salePrice : 0}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
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
                          onChange={(value) =>
                            handleSelectChange(value, setType)
                          }
                          value={type}
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
                        <Label for="category">Category</Label>
                        <Select
                          id="category"
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="Select a category"
                          optionFilterProp="children"
                          onChange={(value) =>
                            handleSelectChange(value, setCategory)
                          }
                          value={category}
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
                          onChange={(value) =>
                            handleSelectChange(value, setMaterial)
                          }
                          value={material}
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
                          onChange={(value) =>
                            handleSelectChange(value, setStyle)
                          }
                          value={style}
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
                      value={color}
                      style={{ width: "100%" }}
                      onChange={handleSelectColorChange}
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
                      value={product.description}
                      onChange={handleChange}
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
