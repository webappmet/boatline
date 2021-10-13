import logo from './assets/logo.svg';
import './App.css';
import Order from './containers/Order';
import Tickets from './containers/Tickets';
import Home from './containers/Home';
import { useContext } from 'react';
import { pagesMapping, RoutingContext } from './Router'

const App = () => {
  const { page } = useContext(RoutingContext)

  return (
    <>
      {(pagesMapping.order === page) && <Order />}
      {(pagesMapping.tickets === page) && <Tickets />}
      {(pagesMapping.home === page) && <Home /> }
    </>
  );
}

export default App;
