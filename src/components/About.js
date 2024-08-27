import PersonCard from "./PersonCard";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="p-4 h-screen">
      <h2 className="text-2xl mb-5">
        A website crafted with <b>care</b> for your passion for <b>food</b>.
      </h2>
      <h2 className="text-2xl">
        Don't start thinkin', just <b>OrderIn'</b> 😉
      </h2>
      <PersonCard name="Hrishit Jhanji" place="VIT Vellore" />
    </div>
  );
};

export default About;
