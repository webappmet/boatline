import CreateDepartureForm from "../containers/CreateDepartureForm";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Stack from "../components/layout/Stack";
import H1 from "../components/type/H1";
import P from "../components/type/P";

const CreateDeparture = ({  }) => {
    return (
        <Container>
            <Section>
                <Stack gap="5rem">
                    <Stack gap="1rem">
                        <H1>Create Departures</H1>
                        <P>Create one of or series of departures.</P>
                    </Stack>
                    <CreateDepartureForm />
                </Stack>
            </Section>
        </Container>
    );
}

export default CreateDeparture;