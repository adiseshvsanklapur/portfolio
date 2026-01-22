import { useEffect } from "react";

function AuraLayer() {
  useEffect(() => {
    let rafId = null;
    const update = (event) => {
      const { clientX, clientY } = event;
      const xPercent = (clientX / window.innerWidth) * 100;
      const yPercent = (clientY / window.innerHeight) * 100;
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--mouse-x", `${clientX}px`);
        document.documentElement.style.setProperty("--mouse-y", `${clientY}px`);
        document.documentElement.style.setProperty("--mouse-xp", `${xPercent}%`);
        document.documentElement.style.setProperty("--mouse-yp", `${yPercent}%`);
      });
    };

    window.addEventListener("pointermove", update);
    return () => {
      window.removeEventListener("pointermove", update);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <>
      <div className="site-bg" />
      <div className="grid-overlay" />
      <div className="spotlight" />
      <div className="cursor-orb" />
    </>
  );
}

export default AuraLayer;
