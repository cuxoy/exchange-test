import { useEffect, useState } from "react";

import "./header.scss";
const Header = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCurrencies(data);
      });
  }, []);

  const dollarValue =
    currencies.length > 0
      ? currencies.filter((item) => {
          return item.cc == "USD";
        })[0].rate
      : "";
  const euroValue =
    currencies.length > 0
      ? currencies.filter((item) => {
          return item.cc == "EUR";
        })[0].rate
      : "";

  return (
    <header className="header">
      <div className="header__container">
        <h1>Currency exchange</h1>
        <div className="to-hrivna-rates">
          <div className="one-hrivna">1 UAH = </div>
          <div className="dollar-euro">
            <div className="dollar">{(1 / dollarValue).toFixed(5)} USD</div>
            <div className="euro">{(1 / euroValue).toFixed(5)} EUR</div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
