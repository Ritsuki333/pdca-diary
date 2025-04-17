import { BrowserRouter, Route, Routes, } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TopPage from "./pages/TopPage";
import PdcaListPage from "./pages/PdcaListPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/top" element={<TopPage/>} />
        <Route path="/pdca-list" element={<PdcaListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;