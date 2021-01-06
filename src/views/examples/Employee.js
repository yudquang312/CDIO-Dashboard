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
  Table,
  CardHeader,
} from "reactstrap";
// import Header from "components/Headers/Header.js";

const stickyColumnAtRight = { right: 0, position: "sticky" };

const FormEM = (props) => {
  const [content, setContent] = useState({
    Employee_Number: 0,
    First_Name: "Huynh",
    Last_Name: "Tuan",
    Paid_Last_Year: 0,
    Paid_To_Date: 0,
    PayRates_id: 0,
    Pay_Rate: "",
    SSN: 0,
    Vacation_Days: 0,
    idEmployee: "",
  });

  const [employees, setEmployees] = React.useState([]);
  const [option, setOption] = React.useState([]);
  const fetchData = async () => {
    const {
      data: { employees },
    } = await axios.get("http://localhost:6969/payroll/employees/");
    setEmployees(employees);
  };
  const fetchOption = async () => {
    const {
      data: { payRates },
    } = await axios.get("http://localhost:6969/payroll/pay-rates");
    setOption(payRates.map((payRate) => payRate.idPay_Rates));
  };
  React.useEffect(() => {
    fetchData();
    fetchOption();
  }, []);

  const handleEdit = (index, data) => {
    setContent({ ...data[index] });
  };
  const handleChange = (e) => {
    setContent({ ...content, [e.target.id]: e.target.value });
  };
  const handleAdd = (e) => {
    e.preventDefault();
    axios.post("http://localhost:6969/payroll/employees/", content).then(() => {
      fetchData();
    });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        "http://localhost:6969/payroll/employees/" + content.idEmployee,
        content
      )
      .then(() => {
        fetchData();
      });
  };
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete("http://localhost:6969/payroll/employees/" + content.idEmployee)
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
    header.push(
      <th key={Math.random() * Math.random()} style={stickyColumnAtRight}>
        Edit
      </th>
    ); //redundancy
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
        <td
          key={Math.random() * Math.random()}
          style={{ ...stickyColumnAtRight, backgroundColor: "#ffffff" }}
        >
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
      <Container fluid className="pb-2">
        <Row className="mt-4">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className=" mb-0">Employees</h3>
              </CardHeader>
              <Table
                className="align-items-center table-flush"
                responsive
                size="sm"
              >
                <thead className="thead-light">
                  <tr>{fillHeader(employees)}</tr>
                </thead>
                <tbody>{fillData(employees)}</tbody>
              </Table>
            </Card>
          </div>
        </Row>
        <Row className="mt-4 mb-4">
          <Col>
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Employee_Number">Employee_Number</Label>
                    <Input
                      type="number"
                      name="Employee_Number"
                      id="Employee_Number"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Employee_Number || 0}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="idEmployee">idEmployee</Label>
                    <Input
                      type="number"
                      name="idEmployee"
                      id="idEmployee"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.idEmployee}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Last_Name">Last_Name</Label>
                    <Input
                      type="text"
                      name="Last_Name"
                      id="Last_Name"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Last_Name || ""}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="First_Name">First_Name</Label>
                    <Input
                      type="text"
                      name="First_Name"
                      id="First_Name"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.First_Name || ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="PayRates_id">PayRates_id</Label>
                    <Input
                      type="select"
                      name="PayRates_id"
                      id="PayRates_id"
                      value={content.PayRates_id}
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                    >
                      {option.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Pay_Rate">Pay_Rate</Label>
                    <Input
                      type="number"
                      name="Pay_Rate"
                      id="Pay_Rate"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Pay_Rate || 0}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="SSN">SSN</Label>
                    <Input
                      type="number"
                      name="SSN"
                      id="SSN"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.SSN || 0}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Vacation_Days">Vacation_Days</Label>
                    <Input
                      type="number"
                      name="Vacation_Days"
                      id="Vacation_Days"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Vacation_Days || 0}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Paid_To_Date">Paid_To_Date</Label>
                    <Input
                      type="number"
                      name="Paid_To_Date"
                      id="Paid_To_Date"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Paid_To_Date || 0}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Paid_Last_Year">Paid_Last_Year</Label>
                    <Input
                      type="number"
                      name="Paid_Last_Year"
                      id="Paid_Last_Year"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Paid_Last_Year || 0}
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

export default FormEM;
