"use client";
import { useSpring, animated } from "@react-spring/web";

function Number({ className, n }: { className?: string; n: number }) {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: n },
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return <animated.span>{number.to((num) => num.toFixed(0))}</animated.span>;
}

export default Number;
