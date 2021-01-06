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
const FormEmper = (props) => {
  const [empers, setEmpers] = React.useState([]);
  const [benefitPlans, setBenefitPlans] = React.useState([]);
  const [payRates, setPayRates] = React.useState([]);
  const [content, setContent] = useState({
    id: "",
    Employee_Number: 0,
    First_Name: "",
    Last_Name: "",
    Paid_Last_Year: 0,
    Paid_To_Date: 0,
    PayRates_id: 1,
    Pay_Rate: "",
    SSN: 0,
    Vacation_Days: 0,
    idEmployee: "",
    Address1: "",
    Address2: "",
    Benefit_Plans: 1,
    City: "",
    Drivers_License: "",
    Email: "",
    Employee_ID: 1,
    Ethnicity: "Kinh",
    Gender: true,
    Marital_Status: "single",
    Middle_Initial: "",
    Phone_Number: "",
    Shareholder_Status: true,
    Social_Security_Number: "",
    State: "Viet Nam",
    Zip: 5500,
  });

  const fetchData = async () => {
    const {
      data: { benefitPlans },
    } = await axios.get("http://localhost:6969/hr/benefit-plans");
    console.log(benefitPlans);
    const {
      data: { payRates },
    } = await axios.get("http://localhost:6969/payroll/pay-rates");
    console.log(payRates);
    const {
      data: { employees },
    } = await axios.get("http://localhost:6969/payroll/employees");
    const {
      data: { personals },
    } = await axios.get("http://localhost:6969/hr/personals");

    let temp = {};
    for (let key in personals[0]) {
      temp[key] = null;
    }
    for (let key in employees[0]) {
      temp[key] = null;
    }

    console.log(temp);
    let emp = {};
    for (let e of employees) {
      if (!emp[e.idEmployee]) {
        emp[e.idEmployee] = { ...e };
      }
    }
    // console.log(emp);
    for (let e of personals) {
      if (emp[e.Employee_ID]) {
        emp[e.Employee_ID] = { ...emp[e.Employee_ID], ...e };
      } else {
        emp[e.Employee_ID] = { ...e };
      }
    }
    // console.log(emp);

    let empArr = [];
    for (let id in emp) {
      empArr.push({ id: id, ...temp, ...emp[id] });
    }
    empArr = empArr.map((e) => {
      for (let key in e) {
        if (e[key] === null) {
          e[key] = "";
        }
      }
      return e;
    });
    console.table(empArr);
    setEmpers(
      empArr.map((e) => {
        delete e["Employee_ID"];
        delete e["idEmployee"];
        return e;
      })
    );
    setBenefitPlans(benefitPlans);
    setPayRates(payRates);
  };

  const [option, setOption] = React.useState([]);

  const handleChange = (e) => {
    console.log(e.target.id, e.target.value);
    setContent({ ...content, [e.target.id]: e.target.value });
  };

  const handleEdit = (index, data) => {
    console.log(data[index]);
    setContent({ ...data[index] });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:6969/payroll/employees", {
      ...content,
      idEmployee: content.id,
    });
    await axios.post("http://localhost:6969/hr/personals", {
      ...content,
      Employee_ID: content.id,
    });
    fetchData();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(
      "http://localhost:6969/payroll/employees/" + content.id,
      content
    );
    await axios.put(
      "http://localhost:6969/hr/personals/" + content.id,
      content
    );
    fetchData();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await axios.delete("http://localhost:6969/payroll/employees/" + content.id);
    await axios.delete("http://localhost:6969/hr/personals/" + content.id);
    fetchData();
  };
  const fillOption = async () => {
    const {
      data: { payRates },
    } = await axios.get("http://localhost:6969/payroll/pay-rates");
    console.log(payRates);
    setOption(payRates.map((payRate) => payRate.idPay_Rates));
  };

  React.useEffect(() => {
    fetchData();
    fillOption();
  }, []);

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
      <Container className="pb-2" fluid>
        <Row className="mt-4">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className=" mb-0">Em-Per</h3>
              </CardHeader>
              <Table
                className="align-items-center table-flush"
                responsive
                size="sm"
              >
                <thead className="thead-light">
                  <tr>{fillHeader(empers)}</tr>
                </thead>
                <tbody>{fillData(empers)}</tbody>
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
                    <Label for="id">Employee_ID</Label>
                    <Input
                      type="number"
                      name="id"
                      id="id"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.id}
                    />
                  </FormGroup>
                </Col>
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
              </Row>
              <Row>
                <Col md={4} sm={6} xs={12}>
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
                <Col md={4} sm={6} xs={12}>
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
                <Col md={4} sm={6} xs={12}>
                  <FormGroup>
                    <Label for="Middle_Initial">MIDDLE_INITIAL</Label>
                    <Input
                      type="text"
                      name="Middle_Initial"
                      id="Middle_Initial"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Middle_Initial || ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={6} xs={12}>
                  <FormGroup>
                    <Label for="Address1">Address 1</Label>
                    <Input
                      type="text"
                      name="Address1"
                      id="Address1"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Address1 || ""}
                    />
                  </FormGroup>
                </Col>
                <Col sm={6} xs={12}>
                  <FormGroup>
                    <Label for="Address2">Address 2</Label>
                    <Input
                      type="text"
                      name="Address2"
                      id="Address2"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Address2 || ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={4} sm={6} xs={12}>
                  <FormGroup>
                    <Label for="City">City</Label>
                    <Input
                      type="text"
                      name="City"
                      id="City"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.City || ""}
                    />
                  </FormGroup>
                </Col>
                <Col md={4} sm={6} xs={12}>
                  <FormGroup>
                    <Label for="State">State</Label>
                    <Input
                      type="text"
                      name="State"
                      id="State"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.State || ""}
                    />
                  </FormGroup>
                </Col>
                <Col md={4} sm={6} xs={12}>
                  <FormGroup>
                    <Label for="Zip">Zip</Label>
                    <Input
                      type="text"
                      name="Zip"
                      id="Zip"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Zip}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={3} sm={6} xs={12}>
                  <FormGroup>
                    <Label for="Email">Email</Label>
                    <Input
                      type="text"
                      name="Email"
                      id="Email"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Email}
                    />
                  </FormGroup>
                </Col>
                <Col md={3} sm={6} xs={12}>
                  <FormGroup>
                    <Label for="Phone_Number">Phone_Number</Label>
                    <Input
                      type="text"
                      name="Phone_Number"
                      id="Phone_Number"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Phone_Number}
                    />
                  </FormGroup>
                </Col>
                <Col md={3} sm={6} xs={12}>
                  <FormGroup>
                    <Label for="Social_Security_Number">
                      Social_Security_Number
                    </Label>
                    <Input
                      type="text"
                      name="Social_Security_Number"
                      id="Social_Security_Number"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Social_Security_Number}
                    />
                  </FormGroup>
                </Col>
                <Col md={3} sm={6} xs={12}>
                  <FormGroup>
                    <Label for="Drivers_License">Drivers_License</Label>
                    <Input
                      type="text"
                      name="Drivers_License"
                      id="Drivers_License"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Drivers_License}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={3} sm={6} xs={12}>
                  <FormGroup>
                    <Label for="Marital_Status">Marital_Status</Label>
                    <Input
                      type="text"
                      name="Marital_Status"
                      id="Marital_Status"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Marital_Status}
                    />
                  </FormGroup>
                </Col>
                <Col md={3} sm={6} xs={12}>
                  <FormGroup>
                    <Label for="Ethnicity">Ethnicity</Label>
                    <Input
                      type="text"
                      name="Ethnicity"
                      id="Ethnicity"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Ethnicity}
                    />
                  </FormGroup>
                </Col>
                <Col md={2} sm={6} xs={12}>
                  <FormGroup>
                    <Label for="Shareholder_Status">Shareholder_Status</Label>
                    <Input
                      type="select"
                      name="Shareholder_Status"
                      id="Shareholder_Status"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Shareholder_Status}
                    >
                      <option value={false}>Non Shareholder</option>
                      <option value={true}>Shareholder</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={2} sm={6} xs={12}>
                  <FormGroup>
                    <Label for="Gender">Gender</Label>
                    <Input
                      type="select"
                      name="Gender"
                      id="Gender"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Gender}
                    >
                      <option value={false}>Female</option>
                      <option value={true}>Male</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={2} sm={6} xs={12}>
                  <FormGroup>
                    <Label for="Benefit_Plans">Benefit_Plans</Label>
                    <Input
                      type="select"
                      name="Benefit_Plans"
                      id="Benefit_Plans"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Benefit_Plans}
                    >
                      {benefitPlans.map((o) => (
                        <option
                          key={o.Benefit_Plan_ID}
                          value={o.Benefit_Plan_ID}
                        >
                          {o.Plan_Name}
                        </option>
                      ))}
                    </Input>
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
                      {payRates.map((o) => (
                        <option key={o.idPay_Rates} value={o.idPay_Rates}>
                          {o.Pay_Rate_Name}
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
                <Col sm={6} md={3}>
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
                <Col sm={6} md={3}>
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

                <Col sm={6} md={3}>
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
                <Col sm={6} md={3}>
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

export default FormEmper;
