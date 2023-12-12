import "./App.css";
import React, { useState, useEffect } from "react";
import WalletList from "./page/WalletList";
import { Card, Button } from "antd";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import WalletForm from "./page/WalletForm";

function App() {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/api/wallet/getAll")
      .then((response) => {
        setWallets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <Card title="Minhas Carteiras">
                  <Link to="/new-wallet">
                    <Button type="primary">Nova Carteira</Button>
                  </Link>
                  <WalletList wallets={wallets} />
                </Card>
              }
            />
            <Route path="new-wallet" element={<WalletForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
