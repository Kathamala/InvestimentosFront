import React from "react";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import PropTypes from "prop-types";
import PieChartComponent from "./PieChartComponent";
const { Meta } = Card;

const WalletComponent = (props) => (
  <Card
    style={{
      width: 300,
    }}
    cover={
      <center>
        <PieChartComponent id={props.id} data={props.yearlyInvestments} />
      </center>
    }
    actions={[<EyeOutlined key="view" />, <EditOutlined key="edit" />]}
  >
    <Meta title={"Wallet " + props.id} description={"Goal: R$" + props.goal + " / Time to reach: " + props.timeToReachGoal + " years"} />
  </Card>
);

WalletComponent.propTypes = {
  id: PropTypes.number,
  goal: PropTypes.number,
  timeToReachGoal: PropTypes.number,
  yearlyInvestments: PropTypes.array,
};

export default WalletComponent;
