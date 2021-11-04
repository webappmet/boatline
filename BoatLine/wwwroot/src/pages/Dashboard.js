import Container from '../components/layout/Container';
import Space from '../components/layout/Space';
import Stack from '../components/layout/Stack';
import Panel from '../components/interface/module/Panel';
import H1 from '../components/type/H1';
import H2 from '../components/type/H2';
import Section from '../components/layout/Section';

import { useEffect } from 'react';
import { useAuthState } from '../context/user';
import { useHistory } from 'react-router-dom';
import P from '../components/type/P';
import DepartureList from '../containers/DepartureList';
import Button, { Text as ButtonText } from '../components/interface/control/Button';
import Align from '../components/layout/Align';
import Flex from '../components/layout/Flex';

const Dashboard = ({  }) => {
    const history = useHistory();
    const auth = useAuthState();

    useEffect(() => {
        if (!auth.user) {
            history.push('/');
        }
    }, [auth]);

    return (
        <Container>
            <Section>
                <Flex>
                    <H1>Admin Dashboard</H1>
                    <P>Logged in as {auth && auth.user}</P>
                </Flex>
            </Section>
            <Space col="2">
                <Panel radius="1rem">
                    <Stack>
                        <Stack gap=".5rem">
                            <H2>Departures</H2>
                            <P>Upcoming departures</P>
                        </Stack>
                        <DepartureList items={5} navigable={false}/>
                        <Align align="right">
                        <Flex>
                            <Button to="/departures/create">
                                <ButtonText>Add Departues</ButtonText>    
                            </Button>
                            <Button to="/departures">
                                <ButtonText>View more</ButtonText>
                            </Button>
                        </Flex>
                    </Align>
                    </Stack>
                </Panel>
            </Space>
        </Container>
    );
}

export default Dashboard;