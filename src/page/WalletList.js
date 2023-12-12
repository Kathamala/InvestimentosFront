import React from "react";
import { Row, Col } from "antd";
import WalletComponent from "../components/WalletComponent";
import PropTypes from "prop-types";

const WalletList = (props) => {
  return (
    <Row gutter={16} style={{ marginTop: "20px" }}>
      {props.wallets.map((wallet) => (
        <Col key={wallet.id} span={4}>
          <WalletComponent
            id={wallet.id}
            goal={wallet.goal}
            timeToReachGoal={wallet.timeToReachGoal}
            yearlyInvestments={wallet.yearlyInvestments}
          />
        </Col>
      ))}
    </Row>
  );
};

WalletList.propTypes = {
  wallets: PropTypes.array,
};

export default WalletList;
