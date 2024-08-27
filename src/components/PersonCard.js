import React from "react";
import { SocialIcon } from "react-social-icons";

class PersonCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const Linkedin = (
      <SocialIcon url="https://www.linkedin.com/in/hrishit-jhanji-874103247/" />
    );
    const Github = <SocialIcon url="https://github.com/HrJ-06" />;
    return (
      <div className="flex gap-24 mt-10 border-2 border-black p-4 h-2/5 rounded-lg bg-neutral-200 shadow-sm shadow-slate-200">
        <img
          className="rounded-full"
          src={require("/public/person_pic.jpeg")}
        ></img>
        <div className="flex flex-col justify-center gap-6">
          <h2 className="text-3xl font-bold">{this.props.name}</h2>
          <h3 className="text-2xl font-semibold">{this.props.place}</h3>
          <p className="text-2xl">
            A final year student who is incredibly passionate about logic
            building.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-7">
          {Linkedin}
          {Github}
        </div>
      </div>
    );
  }
}

export default PersonCard;
