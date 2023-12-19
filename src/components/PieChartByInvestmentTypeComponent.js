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
    const result = [["Type", "Value"]];
    for (const i in investment) {
      //if investment type already exists in result add value to that entry, otherwise create a new entry
      var index = result.findIndex((item) => item[0] === investment[i].type);
      if (index !== -1) {
        result[index][1] += investment[i].value;
        continue;
      }
      result.push([investment[i].type, investment[i].value]);
    }
    return result;
  }

  return (
    <Chart
      chartType="PieChart"
      data={formatForChart(props.data[[props.data.length - 1]])}
      options={options}
      width={props.width ? props.width : "200px"}
      height={props.height ? props.height : "200px"}
    />
  );
};

PieChartComponent.propTypes = {
  id: PropTypes.number,
  data: PropTypes.array,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default PieChartComponent;
