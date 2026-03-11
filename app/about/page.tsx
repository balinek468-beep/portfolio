import Navbar from "../components/Navbar";
import CursorGlow from "../components/CursorGlow";
import MeshBackground from "../components/MeshBackground";

export default function About() {

  return (

    <div className="min-h-screen text-white">

      <MeshBackground />
      <Navbar />
      <CursorGlow />

      <main className="pt-40 px-6 max-w-5xl mx-auto">

        {/* TITLE */}

        <h1 className="text-6xl font-bold mb-16 text-center
        bg-gradient-to-r from-white via-blue-400 to-purple-500
        bg-clip-text text-transparent animate-gradient-text">

          About Me

        </h1>

        {/* INTRO */}

        <div className="about-card mb-20">

          <p className="text-lg text-gray-300 leading-relaxed">

            I specialize in game design, project management, and development planning.
            My focus is building structured systems that help teams turn ideas into
            scalable and well organized game projects.

            <br /><br />

            I work with indie teams and Roblox developers by designing game systems,
            managing development pipelines, and organizing production to keep projects
            moving efficiently.

          </p>

        </div>

        {/* ROLES */}

        <h2 className="text-3xl font-semibold mb-10">
          Roles
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-20">

          <div className="about-card">Project Manager</div>
          <div className="about-card">Game Designer</div>
          <div className="about-card">QA Manager</div>
          <div className="about-card">Creative Director</div>
          <div className="about-card">Update Planner</div>

        </div>

        {/* SKILLS */}

        <h2 className="text-3xl font-semibold mb-10">
          Skills
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-20">

          <div className="about-card">
            <h3 className="skill-title">Game Design</h3>
            <ul className="skill-list">
              <li>Gameplay Systems Design</li>
              <li>Progression Systems</li>
              <li>Economy Design</li>
              <li>LiveOps Design</li>
              <li>Update Planning</li>
              <li>Game Balance</li>
              <li>Feature Documentation</li>
            </ul>
          </div>

          <div className="about-card">
            <h3 className="skill-title">Project Management</h3>
            <ul className="skill-list">
              <li>Production Planning</li>
              <li>Task Structuring</li>
              <li>Milestone Planning</li>
              <li>Development Tracking</li>
              <li>Team Coordination</li>
              <li>Pipeline Organization</li>
            </ul>
          </div>

          <div className="about-card">
            <h3 className="skill-title">QA & Testing</h3>
            <ul className="skill-list">
              <li>Bug Tracking Systems</li>
              <li>Testing Pipelines</li>
              <li>QA Team Management</li>
              <li>Gameplay Testing</li>
              <li>Feedback Analysis</li>
            </ul>
          </div>

          <div className="about-card">
            <h3 className="skill-title">Creative Direction</h3>
            <ul className="skill-list">
              <li>Vision Definition</li>
              <li>Feature Direction</li>
              <li>Design Supervision</li>
              <li>Gameplay Concept Design</li>
              <li>Team Creative Alignment</li>
            </ul>
          </div>

          <div className="about-card">
            <h3 className="skill-title">Documentation</h3>
            <ul className="skill-list">
              <li>Game Design Documents (GDD)</li>
              <li>System Documentation</li>
              <li>Feature Specifications</li>
              <li>Development Guidelines</li>
              <li>Production Documentation</li>
            </ul>
          </div>

          <div className="about-card">
            <h3 className="skill-title">Tools</h3>
            <ul className="skill-list">
              <li>Notion</li>
              <li>Trello</li>
              <li>Miro</li>
              <li>Google Docs</li>
              <li>Figma</li>
              <li>Spreadsheet Planning Tools</li>
            </ul>
          </div>

        </div>

        {/* TIMELINE */}

        <h2 className="text-3xl font-semibold mb-10">
          Experience
        </h2>

        <div className="timeline">

          <div className="timeline-item">
            <h3>Game Design</h3>
            <p>Designing gameplay systems, progression structures and mechanics.</p>
          </div>

          <div className="timeline-item">
            <h3>Project Management</h3>
            <p>Coordinating development teams and structuring production pipelines.</p>
          </div>

          <div className="timeline-item">
            <h3>QA Management</h3>
            <p>Organizing testing processes and bug tracking systems.</p>
          </div>

        </div>

      </main>

    </div>

  );

}