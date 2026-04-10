"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Navbar from "../../components/Navbar";
import CursorGlow from "../../components/CursorGlow";
import MeshBackground from "../../components/MeshBackground";
import { fetchProjectById, type Project } from "../../lib/projects";

export default function ProjectPage() {
  const params = useParams();
  const id = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      const { data, error } = await fetchProjectById(id);

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      if (data) {
        setProject(data);
        setActiveImage(data.images?.[0] || null);
      }

      setLoading(false);
    };

    loadProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Project not found
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <MeshBackground />
      <Navbar />
      <CursorGlow />

      <main className="pt-40 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h1 className="text-5xl font-bold mb-6
            bg-gradient-to-r from-white via-blue-400 to-purple-500
            bg-clip-text text-transparent animate-gradient-text">
              {project.title}
            </h1>

            <p className="text-xl text-gray-400 mb-6">
              Role: {project.role}
            </p>

            {project.description && (

              <p className="text-gray-300 mb-10 leading-relaxed">
                {project.description}
              </p>
            )}

            <div className="flex gap-4">
              {project.discord && (
                <a
                  href={project.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn"
                >
                  Join Discord
                </a>
              )}

              {project.game && (
                <a
                  href={project.game}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn-alt"
                >
                  Visit Game
                </a>
              )}
            </div>
          </div>

          <div>
            {activeImage && (
              <img
                src={activeImage}
                alt={project.title}
                className="w-full rounded-xl mb-6"
              />
            )}

            <div className="flex gap-4 flex-wrap">
              {project.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${project.title} preview ${i + 1}`}
                  onClick={() => setActiveImage(img)}
                  className={`w-28 h-20 object-cover rounded-lg cursor-pointer border
                  ${activeImage===img ? "border-white" : "border-transparent"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
