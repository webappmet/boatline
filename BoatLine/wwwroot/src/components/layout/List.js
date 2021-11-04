import styled from "styled-components";
import { Children, useEffect } from "react";
import { useState } from "react/cjs/react.development";
import Stack from "./Stack";
import Flex from './Flex';
import Button, { Text as ButtonText } from "../interface/control/Button";
import P from "../type/P";

const List = ({ children, count = 10, gap = '.5rem', navigable = true }) => {
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const childArray = Children.toArray(children);

    const previousPage = () => {
        setPage(Math.max(1, page - 1))
    }

    const nextPage = () => {
        setPage(Math.min(pages, page + 1))
    }

    useEffect(() => {
        if (page > pages) setPage(1);
    }, [pages])

    useEffect(() => {
        setPages(Math.ceil(childArray.length / count))
    }, [childArray]);

    return (
        <Stack>
            <Styled style={{
                '--list-gap' : gap
            }}>
                {Children.map(childArray, (child, index) => {
                    return (
                        <>
                            {index < (count * page) && index >= (count * page - count) ? <li key={index}>{child}</li> : ''}
                        </>
                    );
                })}
            </Styled>
            {pages > 1 && navigable ? 
            <Flex>
                <Button disabled={page === 1} action={previousPage}>
                    <ButtonText>
                        Previous
                    </ButtonText>
                </Button>
                <P>{page}/{pages}</P>
                <Button disabled={page === pages} action={nextPage}>
                    <ButtonText>
                        Next
                    </ButtonText>
                </Button>
            </Flex> : ''}
        </Stack>
    );
}

const Styled = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--list-gap);
`

export default List