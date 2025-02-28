import { useEffect } from "react"
import { useNavigate } from "react-router-dom";


function LoginRequiredComponent({children,redirect}) {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate(redirect); 
    }
  }, [localStorage.getItem('accessToken')]);

  return children;
}

export default LoginRequiredComponent