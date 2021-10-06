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
        updateQty: (state, action)=> {
            if(action.payload.type === 'dec'){
                state.products.find(item=> item._id === action.payload.id).quantity -= 1;
                state.total += action.payload.price * action.payload.quantity;
            } else {
                state.products.find(item=> item._id === action.payload.id).quantity += 1;
                state.total += action.payload.price * action.payload.quantity;
            }
        }
    }
});

export const { addProduct, updateQty } = cartSlice.actions;
export default cartSlice.reducer;