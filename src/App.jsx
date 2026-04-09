import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WebCart from "./pages/WebCart";
import WebDetails from "./pages/WebDetails";
import WebGridView from "./pages/WebGridView";
import WeblistView from "./pages/Weblistview";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<WebCart />} />
      <Route path="/details/:id" element={<WebDetails />} />
      <Route path="/grid-view" element={<WebGridView />} />
      <Route path="/list-view" element={<WeblistView />} />
    </Routes>
  );
}

export default App;