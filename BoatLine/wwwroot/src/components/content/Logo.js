import styled from 'styled-components';
import TextLink from '../interface/control/TextLink';

const Logo = () => {
    return (
        <TextLink>
            <LogoText>BoatLine</LogoText>
        </TextLink>
    );
}

const LogoText = styled.h1`
    margin: 0;
    font-size: 4rem;
`;

export default Logo;