import React, { useState } from "react";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import PropTypes from "prop-types";
import PieChartComponent from "./PieChartComponent";
import ModalComponent from "./ModalComponent";
import { formatMonetary } from "../utils";
const { Meta } = Card;

const WalletComponent = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible((oldState) => !oldState);
  };

  return (
    <>
      <Card
        style={{
          width: 300,
        }}
        cover={
          <center>
            <PieChartComponent id={props.id} data={props.yearlyInvestments} />
          </center>
        }
        actions={[
          <EyeOutlined key="view" onClick={() => toggleVisible()} />,
          <EditOutlined key="edit" />,
        ]}
      >
        <Meta
          title={"Carteira " + props.id}
          description={
            <>
              <div>{"Objetivo: " + formatMonetary(props.goal)}</div>
              <div>{"Tempo: " + props.timeToReachGoal + " Ano(s)"}</div>
            </>
          }
        />
      </Card>
      {visible && (
        <ModalComponent
          visible={visible}
          toggleVisible={toggleVisible}
          id={props.id}
          goal={props.goal}
          timeToReachGoal={props.timeToReachGoal}
          yearlyInvestments={props.yearlyInvestments}
        />
      )}
    </>
  );
};

WalletComponent.propTypes = {
  id: PropTypes.number,
  goal: PropTypes.number,
  timeToReachGoal: PropTypes.number,
  yearlyInvestments: PropTypes.array,
};

export default WalletComponent;
