import "./header.scss";
const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <h1>Currency exchange</h1>
        <div className="to-hrivna-rates">
          <div className="one-hrivna">1 UAH = </div>
          <div className="">USD</div>
          <div className="">EUR</div>
        </div>
      </div>
    </header>
  );
};
export default Header;
