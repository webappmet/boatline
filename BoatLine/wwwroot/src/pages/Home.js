import './styled.css';

import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="frontpage">
            <img className="banner-image" src="./boat.jpg" alt="Seascape from boat" />
            <div className="banner-box">
                <div>
                    <h1 className="heading">BoatLine</h1>
                    <h2 className="subheading">Quality cruise, low prices</h2>
                </div>
                <Link className="action-button" to="/order">Order a Cruise</Link>
            </div>
        </div>
    );
}

export default Home;