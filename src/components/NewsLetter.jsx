import React from 'react'
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import { mobile } from '../responsive';

const Container = styled.div`
    background-color: #f6f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 60vh;
    padding: 0 10px;
`;
const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
`;
const Desc = styled.div`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    ${mobile({ textAlign: 'center'})}
`;
const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    border: 1px solid lightgray;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: '80%'})}
`;
const Input = styled.input`
    flex: 8;
    border: none;
    padding-left: 20px;
`;
const Button = styled.button`
    flex: 1;
    border: none;
    background-color: teal;
    color: white;
`;

const NewsLetter = () => {
    return (
        <Container>
            <Title>Newsletter</Title>
            <Desc>Get timely update for your favourite products.</Desc>
            <InputContainer>
                <Input placeholder='Email'/>
                <Button>
                    <SendIcon />
                </Button>
            </InputContainer>
        </Container>
    )
}

export default NewsLetter
