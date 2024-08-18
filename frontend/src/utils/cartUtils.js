export const addDecimals = (num) => {
    return (Math.round(num * 100)/100).toFixed(2);
};

export const updateCart = (state) => {
    //calculating items prcie
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

    //calculating shipping prcie
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10); 
    //calculating tax prcie

    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
    //calculating total prcie
    state.totalPrice = (
        Number(state.itemsPrice) + 
        Number(state.shippingPrice) +
        Number(state.taxPrice)

    ).toFixed(2);
    localStorage.setItem('cart', JSON.stringify(state));
    return state;

 }