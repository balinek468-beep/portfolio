"use client";

import { useEffect, useState } from "react";

function Counter({ target }: { target: number }) {

  const [count, setCount] = useState(0);

  useEffect(() => {

    let start = 0;

    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));

    const timer = setInterval(() => {

      start += step;

      if (start >= target) {
        start = target;
        clearInterval(timer);
      }

      setCount(start);

    }, 16);

    return () => clearInterval(timer);

  }, [target]);

  return <span>{count}+</span>;

}

export default function Stats() {

  return (

    <section className="mt-32 max-w-6xl w-full mx-auto px-6">

      <h2 className="text-4xl font-semibold mb-16 text-center">
        Experience
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">

        <div className="stats-card">
          <div className="stats-number">
            <Counter target={300} />
          </div>
          <p className="stats-label">Documents Written</p>
        </div>

        <div className="stats-card">
          <div className="stats-number">
            <Counter target={10} />
          </div>
          <p className="stats-label">Projects Managed</p>
        </div>

        <div className="stats-card">
          <div className="stats-number">
            <Counter target={5} />
          </div>
          <p className="stats-label">Teams Coordinated</p>
        </div>

        <div className="stats-card">
          <div className="stats-number">
            <Counter target={150} />
          </div>
          <p className="stats-label">Systems Designed</p>
        </div>

      </div>

    </section>

  );

}