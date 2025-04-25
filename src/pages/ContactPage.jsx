import logo from "../assets/logo.png";
import { FaPhoneAlt, FaUser, FaEnvelope, FaCommentDots, FaPaperPlane } from "react-icons/fa";
import ScrollToTop from "../utils/ScrollToTop";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export const ContactPage = () => {
  ScrollToTop();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Message sent successfully!");
    reset(); // Reset form after submission
  };

  return (
    <div>
      <div className="w-[95%] max-w-[500px] bg-slate-50 mx-auto my-10 p-5 border-2">
        <div className="text-center items-center flex flex-col my-3">
          <img src={logo} alt="logo" className="block" />
          <h1 className="text-xl text-slate-700">Get in Touch with Us</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div className="w-full relative mb-4">
            <input
              type="text"
              {...register("fullName", { required: "Full name is required" })}
              className="w-full h-10 pl-10 pr-3 border border-slate-300 rounded-md"
              placeholder="Enter your Full name"
            />
            <FaUser className="absolute left-3 top-2.5 text-slate-500" />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div className="w-full relative mb-4">
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full h-10 pl-10 pr-3 border border-slate-300 rounded-md"
              placeholder="Enter your Email"
            />
            <FaEnvelope className="absolute left-3 top-2.5 text-slate-500" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div className="w-full relative mb-4">
            <input
              type="tel"
              {...register("phone", { required: "Phone number is required" })}
              className="w-full h-10 pl-10 pr-3 border border-slate-300 rounded-md"
              placeholder="Enter your Phone number"
            />
            <FaPhoneAlt className="absolute left-3 top-2.5 text-slate-500" />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          {/* Message */}
          <div className="w-full relative mb-6">
            <textarea
              {...register("message", { required: "Message is required" })}
              className="w-full h-24 pl-10 pr-3 border border-slate-300 rounded-md"
              placeholder="Enter your Message"
            />
            <FaCommentDots className="absolute left-3 top-3 text-slate-500" />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>

          {/* Submit Button */}
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
