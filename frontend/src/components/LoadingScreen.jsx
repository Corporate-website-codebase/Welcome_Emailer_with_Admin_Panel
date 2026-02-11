import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null);
  const imgRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.8, ease: "power2.inOut" },
    });

    gsap.set(containerRef.current, { perspective: 1000 });

    const animateImage = (ref, exitAxis) => {
      tl.fromTo(ref, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 }).to(
        ref,
        {
          [exitAxis]: 90,
          opacity: 0,
        },
      );
    };

    animateImage(imgRefs.current[0], "rotationY");
    animateImage(imgRefs.current[1], "rotationX");
    animateImage(imgRefs.current[2], "rotationY");

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      onComplete: () => {
        if (containerRef.current) containerRef.current.style.display = "none";
        if (onComplete) onComplete();
      },
    });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "350px",
          height: "350px",
        }}
      >
        {/* IMAGE 1 */}
        <div
          ref={(el) => {
            imgRefs.current[0] = el;
          }}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/loading-screen/K&A.png"
            alt="Loading image 1"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* IMAGE 2 */}
        <div
          ref={(el) => {
            imgRefs.current[1] = el;
          }}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/loading-screen/10-years.png"
            alt="Loading image 2"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* IMAGE 3 */}
        <div
          ref={(el) => {
            imgRefs.current[2] = el;
          }}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/loading-screen/2.0.png"
            alt="Loading image 3"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </div>
  );
}
