import React from "react";
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
import { GET_UNIQUE_BOOKS, DELETE_UNIQUE_BOOK } from "../../../query/uniqueBook";
import { GET_CATEGORIES } from "../../../query/category";
import { mutateData, queryData } from "../../../common";
import { message, Popconfirm, Table as TableAntd, Space } from "antd";
import formatDate from "../../../utils/index.js";
import { Link } from "react-router-dom";

export default function ProductPage() {
  const [uniqueBooks, setUniqueBooks] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState("all");
  const [filter, setFilter] = React.useState("");
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

  const fetchUniqueBooks = async () => {
    queryData(GET_UNIQUE_BOOKS)
      .then(({ data: { uniqueBooks } }) => {
        console.log(uniqueBooks);
        setUniqueBooks(uniqueBooks);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    fetchCategories();
    fetchUniqueBooks();
  }, []);

  function confirmDelete(id) {
    mutateData(DELETE_UNIQUE_BOOK, {id: id})
    .then((res) => {
      message.success("Delete successful.");
      fetchUniqueBooks();
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
      dataIndex: "id",
      key: "id",
      fixed: "left",
      render: (id) => <strong>{id.slice(-8)}</strong>,
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 250,
      render: (name) => <strong>{name}</strong>,
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      width: 500,
      render: (images) => (
        <div>
          {images.map((image, index) => (
            <div
              key={index}
              style={{
                display: "inline-block",
                padding: "5px",
                margin: "5px",
                width: "100px",
                height: "100px",
                cursor: "pointer",
                border: "1px solid #d9d9d9",
              }}
            >
              <img
                src={image}
                alt="cannotLoading"
                width="90"
                height="90"
                loading="lazy"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: 250,
      render: (author) => <strong>{author}</strong>,
    },
    {
      title: "Publisher",
      dataIndex: "publisher",
      key: "publisher",
      width: 250,
      render: (publisher) => <strong>{publisher}</strong>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 250,
      render: (category) => category?.name,
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
      width: 150,
      render: (text, product) => (
        <Space size="small" key={product.id}>
          <Link to={"/admin/manage-product/" + product.id}>
            <Button size="sm">View</Button>
          </Link>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => confirmDelete(product.id)}
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
      elements.id.toLowerCase().includes(filter)
    );
  };

  const filterCategory = (element) => {
    return category === "all" || element.category.id === category;
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
                        <option value={e.id} key={e.id}>{e.name}</option>
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
                dataSource={uniqueBooks
                  .filter(filterCallback)
                  .filter(filterCategory)}
                scroll={{ x: 2000 }}
                onChange={onChange}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
