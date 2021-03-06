import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./reset.css";
import "antd/dist/antd.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { BasketProvider } from "./context/BasketContext";
import { WishlistProvider } from "./context/Wishlist";
import { FilterProvider } from "./context/FilteredContext";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <BrowserRouter>
          <AuthProvider>
            <BasketProvider>
              <WishlistProvider>
                <FilterProvider>
                  <App />
                </FilterProvider>
              </WishlistProvider>
            </BasketProvider>
          </AuthProvider>
        </BrowserRouter>
      </ChakraProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </React.StrictMode>
);
