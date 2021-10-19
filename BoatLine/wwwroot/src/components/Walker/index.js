import './styled.css';
import { Children, useState } from "react";

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
        <div className="walker">
            <div className="walker__info">
                <h2>{title}</h2>
                <span>Page: {activePage}/{children.length}</span>
            </div>
            <form  className="walker__form">
                <Page>
                    {children[activePage - 1]}
                </Page>
            </form>
            <div className="walker__message">{message}</div>
            <div className="walker__actions">
                <button className="walker__button" onClick={previousPage} disabled={activePage === 1}>Previous</button>
                <button disabled={activePage >= pages} className="walker__button" onClick={nextPage}>{activePage === children.length ? confirmMessage ? confirmMessage : 'Confirm' : 'Next'}</button>
            </div>
        </div>
    );
}

export default Walker;