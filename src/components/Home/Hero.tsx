import { Link } from "react-router-dom";
import image from "../../assets/images/loginimage.jpg";

const Hero = () => {
  return (
    <div
      className="hero min-h-[70vh] md:min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {/* Overlay for better text contrast */}
      <div className="hero-overlay bg-opacity-60"></div>

      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-2xl">
          {/* Refined welcome text */}
          <p
            className="mb-4 text-lg md:text-xl font-light uppercase tracking-widest text-green-200"
            data-testid="welcome-text"
          >
            Welcome to
          </p>

          <h1 className="mb-6 text-4xl md:text-6xl font-bold leading-tight">
            Smarter Medical System Management
          </h1>

          <p className="mb-8 text-lg md:text-xl">
            Streamline patient records, appointments, and staff coordination in
            one secure platform. Designed to help your team save time and focus
            on better care.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="btn btn-primary btn-lg text-white hover:bg-green-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="btn btn-outline btn-lg text-white hover:bg-white hover:text-green-800 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
