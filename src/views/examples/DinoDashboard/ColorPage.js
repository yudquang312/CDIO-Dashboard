import React, { useState } from "react";
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
import { Modal, message, Popconfirm, Table as TableAntd, Space } from "antd";
import formatDate from "../../../utils/index.js";
import { COLOR_ENDPOINT } from "../../../constants/endpoint.js";

const END_POINT = COLOR_ENDPOINT;

export default function ColorPage() {
  const [colors, setColors] = React.useState([]);
  const [modalContent, setModalContent] = React.useState({
    create: false,
    _id: "",
    name: "",
    code: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchData = async () => {
    const { data } = await axios.get(END_POINT);
    console.log(data);
    setColors(data);
  };

  const handleDisplay = () => {
    setModalContent({
      create: true,
      _id: "",
      name: "",
      code: "",
    });
    setIsModalVisible(true);
  };

  const showModal = (color) => () => {
    console.log(color);

    setIsModalVisible(true);
    setModalContent({
      ...modalContent,
      ...color,
    });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setModalContent({ ...modalContent, [e.target.id]: e.target.value });
  };

  const handleCreate = async () => {
    axios
      .post(END_POINT, modalContent)
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
    axios
      .put(END_POINT + modalContent.id, modalContent)
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
      _id: "",
      name: "",
      code: "",
    });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

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

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (id) => id.slice(-8),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Color",
      key: "color",
      align: "center",
      render: (text, color) => (
        <div
          style={{
            position: "absolute",
            width: "20px",
            height: "20px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            backgroundColor: color.code,
            borderRadius: "50%",
            // color: "transparent",
          }}
        ></div>
      ),
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
      render: (text, color) => (
        <Space size="small">
          <Button onClick={showModal(color)} size="sm">
            Update
          </Button>
          <Popconfirm
            title="Are you sure to delete this color?"
            onConfirm={() => confirmDelete(color._id)}
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
      {/* <Header></Header> */}
      <Container className="mt-10 mb-10" fluid>
        <Row className="mt-10 mb-10">
          <Col className="mt-4 mb-4 ">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">Colors</h2>
                  </div>
                  <div className="col text-right">
                    <Button color="primary" onClick={handleDisplay} size="sm">
                      Create
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <TableAntd columns={columns} dataSource={colors} />
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
                      <Label for="_id">Id</Label>
                      <Input
                        disabled
                        type="text"
                        name="_id"
                        id="_id"
                        placeholder=""
                        value={modalContent._id}
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
                      placeholder="Enter name of color"
                      value={modalContent.name}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="code">Code</Label>
                    <Input
                      type="text"
                      name="code"
                      id="code"
                      placeholder="Enter code of color"
                      value={modalContent.code}
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
