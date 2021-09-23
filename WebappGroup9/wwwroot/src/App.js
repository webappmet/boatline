import logo from './logo.svg';
import './App.css';
import Container from "./components/Container";
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';

const App = () => {
  return (
    <Container>
      <TicketForm />
      <TicketList />
    </Container>
  );
}

export default App;
