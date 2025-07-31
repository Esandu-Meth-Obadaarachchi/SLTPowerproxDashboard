import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Multiple approaches to ensure scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Also scroll any scrollable containers
    const mainContent = document.querySelector(".main-content");
    if (mainContent) {
      mainContent.scrollTop = 0;
    }

    const contentArea = document.querySelector(".content-area");
    if (contentArea) {
      contentArea.scrollTop = 0;
    }

    // Force a repaint to ensure the scroll position is applied
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 10);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
