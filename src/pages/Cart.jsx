import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { mobile } from '../responsive';
import {useDispatch, useSelector} from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import {userRequest} from '../requestMethods';
import {useHistory} from 'react-router-dom';
import { increaseCartQuantity } from '../redux/cartRedux';
import { notification } from 'antd';
import 'antd/dist/antd.css';

const Container = styled.div``;
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: 10 })}
`;
const Title = styled.h1`
    text-align: center;
    font-weight: 300;
`;
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px;
`;
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === 'filled' && 'none'};
    background-color: ${props => props.type === 'filled' ?'black' : 'transparent'};
    color: ${props => props.type === 'filled' && 'white'};
`;
const TopTexts = styled.div``;
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
    ${mobile({ display: 'none' })}
`;
const Bottom = styled.div`
display: flex;
justify-content: space-between;
${mobile({ flexDirection: 'column' })}
`;

const Info = styled.div`
    flex: 3;
`;
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    ${mobile({ flexDirection: 'column' })}
`;
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;
const Image = styled.img`
    width: 200px;
`;
const Details = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=> props.color};
`;
const ProductSize = styled.div``;
const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;
`;
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: '5px 15px' })}
`;
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: '20px' })}
`;
const H1 = styled.h1`
    background-color: #eee;
    border: none;
    height: 1px;
`;
const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`;
const SummaryTitle = styled.h1`
    font-weight: 200;
`;
const SummaryItem = styled.div`
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=> props.type === 'total' && '500'};
    font-size: ${props=> props.type === 'total' && '24px'};
`;
const SummaryItemText = styled.span`
    
`;
const SummaryItemPrice = styled.span`
    
`;
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #000;
    color: #fff;
    font-weight: 600;
    border: none;
    cursor: pointer;
`;

const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const dispatch = useDispatch()
    const history = useHistory();

    const onToken=(token)=> {
        setStripeToken(token)
    }
    useEffect(() => {

        const makeRequest= async () =>{
            try {
                const res = await userRequest.post('/checkout/payment', {
                tokenId: stripeToken.id,
                amount: cart.total * 100
            });
            console.log(res.data)
            history.push('/success');
            } catch (error) {
                console.log(error)
            }
        }
        stripeToken && makeRequest();
    }, [stripeToken, cart.total, history])

    const handleClick =()=> {
        history.goBack();
    }

    const handleQuantity = async (type, id, title)=> {
        await dispatch(increaseCartQuantity({type, id}))
        const prod = cart.products.find(item => item._id === id );
            if(prod.quantity <= 1){
                notification['success']({
                    message: '1 Item removed from cart',
                    description: title
                });
            }
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>YOUR CART</Title>
                <Top>
                    <TopButton onClick={handleClick}>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag({cart.quantity})</TopText>
                        <TopText>Your Wishlist(0)</TopText>
                    </TopTexts>
                    <TopButton type='filled'>CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {
                            cart.products.map(product => <><Product key={product._id}>
                            <ProductDetail>
                                <Image src={product.img} />
                                <Details>
                                    <ProductName><b>Product: </b>{product.title}</ProductName>
                                    <ProductId><b>ID: </b>{product._id}</ProductId>
                                    <ProductColor color={product.color}/>
                                    <ProductSize><b>Size: </b>{product.size}</ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <RemoveIcon onClick={()=> handleQuantity('dec', product._id, product.title)} />
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                    <AddIcon onClick={()=> handleQuantity('inc', product._id)} />
                                </ProductAmountContainer>
                                <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                            </PriceDetail>
                        </Product>
                        <H1 />
                        </>
                        )}
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type='total'>
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        { stripeToken ? <span>Making payment please wait...</span> : (
                            <StripeCheckout
                            name='JTK-Store'
                            image='https://avatars.githubusercontent.com/u/1486366?v=4'
                            billingAddress
                            shippingAddress
                            description={`Your tohtal is $${cart.total}`}
                            amount={cart.total * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <Button>CHECKOUT NOW</Button>
                        </StripeCheckout>
                        )}
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart
