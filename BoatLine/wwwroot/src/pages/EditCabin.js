import { useParams } from "react-router";
import Panel from "../components/interface/module/Panel";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Stack from "../components/layout/Stack";
import H1 from "../components/type/H1";
import P from "../components/type/P";
import EditCabinFrom from '../containers/EditCabinFrom';

const EditCabin = () => {
    const { id } = useParams();

    return (
        <Container>
            <Section>
                <Stack gap="5rem">
                    <Stack>
                        <H1>Update Cabin</H1>
                        <P>Change cabin values</P>
                    </Stack>
                    <Panel radius="1rem" padding="4rem">
                        <EditCabinFrom id={id}/>
                    </Panel>
                </Stack>
            </Section>
        </Container>
    );
}

export default EditCabin;