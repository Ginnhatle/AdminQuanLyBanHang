import React, {createContext, useEffect, useState} from 'react';

export const CartContext = createContext();
const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const [itemAmount, setItemAmount] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (cart) {
            const amount = cart.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.amount;
            }, 0);
            setItemAmount(amount);
        }
    }, [cart])

    useEffect(() => {
        const total = cart.reduce((accumulator, curentItem) => {
            return accumulator + curentItem.price * curentItem.amount
        }, 0);
        setTotal(total);
    })

    const addToCart = (product, id) => {
        const newItem = {...product, amount: 1};
        const cartItem = cart.find((item) => {
            return item.id === id;
        })
        if (cartItem) {
            const newCart = [...cart].map(item => {
                if (item.id === id) {
                    return {...item, amount: cartItem.amount + 1};
                } else {
                    return item;
                }
            });
            setCart(newCart)
        } else {
            setCart([...cart, newItem])
        }
    };

    const removeFromCart = (id) => {
        const newCart = cart.filter((item) => {
            return item.id !== id;
        });
        setCart(newCart);
    };

    const clearCart = () => {
        setCart([])
    }

    const inCeaseAmount = (id) => {
        const item = cart.find((item) => item.id === id);
        addToCart(item, id)
    }

    const decreaseAmount = (id) => {
        const cartItem = cart.find((item) => {
            return item.id == id;
        })
        if (cartItem) {
            const newCart = cart.map(item => {
                if (item.id === id) {
                    return {...item, amount: cartItem.amount - 1};
                } else {
                    return item;
                }
            })
            setCart(newCart);
        }
        if (cartItem.amount < 2) {
            return removeFromCart(id);

        }
    }

    return <CartContext.Provider
        value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            inCeaseAmount,
            decreaseAmount,
            itemAmount,
            total
        }}>{children}</CartContext.Provider>;
};

export default CartProvider;
