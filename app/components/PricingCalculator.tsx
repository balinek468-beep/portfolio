"use client";

import { useState } from "react";

const RATE_USD_PER_PAGE = 3.5;
const RBX_RATE = 0.0038;

export default function PricingCalculator() {
  const [pages, setPages] = useState(10);

  const usd = (pages * RATE_USD_PER_PAGE).toFixed(2);
  const rbx = Math.round((pages * RATE_USD_PER_PAGE) / RBX_RATE);

  return (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
      <h3 className="text-xl font-semibold mb-4">Documentation Price Calculator</h3>

      <label className="text-gray-300 text-sm">Number of pages</label>

      <input
        type="number"
        min="1"
        value={pages}
        onChange={(e) => setPages(Number(e.target.value))}
        className="mt-2 w-full p-3 rounded-lg bg-black/40 border border-white/10"
      />

      <div className="mt-6 space-y-2 text-gray-300">
        <p>
          USD: <span className="font-bold text-white">${usd}</span>
        </p>

        <p>
          Robux: <span className="font-bold text-white">{rbx} RBX</span>
        </p>
      </div>
    </div>
  );
}