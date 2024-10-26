import toast from "react-hot-toast";
import "./App.css";
import PropertiesPanel from "./components/PropertiesPanel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useToast } from "./context/ToastContext";
const queryClient = new QueryClient();

function App() {
  const { success, error } = useToast();

  const handleSuccess = () => {
    success("This is a success message!");
  };

  const handleError = () => {
    error("This is an error message!");
  };

  return (
    <div className="App">
      <button onClick={handleSuccess}>Show Success Toast</button>
      <button onClick={handleError}>Show Error Toast</button>
      <QueryClientProvider client={queryClient}>
        <PropertiesPanel />
      </QueryClientProvider>
    </div>
  );
}

export default App;
