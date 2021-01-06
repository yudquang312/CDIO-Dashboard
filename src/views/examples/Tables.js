/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import axios from "axios";
// reactstrap components
import { Card, CardHeader, Table, Container, Row } from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import CustomTable from "./CustomTable";

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      personals: [],
      benefitPlans: [],
      users: [],
      payRates: [],
      jobHistories: [],
      employments: [],
      merge: [],
    };
  }

  async fetchData() {
    const {
      data: { employees },
    } = await axios.get("http://localhost:6969/payroll/employees");
    const {
      data: { personals },
    } = await axios.get("http://localhost:6969/hr/personals");
    const {
      data: { benefitPlans },
    } = await axios.get("http://localhost:6969/hr/benefit-plans");
    const {
      data: { users },
    } = await axios.get("http://localhost:6969/payroll/users");
    const {
      data: { payRates },
    } = await axios.get("http://localhost:6969/payroll/pay-rates");
    const {
      data: { jobHistories },
    } = await axios.get("http://localhost:6969/hr/job-histories");
    const {
      data: { employments },
    } = await axios.get("http://localhost:6969/hr/employments");
    // console.table(employees);
    // console.table(personals);
    // console.table(benefitPlans);
    // console.table(users);
    // console.table(payRates);
    // console.table(jobHistories);
    // console.table(employments);
    this.setState({
      employees: [...employees],
      personals: [...personals],
      benefitPlans: [...benefitPlans],
      users: [...users],
      payRates: [...payRates],
      jobHistories: [...jobHistories],
      employments: [...employments],
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const {
      employees,
      personals,
      benefitPlans,
      users,
      jobHistories,
      employments,
      payRates,
    } = this.state;
    // console.table(employees);
    // console.table(personals);

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
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <CustomTable data={employees} title="Employees"></CustomTable>
          <CustomTable data={personals} title="Personals"></CustomTable>
          <CustomTable data={empArr} title="Employees Merged"></CustomTable>
          <CustomTable data={payRates} title="Pay Rates"></CustomTable>
          <CustomTable data={benefitPlans} title="Benefit Plans"></CustomTable>
          <CustomTable data={employments} title="Employments"></CustomTable>
          <CustomTable data={users} title="Users"></CustomTable>
          <CustomTable data={jobHistories} title="Job Histories"></CustomTable>
        </Container>
      </>
    );
  }
}

export default Tables;
