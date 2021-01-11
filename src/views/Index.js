import React from "react";
import axios from "axios";
// import { Bar } from "react-chartjs-2";
import {
  // Button,
  // Card,
  // CardHeader,
  // CardBody,
  // Row,
  // Col,
  Container,
} from "reactstrap";
// import { Empty } from "antd";

import { ORDER_ENDPOINT } from "../constants/endpoint.js";
import Header from "components/Headers/Header.js";
import SalesValue from "views/examples/DinoDashboard/SalesValue.js";
const Index = (props) => {
  const [data, setData] = React.useState([]);
  const fetchData = async () => {
    const { data } = await axios.get(ORDER_ENDPOINT);
    setData(data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  React.useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Header data={data} />
      <Container className="mt-4 pb-4" fluid>
        {/* <Empty /> */}
        <SalesValue data={data} />
      </Container>
    </>
  );
};

export default Index;
