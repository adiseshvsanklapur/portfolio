import { useRef } from "react";

function TiltCard({
  children,
  className = "",
  tiltAmount = 10,
  scale = 1.02,
  ...rest
}) {
  const ref = useRef(null);

  const handleMouseMove = (event) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltAmount;
    const rotateY = ((x - centerX) / centerX) * tiltAmount;

    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.12s ease-out",
      }}
      className={className}
      {...rest}
    >
      {children}
    </div>
  );
}

export default TiltCard;
