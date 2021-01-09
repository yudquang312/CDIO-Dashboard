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
import { TYPE_PRODUCT_ENDPOINT } from "../../../constants/endpoint.js";

const END_POINT = TYPE_PRODUCT_ENDPOINT;

export default function Styles() {
  const [types, setTypes] = React.useState([]);
  const [modalContent, setModalContent] = React.useState({
    create: false,
    _id: "",
    name: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchData = async () => {
    const { data } = await axios.get(END_POINT);
    console.log(data);
    setTypes(data);
  };

  const handleDisplay = () => {
    setModalContent({
      create: true,
      _id: "",
      name: "",
    });
    setIsModalVisible(true);
  };

  const showModal = (type) => () => {
    console.log(type);

    setIsModalVisible(true);
    setModalContent({
      create: false,
      ...type,
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
      .put(END_POINT + modalContent._id, modalContent)
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
    });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    console.log(isModalVisible);
  }, [isModalVisible]);

  const confirmDelete = (id) => {
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
  };

  const cancel = (e) => {};

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
      render: (text, type) => (
        <Space size="small">
          <Button onClick={showModal(type)} size="sm">
            Update
          </Button>
          <Popconfirm
            title="Are you sure to delete this type?"
            onConfirm={() => confirmDelete(type._id)}
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
                    <h3 className="mb-0">Types</h3>
                  </div>
                  <div className="col text-right">
                    <Button color="primary" onClick={handleDisplay} size="sm">
                      Create
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <TableAntd columns={columns} dataSource={types} />
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
                </Form>
              </Modal>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
