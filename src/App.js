import "./App.css";
import WalletList from "./page/WalletList";
import { Card } from "antd";

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

function App() {
  const wallets = [
    {
      title: "Wallet 1",
      data: data1,
      description: "Description for Wallet 1",
    },
    {
      title: "Wallet 2",
      data: data2,
      description: "Description for Wallet 2",
    },
    {
      title: "Wallet 1",
      data: data1,
      description: "Description for Wallet 1",
    },
    {
      title: "Wallet 2",
      data: data2,
      description: "Description for Wallet 2",
    },
    {
      title: "Wallet 1",
      data: data1,
      description: "Description for Wallet 1",
    },
    {
      title: "Wallet 2",
      data: data2,
      description: "Description for Wallet 2",
    },
    {
      title: "Wallet 1",
      data: data1,
      description: "Description for Wallet 1",
    },
    {
      title: "Wallet 2",
      data: data2,
      description: "Description for Wallet 2",
    },
  ];

  return (
    <Card title="My Wallets">
      <WalletList wallets={wallets} />
    </Card>
  );
}

export default App;
