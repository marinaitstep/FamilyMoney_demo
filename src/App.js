
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import React from "react";
import Balance from './components/Balance'
import Accounts from './components/Accounts'
import Categories from './components/Categories'
import Profit from './components/Profit'
import Spend from './components/Spend'
import Transfer from './components/Transfer'
import NotFound from './components/NotFound'

function NavMenu() {
  ///начало изменения цвета меню при нажатии
  let colSet = "green";
  let colUnset = "#333";
  const stateBalance = () => {
    document.getElementById("balance").style.backgroundColor = colSet;
    document.getElementById("spend").style.backgroundColor = colUnset;
    document.getElementById("profit").style.backgroundColor = colUnset;
    document.getElementById("transfer").style.backgroundColor = colUnset;
    document.getElementById("accounts").style.backgroundColor = colUnset;
    document.getElementById("categories").style.backgroundColor = colUnset;
  };
  const stateSpend = () => {
    document.getElementById("balance").style.backgroundColor = colUnset;
    document.getElementById("spend").style.backgroundColor = colSet;
    document.getElementById("profit").style.backgroundColor = colUnset;
    document.getElementById("transfer").style.backgroundColor = colUnset;
    document.getElementById("accounts").style.backgroundColor = colUnset;
    document.getElementById("categories").style.backgroundColor = colUnset;
  }
   const stateProfit = () => {
    document.getElementById("balance").style.backgroundColor = colUnset;
    document.getElementById("spend").style.backgroundColor = colUnset;
    document.getElementById("profit").style.backgroundColor = colSet;
    document.getElementById("transfer").style.backgroundColor = colUnset;
    document.getElementById("accounts").style.backgroundColor = colUnset;
    document.getElementById("categories").style.backgroundColor = colUnset;
   }
    const stateTransfer = () => {
    document.getElementById("balance").style.backgroundColor = colUnset;
    document.getElementById("spend").style.backgroundColor = colUnset;
    document.getElementById("profit").style.backgroundColor = colUnset;
    document.getElementById("transfer").style.backgroundColor = colSet;
    document.getElementById("accounts").style.backgroundColor = colUnset;
    document.getElementById("categories").style.backgroundColor = colUnset;
    }
   const stateAccounts = () => {
    document.getElementById("balance").style.backgroundColor = colUnset;
    document.getElementById("spend").style.backgroundColor = colUnset;
    document.getElementById("profit").style.backgroundColor = colUnset;
    document.getElementById("transfer").style.backgroundColor = colUnset;
    document.getElementById("accounts").style.backgroundColor = colSet;
    document.getElementById("categories").style.backgroundColor = colUnset;
   }
  const stateCategories = () => {
    document.getElementById("balance").style.backgroundColor = colUnset;
    document.getElementById("spend").style.backgroundColor = colUnset;
    document.getElementById("profit").style.backgroundColor = colUnset;
    document.getElementById("transfer").style.backgroundColor = colUnset;
    document.getElementById("accounts").style.backgroundColor = colUnset;
    document.getElementById("categories").style.backgroundColor = colSet;
    }
   const stateOut = () => {
    document.getElementById("balance").style.backgroundColor = colUnset;
    document.getElementById("spend").style.backgroundColor = colUnset;
    document.getElementById("profit").style.backgroundColor = colUnset;
    document.getElementById("transfer").style.backgroundColor = colUnset;
    document.getElementById("accounts").style.backgroundColor = colUnset;
    document.getElementById("categories").style.backgroundColor = colUnset;
  }
///конец изменения цвета меню при нажатии


  return (
    <>
      <div id="navbar">
  <div class="text-center"><h1><span id="family">Family</span><span id="money" class="badge">Mon<span id="family">k</span>ey</span></h1> </div>
        <Link to="/" onClick={stateBalance}  id="balance">Баланс</Link>
        <Link to="/spend" onClick={stateSpend} id="spend">Траты</Link>
        <Link to="/profit" onClick={stateProfit} id="profit">Доходы</Link>
        <Link to="/transfer" onClick={stateTransfer} id="transfer">Переводы</Link>
        <Link to="/accounts" onClick={stateAccounts} id="accounts">Счета</Link>
        <Link to="/categories" onClick={stateCategories} id="categories">Категории</Link>
          <img src="../img/main.png" width="50px" alt="monkey" align="right"/>
      </div>
      
    </>
  );
}
export default function App() {

  return <>
    <Router>
        <div>
          <NavMenu class="position-sticky"/>
        <Switch>
        <Route exact path="/" component={Balance} />
        <Route exact path="/spend" component={Spend} />
        <Route exact path="/profit" component={Profit} />
        <Route exact path="/transfer" component={Transfer} />
        <Route exact path="/accounts" component={Accounts} />
        <Route exact path="/categories" component={Categories} />
        <Route component={NotFound} />
        </Switch>
        </div>
    </Router>

    </>
}

