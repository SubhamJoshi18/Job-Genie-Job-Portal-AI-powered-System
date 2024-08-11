import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useRef } from "react";
import Blogs from "../pages/Blogs";

export default function AppRoutes() {
  const parentRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Navbar paRrf={parentRef} />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
      </Routes>
      <Footer />
    </>
  );
}
