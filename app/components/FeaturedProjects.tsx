"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Project = {
  title: string;
  role: string;
  description?: string;
  image?: string;
};

export default function FeaturedProjects() {

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {

    const stored = localStorage.getItem("projects");

    if (stored) {

      const parsed = JSON.parse(stored);

      setProjects(parsed.slice(0, 3)); // tylko 3 pierwsze

    }

  }, []);

  return (

    <section className="mt-32 max-w-6xl mx-auto px-6">

      <h2 className="text-4xl font-semibold mb-16 text-center">
        Featured Work
      </h2>

      <div className="grid md:grid-cols-3 gap-10">

        {projects.map((p, i) => (

          <Link
            key={i}
            href={`/projects/${i}`}
            className="featured-card"
          >

            {p.image && (
              <img
                src={p.image}
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