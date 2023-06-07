import { useContext, useState } from "react";
import { Form } from "../Common/Form/Form";
import { TextField } from "../Common/TextField/TextField";
import { ProductItem } from "../../reducers/product";
import { Button } from "../Common/Button/Button";
import { createProduct } from "../../actions/product";
import { ProductContext } from "../../contexts/Product";
import { LoadingContext } from "../../contexts/Loading";
import useUserDetails from "../../hooks/useUserDetails";
import { useNavigate } from "react-router-dom";


const CreateProduct:React.FC = ()=>{
     //Get the state and the dispatch properties form the UserContext and rename them to productState and productDispatch resp.
  const { state: productState, dispatch: productDispatch } = useContext(ProductContext);
  //Get the state and the dispatch properties form the LoadingContext and rename them to loadingState and loadingDispatch resp.
  const {  dispatch: loadingDispatch } =
    useContext(LoadingContext);
    useUserDetails();
    const navigate = useNavigate();
    const [product,setProduct] = useState<Omit<ProductItem,  "userId" | "_id">>({
        
        productName:'',
        productDescription:'',
        productCount:0,
        productPrice:0,
        productColor:'',
    });

    const [error,setError] = useState<string>('')

    const handleChange = (e:any)=>{
        setError("")
        setProduct({
            ...product,
            [e.target.name] : e.target.value,
        
        });
        
    }

    const handleClick = async () => {
       
        if (product.productColor !== '' && product.productName !== '' && product.productDescription !== '' && product.productCount !== 0 && product.productPrice !== 0) {
          await createProduct(product)(productDispatch, loadingDispatch).then(()=>{
            navigate("/product")
          });
        }
        else{
            setError("Please fill all details")
        }
      };

    return <Form>
     
      <h2>Create Product</h2>

      <div className="form-content">
        <div className="textfield-wrapper">
          <TextField
            value={product.productName}
            placeholder="Enter Product Name"
            label="Product Name"
            name="productName"
            handleChange={(e) => handleChange(e)}
            id="product_name_input_field"
            
          />
        
        </div>

        <div className="textfield-wrapper">
          <TextField
            value={product.productDescription}
            placeholder="Enter Product Description"
            label="Product Description"
            handleChange={(e) =>handleChange(e)}
            id="product_description_input_field"
            type= "text"
            name="productDescription"
          />
         
        </div>
        <div className="textfield-wrapper">
          <TextField
            value={product.productPrice}
            placeholder="Enter Product Price"
            label="Product Price"
            handleChange={(e) =>handleChange(e)}
            id="product_price_input_field"
            type= "text"
            name="productPrice"
          />
         
        </div>
        <div className="textfield-wrapper">
          <TextField
            value={product.productColor}
            placeholder="Enter Product Color"
            label="Product Color"
            handleChange={(e) =>handleChange(e)}
            id="product_color_input_field"
            type= "text"
            name="productColor"
          />
         
        </div>
        <div className="textfield-wrapper">
          <TextField
            value={product.productCount}
            placeholder="Enter Product Count"
            label="Product Count"
            handleChange={(e) =>handleChange(e)}
            id="product_count_input_field"
            type= "text"
            name="productCount"
          />
         
        </div>

        <Button value="Submit" handleClick={handleClick} id="submit_button" />

        <p className="sign-in-error">{productState.addProductError}</p>

        <p className="sign-in-error">{error}</p>

        <p className="">{productState.addProduct}</p>

      </div>
     </Form>
}

export default CreateProduct;


