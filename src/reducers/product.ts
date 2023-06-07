import {
  GET_ALL_PRODUCT,
  GET_ALL_PRODUCT_ERROR,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID_ERROR,
  CREATE_PRODUCT,
  CREATE_PRODUCT_ERROR,
  ADD_ITEM_TO_CART,
  ADD_ITEM_TO_CART_ERROR,
} from "../actions/Types";

export interface ProductItem {
  _id: string;
  userId: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  productColor: string;
  productCount: number;
}
export type Actions =
  | {
      type: typeof GET_ALL_PRODUCT;
      payload: ProductItem[];
    }
  | {
      type: typeof GET_ALL_PRODUCT_ERROR;
      payload: string;
    }
  | {
      type: typeof GET_PRODUCT_BY_ID;
      payload: ProductItem;
    }
  | {
      type: typeof GET_PRODUCT_BY_ID_ERROR;
      payload: string;
    }
  | {
      type: typeof CREATE_PRODUCT;
      payload: string;
    }
  | {
      type: typeof CREATE_PRODUCT_ERROR;
      payload: string;
    }
  | {
      type: typeof ADD_ITEM_TO_CART;
      payload: string;
    }
  | {
      type: typeof ADD_ITEM_TO_CART_ERROR;
      payload: string;
    };

//ProductInterface to define the State type for the state of the reducer
interface ProductInterface {
  getAllProduct: ProductItem[];
  getAllProductError: string;
  getProductById: ProductItem;
  getProductByIdError: string;
  addProduct: string;
  addProductError: string;
  addItemToCart: string;
  addItemToCartError: string;
}

//State type for defining the state of the reducer
export type State = ProductInterface;

//Initial state of the reducer of type State
export const initialState: State = {
  getAllProduct: [],
  getAllProductError: "",
  getProductById: {
    _id:"",
    userId: "",
    productName: "",
    productPrice: 0,
    productDescription: "",
    productColor: "",
    productCount: 0,
  },
  getProductByIdError: "",
  addProduct: "",
  addProductError: "",
  addItemToCart: "",
  addItemToCartError: "",
};

//Product reducer which takes a state and an action param
export const Product = (state: State = initialState, action: Actions) => {
  //switch between action.type
  switch (action.type) {
    //if action is of type GET_ALL_PRODUCT  return the state  to the payload
    case GET_ALL_PRODUCT:
      return {
        ...state,
        getAllProduct: action.payload,
      };
    //if action is of type GET_ALL_PRODUCT_ERROR  return the state by setting error to the payload
    case GET_ALL_PRODUCT_ERROR:
      return {
        ...state,
        getAllProductError: action.payload,
      };

    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        getProductById: action.payload,
      };
    //if action is of type GET_PRODUCT_BY_ID_ERROR  return the state by setting error to the payload
    case GET_PRODUCT_BY_ID_ERROR:
      return {
        ...state,
        getProductByIdError: action.payload,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        addProduct: action.payload,
      };
    //if action is of type CREATE_PRODUCT_ERROR  return the state by setting error to the payload
    case CREATE_PRODUCT_ERROR:
      return {
        ...state,
        addProductError: action.payload,
      };
    case ADD_ITEM_TO_CART:
      return {
        ...state,
        addItemToCart: action.payload,
      };
    //if action is of type ADD_ITEM_TO_CART_ERROR  return the state by setting error to the payload
    case ADD_ITEM_TO_CART_ERROR:
      return {
        ...state,
        addItemToCartError: action.payload,
      };

    //return state as it is if action is not of any of the aforementioned types
    default:
      return state;
  }
};
