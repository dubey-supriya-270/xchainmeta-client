import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../contexts/Loading";
import { ProductContext } from "../../contexts/Product";
import { getProductById } from "../../actions/product";
import { ProductItem } from "../../reducers/product";
import { useLocation } from "react-router-dom";
interface Props{
  id: string;
}
const ViewProduct: React.FC<Props> = ()  => {
    const [product, setProduct] = useState<ProductItem>();
    const location = useLocation()
    const { state: loadingState, dispatch: loadingDispatch } = useContext(
      // context of loader
      LoadingContext
    );
    //Get the state and the dispatch properties form the PAYEEONBAORDING and rename them to transactionsState and transactionsDispatch resp.
    const { state: productState, dispatch: productDispatch } = useContext(
      // context of payeeOnBoarding
      ProductContext
    );

    useEffect(() => {
      getProductDetailsById(location.state.id)
    }, [location.state.id]);

    const getProductDetailsById = async (id: string) => {
       await getProductById(id)(productDispatch,loadingDispatch);
    }

    useEffect(()=>{
      setProduct(productState.getProductById)
    },[productState.getProductById])
  
    if (!product) {
      return <div>Loading...</div>;
    }
  
    return (
      <div style={{
        border: "1px solid #ccc",
        padding: "20px",
        
        cursor: "pointer",
        width: "30%",
       
        margin:"10px auto 10px"
      }}>
        <h2>{product.productName}</h2>
        <p>Price: ${product.productPrice}</p>
        <p>Description: {product.productDescription}</p>
        <p>Color: {product.productColor}</p>
        <p>Count: {product.productCount}</p>
      </div>
    );
  };
  
  export default ViewProduct;
  

  