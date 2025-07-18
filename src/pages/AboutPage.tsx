// src/pages/AboutPage.tsx
import { About } from "../components/about";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";

const AboutPage = () => {
  return (
    <div>
      <Navbar />
      <About />
      <Footer />
    </div>
  );
};

export default AboutPage;
