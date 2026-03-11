"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "../components/Navbar";
import CursorGlow from "../components/CursorGlow";
import MeshBackground from "../components/MeshBackground";
import { supabase } from "../lib/supabase";

type Project = {
  id: string;
  title: string;
  role: string;
  description?: string;
  discord?: string;
  game?: string;
  images?: string[];
};

export default function Projects() {

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {

    const loadProjects = async () => {

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
  console.log("SUPABASE ERROR:", error);
  alert(JSON.stringify(error));
  return;
}

      setProjects(data || []);
    };

    loadProjects();

  }, []);

  return (

    <div className="min-h-screen text-white">

      <MeshBackground />
      <Navbar />
      <CursorGlow />

      <main className="pt-40 px-6 max-w-7xl mx-auto">

        <h1 className="text-6xl font-bold mb-20 text-center
        bg-gradient-to-r from-white via-blue-400 to-purple-500
        bg-clip-text text-transparent">
          Projects
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {projects.length === 0 && (
            <p className="text-gray-400 text-center col-span-3">
              No projects yet.
            </p>
          )}

          {projects.map((p, i) => (

            <div
              key={p.id}
              className="rounded-xl overflow-hidden border border-white/10
              bg-white/5 backdrop-blur-md hover:border-white/20 transition"
            >

              <Link href={`/projects/${p.id}`} className="block">

                {p.images?.[0] && (
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-6">

                  <h3 className="text-xl font-semibold mb-2">
                    {p.title}
                  </h3>

                  <p className="text-gray-400 mb-2">
                    Role: {p.role}
                  </p>

                  {p.description && (
                    <p className="text-gray-300 text-sm">
                      {p.description}
                    </p>
                  )}

                </div>

              </Link>

              {/* BUTTONS */}

              <div className="flex gap-3 px-6 pb-6">

                {p.discord && (
                  <a
                    href={p.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm transition"
                  >
                    Join
                  </a>
                )}

                {p.game && (
                  <a
                    href={p.game}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm transition"
                  >
                    Visit
                  </a>
                )}

              </div>

            </div>

          ))}

        </div>

      </main>

    </div>

  );

}