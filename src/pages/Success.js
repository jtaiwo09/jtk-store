import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;
const H1 = styled.h1`
    font-size: 20;
`;
const Success = () => {
    return (
        <Container>
            <H1>PAYMENT SUCCESSFUL</H1>
        </Container>
    )
} 

export default Success;
