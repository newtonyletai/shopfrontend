import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { addToCart } from '../../../features/cartSlice';
import { url, setHeaders} from '../../../features/url';

const Product = () => {
    const param = useParams()
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        setLoading(true)
        async function fetchData() {
            try {
                const res = await axios.get(`${url}/products/find/${param.id}`, setHeaders())
                setProduct(res.data);
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
        navigate('/cart')
    }

    return ( 
        <StyledProduct>
            <ProductContainer>
                {loading ? (
                    <p>Loading</p>
                ) : (
                    <>
                    <ImageContainer>
                        <img src={product.image?.url} alt="product" />
                    </ImageContainer>
                    <ProductDetails>
                        <h3>{product.name}</h3>
                        <p><span>Brand: </span>{product.name}</p>
                        <p><span>Description: </span>{product.desc}</p>
                        <Price>${product.price?.toLocaleString()}</Price>
                        <button className='product-add-to-cart' onClick={() => handleAddToCart(product)}>
                            Add To Cart
                        </button>
                    </ProductDetails>
                    </>
        )
    }
            </ProductContainer>
        </StyledProduct>
    );
}
 
export default Product;

const StyledProduct = styled.div`
    margin: 3rem;
    display: flex;
    justify-content: center;
`
const ProductContainer = styled.div`
    max-width: 500px;
    width: 100%;
    height: auto;
    display: flex;
    box-shadow: rgba(100, 100, 111, 0.2) 0px, 7px, 29px 0px;
    border-radius: 5px;
    padding: 2rem;
`
const ImageContainer = styled.div`
    flex: 1;
    img {
        width: 100%;
    }
`
const ProductDetails = styled.div`
    flex: 2;
    margin-left: 2rem;
    h3 {
        font-size: 14px;
    }
    p span {
        font-weight: bold;
    }
`
const Price = styled.div`
    margin: 1rem 0;
    font-size: 24px;
    font-weight: bold;
`