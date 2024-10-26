import "./App.css";
import PropertiesPanel from "./components/PropertiesPanel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <PropertiesPanel />
      </QueryClientProvider>
    </div>
  );
}

export default App;
