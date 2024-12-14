import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scroll(0, 0);
    }, [location.pathname]);
}

export default ScrollToTop;