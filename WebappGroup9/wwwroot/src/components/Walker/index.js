import './styled.css';
import { Children, useState, useEffect } from "react";

const Page = ({ children }) => {
    return (
        <div className="page">
            {Children.map(children, (child) => {
                return (<div className="content">{child}</div>);
            })}
        </div>
    );
}

const Walker = ({ confirm, title, children, message, setMessage }) => {

    const [activePage = 1, setActivePage] = useState();
    const [totalPages, setTotalPages] = useState(children.length)

    const nextPage = () => {
        if (activePage < totalPages) setActivePage(activePage + 1)
        else {
            const message = confirm();
            if (message) setMessage(message);
        }
    }

    const previousPage = () => {
        if (activePage >= 1) setActivePage(1)
        else setActivePage(activePage - 1)
    }

    return (
        <div className="walker">
            <div className="walker__info">
                <h2>{title}</h2>
                <span>Page: {activePage}/{totalPages}</span>
            </div>
            <form className="walker__form">
                <Page>
                    {children[activePage - 1]}
                </Page>
            </form>
            <div className="walker__message">{message}</div>
            <div className="walker__actions">
                <button className="walker__button" onClick={previousPage} disabled={activePage === 1}>Previous</button>
                <button className="walker__button" onClick={nextPage}>{activePage === totalPages ? 'Confirm' : 'Next'}</button>
            </div>
        </div>
    );
}

export default Walker;