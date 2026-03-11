"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

type Project = {
id?: string;
title: string;
role: string;
description?: string;
discord: string;
game: string;
images?: string[];
created_at?: string;
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

loadProjects();

},[]);

const loadProjects = async () => {

const { data,error } = await supabase
.from("projects")
.select("*")
.order("created_at",{ascending:false});

if(error){
console.log(error);
return;
}

setProjects(data || []);

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

const handleDropAdd = (e:React.DragEvent) => {

e.preventDefault();

const files = Array.from(e.dataTransfer.files);

files.forEach(file=>{
if(file.type.includes("image")){
addImage(file);
}
});

};

const handlePaste = (e:React.ClipboardEvent) => {

const items = e.clipboardData.items;

for(const item of items){

if(item.type.includes("image")){

const file = item.getAsFile();

if(!file) continue;

addImage(file);

}

}

};

const addProject = async () => {

const { data,error } = await supabase
.from("projects")
.insert([
{
title,
role,
description,
discord,
game,
images,
created_at:new Date()
}
])
.select();

if(error){
console.log(error);
alert("Error adding project");
return;
}

if(data){
setProjects(prev => [data[0],...prev]);
}

setTitle("");
setRole("");
setDescription("");
setDiscord("");
setGame("");
setImages([]);

};

const deleteProject = async (id:string) => {

await supabase
.from("projects")
.delete()
.eq("id",id);

setProjects(prev => prev.filter(p => p.id !== id));

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

{projects.map((p)=>(

<div key={p.id} className="card mb-4 flex justify-between items-center">

<div>
<h3 className="font-bold">{p.title}</h3>
<p className="text-gray-400">{p.role}</p>
</div>

<div className="flex gap-3">

<button
onClick={()=>deleteProject(p.id!)}
className="project-btn-alt"
>
Delete
</button>

</div>

</div>

))}

</div>

);

}
