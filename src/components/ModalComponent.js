import React from "react";
import { Modal, Col, Row, Table } from "antd";
import PropTypes from "prop-types";
import PieChartComponent from "./PieChartComponent";
import { formatMonetary } from "../utils";

const ModalComponent = (props) => {
  const columns = [
    {
      title: "Ano",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Valor",
      dataIndex: "value",
      key: "value",
      render: (value) => formatMonetary(value),
    },
    {
      title: "Taxa de Rendimento",
      dataIndex: "yieldRate",
      key: "yieldRate",
      render: (value) => value + "%",
    },
  ];

  const data = [];
  var added_ids = [];

  props.yearlyInvestments.forEach((year, yearIndex) => {
    year.forEach((investment) => {
      var yearFilled = added_ids.some(item => item === yearIndex + 1);
      data.push({
        key: data.length,
        year: yearFilled ? "" : yearIndex + 1,
        name: investment.name,
        type: investment.type,
        value: investment.value,
        yieldRate: investment.yieldRate,
      });
      if(!yearFilled){
        added_ids.push(yearIndex+1);
      }
    });
  });

  return (
    <>
      <Modal
        title={<h2>{"Carteira " + props.id}</h2>}
        open={props.visible}
        onCancel={props.toggleVisible}
        footer={null}
        centered
        width={"60%"}
      >
        <Row gutter={16}>
          <Col span={12}>
            <p>
              <b style={{ fontSize: "17px" }}>Objetivo: </b>
              R$ {formatMonetary(props.goal)}
            </p>
            <p>
              <b style={{ fontSize: "17px" }}>Tempo: </b>
              {props.timeToReachGoal + " ano(s)"}
            </p>
            <p>
              <b style={{ fontSize: "17px" }}>Investimentos anuais: </b>
            </p>
            <Table columns={columns} dataSource={data} pagination={false} />
          </Col>
          <Col span={12}>
            <PieChartComponent
              id={props.id}
              data={props.yearlyInvestments}
              legend={"right"}
              width={"500px"}
              height={"500px"}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

ModalComponent.propTypes = {
  visible: PropTypes.bool,
  toggleVisible: PropTypes.func,
  id: PropTypes.number,
  goal: PropTypes.number,
  timeToReachGoal: PropTypes.number,
  yearlyInvestments: PropTypes.array,
};

export default ModalComponent;
