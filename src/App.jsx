import { Routes, Route } from "react-router";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FootballKits from "./pages/FootballKits";
import FootballGifts from "./pages/FootballGifts";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="categories/football-kits" element={<FootballKits />} />
        <Route path="categories/football-gifts" element={<FootballGifts />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
