import toast from "react-hot-toast";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';

const ToasterContainer = (header, message, type, position = "top-center") => {
  const toastOptions = {
    duration: 3000,
    position,
    style: {
      borderRadius: "8px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      fontSize: "14px",
    },
  };

  const renderToastContent = (t, icon) => (
    <div className="flex flex-col">
      <div className="font-bold text-xl mb-1 flex items-center">
        <span>{icon}</span>
        <span className="ml-2">{header}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="ml-3 bg-transparent text-gray-600 hover:text-gray-900 font-semibold text-lg rounded-full p-2 transition duration-300"
        >
          <FaTimesCircle className="text-gray-600" /> 
        </button>
      </div>
    </div>
  );

  switch (type) {
    case "success":
      toast.success((t) => renderToastContent(t, <FaCheckCircle className="text-green-500" />), toastOptions);
      break;
    case "error":
      toast.error((t) => renderToastContent(t, <FaExclamationCircle className="text-red-500" />), toastOptions);
      break;
    case "info":
      toast((t) => renderToastContent(t, <FaInfoCircle className="text-blue-500" />), toastOptions);
      break;
    case "warning":
      toast((t) => renderToastContent(t, <FaExclamationCircle className="text-yellow-500" />), toastOptions);
      break;
    default:
      toast((t) => renderToastContent(t, ""), toastOptions);
  }
};

export default ToasterContainer;
