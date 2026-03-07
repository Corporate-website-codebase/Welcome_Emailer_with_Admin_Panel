import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null);
  const imgRefs = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context((self) => {
      // 1. INSTANTLY lock all starting values before the timeline is created.
      // This prevents the timeline from delaying the initial state application.
      gsap.set(imgRefs.current, {
        autoAlpha: 0,
        scale: 0.9,
        rotationX: 0,
        rotationY: 0
      });

      gsap.set(containerRef.current, { perspective: 1000 });

      // Add a method to our context to safely create the timeline asynchronously
      self.add("triggerAnimation", () => {
        // 2. Initialize timeline
        const tl = gsap.timeline({
          defaults: { duration: 0.8, ease: "power2.inOut" },
        });

        const animateImage = (ref, exitAxis) => {
          if (!ref) return;

          // 3. Use .to() exclusively. The starting state is already locked in by gsap.set()
          tl.to(ref, { autoAlpha: 1, scale: 1 })
            .to(ref, { [exitAxis]: 90, autoAlpha: 0 });
        };

        animateImage(imgRefs.current[0], "rotationY");
        animateImage(imgRefs.current[1], "rotationX");
        animateImage(imgRefs.current[2], "rotationY");

        tl.to(containerRef.current, {
          autoAlpha: 0,
          duration: 0.6,
          onComplete: () => {
            if (containerRef.current) containerRef.current.style.display = "none";
            if (onComplete) onComplete();
          },
        });
      });
    }, containerRef);

    // Track when all images are fully loaded before firing the animation
    const imageElements = imgRefs.current.map(el => el?.querySelector('img')).filter(Boolean);
    let loadedCount = 0;
    let animationStarted = false;

    const attemptAnimation = () => {
      if (animationStarted) return;
      animationStarted = true;
      ctx.triggerAnimation();
    };

    if (imageElements.length === 0) {
      attemptAnimation();
    } else {
      imageElements.forEach((img) => {
        if (img.complete) {
          loadedCount++;
          if (loadedCount === imageElements.length) attemptAnimation();
        } else {
          // Listen to both load and error so we don't hang indefinitely
          img.addEventListener("load", () => {
            loadedCount++;
            if (loadedCount === imageElements.length) attemptAnimation();
          });
          img.addEventListener("error", () => {
            loadedCount++;
            if (loadedCount === imageElements.length) attemptAnimation();
          });
        }
      });
    }

    return () => {
      ctx.revert();
    };
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
            visibility: "hidden", // Hard CSS lock guarantees invisibility on first paint
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
            visibility: "hidden", // Hard CSS lock
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
            visibility: "hidden", // Hard CSS lock
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