import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainRoute from "./navigation/MainRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
