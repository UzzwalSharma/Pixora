import { useEffect, useState, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { useInView } from "framer-motion";

const parseTarget = (target) => {
  const match = target.match(/^([+~]?)([\d.,]+)([a-zA-Z%]*)$/);
  if (!match) return { prefix: "", value: 0, suffix: "" };

  const [, prefix, numStr, suffix] = match;
  const value = parseFloat(numStr.replace(/,/g, ""));
  return { prefix, value, suffix };
};

const Counter = ({ target, duration = 2, decimals = 0 }) => {
  const { prefix, value, suffix } = parseTarget(target);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false }); // Runs every time in view

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration,
    stiffness: 100,
    damping: 20,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(0); // Reset before animating
      motionValue.set(value); // Start animation
      const unsubscribe = springValue.on("change", (latest) => {
        setDisplayValue(parseFloat(latest.toFixed(decimals)));
      });
      return () => unsubscribe();
    }
  }, [isInView, motionValue, springValue, value, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
};

export default Counter;
