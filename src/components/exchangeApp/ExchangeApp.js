import { useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";
import { DebounceInput } from "react-debounce-input";
import "./exchangeApp.scss";

const ExchangeApp = () => {
  const [currencies, setCurrencies] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("idle");
  const [mainSelectValue, setMainSelectValue] = useState("");
  const [secondarySelectValue, setSecondarySelectValue] = useState("");
  const [mainInputValue, setMainInputValue] = useState(0);
  const [secondaryInputValue, setSecondaryInputValue] = useState(0);

  //Fetch currencies

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

  //create variables

  const currenciesOptions = currencies.map((item) => {
    return <option value={item.cc}>{item.cc}</option>;
  });
  const mainCurrencyName =
    mainSelectValue.length > 0
      ? currencies.filter((item) => {
          if (item.cc === mainSelectValue) {
            return item;
          }
        })[0].txt
      : "";
  const secondaryCurrencyName =
    secondarySelectValue.length > 0
      ? currencies.filter((item) => {
          if (item.cc === secondarySelectValue) {
            return item;
          }
        })[0].txt
      : "";
  console.log(mainInputValue);
  //render markup + loading spinner / error message

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
              <div className="currency-converter__item_name">
                {mainCurrencyName}
              </div>
              <DebounceInput
                minLength={2}
                debounceTimeout={300}
                type="number"
                name="number"
                id="number"
                min={0}
                className="currency-converter__input"
                onChange={(e) => setMainInputValue(e.target.value)}
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
              <div className="currency-converter__item_name">
                {secondaryCurrencyName}
              </div>
              <DebounceInput
                minLength={2}
                debounceTimeout={300}
                type="number"
                name="number"
                id="number"
                min={0}
                className="currency-converter__input"
                onChange={(e) => setSecondaryInputValue(e.target.value)}
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
