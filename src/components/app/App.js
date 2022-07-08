import Header from "../header/Header";
import ExchangeApp from "../exchangeApp/ExchangeApp";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <Header />
        <ExchangeApp />
      </div>
    </div>
  );
}

export default App;
