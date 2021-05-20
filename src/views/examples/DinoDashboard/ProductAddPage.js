import React from "react";
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
  Card,
  CardHeader,
} from "reactstrap";

import { message, Select } from "antd";
import UploadImage from "./UploadImage";
import { GET_CATEGORIES } from "../../../query/category";
import { queryData } from "../../../common";

export default function ProductPage() {
  const [product, setProduct] = React.useState({
    name: "Duy Quang",
    year: "1996",
    description: "Một thằng già nghèo khỗ, một con đĩ cô đơn đang trên hành trình của mình.",
    numberOfReprint: 1,
    publisher: 300000,
    author: 'Duy Quang',
  });
  const [images, setImages] = React.useState([
    "https://res.cloudinary.com/thaovan/image/upload/v1611683329/Dinosuar_shop/products/hkfpsyhgvuhhjdbp3p9m.jpg",
  ]);
  const [category, setCategory] = React.useState("");
  const [categories, setCategories] = React.useState([]);


  const fetchCategories = async () => {
    queryData(GET_CATEGORIES)
      .then(({ data: { categories: dataCategories } }) => {
        console.log(dataCategories);
        setCategories(dataCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fillOptions = (values) => {
    return values.map((value) => (
      <Select.Option key={value.id} value={value.id}>
        {value.name}
      </Select.Option>
    ));
  };


  const handleCreate = async () => {
    console.log('Created');
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    // console.log(e.target.value);
    setProduct({ ...product, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (value, setState) => {
    setState(value);
  };


  React.useEffect(() => {
    fetchCategories();
  }, []);

  React.useEffect(() => {
    console.log("images", images);
  }, [images]);

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
                    <h2 className="mb-0">Create Product</h2>
                  </div>
                  <div>
                    <Link to="/admin/manage-product-new/add">
                      <Button>New</Button>
                    </Link>
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
                    </Row>
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
