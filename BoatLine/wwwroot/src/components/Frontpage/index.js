import './styled.css';

const Frontpage = () => {
    return (
        <div className="frontpage">
            <img className="banner-image" src="./boat.jpg" alt="Seascape from boat" />
            <div className="banner-box">
                <div>
                    <h1 className="heading">BoatLine</h1>
                    <h2 className="subheading">Quality cruise, low prices</h2>
                </div>
                <a href="/order" className="action-button">Order a Cruise</a>
            </div>
        </div>
    );
}

export default Frontpage;