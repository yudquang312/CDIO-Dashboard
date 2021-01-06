import React from "react";
import { Card, CardHeader, Table, Container, Row } from "reactstrap";

const CustomTable = ({ data, title = "Title" }) => {
  // console.log(data);
  const fillHeader = (data) => {
    const header = [];
    for (let key in data[0]) {
      header.push(
        <th scope="column" key={Math.random() * Math.random()}>
          {key}
        </th>
      );
    }
    // header.push(<th>Delete</th>); //redundancy
    return header;
  };

  const fillData = (data) => {
    const trs = [];
    for (let dt of data) {
      const tds = [];
      for (let key in dt) {
        tds.push(<td key={Math.random() * Math.random()}>{dt[key] + ""}</td>);
      }
      // tds.push(<Button>Delete</Button>);
      trs.push(<tr key={Math.random() * Math.random()}>{tds}</tr>);
    }
    return trs;
  };
  return (
    <>
      {/* Dark table */}
      <Row className="mt-5">
        <div className="col">
          <Card className="shadow">
            <CardHeader className="bg-transparent border-0">
              <h3 className=" mb-0">{title}</h3>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>{fillHeader(data)}</tr>
              </thead>
              <tbody>{fillData(data)}</tbody>
            </Table>
          </Card>
        </div>
      </Row>
    </>
  );
};

export default CustomTable;
