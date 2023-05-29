import Header from "./components/Header";
import { Routes, Route } from "react-router-dom"
import HomePage from "./components/HomePage";
import Auth from "./components/Auth/Auth";
import Admin from "./components/Auth/Admin";
import Hotels from "./Hotels/Hotels";

function App() {
  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/hotels" element={<Hotels />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
