import Section from '../components/layout/Section';
import Container from '../components/layout/Container';
import Flex from '../components/layout/Flex';
import Button, { Text as ButtonText, Icon as ButtonIcon } from '../components/interface/control/Button';
import { ReactComponent as ShipIcon } from '../assets/Ship.svg';
import TextLink from '../components/interface/control/TextLink';
import Space from '../components/layout/Flex';

const Navigation = () => {
    return (
        <Section color="var(--color-gl)" padding=".8rem">
            <Container max="150rem">
                <Flex>
                    <TextLink to="/">BoatLine</TextLink>
                    <Space>
                        <TextLink to="/search">Search Ticket</TextLink>
                        <Button to="/order">
                            <ButtonText>Order a Cruise</ButtonText>
                            <ButtonIcon>
                                <ShipIcon />
                            </ButtonIcon>
                        </Button>
                    </Space>
                </Flex>
            </Container>
        </Section>
    );
}

export default Navigation;