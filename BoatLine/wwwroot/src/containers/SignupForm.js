import Panel from '../components/interface/module/Panel';
import Input from '../components/interface/control/Input';
import { username as validUser, newPassword as validNewPass } from '../scripts/validator';

import H2 from '../components/type/H2';
import Container from '../components/layout/Container';
import Stack from '../components/layout/Stack';
import Button, { Text as ButtonText } from '../components/interface/control/Button';
import TextLink from '../components/interface/control/TextLink';

import { useState, useEffect } from 'react';
import { useAuthState, useAuthDispatch } from '../context/user';
import { loginUser } from '../api/auth';
import { useHistory } from 'react-router';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [validConfirmedPassword, setValidConfirmedPassword] = useState(false);
    const history = useHistory();

    const dispatch = useAuthDispatch();
    const authState = useAuthState();

    const usernameValidator = (value) => {
        setUsername(value);
        let res = validUser(value)
        if (res === true) setValidUsername(true);
        else setValidUsername(false);
        return res;
    }

    const passwordValidator = (value) => {
        setPassword(value)
        let res = validNewPass(value)
        if (res === true) setValidPassword(true);
        else setValidPassword(false);
        confirmedPasswordValidator(confirmedPassword);
        return res;
    }

    const confirmedPasswordValidator = (value) => {
        setConfirmedPassword(value)
        let res = value === password || 'Passwords does not match'
        if (res === true) setValidConfirmedPassword(true);
        else setValidConfirmedPassword(false);
        return res;
    }

    const doLogin = async () => {
        if (validPassword && validUsername && validConfirmedPassword) {
            try {
                let response = await loginUser(dispatch, { username, password })
                if (!response.user) return;
                history.push('/dashboard');
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleLogin = () => {
        doLogin()
    }

    useEffect(() => {
        if (!authState.user) {
            history.push('/');
        }
    }, []);

    return (
        <Container max="50rem">
            <Panel border="1px solid var(--color-g)" color="transparent" padding="4rem">
                <Stack>
                    <H2>Welcome!</H2>
                    <p>Here you can create new admin accounts</p>
                    <div>
                        <Input id="admin-signup-username" value={username} type="username" label="Username" validator={usernameValidator}/>
                    </div>
                    <div>
                        <Input id="admin-signup-password" value={password} type="password" label="Password" validator={passwordValidator}/>
                        <Input id="admin-signup-password-confirm" value={confirmedPassword} type="password" label="Confirm Password" validator={confirmedPasswordValidator}/>
                    </div>
                    <div>
                        <Button disabled={!validUsername || !validPassword || !validConfirmedPassword} action={handleLogin}>
                            <ButtonText>Sign up</ButtonText>
                        </Button>
                    </div>
                </Stack>
            </Panel> 
        </Container>       
    );
}


export default LoginForm;