import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import OrderHandler from '../components/OrderHandler';

const Order = () => {
    return (
        <Container>
            <Section>
                <OrderHandler />
            </Section>
        </Container>
    );
}

export default Order;