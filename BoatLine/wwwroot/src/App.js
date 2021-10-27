import './assets/styles/App.css';

import Nav from './components/Nav';

import Order from './pages/Order';
import Tickets from './pages/Tickets';
import Home from './pages/Home';
import Search from './pages/Search';

import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Navigation from './containers/Navigation';


const App = () => {

  return (
    <div>
      <Nav />
      {/* <Navigation /> */}
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
