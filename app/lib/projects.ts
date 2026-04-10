"use client";

import { supabase } from "./supabase";

export type Project = {
  id: string;
  title: string;
  role: string;
  description: string | null;
  discord: string | null;
  game: string | null;
  images: string[] | null;
  created_at: string;
};

export type ProjectInput = {
  title: string;
  role: string;
  description: string;
  discord: string;
  game: string;
  images: string[];
};

function normalizeProjectPayload(input: ProjectInput) {
  return {
    title: input.title.trim(),
    role: input.role.trim(),
    description: input.description.trim() || null,
    discord: input.discord.trim() || null,
    game: input.game.trim() || null,
    images: input.images,
  };
}

export async function fetchProjects() {
  return supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
}

export async function fetchProjectById(id: string) {
  return supabase.from("projects").select("*").eq("id", id).single();
}

export async function createProject(input: ProjectInput) {
  return supabase
    .from("projects")
    .insert([
      {
        ...normalizeProjectPayload(input),
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();
}

export async function updateProject(id: string, input: ProjectInput) {
  return supabase
    .from("projects")
    .update(normalizeProjectPayload(input))
    .eq("id", id)
    .select()
    .single();
}

export async function deleteProjectById(id: string) {
  return supabase.from("projects").delete().eq("id", id);
}
