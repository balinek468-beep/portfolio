"use client";

import { useState, useEffect } from "react";

type Project = {
  title: string;
  role: string;
  description?: string;
  discord: string;
  game: string;
  images?: string[];
};

export default function Admin() {

  const ADMIN_PASSWORD = "balinadmin123";

  const [password,setPassword] = useState("");
  const [loggedIn,setLoggedIn] = useState(false);

  const [title,setTitle] = useState("");
  const [role,setRole] = useState("");
  const [description,setDescription] = useState("");
  const [discord,setDiscord] = useState("");
  const [game,setGame] = useState("");

  const [images,setImages] = useState<string[]>([]);
  const [projects,setProjects] = useState<Project[]>([]);

  const [editingIndex,setEditingIndex] = useState<number|null>(null);
  const [editProject,setEditProject] = useState<Project|null>(null);

  useEffect(()=>{

    const stored = localStorage.getItem("projects");

    if(stored){
      setProjects(JSON.parse(stored));
    }

  },[]);

  const saveProjects = (data:Project[]) => {

    try{
      localStorage.setItem("projects",JSON.stringify(data));
      setProjects(data);
    }catch{
      alert("Storage full. Try using smaller screenshots.");
    }

  };

  const login = () => {

    if(password === ADMIN_PASSWORD){
      setLoggedIn(true);
    }else{
      alert("Wrong password");
    }

  };

  const compressImage = (file:File):Promise<string> => {

    return new Promise((resolve)=>{

      const img = new Image();
      const reader = new FileReader();

      reader.onload = e => {
        img.src = e.target?.result as string;
      };

      img.onload = () => {

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        const MAX_WIDTH = 1200;

        let width = img.width;
        let height = img.height;

        if(width > MAX_WIDTH){
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img,0,0,width,height);

        const compressed = canvas.toDataURL("image/jpeg",0.7);

        resolve(compressed);

      };

      reader.readAsDataURL(file);

    });

  };

  const addImage = async (file:File) => {

    if(images.length >= 4){
      alert("Max 4 images");
      return;
    }

    const compressed = await compressImage(file);

    setImages(prev => [...prev,compressed]);

  };

  const addImageToEdit = async (file:File) => {

    if(!editProject) return;

    const current = editProject.images || [];

    if(current.length >= 4){
      alert("Max 4 images");
      return;
    }

    const compressed = await compressImage(file);

    setEditProject({
      ...editProject,
      images:[...current,compressed]
    });

  };

  const handleDropAdd = (e:React.DragEvent) => {

    e.preventDefault();

    const files = Array.from(e.dataTransfer.files);

    files.forEach(file=>{
      if(file.type.includes("image")){
        addImage(file);
      }
    });

  };

  const handleDropEdit = (e:React.DragEvent) => {

    e.preventDefault();

    const files = Array.from(e.dataTransfer.files);

    files.forEach(file=>{
      if(file.type.includes("image")){
        addImageToEdit(file);
      }
    });

  };

  const handlePaste = (e:React.ClipboardEvent) => {

    const items = e.clipboardData.items;

    for(const item of items){

      if(item.type.includes("image")){

        const file = item.getAsFile();

        if(!file) continue;

        if(editProject){
          addImageToEdit(file);
        }else{
          addImage(file);
        }

      }

    }

  };

  const addProject = () => {

    const newProject:Project = {
      title,
      role,
      description,
      discord,
      game,
      images
    };

    const updated = [...projects,newProject];

    saveProjects(updated);

    setTitle("");
    setRole("");
    setDescription("");
    setDiscord("");
    setGame("");
    setImages([]);

  };

  const deleteProject = (index:number) => {

    const updated = projects.filter((_,i)=>i!==index);

    saveProjects(updated);

  };

  const startEdit = (index:number) => {

    setEditingIndex(index);
    setEditProject({...projects[index]});

  };

  const saveEdit = () => {

    if(editingIndex === null || !editProject) return;

    const updated = [...projects];

    updated[editingIndex] = editProject;

    saveProjects(updated);

    setEditingIndex(null);
    setEditProject(null);

  };

  const removeImage = (index:number) => {

    if(!editProject) return;

    const updated = editProject.images?.filter((_,i)=>i!==index);

    setEditProject({
      ...editProject,
      images:updated
    });

  };

  if(!loggedIn){

    return(

      <div className="min-h-screen flex items-center justify-center gradient-bg text-white">

        <div className="card w-96 text-center">

          <h2 className="text-2xl mb-6">Admin Login</h2>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            className="admin-input"
          />

          <button onClick={login} className="project-btn mt-4">
            Login
          </button>

        </div>

      </div>

    );

  }

  return(

    <div className="min-h-screen gradient-bg text-white p-10" onPaste={handlePaste}>

      <h1 className="text-4xl mb-10">Admin Panel</h1>

      <div className="card max-w-xl mb-12">

        <h2 className="text-xl mb-4">Add Project</h2>

        <input className="admin-input" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />

        <input className="admin-input" placeholder="Role" value={role} onChange={e=>setRole(e.target.value)} />

        <textarea className="admin-input" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />

        <input className="admin-input" placeholder="Discord link" value={discord} onChange={e=>setDiscord(e.target.value)} />

        <input className="admin-input" placeholder="Game link" value={game} onChange={e=>setGame(e.target.value)} />

        <div className="drop-zone" onDrop={handleDropAdd} onDragOver={e=>e.preventDefault()}>
          <p>Drag images or paste screenshots (max 4)</p>
        </div>

        <div className="flex gap-4 mt-4 flex-wrap">

          {images.map((img,i)=>(
            <img key={i} src={img} className="preview-img"/>
          ))}

        </div>

        <button onClick={addProject} className="project-btn mt-4">
          Add Project
        </button>

      </div>

      <h2 className="text-2xl mb-6">Existing Projects</h2>

      {projects.map((p,i)=>(

        <div key={i} className="card mb-4 flex justify-between items-center">

          <div>
            <h3 className="font-bold">{p.title}</h3>
            <p className="text-gray-400">{p.role}</p>
          </div>

          <div className="flex gap-3">

            <button onClick={()=>startEdit(i)} className="project-btn">
              Edit
            </button>

            <button onClick={()=>deleteProject(i)} className="project-btn-alt">
              Delete
            </button>

          </div>

        </div>

      ))}

      {editProject && (

        <div className="card mt-10">

          <h2 className="text-xl mb-4">Edit Project</h2>

          <input className="admin-input" value={editProject.title} onChange={e=>setEditProject({...editProject,title:e.target.value})}/>

          <input className="admin-input" value={editProject.role} onChange={e=>setEditProject({...editProject,role:e.target.value})}/>

          <textarea className="admin-input" value={editProject.description} onChange={e=>setEditProject({...editProject,description:e.target.value})}/>

          <div className="drop-zone mt-4" onDrop={handleDropEdit} onDragOver={e=>e.preventDefault()}>
            <p>Drag images or paste screenshots (max 4)</p>
          </div>

          <div className="flex gap-4 flex-wrap mt-4">

            {editProject.images?.map((img,i)=>(
              <div key={i} className="relative">

                <img src={img} className="preview-img"/>

                <button
                  onClick={()=>removeImage(i)}
                  className="absolute top-0 right-0 bg-red-500 px-2"
                >
                  X
                </button>

              </div>
            ))}

          </div>

          <button onClick={saveEdit} className="project-btn mt-4">
            Save Changes
          </button>

        </div>

      )}

    </div>

  );

}