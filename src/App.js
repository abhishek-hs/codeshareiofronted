import "./App.css";
import Routes from "./Pages/Router";
import "bootstrap/dist/css/bootstrap.min.css";
import { ContextProvider } from "./Components/SocketContext";
function App() {
  return (
    <ContextProvider>
      <Routes />
    </ContextProvider>
  );
}

export default App;
