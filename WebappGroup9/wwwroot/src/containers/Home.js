import { navigate } from "../Router";

const Home = () => {
    return (
        <div>
            <div>home</div>
            <button onClick={() => navigate('/tickets?r=IOP3UI&r=LJKI4U')}>Tickets</button>
        </div>
    );
}

export default Home;