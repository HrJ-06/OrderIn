import React from "react";

class PersonCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="mt-10 border-2 border-black p-4">
        <h2 className="text-3xl">{this.props.name},</h2>
        <h3 className="text-2xl">{this.props.place}</h3>
        <p className="text-2xl">
          I like logic building and have made this project for fun 😋
        </p>
      </div>
    );
  }
}

export default PersonCard;
