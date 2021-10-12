import React, { useEffect, useState } from 'react'
// import { popularProducts } from '../data';
import styled from 'styled-components';
import Product from './Product';
// import axios from 'axios';
import { publicRequest } from '../requestMethods';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    justify-content: space-between;
`;

const Products = ({ filters, cat, sort }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await publicRequest.get(cat ? `/products?category=${cat}` : "/products")
                setProducts(res.data);
            } catch (error) {

            }
        }
        getProducts();
    }, [cat])

    useEffect(() => {
        cat && setFilteredProducts(products.filter(item => Object.entries(filters).every(([key, value]) => item[key].includes(value))))
    }, [cat, products, filters]);

    useEffect(() => {
        if (sort === 'newest') {
            setFilteredProducts(prev => [...prev].sort((a, b) => a.createdAt - b.createdAt))
        }
        else if (sort === 'asc') {
            setFilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price))
        }
        else {
            setFilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price))
        }
    }, [sort]);
    return (
        <Container>
            {cat ? filteredProducts.map(item => (
                <Product item={item} key={item._id} />
            )) : products.map(item => (
                <Product item={item} key={item._id} />
            ))}
        </Container>
    )
}

export default Products
