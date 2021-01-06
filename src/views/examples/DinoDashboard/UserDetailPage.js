import React from "react";
import { useParams } from "react-router-dom";
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
  Modal,
  // message,
  // Popconfirm,
  Select,
  Tag,
  Upload,
  // Form as FormAntd,
} from "antd";

// import { USER_ENDPOINT } from "../../../constants/endpoint";

const ENDPOINT = "http://localhost:3001/user/admin/";

export default function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = React.useState({ product: [] });
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const fetchData = async (endpoint, setState) => {
    const { data } = await axios.get(endpoint);
    console.log(endpoint, data);
    setState(data);
  };

  React.useEffect(() => {
    fetchData(ENDPOINT + userId, setUser);
  }, []);

  const onCancel = () => {
    setIsModalVisible(false);
  };

  const onPreview = async () => {
    setIsModalVisible(true);
  };
  const fillFileList = () =>
    user.avatar
      ? [
          {
            uid: Math.random() * 10000 + "",
            name: "image.png",
            status: "done",
            url: user.avatar,
          },
        ]
      : [];

  return (
    <>
      <Container className="mt-10 mb-10" fluid>
        <Row className="mt-10 mb-10">
          <Col className="mt-4 mb-4 ">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h1 className="mb-0">User Detail</h1>
                  </div>
                </Row>
              </CardHeader>
              <Container fluid>
                <Form>
                  <FormGroup>
                    <div
                      style={{
                        width: 150,
                        height: 150,
                        backgroundImage: user.avatar
                          ? "url(" + user.avatar + ")"
                          : "",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        cursor: "pointer",
                      }}
                      onClick={onPreview}
                    ></div>
                    <Modal
                      title="Avatar"
                      visible={isModalVisible}
                      onOk={false}
                      okText={null}
                      onCancel={onCancel}
                      width={348}
                      footer={null}
                    >
                      {" "}
                      <div
                        style={{
                          width: 300,
                          height: 300,
                          backgroundImage: user.avatar
                            ? "url(" + user.avatar + ")"
                            : "",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                        }}
                      ></div>
                    </Modal>
                  </FormGroup>
                  <Row>
                    <Col sm={12} md={12} lg={6}>
                      <FormGroup>
                        <Label>Name</Label>
                        <Input defaultValue={user.name} disabled />
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={12} lg={6}>
                      <FormGroup>
                        <Label>Email</Label>
                        <Input defaultValue={user.email} disabled />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={12} lg={6}>
                      <FormGroup>
                        <Label>Gender</Label>
                        <Input
                          defaultValue={user.gender ? "Nam" : "Nữ"}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={12} lg={6}>
                      <FormGroup>
                        <Label>Phone Number</Label>
                        <Input defaultValue={user.phone} disabled />
                      </FormGroup>
                    </Col>
                  </Row>

                  <FormGroup>
                    <Label>Address</Label>
                    <Input
                      defaultValue={
                        user.address
                          ? user.address +
                            ", " +
                            user.wards +
                            ", " +
                            user.district +
                            ", " +
                            user.nation
                          : ""
                      }
                      disabled
                    />
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
