import "./App.css";
import React, { useState, useEffect } from 'react';
import WalletList from "./page/WalletList";
import { Card, Button } from "antd";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from 'axios';
import WalletForm from "./page/WalletForm";
/*
const data1 = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

const data2 = [
  ["Task", "Hours per Day"],
  ["Work", 8],
  ["Eat", 3],
  ["Commute", 2],
  ["Watch TV", 4],
  ["Sleep", 7],
];
*/
function App() {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:8080/api/wallet/getAll')
    .then(response => {
      setWallets(response.data);
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });
  };

  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={      
            <Card title="My Wallets">
              <Link to="/new-wallet">
                <Button type="primary">
                  New Wallet
                </Button>
              </Link>
              <WalletList wallets={wallets} />
            </Card>
          }/>
          <Route path="new-wallet" element={<WalletForm />} />
        </Route>
      </Routes>
    </BrowserRouter> 

    </div>
  );
}

export default App;
