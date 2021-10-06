import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { useHistory } from 'react-router';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;
const Button = styled.button`
    padding: 10px 15px;
    color: #fff;
    background-color: #000;
    border-radius: 5px;
`;

const KEY = REACT_APP_STRIPE;
const Pay = () => {
    const [stripeToken, setStripeToken] = useState(null);
    const history = useHistory()

    const onToken=(token)=> {
        setStripeToken(token)
    }
    useEffect(() => {

        const makeRequest= async () =>{
            try {
                const res = await axios.post('http://localhost:3000/api/checkout/payment', {
                tokenId: stripeToken.id,
                amount: 2000
            });
            console.log(res.data)
            history.push('/success');
            } catch (error) {
                console.log(error)
            }
        }
        stripeToken && makeRequest();
    }, [stripeToken, history])
    return (
        <Container>
            { stripeToken ? <span>Making payment please wait...</span> : (
                <StripeCheckout
                name='Taiwo Shop'
                image='https://avatars.githubusercontent.com/u/1486366?v=4'
                billingAddress
                shippingAddress
                description='Your total is $20'
                amount={2000}
                token={onToken}
                stripeKey={KEY}
            >
                <Button>Pay Now</Button>
            </StripeCheckout>
            )}
        </Container>
    )
} 

export default Pay;
