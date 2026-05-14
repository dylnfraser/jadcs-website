import type { ReactElement } from "react";
import { useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProgBlur from "./components/ProgBlur";

function App(): ReactElement {
  const heroRef = useRef<HTMLDivElement>(null);

  const handleLearnMore = () => {
    heroRef.current?.scrollIntoView({
      behavior: "smooth", // 'auto' (instant) or 'smooth'
    });
  };

  return (
    <>
      <Background />
      <Navbar />
      <Header />
      <button id="learnMore" onClick={handleLearnMore}>
        Learn More
      </button>
      <div ref={heroRef}>
        <Hero />
      </div>
      {/*<ProgBlur></ProgBlur>*/}
    </>
  );
}

export default App;
