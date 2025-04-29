import { BrowserRouter, Route, Routes, } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TopPage from "./pages/TopPage";
import PdcaListPage from "./pages/PdcaListPage";
import AdminPage from "./pages/AdminPage";
import OwnerPage from "./pages/OwnerPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/top" element={<TopPage/>} />
        <Route path="/pdca-list" element={<PdcaListPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/owner" element={<OwnerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;