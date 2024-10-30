import React from "react";
import "./App.css";
import PropertiesPanel from "./components/PropertiesPanel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MobileScreen from "./screen/MobileScreen";
const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
