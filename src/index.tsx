import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import { App } from "./App";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./infra/query-client";

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
