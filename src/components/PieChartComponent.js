import React from "react";
import { Chart } from "react-google-charts";
import PropTypes from "prop-types";

const PieChartComponent = (props) => {
  const options = {
    id: props.id ? props.id : "",
    is3D: true,
    legend: props.legend ? "right" : "none",
    backgroundColor: "none",
  };

  function formatForChart(investment) {
    const result = [["Name", "Value"]];
    for (const i in investment) {
      result.push([investment[i].name, investment[i].value]);
    }
    return result;
  }

  return (
    <Chart
      chartType="PieChart"
      data={formatForChart(props.data[0])}
      options={options}
      width={props.width ? props.width : "200px"}
      height={props.height ? props.height : "200px"}
    />
  );
};

PieChartComponent.propTypes = {
  id: PropTypes.number,
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default PieChartComponent;
