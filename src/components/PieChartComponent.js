import React from "react";
import { Chart } from "react-google-charts";
import PropTypes from "prop-types";

const PieChartComponent = (props) => {
  const options = {
    title: props.title ? props.title : "",
    is3D: true,
    legend: props.legend ? "right" : "none",
  };

  return (
    <Chart
      chartType="PieChart"
      data={props.data}
      options={options}
      width={props.width ? props.width : "200px"}
      height={props.height ? props.height : "200px"}
    />
  );
};

PieChartComponent.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default PieChartComponent;
