import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  Card,
  CardHeader,
} from 'reactstrap';
import { GET_BOOK_NOTIFICATION, SEEN_NOTIFICATION } from '../../../query/notification';
import { mutateData, queryData } from '../../../common';

import {
  message,
  Modal,
  // message,
  // Popconfirm,
  // Select,
  // Tag,
  // Upload,
  // Form as FormAntd,
} from 'antd';
import Image from './Image';
import TextArea from 'antd/lib/input/TextArea';
import { CREATE_UNIQUE_BOOK } from 'query/uniqueBook';
import { UPDATE_UNIQUE_BOOK } from 'query/uniqueBook';

export default function NotificationDetail() {
  const { id } = useParams();
  const [notification, setNotification] = React.useState(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const fetchData = async () => {
    queryData(GET_BOOK_NOTIFICATION, { id })
      .then(({ data: { notificationBookOfAdmin } }) => {
        console.log(notificationBookOfAdmin);
        setNotification(notificationBookOfAdmin);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    mutateData(SEEN_NOTIFICATION, { id })
      .then(({ data }) => {
        console.log('success');
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  React.useEffect(() => {
    fetchData();
  }, [id]);

  const onCancel = () => {
    setIsModalVisible(false);
  };

  const onPreview = async () => {
    setIsModalVisible(true);
  };

  const handleClick = () => {
    const data = {
      name: notification.data.name,
      images: notification.data.images,
      year: notification.data.year,
      numberOfReprint: notification.data.numberOfReprint,
      publisher: notification.data.publisher,
      author: notification.data.author,
      category: notification.data.category.id,
      description: notification.data.description,
      unsignedName: notification.data.unsignedName,
      author: notification.data.author,
    };
    if (notification.uniqueBook) {
      mutateData(UPDATE_UNIQUE_BOOK, {
        dataUpdate: data,
        id: notification.uniqueBook.id,
      })
        .then(({ data }) => message.success('Cập nhật thành công'))
        .catch((err) => message.error('Cập nhật thất bại'));
    } else {
      mutateData(CREATE_UNIQUE_BOOK, {
        dataCreate: data,
      })
        .then(({ data }) => message.success('Thêm mới thành công'))
        .catch((err) => message.error('Thêm mới thất bại'));
    }
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
                    <h2 className="mb-0">Notification Detail</h2>
                  </div>
                </Row>
              </CardHeader>
              {notification && (
                <Container fluid>
                  {notification.uniqueBook && (
                    <Row>
                      <Col sm={6} md={6} lg={6}>
                        <h4
                          style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                          }}
                        >
                          Sách trong DB
                        </h4>
                      </Col>
                      <Col sm={6} md={6} lg={6}>
                        <h4
                          style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                          }}
                        >
                          Sách mới thêm
                        </h4>
                      </Col>
                    </Row>
                  )}
                  <Row>
                    <Col
                      xs={notification.uniqueBook ? '6' : '8'}
                      md={{
                        size: notification.uniqueBook ? 6 : 8,
                        offset: notification.uniqueBook ? 0 : 2,
                      }}
                    >
                      <Row>
                        <Col sm={12} md={12} lg={12}>
                          <FormGroup>
                            <Label>Hình ảnh</Label>
                            <div>
                              {notification.data.images.map((image, index) => (
                                <Image imageUrl={image} key={Math.random() * 1000 + ''} />
                              ))}
                            </div>
                          </FormGroup>
                        </Col>
                        <Col sm={12} md={12} lg={12}>
                          <FormGroup>
                            <Label>Name</Label>
                            <Input defaultValue={notification.data.name} disabled />
                          </FormGroup>
                        </Col>

                        <Col sm={12} md={12} lg={12}>
                          <FormGroup>
                            <Label>Description</Label>
                            <TextArea
                              autoSize={{
                                minRows: 2,
                                maxRows: 6,
                              }}
                              defaultValue={notification.data.description}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col sm={12} md={12} lg={12}>
                          <FormGroup>
                            <Label>Category</Label>
                            <Input defaultValue={notification.data.category.name} disabled />
                          </FormGroup>
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                          <FormGroup>
                            <Label>Author</Label>
                            <Input defaultValue={notification.data.author} disabled />
                          </FormGroup>
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                          <FormGroup>
                            <Label>Publisher</Label>
                            <Input defaultValue={notification.data.publisher} disabled />
                          </FormGroup>
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                          <FormGroup>
                            <Label>Year</Label>
                            <Input defaultValue={notification.data.year} disabled />
                          </FormGroup>
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                          <FormGroup>
                            <Label>Number Of Reprint</Label>
                            <Input defaultValue={notification.data.numberOfReprint} disabled />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                    {notification.uniqueBook && (
                      <Col xs="6">
                        <Row>
                          <Col sm={12} md={12} lg={12}>
                            <FormGroup>
                              <Label>Hình ảnh</Label>
                              <div>
                                {notification.uniqueBook.images.map((image, index) => (
                                  <Image imageUrl={image} key={Math.random() * 1000 + ''} />
                                ))}
                              </div>
                            </FormGroup>
                          </Col>
                          <Col sm={12} md={12} lg={12}>
                            <FormGroup>
                              <Label>Name</Label>
                              <Input defaultValue={notification.uniqueBook.name} disabled />
                            </FormGroup>
                          </Col>
                          <Col sm={12} md={12} lg={12}>
                            <FormGroup>
                              <Label>Description</Label>
                              <TextArea
                                autoSize={{
                                  minRows: 2,
                                  maxRows: 6,
                                }}
                                defaultValue={notification.uniqueBook.description}
                                disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col sm={12} md={12} lg={12}>
                            <FormGroup>
                              <Label>Category</Label>
                              <Input
                                defaultValue={notification.uniqueBook.category.name}
                                disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col sm={12} md={6} lg={6}>
                            <FormGroup>
                              <Label>Author</Label>
                              <Input defaultValue={notification.uniqueBook.author} disabled />
                            </FormGroup>
                          </Col>
                          <Col sm={12} md={6} lg={6}>
                            <FormGroup>
                              <Label>Publisher</Label>
                              <Input defaultValue={notification.uniqueBook.publisher} disabled />
                            </FormGroup>
                          </Col>
                          <Col sm={12} md={6} lg={6}>
                            <FormGroup>
                              <Label>Year</Label>
                              <Input defaultValue={notification.uniqueBook.year} disabled />
                            </FormGroup>
                          </Col>
                          <Col sm={12} md={6} lg={6}>
                            <FormGroup>
                              <Label>Number Of Reprint</Label>
                              <Input
                                defaultValue={notification.uniqueBook.numberOfReprint}
                                disabled
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                    )}
                  </Row>
                  <Row>
                    <Col
                      xs={notification.uniqueBook ? '12' : '8'}
                      md={{
                        size: notification.uniqueBook ? 12 : 8,
                        offset: notification.uniqueBook ? 0 : 2,
                      }}
                    >
                      <FormGroup>
                        <Button
                          onClick={() => (window.location.href = '/admin/manage-notification')}
                        >
                          Hủy
                        </Button>
                        <Button onClick={handleClick}>
                          {notification.uniqueBook ? 'Cập nhật' : 'Thêm mới'}
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Container>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
