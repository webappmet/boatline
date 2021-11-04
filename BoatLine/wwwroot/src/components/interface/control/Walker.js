import { Children, useState } from "react";
import Panel from '../module/Panel';
import Stack from '../../layout/Stack'
import Flex from '../../layout/Flex';
import Button, { Text as ButtonText } from '../control/Button';
import H2 from '../../type/H2';
import P from '../../type/P';
import Message from './Message';

const Page = ({ children }) => {
    return (
        <div className="page">
            {Children.map(children, (child) => {
                return (<div className="content">{child}</div>);
            })}
        </div>
    );
}

const Walker = ({ confirm, title, children, message, setMessage, confirmMessage, pages }) => {

    const [activePage = 1, setActivePage] = useState();

    const nextPage = () => {
        if (activePage < children.length && activePage < pages) setActivePage(activePage + 1)
        else {
            if (children.length >= pages) return
            const message = confirm();
            if (message) setMessage(message);
        }
    }

    const previousPage = () => {
        if (activePage <= 1) setActivePage(1)
        else setActivePage(activePage - 1)
    }

    return (
        <Panel padding="4rem" radius="1rem">
            <Stack gap="5rem">
                <Flex>
                    <H2>{title}</H2>
                    <P>Page: {activePage}/{children.length}</P>
                </Flex>
                <form>
                    <Page>
                        {children[activePage - 1]}
                    </Page>
                </form>
                <Message type="error">{message}</Message>
                <Flex>
                    <Button action={previousPage} disabled={activePage === 1}>
                        <ButtonText>Previous</ButtonText>
                    </Button>
                    <Button action={nextPage} disabled={activePage >= pages}>
                        <ButtonText>{activePage === children.length ? confirmMessage ? confirmMessage : 'Confirm' : 'Next'}</ButtonText>
                    </Button>
                </Flex>
            </Stack>
        </Panel>
    );
}

export default Walker;