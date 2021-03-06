import React from "react";
import {useMutation} from '@apollo/client';
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

import { message, Select} from "antd";
import Image from "./Image";
import { GET_CATEGORIES } from "../../../query/category";
import { CREATE_UNIQUE_BOOK } from "../../../query/uniqueBook";
import {UPLOAD_MULTI_FILE} from '../../../query/upload';
import { queryData, mutateData } from "../../../common";

export default function ProductAddPage() {
  const [product, setProduct] = React.useState({
    name: "Duy Quang",
    year: "1996",
    description: "Một thằng già nghèo khỗ, một con đĩ cô đơn đang trên hành trình của mình.",
    numberOfReprint: 1,
    publisher: 'NBX Quang Nguyen',
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

  const [upload] = useMutation(UPLOAD_MULTI_FILE, {
    onCompleted: (data) => {
      const tamp = data.uploadMultiFile.map((dt) => dt.url);
      setImages([...images, ...tamp]);
    },
    onError: (err) => {
      console.log('upload images error', err);
    },
  });

  const fillOptions = (values) => {
    return values.map((value) => (
      <Select.Option key={value.id} value={value.id}>
        {value.name}
      </Select.Option>
    ));
  };


  const handleCreate = async () => {
    mutateData(CREATE_UNIQUE_BOOK, {dataCreate: {...product, images: images, category: category}})
      .then((res) => {
        message.success("Create successful.");
      })
      .catch((err) => {
        console.log(err);
        message.error("Create failed.");
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


  React.useEffect(() => {
    fetchCategories();
  }, []);

  React.useEffect(() => {
    console.log("images", images);
  }, [images]);

  React.useEffect(() => {
    console.log("Re-render");
  });

  const uploadImage = async (e) => {
    e.preventDefault();
    const files = e.target.files;
    console.log(files);
    try {
      // const config = {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // };
      // const uploadCloud = (files) =>
      //   new Promise(async (resolve, reject) => {
      //     const file = files[0];
      //     let formData = new FormData();
      //     formData.append("file", file);
      //     const res = await axios.post(
      //       "http://localhost:3001/api/upload_single",
      //       formData,
      //       config
      //     );
      //     resolve(res.data.url);
      //   })
      //     .then((result) => result)
      //     .catch((err) => console.log(err));
      // const data = await uploadCloud(files);
      // console.log(data);
      // setImages([...images, data]);
      upload({
        variables: {
          files,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteImage = (index) => () => {
    const imagesTemp = [...images];
    imagesTemp.splice(index, 1);
    setImages(imagesTemp);
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
                    <h2 className="mb-0">Thêm sản phẩm</h2>
                  </div>
                </Row>
              </CardHeader>
              <Container fluid>
                <Form>
                  <FormGroup>
                    <Label>Hình ảnh</Label>
                    <div>
                      {images.map((image, index) => (
                        <Image
                          imageUrl={image}
                          key={Math.random() * 1000 + ""}
                          onDelete={deleteImage(index)}
                        />
                      ))}
                      {images.length < 4 ? (
                        <div
                          style={{
                            width: "170px",
                            height: "170px",
                            margin: "0 5px",
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <input
                            type="file"
                            id="file"
                            name="file"
                            onChange={uploadImage}
                            className="inputFile"
                          />
                          <label htmlFor="file">+ Tải lên</label>
                        </div>
                      ) : null}
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="name">Tên sách</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Nhập tên sách"
                      value={product.name ? product.name : ""}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col xs={12} sm={12} md={4}>
                        <Label htmlFor="year">Năm xuất bản</Label>
                        <Input
                          type="text"
                          name="year"
                          id="year"
                          placeholder="Nhập năm"
                          value={product.year ? product.year : ""}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col xs={12} sm={12} md={4}>
                        <Label htmlFor="numberOfReprint">Số lần tái bản</Label>
                        <Input
                          type="text"
                          name="numberOfReprint"
                          id="numberOfReprint"
                          placeholder="Nhập số lần tái bản"
                          value={product.numberOfReprint ? product.numberOfReprint : 0}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col xs={12} sm={12} md={4}>
                        <Label htmlFor="category">Thể loại</Label>
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
                    <Row>
                      <Col xs={12} sm={12} md={6}>
                        <Label htmlFor="author">Tác giả</Label>
                        <Input
                          type="text"
                          name="author"
                          id="author"
                          placeholder="Nhập tác giả"
                          value={product.author ? product.author : ''}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col xs={12} sm={12} md={6}>
                        <Label htmlFor="publisher">Nhà xuất bản</Label>
                        <Input
                          type="text"
                          name="publisher"
                          id="publisher"
                          placeholder="Nhập nhà xuất bản"
                          value={product.publisher ? product.publisher : ''}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="description">Mô tả</Label>
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
                    <Button onClick={handleCreate}>Tạo</Button>
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
