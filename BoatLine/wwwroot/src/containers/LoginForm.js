import Panel from '../components/interface/module/Panel';
import Input from '../components/interface/control/Input';
import { username as validUser, password as validPass } from '../scripts/validator';

import H2 from '../components/type/H2';
import Container from '../components/layout/Container';
import Stack from '../components/layout/Stack';
import Button, { Text as ButtonText } from '../components/interface/control/Button';
import TextLink from '../components/interface/control/TextLink';

import { useState } from 'react';
import { useAuthState, useAuthDispatch } from '../context/user';
import { loginUser } from '../api/auth';
import { useHistory } from 'react-router';
import { useToastDispatch } from '../context/toast';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const history = useHistory();

    const dispatch = useAuthDispatch();
    const toastDispatch = useToastDispatch();

    const usernameValidator = (value) => {
        setUsername(value);
        let res = validUser(value)
        if (res === true) setValidUsername(true);
        else setValidUsername(false);
        return res;
    }

    const passwordValidator = (value) => {
        setPassword(value)
        let res = validPass(value)
        if (res === true) setValidPassword(true);
        else setValidPassword(false);
        return res;
    }

    const doLogin = async () => {
        if (validPassword && validUsername) {
            try {
                let user = await loginUser(dispatch, { username, password })
                if (!user) {
                    toastDispatch({ type: 'SHOW_MESSAGE', payload: { message: 'Username or password and password does not match', timer: 4000 } })
                    return;
                }
                history.push('/dashboard');
            } catch (error) {
                toastDispatch({ type: 'SHOW_MESSAGE', payload: { message: 'Something went wrong', timer: 3000 } })
            }
        }
    }

    const handleLogin = () => {
        doLogin()
    }

    return (
        <Container max="50rem">
            <Panel border="1px solid var(--color-g)" color="transparent" padding="4rem">
                <Stack>
                    <H2>Welcome Back!</H2>
                    <p>Confused? This is the admin login form. Tickets can be purchased <TextLink to="/order">here</TextLink></p>
                    <div>
                        <Input id="admin-login-username" value={username} type="username" label="Username" validator={usernameValidator}/>
                        <Input id="admin-login-password" value={password} type="password" label="Password" validator={passwordValidator}/>
                    </div>
                    <div>
                        <Button disabled={!validUsername || !validPassword} action={handleLogin}>
                            <ButtonText>Login</ButtonText>
                        </Button>
                    </div>
                </Stack>
            </Panel> 
        </Container>       
    );
}


export default LoginForm;