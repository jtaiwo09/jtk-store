import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: '75%' })};
`;
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
const Input = styled.input`
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;

    /* &:focus {
        border: none;
    } */
`;
const Button = styled.button`
    width: 40%;
    background-color: teal;
    color: white;
    padding: 15px 20px;
    border: none;
    cursor: pointer;
    margin-bottom: 10px;
`;

const Link = styled.a`
    margin: 5px 0;
    text-decoration: underline;
    cursor: pointer;
    font-size: 12px;
`;

const Login = () => {
    return (
        <>
        <Navbar />
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input placeholder='Username' />
                    <Input placeholder='Password'/>
                    <Button>CREATE</Button>
                    <Link>FORGOT YOUR PASSWORD?</Link>
                    <Link>CREATE A NEW ACCOUNT</Link>
                </Form>
            </Wrapper>
        </Container>
        <Footer />
        </>
    )
}

export default Login
