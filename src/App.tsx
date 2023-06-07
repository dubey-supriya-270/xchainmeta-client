import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import {
  ToastMessagesContext,
  ToastMessagesContextProvider,
} from "./contexts/ToastMessages";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LoadingContextProvider } from "./contexts/Loading";

import "./App.css";
import { SignUp } from "./components/SignUp/SignUp";
import { Navbar } from "./components/Common/Navbar/Navbar";
import { SignIn } from "./components/SignIn/SignIn";
import { UserContextProvider } from "./contexts/User";
import { ProductContextProvider } from "./contexts/Product";
import ProductDetails from "./components/Product";
import CreateProduct from "./components/Product/CreateProduct";
import ViewProduct from "./components/ViewProduct/ViewProduct";


const App: React.FC = () => {
  // check the existence of token
  const token: string | null = localStorage.getItem(
    "XCHAINMETA:token"
  );

  // if token is available, add it to headers of all requests
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return (
    // Provide the loading and user context to all routes
    <LoadingContextProvider>
      <ProductContextProvider>
      <UserContextProvider>
        
          <ToastMessagesContextProvider>
            <AppWithErrorBoundary />
          </ToastMessagesContextProvider>
       
      </UserContextProvider>
      </ProductContextProvider>
    </LoadingContextProvider>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    //
  }

  render() {
    if ((this.state as { hasError: boolean }).hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h3>Psst! Something's not right!</h3>
          <p>Please reload to continue</p>
        </div>
      );
    }

    return (this.props as any).children;
  }
}

const AppWithErrorBoundary: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppWithToastMessages />
    </ErrorBoundary>
  );
};

const AppWithToastMessages: React.FC = () => {
  // Get the state property form the ToastMessages reducer
  const { state } = useContext(ToastMessagesContext);
  useEffect(() => {
    if (state.message?.success) {
      toast.success(state.message.message);
    }
    if (!state.message?.success) {
      toast.error(state.message?.message);
    }
  }, [state]);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Navbar />
        <Routes>
         
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/product" element={<ProductDetails />} />
          <Route path= "/create-product" element = {<CreateProduct />} />
          <Route path= "/view-product" element = {<ViewProduct id={""} />} />
         
        </Routes>
      </Router>
    </>
  );
};

export default App;
