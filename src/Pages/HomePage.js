import React from "react";
import Navbar from "../Components/Navbar";
import MainHomePage from "../Components/MainHomePage";
import HomeFooter from "../Components/HomeFooter";
import Footer from "../Components/Footer";

export default function HomePage() {
  return (
    <div className="home">
      <Navbar />
      <MainHomePage />
      <HomeFooter />
      <Footer />
    </div>
  );
}
