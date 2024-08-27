import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Contact = () => {
  const [result, setResult] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "3563f79e-7322-45c8-a731-a4e5c150c367");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      Swal.fire({
        title: "Success!",
        text: "Your message has been sent",
        icon: "success",
      });
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex justify-center m-4">
      <div className="w-2/5 bg-slate-200 p-4 rounded-xl h-3/5 mt-5 mb-8">
        <h2 className="text-center font-bold text-2xl font-serif">
          Contact Me
        </h2>
        <div className="p-8">
          <form onSubmit={onSubmit}>
            <div>
              <h3 className="mb-2 font-semibold">Full Name</h3>
              <input
                className="mb-4 rounded-md p-1"
                name="name"
                type="text"
                placeholder="Enter your Name"
                required
              ></input>
              <h3 className="mb-2 font-semibold">Email Address</h3>
              <input
                className="mb-4 rounded-md p-1"
                type="email"
                name="email"
                placeholder="Enter your email id"
                required
              ></input>
              <h3 className="mb-2 font-semibold">Message</h3>
              <textarea
                className="p-3 w-3/4 h-52 resize-none"
                placeholder="Enter your message"
                name="message"
                required
              ></textarea>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-gray-300 rounded-lg p-2 font-semibold"
                type="submit"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
