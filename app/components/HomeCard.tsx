"use client";

import { useRef } from "react";

export default function HomeCard({ title }: { title: string }) {

  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y - rect.height / 2) / 10;
    const rotateY = (x - rect.width / 2) / 10;

    el.style.transform =
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

  };

  const reset = () => {

    const el = ref.current;
    if (!el) return;

    el.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";

  };

  return (

    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="home-card-advanced"
    >

      {title}

    </div>

  );
}