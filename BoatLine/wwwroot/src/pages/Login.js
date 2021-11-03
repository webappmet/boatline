import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import LoginForm from "../containers/LoginForm";


const Login = () => {
    return(
        <Container>
            <Section>
                <LoginForm />
            </Section>
        </Container>
    );
}

export default Login;