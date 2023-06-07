import { useNavigate } from "react-router-dom";
import { ProductItem } from "../../reducers/product";
interface Props {
  products?: ProductItem[];
}

const ListProduct: React.FC<Props> = ({ products }) => {
  const navigate = useNavigate();
  console.log("products",products)
  const handleClick = (id: string) => {
    console.log("id",id)
    navigate("/view-product",{state:{id}});
  };
  return (
    <div>
      {products?.map((product: ProductItem) => (
        <div
          key={product._id}
          onClick={() => handleClick(product._id)}
          style={{
            border: "1px solid #ccc",
            padding: "20px",

            cursor: "pointer",
            width: "30%",
            margin: "auto",
            marginBottom: "10px",
          }}
        >
          <h3>{product.productName}</h3>
          <p>Price: ${product.productPrice}</p>
          <p>Description: {product.productDescription}</p>
          <p>Color: {product.productColor}</p>
          <p>Count: {product.productCount}</p>
        </div>
      ))}
    </div>
  );
};

export default ListProduct;
