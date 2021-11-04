import './styled.css';

import Button, { Text as ButtonText, Icon as ButtonIcon } from '../components/interface/control/Button';
import { ReactComponent as ShipIcon } from '../assets/Ship.svg';
import Align from '../components/layout/Align';

const Home = () => {
    return (
        <div className="frontpage">
            <img className="banner-image" src="./boat.jpg" alt="Seascape from boat" />
            <div className="banner-box">
                <div>
                    <h1 className="heading">BoatLine</h1>
                    <h2 className="subheading">Quality cruise, low prices</h2>
                </div>
                <Align align="center">
                    <Button size="large" to="/order">
                        <ButtonText>Order a Cruise</ButtonText>
                        <ButtonIcon>
                            <ShipIcon />
                        </ButtonIcon>
                    </Button>
                </Align>
            </div>
        </div>
    );
}

export default Home;