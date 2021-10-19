import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { 
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        increaseCartQuantity: (state, action)=> {
            const product = state.products.find(item => item._id === action.payload.id);
            const productIndex = state.products.findIndex(item => item._id === action.payload.id);

            if(action.payload.type === 'dec'){
                if(product.quantity <= 1){
                    state.products.splice(productIndex, 1);
                    state.quantity--;
                    state.total -= product.price;
                } else {
                    product.quantity--;
                    state.total -= product.price;
                }
            } else if(action.payload.type === 'inc'){
                product.quantity++;
                state.total += product.price;
            }
            
        }
    }
});

export const { addProduct, increaseCartQuantity } = cartSlice.actions;
export default cartSlice.reducer;