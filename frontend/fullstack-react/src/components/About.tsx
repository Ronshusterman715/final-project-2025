import type { FunctionComponent } from "react";
import AboutIntro from "./about/AboutIntro";
import AboutFeatures from "./about/AboutFeatures";
import AboutUserGuide from "./about/AboutUserGuide";
import AboutAdmin from "./about/AboutAdmin";
import AboutTechStack from "./about/AboutTechStack";
import AboutContact from "./about/AboutContact";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-3">About Club Finder</h1>
          <p className="lead">
            Your comprehensive solution for discovering and managing clubs
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container my-5">
        <AboutIntro />
        <AboutFeatures />
        <AboutUserGuide />
        <AboutAdmin />
        <AboutTechStack />
        <AboutContact />
      </div>
    </div>
  );
};

export default About;
