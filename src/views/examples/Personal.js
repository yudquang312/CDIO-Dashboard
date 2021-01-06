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
const FormPS = (props) => {
  const [content, setContent] = useState({
    Address1: "da nang",
    Address2: "nang da",
    Benefit_Plans: 2,
    City: "dn",
    Drivers_License: "1",
    Email: "1",
    Employee_ID: 1,
    Ethnicity: "Kinh",
    First_Name: "Tuan",
    Gender: true,
    Last_Name: "Huynh",
    Marital_Status: "single",
    Middle_Initial: "1",
    Phone_Number: "1",
    Shareholder_Status: true,
    Social_Security_Number: "1",
    State: "vn",
    Zip: 5500,
  });

  const [personals, setPersonals] = React.useState([]);
  const [option, setOption] = React.useState([]);
  const fetchOption = async () => {
    const {
      data: { benefitPlans },
    } = await axios.get("http://localhost:6969/hr/benefit-plans");
    setOption(benefitPlans);
  };
  const fetchData = async () => {
    const {
      data: { personals },
    } = await axios.get("http://localhost:6969/hr/personals/");
    setPersonals(personals);
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
    axios.post("http://localhost:6969/hr/personals", content).then(() => {
      fetchData();
    });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:6969/hr/personals/" + content.Employee_ID, content)
      .then(() => {
        fetchData();
      });
  };
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete("http://localhost:6969/hr/personals/" + content.Employee_ID)
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
                <h3 className=" mb-0">Personals</h3>
              </CardHeader>
              <Table
                className="align-items-center table-flush"
                responsive
                size="sm"
              >
                <thead className="thead-light">
                  <tr>{fillHeader(personals)}</tr>
                </thead>
                <tbody>{fillData(personals)}</tbody>
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
                    <Label for="Employee_ID">Employee_ID</Label>
                    <Input
                      type="number"
                      name="Employee_ID"
                      id="Employee_ID"
                      placeholder=""
                      onChange={(e) => handleChange(e)}
                      value={content.Employee_ID}
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
                      {option.map((o) => (
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

export default FormPS;
