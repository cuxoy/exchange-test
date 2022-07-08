import { useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";
import "./exchangeApp.scss";

const ExchangeApp = () => {
  const [currencies, setCurrencies] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("idle");
  const [mainSelectValue, setMainSelectValue] = useState("");
  const [secondarySelectValuse, setSecondarySelectValue] = useState("");
  const [mainInputValue, setMainInputValue] = useState(0);
  const [secondaryInputValue, setSecondaryInputValue] = useState(0);

  useEffect(() => {
    setLoadingStatus("loading");
    fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCurrencies(data);
      })
      .then(() => setLoadingStatus("idle"));
  }, []);

  const currenciesOptions = currencies.map((item) => {
    return <option value={item.cc}>{item.cc}</option>;
  });
  const mainCurrencyName = currencies.filter((item) => {
    if (item.cc === mainSelectValue) {
      return item.txt;
    }
  });
  console.log(mainCurrencyName[0]);
  console.log(mainSelectValue);

  if (loadingStatus === "loading") {
    return (
      <div className="loading">
        <ClockLoader color={"blue"} size={150} />
      </div>
    );
  } else if (loadingStatus === "idle") {
    return (
      <div className="converter">
        <div className="converter__header">Currency Converter</div>
        <div className="converter__container">
          <div className="currency-converter">
            <div className="currency-converter__item">
              <select
                name="mainCurrency"
                id="mainCurrrency"
                className="currency-converter__select"
                onChange={(e) => setMainSelectValue(e.target.value)}
              >
                <option selected disabled>
                  currency
                </option>
                {currenciesOptions}
              </select>
              <div className="currency-converter__item_name">dollar</div>
              <input
                type="number"
                name="number"
                id="number"
                min={0}
                className="currency-converter__input"
              />
            </div>
            <div className="equal-sign">=</div>
            <div className="currency-converter__item">
              <select
                name="secondaryCurrency"
                id="secondaryCurrency"
                className="currency-converter__select"
                onChange={(e) => setSecondarySelectValue(e.target.value)}
              >
                <option selected disabled>
                  currency
                </option>
                {currenciesOptions}
              </select>
              <div className="currency-converter__item_name"></div>
              <input
                type="number"
                name="number"
                id="number"
                min={0}
                className="currency-converter__input"
              />
            </div>
          </div>
          <div className="single-currency">single currency</div>
        </div>
      </div>
    );
  } else
    return (
      <>
        <div className="error">Error</div>
      </>
    );
};
export default ExchangeApp;
