"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchProjects, type Project } from "../lib/projects";

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const { data, error } = await fetchProjects();

      if (error) {
        console.error("Failed to load featured projects", error);
        setLoading(false);
        return;
      }

      setProjects((data || []).slice(0, 3));
      setLoading(false);
    };

    loadProjects();
  }, []);

  return (
    <section className="mt-32 max-w-6xl mx-auto px-6">
      <h2 className="text-4xl font-semibold mb-16 text-center">
        Featured Work
      </h2>

      <div className="grid md:grid-cols-3 gap-10">
        {!loading && projects.length === 0 && (
          <div className="card md:col-span-3">
            <p className="text-base text-gray-300">
              Featured projects will show up here after you add them in the admin
              panel.
            </p>
          </div>
        )}

        {projects.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            className="featured-card"
          >
            {p.images?.[0] && (
              <img
                src={p.images[0]}
                alt={p.title}
                className="featured-image"
              />
            )}

            <div className="featured-content">
              <h3 className="featured-title">
                {p.title}
              </h3>

              <p className="featured-role">
                {p.role}
              </p>

              {p.description && (
                <p className="featured-description">
                  {p.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
