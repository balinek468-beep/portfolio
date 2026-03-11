"use client";

type Props = {
  title: string;
  role: string;
  discord: string;
  game: string;
};

export default function ProjectCard({ title, role, discord, game }: Props) {
  return (
    <div className="project-card">

      <div className="project-image"></div>

      <h3 className="text-xl font-semibold mb-2">
        {title}
      </h3>

      <p className="text-gray-400 mb-6">
        Role: {role}
      </p>

      <div className="flex gap-4">

        <a
          href={discord}
          target="_blank"
          rel="noopener noreferrer"
          className="project-btn"
        >
          Discord
        </a>

        <a
          href={game}
          target="_blank"
          rel="noopener noreferrer"
          className="project-btn-alt"
        >
          View Game
        </a>

      </div>

    </div>
  );
}