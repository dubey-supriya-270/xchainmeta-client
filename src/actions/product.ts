import { Actions } from "../reducers/product";
import { startLoading, stopLoading } from "./loading"; //import loading actions
import { Actions as LoadingActions } from "./../reducers/loading"; //import loading Actions type
import axios from "axios";
import {
  GET_ALL_PRODUCT,
  GET_ALL_PRODUCT_ERROR,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID_ERROR,
  CREATE_PRODUCT,
  CREATE_PRODUCT_ERROR,
  ADD_ITEM_TO_CART,
  ADD_ITEM_TO_CART_ERROR,
} from "./Types";
import { API_URL } from "./serverConnection";

export const getAllProduct =
  () =>
  async (
    dispatch: React.Dispatch<Actions>,
    loadingDispatch: React.Dispatch<LoadingActions>
  ) => {
    try {
      // dispatch start loading
      startLoading(loadingDispatch);

      // fetch the results from the Files API
      const result = await axios.get(`${API_URL}/product/`);

      // Dispatch the result with GET_ALL_PRODUCT type action
      dispatch({
        type: GET_ALL_PRODUCT,
        payload: result.data.data,
      });

      // Stop loading
      stopLoading(loadingDispatch);
    } catch (err: any) {
      // if error response then dispatch error action
      dispatch({
        type: GET_ALL_PRODUCT_ERROR,
        payload: err.response
          ? err.response.data?.message
          : "Unable to connect to server",
      });

      // In case of error, stop loading
      stopLoading(loadingDispatch);
    }
  };

export const getProductById =
  (id: string) =>
  async (
    dispatch: React.Dispatch<Actions>,
    loadingDispatch: React.Dispatch<LoadingActions>
  ) => {
    try {
      // dispatch start loading
      startLoading(loadingDispatch);

      // fetch the results from the Files API
      const result = await axios.get(`${API_URL}/product/view-product/${id}`);

      // Dispatch the result with GET_PRODUCT_BY_ID type action
      dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: result.data.data,
      });

      // Stop loading
      stopLoading(loadingDispatch);
    } catch (err: any) {
      // if error response then dispatch error action
      dispatch({
        type: GET_PRODUCT_BY_ID_ERROR,
        payload: err.response
          ? err.response.data?.message
          : "Unable to connect to server",
      });

      // In case of error, stop loading
      stopLoading(loadingDispatch);
    }
  };

export const createProduct =
  (data: any) =>
  async (
    dispatch: React.Dispatch<Actions>,
    loadingDispatch: React.Dispatch<LoadingActions>
  ) => {
    try {
      // dispatch start loading
      startLoading(loadingDispatch);

      // fetch the results from the Files API
      const result = await axios.post(`${API_URL}/product/`, data);

      // Dispatch the result with CREATE_PRODUCT type action
      dispatch({
        type: CREATE_PRODUCT,
        payload: result.data.data,
      });

      // Stop loading
      stopLoading(loadingDispatch);
    } catch (err: any) {
      // if error response then dispatch error action
      dispatch({
        type: CREATE_PRODUCT_ERROR,
        payload: err.response
          ? err.response.data?.message
          : "Unable to connect to server",
      });

      // In case of error, stop loading
      stopLoading(loadingDispatch);
    }
  };

export const addItemToCart =
  (data: any) =>
  async (
    dispatch: React.Dispatch<Actions>,
    loadingDispatch: React.Dispatch<LoadingActions>
  ) => {
    try {
      // dispatch start loading
      startLoading(loadingDispatch);

      // fetch the results from the Files API
      const result = await axios.post(`${API_URL}/cart/`, data);

      // Dispatch the result with ADD_ITEM_TO_CART type action
      dispatch({
        type: ADD_ITEM_TO_CART,
        payload: result.data.data,
      });

      // Stop loading
      stopLoading(loadingDispatch);
    } catch (err: any) {
      // if error response then dispatch error action
      dispatch({
        type: ADD_ITEM_TO_CART_ERROR,
        payload: err.response
          ? err.response.data?.message
          : "Unable to connect to server",
      });

      // In case of error, stop loading
      stopLoading(loadingDispatch);
    }
  };
