import React from "react";
import { Bar } from "react-chartjs-2";
import { Button, Card, CardHeader, CardBody, Row, Col } from "reactstrap";

function SalesValue({ data }) {
  const [option, setOption] = React.useState("day");
  const parseData = (labels, amountOrders, saleValues) => {
    return {
      labels: labels,
      datasets: [
        {
          label: "Total Orders",
          type: "bar",
          data: amountOrders,
          fill: false,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgba(255, 99, 132, 0.5)",
          yAxisID: "y-axis-2",
        },
        {
          label: "Sales Value",
          type: "bar",
          data: saleValues,
          fill: false,
          backgroundColor: "rgb(54, 162, 235)",
          borderColor: "rgba(54, 162, 235, 0.5)",
          yAxisID: "y-axis-1",
        },
      ],
    };
  };

  const transformData = (data, option = "year") => {
    const previousYear = (currentYear) => {
      return +currentYear - 1 + "";
    };
    const previousMonth = (currentMonth) => {
      if (currentMonth.slice(5, 7) === "01") {
        return `${+currentMonth.slice(0, 4) - 1}-${12}`;
      }
      return `${currentMonth.slice(0, 4)}-${+currentMonth.slice(5, 7) - 1}`;
    };
    const previousDay = (currentDay) => {
      return new Date(new Date(currentDay).getTime() - 1000 * 60 * 60 * 24)
        .toISOString()
        .slice(0, 10);
    };
    const options = {
      year: {
        slice: [0, 4],
        loop: 4,
        previous: previousYear,
      },
      month: {
        slice: [0, 7],
        loop: 13,
        previous: previousMonth,
      },
      day: {
        slice: [0, 10],
        loop: 31,
        previous: previousDay,
      },
    };
    const dates = [];
    const nowTime = new Date().toISOString().slice(...options[option].slice);
    dates.push([nowTime, 0, 0]);
    for (let i = 1; i < options[option].loop; i++) {
      dates.push([options[option].previous(dates[i - 1][0]), 0, 0]);
    }
    dates.reverse();
    // console.log("dates", dates);
    const value = data.reduce((obj, order) => {
      let key = order.dateOrder.slice(...options[option].slice);
      if (obj[key]) {
        obj[key][0] += 1;
        obj[key][1] += order.intoMoney;
      } else {
        obj[key] = [1, order.intoMoney];
      }
      return obj;
    }, {});
    // console.log(value);
    for (let date of dates) {
      if (value[date[0]]) {
        // console.log(value[date[0]]);
        date[1] = value[date[0]][0];
        date[2] = value[date[0]][1];
      }
    }
    const labels = dates.map(([label, value1, value2]) => label);
    const amountOrders = dates.map(([label, value1, value2]) => value1);
    const saleValues = dates.map(([label, value1, value2]) => value2);
    return parseData(labels, amountOrders, saleValues);
  };

  const options = {
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
          ticks: {
            beginAtZero: true,
          },
        },
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",
          gridLines: {
            drawOnArea: false,
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <Row>
      <Col>
        <Card>
          <CardHeader className="bg-transparent">
            <Row className="align-items-center">
              <Col>
                <h6 className="text-uppercase ls-1 mb-1">Overview</h6>
                <h2 className=" mb-0">Sales Value / Total Orders</h2>
              </Col>
              <Col className="text-right">
                <Button
                  color={option === "day" ? "primary" : null}
                  onClick={() => setOption("day")}
                  size={option === "day" ? "md" : "sm"}
                >
                  Day
                </Button>
                <Button
                  color={option === "month" ? "primary" : null}
                  onClick={() => setOption("month")}
                  size={option === "month" ? "md" : "sm"}
                >
                  Month
                </Button>
                <Button
                  color={option === "year" ? "primary" : null}
                  onClick={() => setOption("year")}
                  size={option === "year" ? "md" : "sm"}
                >
                  Year
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Bar data={transformData(data, option)} options={options} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default SalesValue;
