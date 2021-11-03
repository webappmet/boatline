import Container from '../components/layout/Container';
import Space from '../components/layout/Space';
import Panel from '../components/interface/module/Panel';
import H1 from '../components/type/H1';
import H2 from '../components/type/H2';
import Section from '../components/layout/Section';

const Dashboard = ({  }) => {

    return (
        <Container>
            <Section>
                <H1>Admin Dashboard</H1>
            </Section>
            <Space col="2">
                <Panel radius="1rem">
                    <H2>Test</H2>
                </Panel>
            </Space>
        </Container>
    );
}

export default Dashboard;