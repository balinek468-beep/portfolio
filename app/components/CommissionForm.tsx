"use client";

export default function CommissionForm() {
  return (
    <form className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-4">

      <h3 className="text-xl font-semibold mb-4">Commission Request</h3>

      <input
        placeholder="Project name"
        className="w-full p-3 rounded-lg bg-black/40 border border-white/10"
      />

      <textarea
        placeholder="Project description"
        rows={4}
        className="w-full p-3 rounded-lg bg-black/40 border border-white/10"
      />

      <input
        placeholder="Estimated budget"
        className="w-full p-3 rounded-lg bg-black/40 border border-white/10"
      />

      <input
        placeholder="Your Discord"
        className="w-full p-3 rounded-lg bg-black/40 border border-white/10"
      />

      <button
        type="submit"
        className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition"
      >
        Send Request
      </button>

    </form>
  );
}