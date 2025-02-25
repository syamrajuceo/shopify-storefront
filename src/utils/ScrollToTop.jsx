import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const location = useLocation();
    
    useLayoutEffect(() => {
        window.scrollTo(0, 0); // Ensure correct scrolling method
    }, [location.pathname]);

    return null; // Ensure the component returns something
}

export default ScrollToTop;
