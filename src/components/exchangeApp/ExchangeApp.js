import { useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";
import { DebounceInput } from "react-debounce-input";
import "./exchangeApp.scss";

const ExchangeApp = () => {
  const [currencies, setCurrencies] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("idle");
  const [mainValue, setMainValue] = useState({ input: 0, select: "" });
  const [secondaryValue, setSecondaryValue] = useState({
    input: 0,
    select: "",
  });

  //Fetch currencies

  useEffect(() => {
    setLoadingStatus("loading");
    fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCurrencies([
          ...data,
          {
            r030: 36,
            txt: "Українська гривня",
            rate: 1,
            cc: "UAH",
            exchangedate: "08.07.2022",
          },
        ]);
      })
      .then(() => setLoadingStatus("idle"));
  }, []);

  //create variables

  const currenciesOptions = currencies.map((item) => {
    return <option value={item.cc}>{item.cc}</option>;
    // return item.cc;
  });
  console.log(currenciesOptions);
  const mainCurrencyName =
    mainValue.select.length > 0
      ? currencies.filter((item) => {
          if (item.cc === mainValue.select) {
            return item;
          }
        })[0].txt
      : "";
  const secondaryCurrencyName =
    secondaryValue.select.length > 0
      ? currencies.filter((item) => {
          if (item.cc === secondaryValue.select) {
            return item;
          }
        })[0].txt
      : "";
  //create converter functions

  const onMainCurrencyChanged = (input, select) => {
    const mainCurrencyRate = currencies.filter((item) => {
      if (item.cc === select) {
        return item;
      }
    })[0].rate;

    const secondaryCurrencyRate =
      secondaryValue.select.length > 0
        ? currencies.filter((item) => {
            if (item.cc === secondaryValue.select) {
              return item;
            }
          })[0].rate
        : null;

    setMainValue({
      input: input,
      select: select,
    });

    setSecondaryValue({
      input: ((input * mainCurrencyRate) / secondaryCurrencyRate).toFixed(3),
      select: secondaryValue.select,
    });
  };

  const onSecondaryCurrencyChanged = (input, select) => {
    const secondaryCurrencyRate = currencies.filter((item) => {
      if (item.cc === select) {
        return item;
      }
    })[0].rate;

    const mainCurrencyRate =
      mainValue.select.length > 0
        ? currencies.filter((item) => {
            if (item.cc === mainValue.select) {
              return item;
            }
          })[0].rate
        : null;

    setSecondaryValue({
      input: (
        (mainValue.input * mainCurrencyRate) /
        secondaryCurrencyRate
      ).toFixed(3),
      select: select,
    });

    setMainValue({
      input: mainValue.input,
      select: mainValue.select,
    });
  };
  //rendering component
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
                onChange={(e) =>
                  onMainCurrencyChanged(mainValue.input, e.target.value)
                }
              >
                <option selected disabled>
                  currencys
                </option>
                {currenciesOptions}
              </select>
              <div className="currency-converter__item_name">
                {mainCurrencyName}
              </div>
              <DebounceInput
                minLength={1}
                debounceTimeout={300}
                type="number"
                name="number"
                id="number"
                value={mainValue.input}
                min={0}
                className="currency-converter__input"
                onChange={(e) =>
                  onMainCurrencyChanged(e.target.value, mainValue.select)
                }
              />
            </div>
            <div className="equal-sign">=</div>
            <div className="currency-converter__item">
              <select
                name="secondaryCurrency"
                id="secondaryCurrency"
                className="currency-converter__select"
                onChange={(e) =>
                  onSecondaryCurrencyChanged(
                    secondaryValue.input,
                    e.target.value
                  )
                }
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
                minLength={1}
                debounceTimeout={300}
                type="number"
                name="number"
                id="number"
                value={secondaryValue.input}
                min={0}
                className="currency-converter__input"
                onChange={(e) =>
                  onSecondaryCurrencyChanged(
                    e.target.value,
                    secondaryValue.select
                  )
                }
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
