import './assets/styles/App.css';

import Navbar from './containers/Navbar';

import Order from './pages/Order';
import Tickets from './pages/Tickets';
import Home from './pages/Home';
import Search from './pages/Search';
import Dashboard from './pages/Dashboard';

import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';


const App = () => {

  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/order" component={Order} />
        <Route path="/tickets" component={Tickets} />
        <Route path="/search" component={Search} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
