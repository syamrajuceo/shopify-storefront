import logo from "../assets/logo.png"
import { FaPhoneAlt, FaUser, FaEnvelope, FaCommentDots, FaPaperPlane } from "react-icons/fa";

export const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <div>
      <div className="w-[95%] max-w-[500px] bg-slate-50 mx-auto my-10 p-5 border-2">
        <div className="text-center items-center flex flex-col my-3">
          <img src={logo} alt="logo" className="block" />
          <h1 className="text-xl text-slate-700">Get in Touch with Us</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="w-full relative mb-4">
            <input
              type="text"
              id="full-name"
              className="w-full h-10 pl-10 pr-3 border border-slate-300 rounded-md"
              placeholder="Enter your Full name"
            />
            <FaUser className="absolute left-3 top-2.5 text-slate-500" />
          </div>
          <div className="w-full relative mb-4">
            <input
              type="email"
              id="email"
              className="w-full h-10 pl-10 pr-3 border border-slate-300 rounded-md"
              placeholder="Enter your Email"
            />
            <FaEnvelope className="absolute left-3 top-2.5 text-slate-500" />
          </div>

          <div className="w-full relative mb-4">
            <input
              type="tel"
              id="phone"
              className="w-full h-10 pl-10 pr-3 border border-slate-300 rounded-md"
              placeholder="Enter your Phone number"
            />
            <FaPhoneAlt className="absolute left-3 top-2.5 text-slate-500" />
          </div>

          <div className="w-full relative mb-6">
            <textarea
              id="message"
              className="w-full h-24 pl-10 pr-3 border border-slate-300 rounded-md"
              placeholder="Enter your Message"
            />
            <FaCommentDots className="absolute left-3 top-3 text-slate-500" />
          </div>

       
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
          >
            <FaPaperPlane className="mr-2" /> 
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};
