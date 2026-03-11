import Navbar from "./components/Navbar";
import CursorGlow from "./components/CursorGlow";
import HomeCard from "./components/HomeCard";
import MeshBackground from "./components/MeshBackground";
import Stats from "./components/Stats";
import FeaturedProjects from "./components/FeaturedProjects";

export default function Home() {

  return (

    <div className="min-h-screen gradient-bg text-white">

      <Navbar />
      <CursorGlow />

      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">

        <h1 className="text-8xl font-bold mb-20 animated-title">

          Balin's Portfolio

        </h1>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl w-full mb-10">

          <HomeCard title="Project Manager" />
          <HomeCard title="Game Designer" />
          <HomeCard title="QA Manager" />

        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl w-full">

          <HomeCard title="Creative Director" />
          <HomeCard title="Update Planner" />
          {/* SYSTEMS SHOWCASE */}

<section className="mt-32 max-w-6xl w-full">

  <h2 className="text-4xl font-semibold mb-12 text-center">

    Systems I Design
    <Stats />
    

  </h2>

  <div className="grid md:grid-cols-3 gap-8">

    <div className="showcase-card">
      <h3>Economy Systems</h3>
      <p>Currency balance, reward loops and progression flow.</p>
    </div>

    <div className="showcase-card">
      <h3>Progression Systems</h3>
      <p>Leveling, unlock trees and player growth loops.</p>
    </div>

    <div className="showcase-card">
      <h3>LiveOps Systems</h3>
      <p>Seasonal events, updates and engagement systems.</p>
    </div>

    <div className="showcase-card">
      <h3>Combat Systems</h3>
      <p>Player interaction mechanics and balancing.</p>
    </div>

    <div className="showcase-card">
      <h3>Monetization Systems</h3>
      <p>Gamepass design and sustainable in-game economy.</p>
    </div>

    <div className="showcase-card">
      <h3>Retention Systems</h3>
      <p>Daily rewards, long-term progression and player return loops.</p>
    </div>

  </div>

</section>

        </div>

      </main>

    </div>

  );

}