import { useContext } from "react";
import PersonCard from "./PersonCard";

const About = () => {
  return (
    <div className="bg-[#f0ddaa] p-4 h-screen">
      <h1 className="text-4xl mb-6">About Us</h1>
      <h2 className="text-2xl">
        A website made <b>with</b> love <b>for</b> your love of food ❤️
      </h2>
      <PersonCard name="Hrishit Jhanji" place="VIT Vellore" />
    </div>
  );
};

export default About;
