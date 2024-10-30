import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

import PropertiesPanel from "./components/PropertiesPanel";
import ErrorBoundary from "./components/ErrorBoundary";

import MobileScreen from "./screen/MobileScreen";

import InfoRibbon from "./components/InfoRibbon";
import { message, expandedMessage } from "./constant/index";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <div className="flex w-full">
            <PropertiesPanel />
            <div
              className="flex flex-col justify-center w-full items-center
            "
            >
              <div className="p-6">
                <InfoRibbon
                  message={message}
                  expandedMessage={expandedMessage}
                />
              </div>
              <MobileScreen />
            </div>
          </div>
        </QueryClientProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
