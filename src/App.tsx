import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListProviders from "./ListProviders";
import Provider from "./Provider";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListProviders />}></Route>
        <Route path="/provider" element={<Provider />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
