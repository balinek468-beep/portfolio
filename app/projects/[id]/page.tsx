"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Navbar from "../../components/Navbar";
import CursorGlow from "../../components/CursorGlow";
import MeshBackground from "../../components/MeshBackground";
import { supabase } from "../../lib/supabase";

type Project = {
  id: string;
  title: string;
  role: string;
  description?: string;
  discord?: string;
  game?: string;
  images?: string[];
};

export default function ProjectPage() {

  const params = useParams();
  const id = params.id as string;

  const [project,setProject] = useState<Project | null>(null);
  const [activeImage,setActiveImage] = useState<string | null>(null);

  useEffect(()=>{

    const loadProject = async () => {

      const { data,error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if(error){
        console.log(error);
        return;
      }

      if(data){
        setProject(data);
        setActiveImage(data.images?.[0] || null);
      }

    };

    loadProject();

  },[id]);

  if(!project){
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Project not found
      </div>
    );
  }

  return(

    <div className="min-h-screen text-white">

      <MeshBackground/>
      <Navbar/>
      <CursorGlow/>

      <main className="pt-40 px-6 max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT SIDE INFO */}

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

            {/* BUTTONS */}

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

          {/* RIGHT SIDE GALLERY */}

          <div>

            {activeImage && (

              <img
                src={activeImage}
                className="w-full rounded-xl mb-6"
              />

            )}

            {/* THUMBNAILS */}

            <div className="flex gap-4 flex-wrap">

              {project.images?.map((img,i)=>(

                <img
                  key={i}
                  src={img}
                  onClick={()=>setActiveImage(img)}
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