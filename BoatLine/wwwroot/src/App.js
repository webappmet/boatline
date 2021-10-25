import './App.css';

import Nav from './components/Nav';

import Order from './containers/Order';
import Tickets from './containers/Tickets';
import Home from './containers/Home';
import Search from './containers/Search';

import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';


const App = () => {

  return (
    <div>
      <Nav />
      <Switch>
        <Route path="/order" component={Order} />
        <Route path="/tickets" component={Tickets} />
        <Route path="/search" component={Search} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
