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
  Table,
  Card,
  CardHeader,
} from "reactstrap";

import { Modal, message, Popconfirm } from "antd";
// import Header from "components/Headers/Header.js";
import formatDate from "../../../utils/index.js";

import { COLOR_ENDPOINT } from "../../../constants/endpoint";

const END_POINT = COLOR_ENDPOINT;

export default function ColorPage() {
  const [colors, setColors] = React.useState([]);
  const [modalContent, setModalContent] = React.useState({
    create: false,
    id: "",
    name: "",
    code: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  // const _idRef = React.useRef(null);
  // const nameRef = React.useRef(null);
  // const codeRef = React.useRef(null);

  const fetchData = async () => {
    const { data } = await axios.get(END_POINT);
    console.log(data);
    setColors(data);
  };

  const handleDisplay = () => {
    setModalContent({
      create: true,
      id: "",
      name: "",
      code: "",
    });
    setIsModalVisible(true);
  };

  const showModal = (index) => () => {
    console.log(index);
    console.log(colors[index]);
    setIsModalVisible(true);
    // _idRef.current.value = colors[index]._id;
    // nameRef.current.value = colors[index].name;
    // codeRef.current.value = colors[index].code;
    setModalContent((state) => ({
      id: colors[index]._id,
      name: colors[index].name,
      code: colors[index].code,
    }));
  };

  const handleChange = (e) => {
    // console.log(e.target.value);
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
    // setIsModalVisible(false);
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
      id: "",
      name: "",
      code: "",
    });
  };

  // React.useEffect(() => {
  //   const ids = colors.map(({ _id }) => _id);
  //   console.log(ids);
  //   const arr = ids.map((id) => axios.get(COLOR_ENDPOINT + id));
  //   Promise.all(arr).then((values) => {
  //     console.log(values.map(({ data }) => data));
  //   });
  // });

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
  const fillDataInToTable = () => {
    let res = [];
    for (let [index, color] of colors.entries()) {
      res.push(
        <tr key={Math.random() * 1000}>
          <th scope="row">{index + 1}</th>
          <td>{color._id}</td>
          <td>{color.name}</td>
          <td>{color.code}</td>
          <td
            style={{
              position: "relative",
            }}
          >
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
          </td>
          <td>{formatDate(color.createdAt)}</td>
          <td>{formatDate(color.updatedAt)}</td>
          <td>
            <Button onClick={showModal(index)} size="sm">
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
          </td>
        </tr>
      );
    }
    return res;
  };
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
                    <h3 className="mb-0">Colors</h3>
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
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Code</th>
                    <th scope="col">Color</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>{fillDataInToTable()}</tbody>
              </Table>
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
                        type="text"
                        name="id"
                        id="id"
                        placeholder=""
                        // innerRef={_idRef}
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
                      placeholder=""
                      // innerRef={nameRef}
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
                      placeholder=""
                      // innerRef={codeRef}
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
