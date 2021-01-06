import React, { useState } from "react";
import axios from "axios";
import CustomTable from "./CustomTable";

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
  Table,
  CardHeader,
} from "reactstrap";
import Header from "components/Headers/Header.js";

const FormBF = (props) => {
  const [benefitPlans, setBenefitPlans] = React.useState([]);
  const [content, setContent] = useState({
    Benefit_Plan_ID: "",
    Deductable: "",
    Percentage_CoPay: "",
    Plan_Name: "",
  });

  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:6969/hr/benefit-plans/");
    setBenefitPlans(data.benefitPlans);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    console.log(e.target.id, e.target.value);
    setContent({ ...content, [e.target.id]: e.target.value });
  };

  const handleEdit = (index, data) => {
    console.log(data[index]);
    setContent({ ...data[index] });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:6969/hr/benefit-plans/add", content)
      .then(() => {
        fetchData();
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:6969/hr/benefit-plans/delete", {
        Benefit_Plan_ID: content.Benefit_Plan_ID,
      })
      .then(() => {
        fetchData();
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:6969/hr/benefit-plans/update", content)
      .then(() => {
        fetchData();
      });
  };
  const fillHeader = (data) => {
    const header = [];
    for (let key in data[0]) {
      header.push(
        <th scope="column" key={Math.random() * Math.random()}>
          {key}
        </th>
      );
    }
    header.push(<th key={Math.random() * Math.random()}>Edit</th>); //redundancy
    return header;
  };

  const fillData = (data) => {
    const trs = [];
    for (let [index, dt] of data.entries()) {
      const tds = [];
      for (let key in dt) {
        tds.push(<td key={Math.random() * Math.random()}>{dt[key] + ""}</td>);
      }
      tds.push(
        <td key={Math.random() * Math.random()}>
          <Button onClick={(e) => handleEdit(index, data)}>Edit</Button>
        </td>
      );
      // tds.push(<Button>Delete</Button>);
      trs.push(<tr key={Math.random() * Math.random()}>{tds}</tr>);
    }
    return trs;
  };

  return (
    <>
      <Container className="pb-2" fluid>
        <Row className="mt-4">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className=" mb-0">Benefit Plans</h3>
              </CardHeader>
              <Table
                className="align-items-center table-flush"
                responsive
                size="sm"
              >
                <thead className="thead-light">
                  <tr>{fillHeader(benefitPlans)}</tr>
                </thead>
                <tbody>{fillData(benefitPlans)}</tbody>
              </Table>
            </Card>
          </div>
        </Row>
        <Row className="mt-4">
          <Col>
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Benefit_Plan_ID">Benefit_Plan_ID</Label>
                    <Input
                      type="number"
                      name="Benefit_Plan_ID"
                      id="Benefit_Plan_ID"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Benefit_Plan_ID}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Plan_Name">Plan_Name</Label>
                    <Input
                      type="text"
                      name="Plan_Name"
                      id="Plan_Name"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Plan_Name}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Deductable">Deductable</Label>
                    <Input
                      type="number"
                      name="Deductable"
                      id="Deductable"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Deductable}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Percentage_CoPay">Percentage_CoPay</Label>
                    <Input
                      type="number"
                      name="Percentage_CoPay"
                      id="Percentage_CoPay"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Percentage_CoPay}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Button onClick={(e) => handleAdd(e)}>Add</Button>
              <Button onClick={(e) => handleUpdate(e)}>Update</Button>
              <Button onClick={(e) => handleDelete(e)}>Delete</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FormBF;
