import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import { mobile } from '../responsive';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

const Container = styled.div`
    height: 60px;
    ${mobile({ height: '50px'})}

`;
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: '10px 0'})}
`;
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;
const Language = styled.span`
    cursor: pointer;
    font-size: 14px;
    ${mobile({ display: 'none'})}
`;
const Center = styled.div`
    flex: 1;
`;
const Logo = styled.h1`
    text-align:center;
    font-weight: bold;
    ${mobile({ fontSize: '24px'})}
`;
const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    ${mobile({ justifyContent: 'center', flex: 2})}
`;
const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    border: 0.5px solid lightgray;
    margin-left: 25px;
    padding: 5px;
`;
const Input = styled.input`
    border: none;
    ${mobile({ width: '50px'})}
`;
const MenuItem = styled.div`
    margin-left: 25px;
    cursor: pointer;
    ${mobile({ fontSize: '12px', marginLeft: '10px'})}
`;

const Navbar = () => {
    const quantity = useSelector(state=> state.cart.quantity);

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder='Search' />
                        <SearchIcon style={{color: 'gray', fontSize: 16}}/>
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to='/' className='link'>
                        <Logo>LAMA.</Logo>
                    </Link>
                </Center>
                <Right>
                    <Link to='/register' className='link'>
                        <MenuItem>Register</MenuItem>
                    </Link>
                    <Link to='/login' className='link'>
                        <MenuItem>Sign In</MenuItem>
                    </Link>
                    <Link to='/cart' className='link'>
                        <MenuItem>
                            <Badge badgeContent={quantity} color='primary'>
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
