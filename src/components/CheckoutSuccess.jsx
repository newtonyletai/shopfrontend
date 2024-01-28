import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getTotals } from "../features/cartSlice";

const CheckoutSuccess = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);


    useEffect(() => {
        dispatch(clearCart())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTotals())
    }, [cart, dispatch]);

    return ( 
        <Container>
            <h2>Checkout Successful</h2>
            <p>Your order might take time to process.</p>
            <p>Check your order status at your profile after about 5 mins.</p>
            <p>
                Incase of any inquires contact support at {" "}
                <strong>support@cakeshop.com</strong>
            </p>
        </Container>
     );
}
 
export default CheckoutSuccess;

const Container = styled.div`
    min-height: 80vh;
    max-width: 800px;
    width: 100%;
    margin:auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h2 {
        margin-bottom: 0.5rem;
        color: #029e02;
    }
`