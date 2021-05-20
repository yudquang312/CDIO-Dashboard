import React, { useState } from "react";
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
import { Modal, message, Popconfirm, Table as TableAntd, Space } from "antd";
import formatDate from "../../../utils/index.js";
import { queryData, mutateData } from "../../../common";
import {
  GET_CATEGORIES,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "../../../query/category";

export default function Styles() {
  const [categories, setCategories] = React.useState([]);
  const [modalContent, setModalContent] = React.useState({
    create: false,
    id: "",
    name: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchData = async () => {
    queryData(GET_CATEGORIES)
      .then(({ data: { categories: dataCategories } }) => {
        console.log(dataCategories);
        setCategories(dataCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDisplay = () => {
    setModalContent({
      create: true,
      id: "",
      name: "",
    });
    setIsModalVisible(true);
  };

  const showModal = (style) => () => {
    console.log(style);

    setIsModalVisible(true);
    setModalContent({
      create: false,
      ...style,
    });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setModalContent({ ...modalContent, [e.target.id]: e.target.value });
  };

  const handleCreate = async () => {
    mutateData(CREATE_CATEGORY, { name: modalContent.name })
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
    mutateData(UPDATE_CATEGORY, {
      id: modalContent.id,
      name: modalContent.name,
    })
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
    setModalContent({
      create: true,
      id: "",
      name: "",
    });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    console.log(isModalVisible);
  }, [isModalVisible]);

  const confirmDelete = (id) => {
    mutateData(DELETE_CATEGORY, { id: id })
      .then((res) => {
        console.log(res);
        fetchData();
        message.success("Delete successful.");
      })
      .catch((err) => {
        console.log(err);
        message.error("Delete failed.");
      });
  };

  const cancel = (e) => {};

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => id.slice(-8),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      width: 180,
      render: (text, category) => (
        <Space size="small">
          <Button onClick={showModal(category)} size="sm">
            Update
          </Button>
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => confirmDelete(category.id)}
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
  return (
    <>
      <Container className="mt-10 mb-10" fluid>
        <Row className="mt-10 mb-10">
          <Col className="mt-4 mb-4 ">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">Categories</h2>
                  </div>
                  <div className="col text-right">
                    <Button color="primary" onClick={handleDisplay} size="sm">
                      Create
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <TableAntd columns={columns} dataSource={categories} />
              <Modal
                title={modalContent.create ? "Create" : "Update"}
                visible={isModalVisible}
                onOk={modalContent.create ? handleCreate : handleUpdate}
                onCancel={handleCancel}
                okText={modalContent.create ? "Create" : "Update"}
              >
                <Form>
                  {modalContent.create ? null : (
                    <FormGroup>
                      <Label for="id">Id</Label>
                      <Input
                        disabled
                        type="text"
                        name="id"
                        id="id"
                        placeholder=""
                        value={modalContent.id}
                        onChange={handleChange}
                        plaintext={true}
                      />
                    </FormGroup>
                  )}
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter name of category"
                      value={modalContent.name}
                      onChange={handleChange}
                    />
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
