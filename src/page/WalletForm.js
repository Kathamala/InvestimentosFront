import React, { useState } from "react";
import { Form, Input, Select, Button, Row, Col, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { Card } from "antd";
import axios from "axios";

const WalletForm = (props) => {
  const [form] = Form.useForm();
  const location = useLocation(); 
  const [investmentList, setInvestmentList] = useState(location.state ? location.state.wallet.investments : [
    {
      id: "",
      name: "",
      yieldRate: null,
      value: null,
      type: "",
    },
  ]);
  const [, setinvestmentGoal] = useState(null);
  const { Option } = Select;

  const addinvestimento = () => {
    setInvestmentList([
      ...investmentList,
      {
        id: "",
        name: "",
        yieldRate: null,
        value: null,
        type: "",
      },
    ]);
  };

  const removeinvestimento = (index) => {
    setInvestmentList((prevList) => {
      const updatedList = [...prevList];
      updatedList.splice(index, 1);
      return updatedList;
    });  
  };

  const clear = () => {
    setInvestmentList([
      {
        name: "",
        yieldRate: null,
        value: null,
        type: null,
      },
    ]);
    setinvestmentGoal(null);
    form.resetFields();
  };

  const submitForm = () => {
    form
      .validateFields()
      .then((values) => {
        if (
          values.investmentList === undefined ||
          values.investmentList.size === 0
        ) {
          message.error("Insira ao menos um investimento para continuar!");
          return;
        }
        var postData = {};
        postData["firstYearInvestments"] = values.investmentList;
        postData["goal"] = values.investmentGoal;
        postData["id"] = location.state ? location.state.wallet.id : "";
        axios
          .post("http://localhost:8080/api/wallet", postData)
          .then((response) => {
            window.location.href = "/";
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  return (
    <Form form={form} onFinish={submitForm} layout="vertical">
      <Card title={location.state != null && location.state.actionType === "edit" ? "Editar Carteira" : "Nova Carteira"}>
        <Button type="primary" onClick={addinvestimento}>
          + Adicionar investimento
        </Button>
        <Row gutter={16} style={{ marginTop: 20 }}>
          {investmentList.map((field, index) => (
            <Card style={{ width: '100%' }} key={index}>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    label="Nome"
                    name={["investmentList", index, "name"]}
                    rules={[{ required: true, message: "Informe um nome!" }]}
                    initialValue={field.name}
                  >
                    <Input placeholder="Nome" type="text" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    label="Taxa de Rendimento"
                    name={["investmentList", index, "yieldRate"]}
                    rules={[
                      {
                        required: true,
                        message: "Informe uma taxa de rendimento!",
                      },
                      {
                        pattern: /^-?\d*(\.\d*)?$/,
                        message: "Informe um valor numérico!",
                      },
                    ]}
                    initialValue={field.yieldRate}
                  >
                    <Input
                      addonAfter="%"
                      placeholder="Taxa de Rendimento"
                      type="number"
                      step="1"
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Tipo de investimento"
                    name={["investmentList", index, "type"]}
                    rules={[
                      {
                        required: true,
                        message: "Informe um tipo de investimento!",
                      },
                    ]}
                    initialValue={field.type}
                  >
                    <Select placeholder="Tipo de investimento">
                      <Option value="Renda Fixa">Renda Fixa</Option>
                      <Option value="Renda Variável">Renda Variável</Option>
                      <Option value="Imóvel">Imóvel</Option>
                      <Option value="Automóvel">Automóvel</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Valor do investimento"
                    name={["investmentList", index, "value"]}
                    rules={[
                      { required: true, message: "Informe um valor!" },
                      {
                        pattern: /^-?\d*(\.\d*)?$/,
                        message: "Informe um valor numérico!",
                      },
                    ]}
                    initialValue={field.value}
                  >
                    <Input
                      addonBefore="R$"
                      placeholder="Valor do investimento"
                      type="number"
                      step="1"
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Button
                    danger
                    style={{ marginTop: 30, marginLeft: 30 }}
                    onClick={() => removeinvestimento(index)}
                    icon={<DeleteOutlined />}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="investmentGoal"
              label="Meta de investimento"
              rules={[
                {
                  required: true,
                  message: "Informe uma meta de investimento!",
                },
                {
                  pattern: /^-?\d*(\.\d*)?$/,
                  message: "Informe um valor numérico!",
                },
              ]}
              initialValue={location.state != null ? location.state.wallet.goal : null}
            >
              <Input
                addonBefore="R$"
                placeholder="Meta de investimento"
                type="number"
                step="100"
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: 25,
        }}
      >
        <Link to="/">
          <Button type="default">Cancelar</Button>
        </Link>
        <div>
          <Button type="default" onClick={clear} style={{ marginRight: 8 }}>
            Limpar
          </Button>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </div>
      </div>
    </Form>
  );
};

WalletForm.propTypes = {
};

export default WalletForm;
