import Nav from './components/Nav';
import './App.css';
import Order from './containers/Order';
import Tickets from './containers/Tickets';
import Home from './containers/Home';
import { useContext } from 'react';
import { pagesMapping, RoutingContext } from './Router'
import Search from './containers/Search';

const App = () => {
  const { page } = useContext(RoutingContext)

  return (
    <div>
      <Nav />
      {(pagesMapping.order === page) && <Order />}
      {(pagesMapping.tickets === page) && <Tickets />}
      {(pagesMapping.search === page) && <Search />}
      {(pagesMapping.home === page) && <Home /> }
    </div>
  );
}

export default App;
