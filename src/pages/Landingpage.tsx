import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import Hero from "../components/Home/Hero";

import { Testimonials } from "../components/about";
import Features from "../components/features/Features";
import Contact from "../components/contact/Contact";

const Landingpage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features /> 
      <Testimonials /> 
       <Contact />
      <Footer />
     
    </div>
  );
};

export default Landingpage;
