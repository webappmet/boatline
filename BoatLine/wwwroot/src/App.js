import './assets/styles/App.css';

import Navbar from './containers/Navbar';

import Order from './pages/Order';
import Tickets from './pages/Tickets';
import Home from './pages/Home';
import Search from './pages/Search';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import { AuthProvider } from './context/user';


const App = () => {

  return (
    <div>
      <AuthProvider>
        <Navbar />
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/order" component={Order} />
          <Route path="/tickets" component={Tickets} />
          <Route path="/search" component={Search} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/" component={Home} />
        </Switch>
      </AuthProvider>
    </div>
  );
}

export default App;
