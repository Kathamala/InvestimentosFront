import React, { useState } from 'react';
import { Form, Input, Select, Button, Row, Col, Space, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import axios from 'axios';

const WalletForm = (props) => {
  const [form] = Form.useForm();
  const [investimentList, setInvestimentList] = useState([
    {
      name: '',
      yieldRate: null,
      value: null,
      type: null,
    },
  ]);
  const [, setInvestimentGoal] = useState(null);
  
  const { Option } = Select;

  const addInvestimento = () => {
    setInvestimentList([
      ...investimentList,
      {
        name: '',
        yieldRate: null,
        value: null,
        type: null,
      },
    ]);
  };

  const removeInvestimento = (index) => {
    const updatedList = [...investimentList];
    updatedList.splice(index, 1);
    setInvestimentList(updatedList);
  };

  const clear = () => {
    setInvestimentList([
      {
        name: '',
        yieldRate: null,
        value: null,
        type: null,
      },
    ]);
    setInvestimentGoal(null);
    form.resetFields();
  };

  const submitForm = () => {
    form
      .validateFields()
      .then((values) => {
        if(values.investimentList === undefined || values.investimentList.size === 0){
            message.error('Insert at least one investiment!');
            return;
        }
        var postData = {}
        postData["firstYearInvestments"] = values.investimentList
        postData["goal"] = values.investimentGoal
        axios.post('http://localhost:8080/api/wallet', postData)
        .then(response => {
            console.log(response.data);
            window.location.href = '/'
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
      })
      .catch((error) => {
        console.error('Validation failed:', error);
      });
  };

  return (
    <div style={{ width: '90%', margin: '0 auto' }}>
      <h1>New Wallet</h1>
      <Form form={form} onFinish={submitForm}>
        {investimentList.map((field, index) => (
          <div key={index}>
            <Row gutter={16} justify="space-between" align="middle">
              <Col span={6}>
                <Form.Item
                  name={['investimentList', index, 'name']}
                  rules={[{ required: true, message: 'Informe um nome!' }]}
                >
                <Input
                    placeholder="Nome"
                    type="text"
                />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={['investimentList', index, 'yieldRate']}
                  rules={[
                    { required: true, message: 'Informe uma taxa de rendimento!' },
                    {
                      pattern: /^-?\d*(\.\d*)?$/,
                      message: 'Informe um valor numérico!',
                    },
                  ]}
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
                  name={['investimentList', index, 'type']}
                  rules={[{ required: true, message: 'Informe um tipo de investimento!' }]}
                >
                  <Select
                        placeholder="Tipo de Investimento"
                    >
                    <Option value="Renda Fixa">Renda Fixa</Option>
                    <Option value="Renda Variável">Renda Variável</Option>
                    <Option value="Imóvel">Imóvel</Option>
                    <Option value="Automóvel">Automóvel</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={['investimentList', index, 'value']}
                  rules={[
                    { required: true, message: 'Informe um valor!' },
                    {
                        pattern: /^-?\d*(\.\d*)?$/,
                        message: 'Informe um valor numérico!',
                    }
                ]}
                >
                <Input
                    addonBefore="R$"
                    placeholder="Valor do Investimento"
                    type="number"
                    step="1"
                />
                </Form.Item>
              </Col>
              <Col>
                <Space>
                  <Button
                    type="text"
                    onClick={() => removeInvestimento(index)}
                    icon={<DeleteOutlined />}
                  />
                </Space>
              </Col>
            </Row>
          </div>
        ))}
        <Button type="primary" onClick={addInvestimento}>
          + Adicionar Investimento
        </Button>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="investimentGoal"
              label="Meta de Investimento"
              rules={[
                { required: true, message: 'Informe uma meta de investimento!' },
                {
                  pattern: /^-?\d*(\.\d*)?$/,
                  message: 'Informe um valor numérico!',
                },
              ]}
            >
                <Input
                    addonBefore="R$"
                    placeholder="Meta de Investimento"
                    type="number"
                    step="100"
                />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button type="primary" onClick={clear}>
          Clear
        </Button>
    </Form>
    <Link to="/">
        <Button type="primary">
            Cancel
        </Button>
    </Link>
    </div>
  );
};

export default WalletForm;
