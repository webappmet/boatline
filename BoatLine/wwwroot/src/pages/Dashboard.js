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
import TicketList from '../containers/TicketList';
import Ship from '../containers/Ship';
import RouteList from '../containers/RouteList';
import CreateRoute from '../containers/CreateRoute';
import { useState } from 'react/cjs/react.development';

const Dashboard = ({  }) => {
    const history = useHistory();
    const auth = useAuthState();
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        if (!auth.user) {
            history.push('/');
        }
    }, [auth]);

    return (
        <Container>
            <Section>
                <Stack gap="5rem">
                    <Flex>
                        <H1>Admin Dashboard</H1>
                        <P>Logged in as {auth && auth.user}</P>
                    </Flex>
                    <Stack gap="1.8rem">
                        <Space col="2" breakpoint="900px">
                            <Panel radius="1rem" padding="2.5rem">
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
                            <Panel radius="1rem" padding="2.5rem">
                                <Stack>
                                    <Stack gap=".5rem">
                                        <H2>Tickets</H2>
                                        <P>All purchased tickets</P>
                                    </Stack>
                                    <TicketList />
                                </Stack>
                            </Panel>
                        </Space>
                        <Panel radius="1rem" padding="2.5rem">
                            <Space>
                                <Stack>
                                    <Stack gap=".5rem">
                                        <H2>Routes</H2>
                                        <P>All current routes</P>
                                    </Stack>
                                    <RouteList update={update} />
                                </Stack>
                                <div>
                                    <Stack>
                                        <Stack gap=".5rem">
                                            <H2>Create Route</H2>
                                            <P>Create new route</P>
                                        </Stack>
                                        <CreateRoute submit={() => setUpdate(!update)} />
                                    </Stack>
                                </div>
                            </Space>
                        </Panel>
                        <Panel radius="1rem" padding="2.5rem">
                            <Stack gap="3rem">
                                <Stack gap=".5rem">
                                    <H2>Cabins</H2>
                                    <P>Click a cabin to edit it.</P>
                                </Stack>
                                <Ship />
                            </Stack>
                        </Panel>
                    </Stack>
                </Stack>
            </Section>
        </Container>
    );
}

export default Dashboard;