import logo from './logo.svg';
import './App.css';
import Container from "./components/Container";
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import Walker from './components/Walker';
import OrderHandler from './components/OrderHandler'

const App = () => {
  return (
    <Container>
      <OrderHandler />
    </Container>
  );
}

export default App;
