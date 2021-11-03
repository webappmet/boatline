import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import SignupForm from "../containers/SignupForm";


const Login = () => {
    return(
        <Container>
            <Section>
                <SignupForm />
            </Section>
        </Container>
    );
}

export default Login;