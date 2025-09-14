import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Sponsors from "./components/Sponsors";
import Footer from "./components/Footer";
import ComingSoon from "./components/ComingSoon"; // ✅ Import ComingSoon page

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Services />
              <Sponsors />
              <Footer />
            </>
          }
        />

        {/* Coming Soon Page */}
        <Route path="/coming-soon" element={<ComingSoon />} />
      </Routes>
    </Router>
  );
}

export default App;
