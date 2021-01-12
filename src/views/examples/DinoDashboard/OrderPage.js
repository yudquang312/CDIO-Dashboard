import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Container, Col, Row, Button, Card, CardHeader } from "reactstrap";

import { Table as TableAntd, Typography, Tag } from "antd";
// import Header from "components/Headers/Header.js";
import formatDate from "../../../utils/index.js";
import formatCurrency from "../../../utils/formatCurrency.js";

import { ORDER_ENDPOINT } from "../../../constants/endpoint";
import { GlobalState } from "globalState.js";

const END_POINT = ORDER_ENDPOINT;

export default function UserPage() {
	const [orders, setOrders] = React.useState([]);
	const state = useContext(GlobalState);
	const [token] = state.token;
	const [loading, setLoading] = state.loading;
	const fetchData = async (endpoint, setState) => {
		setLoading(true);
		const { data } = await axios.get(endpoint, {
			headers: { Authorization: token },
		});
		console.log(data);
		setState(data);
		setLoading(false);
	};

	React.useEffect(() => {
		if (token) fetchData(END_POINT + "?limit=100", setOrders);
	}, [token]);

	const typeOfPayment = {
		0: "Trực tiếp",
		1: "Online",
	};
	const statusTag = {
		"-1": { text: "Đang chờ xác nhận", color: "warning" },
		0: { text: "Đang chờ lấy hàng", color: "processing" },
		1: { text: "Đang giao", color: "processing" },
		2: { text: "Đã giao", color: "success" },
	};

	const columns = [
		{
			title: "ID",
			dataIndex: "_id",
			key: "_id",
			fixed: "left",
			width: 110,
			render: (id) => (
				<Typography.Text strong>{id.slice(-8)}</Typography.Text>
			),
		},
		{
			title: "Date orders",
			dataIndex: "dateOrder",
			key: "dateOrder",
			width: 170,
			render: (date) => formatDate(date),
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			width: 160,
			render: (status) => (
				<Tag color={statusTag[status].color}>
					{statusTag[status].text}
				</Tag>
			),
		},
		{
			title: "Payment",
			dataIndex: "typePayment",
			key: "typePayment",
			width: 100,
			render: (type) => typeOfPayment[type],
		},
		{
			title: "Fee Ship",
			dataIndex: "shipMoney",
			key: "shipMoney",
			align: "right",
			width: 120,
			render: (money) => formatCurrency(money),
		},
		{
			title: "Price",
			dataIndex: "intoMoney",
			key: "intoMoney",
			width: 120,
			align: "right",
			render: (money) => formatCurrency(money),
		},
		{
			title: "Total",
			dataIndex: "total",
			key: "total",
			width: 120,
			align: "right",
			render: (money) => formatCurrency(money),
		},
		{
			title: "User Name",
			dataIndex: "user",
			key: "name",
			width: 150,
			render: (user) => user?.name,
		},
		{
			title: "Email",
			dataIndex: "user",
			key: "email",
			width: 200,
			render: (user) => user?.email,
		},
		{
			title: "Address",
			dataIndex: "address",
			key: "address",
		},
		// {
		//   title: "Created At",
		//   dataIndex: "createdAt",
		//   key: "createdAt",
		//   render: (createdAt) => formatDate(createdAt),
		// },
		// {
		//   title: "Updated At",
		//   dataIndex: "updatedAt",
		//   key: "updatedAt",
		//   render: (updatedAt) => formatDate(updatedAt),
		// },
		{
			title: "Action",
			key: "action",
			fixed: "right",
			width: 80,
			render: (text, order) => (
				<Link to={"/admin/manage-order/" + order._id}>
					<Button size="sm">View</Button>
				</Link>
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
										<h3 className="mb-0">Orders</h3>
									</div>
								</Row>
							</CardHeader>
							<TableAntd
								columns={columns}
								dataSource={orders}
								scroll={{ x: 1920, y: 700 }}
							/>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}
