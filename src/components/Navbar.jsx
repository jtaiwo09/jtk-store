import React, { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import { mobile } from '../responsive';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'universal-cookie';

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
    ${mobile({ fontSize: '18px'})}
`;
const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    ${mobile({ justifyContent: 'flex-end', flex: 2, marginRight: 5, alignItems: 'center'})}
`;
const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    border: 0.5px solid lightgray;
    margin-left: 25px;
    padding: 5px;
    ${mobile({marginLeft: '5px'})}
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
const UserWrapper = styled.div`
    position: relative;
`
const UserDetails = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    ${mobile({ fontSize: '14px'})}
`;
const UserMenu = styled.div`
    background-color: white;
    box-shadow: 3px 9px 13px -2px rgba(0,0,0,0.30);
    z-index: 3000;
    position: absolute;
    width: 100%;
`
const UserMenuItem = styled.div`
    margin: 5px 10px;
`
const LogoutBtn = styled.div`
    background-color: red;
    color: white;
    padding: 10px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
    ${mobile({ fontSize: '14px', padding: 5})}
`
const cookies = new Cookies();

const Navbar = () => {
    const quantity = useSelector(state=> state.cart.quantity);
    const user = useSelector(state => state.user.currentUser)
    const [userMenu, setUserMenu] = useState(false);

    const handleLogout =()=> {
        cookies.remove('accessToken');
        window.location.reload();
        localStorage.removeItem('persist:root');
    }
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
                        <Logo>JTK-Store</Logo>
                    </Link>
                </Center>
                <Right>
                    {
                        !user && (
                            <>
                                <Link to='/register' className='link'>
                                    <MenuItem>Register</MenuItem>
                                </Link>
                                <Link to='/login' className='link'>
                                    <MenuItem>Sign In</MenuItem>
                                </Link>
                            </>
                        )
                    }
                    {
                        user && (
                            <UserWrapper>
                                <UserDetails onClick={()=> setUserMenu(prevState => !prevState)}>
                                    <PersonOutlineIcon style={{marginLeft: 3}}/>
                                        <span>Welcome, {user.username.length > 5 ? `${user.username.charAt(0).toUpperCase()+user.username.substring(1, 5)}...` : user.username.charAt(0).toUpperCase()+user.username.substring(1)}</span>
                                    <KeyboardArrowDownIcon style={{fontSize: 14}}/>
                                </UserDetails>
                                {
                                    userMenu && (
                                        <UserMenu>
                                            <UserMenuItem>
                                                <LogoutBtn onClick={handleLogout}>
                                                    <LogoutIcon style={{fontSize: 16, marginRight: '16px'}}/>
                                                    Logout
                                                </LogoutBtn>
                                            </UserMenuItem>
                                        </UserMenu>
                                    )
                                }
                            </UserWrapper>
                        )
                    }
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
