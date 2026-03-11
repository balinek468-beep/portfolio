"use client";

import Navbar from "../components/Navbar";
import CursorGlow from "../components/CursorGlow";
import MeshBackground from "../components/MeshBackground";

export default function Contact() {

  const discordName = "balinbaby";               
  const discordID = "796162367821578281";

  const copyID = () => {
    navigator.clipboard.writeText(discordID);
    alert("Discord ID copied");
  };

  return (
    <div className="min-h-screen text-white">

      <MeshBackground />
      <Navbar />
      <CursorGlow />

      <main className="pt-40 px-6 flex flex-col items-center text-center">

        <h1 className="text-6xl font-bold mb-12
        bg-gradient-to-r from-white via-blue-400 to-purple-500
        bg-clip-text text-transparent animate-gradient-text">
          Contact
        </h1>

        <div className="contact-card">

          <h2 className="text-2xl mb-6">Discord</h2>

          <p className="text-gray-300 mb-4">
            Preferred contact platform
          </p>

          <p className="mb-2">
            <strong>Nickname:</strong> {discordName}
          </p>

          <p className="mb-6">
            <strong>ID:</strong> {discordID}
          </p>

          <div className="flex gap-4 justify-center">

            <button onClick={copyID} className="project-btn">
              Copy ID
            </button>

            <a
              href={`https://discord.com/users/${discordID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="project-btn-alt"
            >
              Open Profile
            </a>

          </div>

        </div>

      </main>

    </div>
  );
}