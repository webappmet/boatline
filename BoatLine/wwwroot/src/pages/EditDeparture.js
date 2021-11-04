import UpdateDepartureForm from "../containers/UpdateDepartureForm";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Stack from "../components/layout/Stack";
import H1 from "../components/type/H1";
import P from "../components/type/P";
import Panel from "../components/interface/module/Panel";
import { useHistory } from "react-router";
import { useAuthState } from "../context/user";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EditDeparture = ({  }) => {
    const history = useHistory();
    const auth = useAuthState();
    let { id } = useParams();

    useEffect(() => {
        if (!auth.user) {
            history.push('/');
        }
    }, [auth]);

    return (
        <Container>
            <Section>
                <Stack gap="5rem">
                    <Stack gap="1rem">
                        <H1>Update Departure</H1>
                        <P>Update departure with new information.</P>
                    </Stack>
                    <Panel radius="1rem" padding="4rem">
                        <UpdateDepartureForm id={id} />
                    </Panel>
                </Stack>
            </Section>
        </Container>
    );
}

export default EditDeparture;