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
import { ToastProvider } from './context/toast';
import ToastContainer from './containers/ToastContainer';
import Departures from './pages/Departures';
import CreateDeparture from './pages/CreateDeparture';


const App = () => {

	return (
		<div>
		<AuthProvider>
			<ToastProvider>
				<Navbar />
				<Switch>
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/departures/create" component={CreateDeparture} />
					<Route path="/departures" component={Departures} />
					<Route path="/order" component={Order} />
					<Route path="/tickets" component={Tickets} />
					<Route path="/search" component={Search} />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route path="/" component={Home} />
				</Switch>
				<ToastContainer />
			</ToastProvider>
		</AuthProvider>
		</div>
	);
}

export default App;
