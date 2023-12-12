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
        <PieChartComponent data={props.data} />
      </center>
    }
    actions={[<EyeOutlined key="view" />, <EditOutlined key="edit" />]}
  >
    <Meta title={props.title} description={props.description} />
  </Card>
);

WalletComponent.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object,
  description: PropTypes.string,
};

export default WalletComponent;
