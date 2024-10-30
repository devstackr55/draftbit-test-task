import React from "react";

import PropertiesPanel from "./components/PropertiesPanel";
import ErrorBoundary from "./components/ErrorBoundary";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MobileScreen from "./screen/MobileScreen";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <div className="flex w-full">
            <PropertiesPanel />
            <div
              className="flex justify-center w-full items-center
            "
            >
              <MobileScreen />
            </div>
          </div>
        </QueryClientProvider>  
      </ErrorBoundary>
    </div>
  );
}

export default App;
