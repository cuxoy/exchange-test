import { useEffect, useState } from "react";
import "./exchangeApp.scss";
const ExchangeApp = () => {
  const [loadingStatus, setLoadingStatus] = useState("idle");
  return (
    <div className="converter">
      <div className="converter__header">Currency Converter</div>
      <div className="converter__container">
        <div className="currency-converter">
          <div className="currency-converter__item">
            <select
              name="currency"
              id="currrency"
              className="currency-converter__select"
            ></select>
            <div className="currency-converter__item_name">dollar</div>
            <input
              type="number"
              name="number"
              id="number"
              className="currency-converter__input"
            />
          </div>
          <div className="currency-converter__item">
            <select
              name="currency"
              id="currrency"
              className="currency-converter__select"
            ></select>
            <div className="currency-converter__item_name"></div>
            <input
              type="number"
              name="number"
              id="number"
              className="currency-converter__input"
            />
          </div>
        </div>
        <div className="single-currency">single currency</div>
      </div>
    </div>
  );
};
export default ExchangeApp;
