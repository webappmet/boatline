import Section from '../components/layout/Section';
import Container from '../components/layout/Container';
import Flex from '../components/layout/Flex';
import Button, { Text as ButtonText, Icon as ButtonIcon } from '../components/interface/control/Button';
import { ReactComponent as ShipIcon } from '../assets/Ship.svg';
import TextLink from '../components/interface/control/TextLink';
import Space from '../components/layout/Flex';
import H1 from '../components/type/H1';

const Navigation = () => {
    return (
        <Section color="var(--color-gl)" padding=".8rem">
            <Container max="150rem">
                <Flex>
                    <TextLink to="/">
                        <H1 size="2rem">BoatLine</H1>
                    </TextLink>
                    <Space>
                        <TextLink to="/dashboard">Dashboard</TextLink>
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