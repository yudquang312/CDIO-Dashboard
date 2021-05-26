import React from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Col,
    Row,
    Card,
    CardHeader,
    Button,
    Input,
} from 'reactstrap';
import { queryData } from '../../../common';
import { Table as TableAntd, Popconfirm, message, Space, Tag } from 'antd';
import formatDate from '../../../utils/index.js';
import { GET_BOOK_NOTIFICATIONS } from '../../../query/notification';

export default function NotificationPage() {
    const [notifications, setNotifications] = React.useState([]);
    const [filter, setFilter] = React.useState('');

    const fetchData = async () => {
        queryData(GET_BOOK_NOTIFICATIONS)
            .then(({ data: { notificationsBookOfAdmin } }) => {
                console.log(notificationsBookOfAdmin);
                setNotifications(notificationsBookOfAdmin);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    function cancel(e) {}
    function confirmDelete(id) {
        message.error('Delete failed.');
        // axios
        //   .delete("http://localhost:3001/user/delete/" + id)
        //   .then((res) => {
        //     console.log(res);
        //     message.success("Delete successful.");
        //     fetchData();
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     message.error("Delete failed.");
        //   });
    }
    const seenTag = {
        ADMIN: 'warning',
        STORE: 'processing',
        MEMBER: 'success',
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (id) => (
                <Link to={'/admin/manage-notification/' + id}>
                    {id.slice(-8)}
                </Link>
            ),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Seen',
            dataIndex: 'seen',
            key: 'seen',
            render: (seen) => (
                <Tag color={seen ? 'success' : 'warning'}>
                    {seen ? 'Đã xem' : 'Chưa xem'}
                </Tag>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => formatDate(createdAt),
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (updatedAt) => formatDate(updatedAt),
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 45,
            render: (text, notification) => (
                <Space size="small">
                    <Link to={'/admin/manage-notification/' + notification.id}>
                        <Button size="sm">View</Button>
                    </Link>
                </Space>
            ),
        },
    ];
    // const filterCallback = (element) => {
    //     return (
    //         element.id.toLowerCase().includes(filter) ||
    //         element.email.toLowerCase().includes(filter) ||
    //         element.name.toLowerCase().includes(filter)
    //     );
    // };

    return (
        <>
            <Container className="mt-10 mb-10" fluid>
                <Row className="mt-10 mb-10">
                    <Col className="mt-4 mb-4 ">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h2 className="mb-0">Notifications</h2>
                                    </div>
                                    {/* <div className="col">
                                        <Input
                                            type="text"
                                            placeholder="Enter id or name to find"
                                            id="filterName"
                                            value={filter}
                                            onChange={(e) =>
                                                setFilter(e.target.value)
                                            }
                                        ></Input>
                                    </div> */}
                                </Row>
                            </CardHeader>
                            <TableAntd
                                columns={columns}
                                dataSource={notifications}
                            />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
