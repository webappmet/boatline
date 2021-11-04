import { useHistory } from 'react-router';
import { useState } from 'react/cjs/react.development';
import styled from 'styled-components';
import { ReactComponent as BoatIcon } from '../assets/Boat.svg';
import { ReactComponent as ArrowUp } from '../assets/ArrowUp.svg';
import { ReactComponent as ArrowDown } from '../assets/ArrowDown.svg';
import Cabin from '../components/content/Cabin';
import Panel from '../components/interface/module/Panel';
import Flex from '../components/layout/Flex';
import Stack from '../components/layout/Stack';
import Align from '../components/layout/Align';
import H3 from '../components/type/H3';

const Ship = () => {
    const [activeFloor, setActiveFloor] = useState(1);
    const history = useHistory();

    const editCabin = (id) => {
        history.push(`/cabin/${id}/edit`);
    }

    const floorUp = () => {
        setActiveFloor(Math.min(3, activeFloor + 1))
    }

    const floorDown = () => {
        setActiveFloor(Math.max(1, activeFloor - 1))
    }

    return (
        <Stack>
            <Panel color="var(--color-gw)" radius="1rem" padding="4rem">
                <Grid>
                    <Wrapper>
                        <Overlay>
                            {[...Array(26).keys()].map((value) => {
                                return <Cabin action={editCabin} key={value} number={value + 1} floor={activeFloor} />
                            })}   
                        </Overlay>
                        <BoatIcon />
                    </Wrapper>
                    <Align align="center">
                        <Flex align="center">
                            <Stack>
                                <FloorButton onClick={floorUp}><ArrowUp /></FloorButton>
                                <FloorButton onClick={floorDown}><ArrowDown /></FloorButton>
                            </Stack>
                            <H3 weight="400" size="2.8rem">{activeFloor} / 3</H3>
                        </Flex>
                    </Align>
                </Grid>
            </Panel>
        </Stack>
    );
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 20rem;
    gap: 2rem;
    align-items: center;

    @media(max-width: 800px) {
        grid-template-rows: 1fr;
    }
`

const Wrapper = styled.div`
    position: relative;
`

const Overlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(46, 1fr);
    grid-template-rows: repeat(12, 1fr);
`

const FloorButton = styled.button`
    height: 4.5rem;
    width: 4.5rem;
    background-color: transparent;
    border: none;

    &:hover {
        
    }
`

export default Ship;