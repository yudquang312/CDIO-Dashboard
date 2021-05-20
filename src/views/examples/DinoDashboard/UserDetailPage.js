import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardHeader,
} from "reactstrap";
import { GET_USERS_BY_ID } from "../../../query/user";
import { queryData } from "../../../common";

import {
  Modal,
  // message,
  // Popconfirm,
  // Select,
  // Tag,
  // Upload,
  // Form as FormAntd,
} from "antd";

export default function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = React.useState({ product: [] });
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const fetchData = async () => {
    queryData(GET_USERS_BY_ID, { id: userId }).then(({ data: { user } }) => {
      setUser(user);
    });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const onCancel = () => {
    setIsModalVisible(false);
  };

  const onPreview = async () => {
    setIsModalVisible(true);
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
                    <h2 className="mb-0">User Detail</h2>
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
                      defaultValue={user.address ? user.address : ""}
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
