import { BrowserRouter, Route, Routes, } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TopPage from "./pages/TopPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/top" element={<TopPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;