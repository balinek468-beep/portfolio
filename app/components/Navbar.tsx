"use client";

import { useRef } from "react";
import Link from "next/link";

function MagneticButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px,0px)";
  };

  return (
    <span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block transition-transform duration-200"
    >
      <Link
        href={href}
        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300
        transition-all duration-500 ease-out
        hover:border-white/60 hover:text-white hover:scale-105
        hover:shadow-[0_0_12px_rgba(255,255,255,0.35)]"
      >
        {children}
      </Link>
    </span>
  );
}

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 w-full flex justify-between items-center
      px-10 py-5 bg-black/60 backdrop-blur-xl border-b border-white/10
      text-white z-50"
    >
      <Link href="/" className="text-xl font-bold tracking-wide">
        Balin
      </Link>

      <div className="flex gap-4">
        <MagneticButton href="/">Home</MagneticButton>
        <MagneticButton href="/projects">Projects</MagneticButton>
        <MagneticButton href="/about">About</MagneticButton>
        <MagneticButton href="/contact">Contact</MagneticButton>
        <MagneticButton href="/tos">TOS</MagneticButton>
      </div>
    </nav>
  );
}