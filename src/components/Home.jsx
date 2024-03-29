import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
// import { useGetAllProductsQuery } from "../features/productsApi"

const Home = () => {
 const {items: data, status} = useSelector((state) => state.products);
  
  // const {data, error, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    navigate("/cart")
  }

  return (
    <div className="home-container">
      { status === "success" ? (
        <>
        <h2>New Arrivals</h2>
        <div className="products">
          { data &&
          data?.map( (product) => (
          <div key={product._id} className="product">
            <h3>{product.name}</h3>
            <Link to = {`/product/${product._id}`}>
              <img src={product.image?.url} alt={product.name} />
            </Link>
            <div className="details">
              <span>{product.desc}</span>
              <span className = "price">{product.price}</span>
            </div>
            <div>
              <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
            </div>
          </div>
          ))}
        </div>
        </>
          ) : status === "pending" ? (
              <p>Loading...</p>
            ) : (
              <p>An error occurred.</p>
            ) 

      }
          </div>
  )
}

export default Home