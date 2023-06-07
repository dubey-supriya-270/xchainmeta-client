import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../contexts/Loading";
import { ProductContext } from "../../contexts/Product";
import { ProductItem } from "../../reducers/product";
import { getAllProduct } from "../../actions/product";
import ListProduct from "./ListProduct";
import { Button } from "../Common/Button/Button";
import { useNavigate } from "react-router-dom";
import useUserDetails from "../../hooks/useUserDetails";


const ProductDetails = ()=>{
    const { state: loadingState, dispatch: loadingDispatch } = useContext(
        // context of loader
        LoadingContext
      );
      //Get the state and the dispatch properties form  and rename them to productState and productDispatch resp.
      const { state: productState, dispatch: productDispatch } = useContext(
        // context of payeeOnBoarding
        ProductContext
      );

      const [product,setProduct] = useState<ProductItem[]>();
      const navigate = useNavigate();

      useUserDetails();

      useEffect(()=>{
        getAllProductDetails();
      },[])

     const getAllProductDetails = async ()=>{
        await getAllProduct()(productDispatch,loadingDispatch);
     }

     useEffect(()=>{
       setProduct(productState.getAllProduct)
     },[productState.getAllProduct]);

     const handleClick = () =>{
        navigate('/create-product');
     }

return <>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',margin:'10px'}}>
<h2>Explore Products</h2>
<Button value="Add Product" handleClick={handleClick} id="add_product_button" />
</div>
<ListProduct products={product} />

</>
}

export default ProductDetails;