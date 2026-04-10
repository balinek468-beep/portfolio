"use client";

import {
  type ChangeEvent,
  type ClipboardEvent,
  type DragEvent,
  type FormEvent,
  useEffect,
  useState,
} from "react";
import {
  createProject,
  deleteProjectById,
  fetchProjects,
  updateProject,
  type Project,
  type ProjectInput,
} from "../lib/projects";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "balinadmin123";
const SESSION_KEY = "portfolio-admin-session";
const MAX_IMAGES = 4;

const emptyForm: ProjectInput = {
  title: "",
  role: "",
  description: "",
  discord: "",
  game: "",
  images: [],
};

type FormErrors = Partial<Record<keyof ProjectInput, string>>;

export default function Admin() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<ProjectInput>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedSession = window.sessionStorage.getItem(SESSION_KEY);
    if (storedSession === "ok") {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      setIsLoading(false);
      return;
    }

    void loadProjects();
  }, [loggedIn]);

  async function loadProjects() {
    setIsLoading(true);
    const { data, error } = await fetchProjects();

    if (error) {
      console.error(error);
      setStatusMessage(getReadableErrorMessage(error, "Could not load projects from Supabase."));
      setIsLoading(false);
      return;
    }

    setProjects(data || []);
    setIsLoading(false);
  }

  function updateField<K extends keyof ProjectInput>(field: K, value: ProjectInput[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatusMessage(null);
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setErrors({});
    setStatusMessage(null);
  }

  function validateForm(values: ProjectInput) {
    const nextErrors: FormErrors = {};

    if (!values.title.trim()) {
      nextErrors.title = "Title is required.";
    }

    if (!values.role.trim()) {
      nextErrors.role = "Role is required.";
    }

    if (values.discord.trim() && !isValidUrl(values.discord)) {
      nextErrors.discord = "Discord link must be a valid URL.";
    }

    if (values.game.trim() && !isValidUrl(values.game)) {
      nextErrors.game = "Game link must be a valid URL.";
    }

    if (values.images.length > MAX_IMAGES) {
      nextErrors.images = `You can upload up to ${MAX_IMAGES} images.`;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function login() {
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(SESSION_KEY, "ok");
      }
      setStatusMessage(null);
      return;
    }

    setStatusMessage("Wrong password.");
  }

  function logout() {
    setLoggedIn(false);
    setPassword("");
    resetForm();
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(SESSION_KEY);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm(form)) {
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    const request = editingId
      ? updateProject(editingId, form)
      : createProject(form);

    const { data, error } = await request;

    if (error) {
      console.error(error);
      setStatusMessage(
        getReadableErrorMessage(
          error,
          editingId ? "Could not update project." : "Could not create project.",
        ),
      );
      setIsSubmitting(false);
      return;
    }

    if (data) {
      setProjects((current) => {
        if (editingId) {
          return current.map((project) => (project.id === editingId ? data : project));
        }

        return [data, ...current];
      });
    }

    resetForm();
    setStatusMessage(editingId ? "Project updated." : "Project created.");
    setIsSubmitting(false);
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    setStatusMessage(null);

    const { error } = await deleteProjectById(id);

    if (error) {
      console.error(error);
      setStatusMessage(getReadableErrorMessage(error, "Could not delete project."));
      setDeletingId(null);
      return;
    }

    setProjects((current) => current.filter((project) => project.id !== id));

    if (editingId === id) {
      resetForm();
    }

    setStatusMessage("Project deleted.");
    setDeletingId(null);
  }

  function startEditing(project: Project) {
    setEditingId(project.id);
    setForm({
      title: project.title,
      role: project.role,
      description: project.description || "",
      discord: project.discord || "",
      game: project.game || "",
      images: project.images || [],
    });
    setErrors({});
    setStatusMessage(`Editing "${project.title}".`);
  }

  async function handleFiles(files: File[]) {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (!imageFiles.length) {
      setStatusMessage("Only image files can be added.");
      return;
    }

    const remainingSlots = MAX_IMAGES - form.images.length;
    if (remainingSlots <= 0) {
      setErrors((current) => ({
        ...current,
        images: `You can upload up to ${MAX_IMAGES} images.`,
      }));
      return;
    }

    const nextImages = await Promise.all(
      imageFiles.slice(0, remainingSlots).map((file) => compressImage(file)),
    );

    updateField("images", [...form.images, ...nextImages]);
  }

  function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    void handleFiles(files);
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    void handleFiles(Array.from(event.dataTransfer.files));
  }

  function removeImage(index: number) {
    updateField(
      "images",
      form.images.filter((_, currentIndex) => currentIndex !== index),
    );
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg text-white px-6">
        <div className="card w-full max-w-md text-left">
          <h1 className="text-3xl font-bold mb-3">Admin Login</h1>
          <p className="text-sm text-gray-300 mb-6">
            This panel is connected to Supabase and updates the live project list.
          </p>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                login();
              }
            }}
            className="admin-input"
          />

          {statusMessage && (
            <p className="text-sm text-red-300 mb-4">{statusMessage}</p>
          )}

          <button onClick={login} className="project-btn mt-2">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg text-white px-6 py-10 md:px-10" onPaste={handlePaste}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold">Admin Panel</h1>
            <p className="text-gray-300 mt-2">
              Manage portfolio projects stored in Supabase.
            </p>
          </div>

          <div className="flex gap-3">
            <button onClick={resetForm} className="project-btn-alt">
              New project
            </button>
            <button onClick={logout} className="project-btn-alt">
              Logout
            </button>
          </div>
        </div>

        {statusMessage && (
          <div className="mb-6 rounded-2xl border border-white/15 bg-white/8 px-4 py-3 text-sm text-gray-200 backdrop-blur-md">
            {statusMessage}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <form className="card !text-left" onSubmit={handleSubmit}>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-semibold">
                  {editingId ? "Edit Project" : "Add Project"}
                </h2>
                <p className="text-sm text-gray-300 mt-2">
                  Paste screenshots, drag images, or pick files manually.
                </p>
              </div>

              {editingId && (
                <button type="button" onClick={resetForm} className="project-btn-alt">
                  Cancel edit
                </button>
              )}
            </div>

            <label className="block mb-4">
              <span className="block text-sm text-gray-300 mb-2">Title</span>
              <input
                className="admin-input"
                placeholder="Project title"
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
              />
              {errors.title && <span className="text-sm text-red-300">{errors.title}</span>}
            </label>

            <label className="block mb-4">
              <span className="block text-sm text-gray-300 mb-2">Role</span>
              <input
                className="admin-input"
                placeholder="Project manager, game designer..."
                value={form.role}
                onChange={(event) => updateField("role", event.target.value)}
              />
              {errors.role && <span className="text-sm text-red-300">{errors.role}</span>}
            </label>

            <label className="block mb-4">
              <span className="block text-sm text-gray-300 mb-2">Description</span>
              <textarea
                className="admin-input min-h-32"
                placeholder="Short project summary"
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block mb-4">
                <span className="block text-sm text-gray-300 mb-2">Discord link</span>
                <input
                  className="admin-input"
                  placeholder="https://..."
                  value={form.discord}
                  onChange={(event) => updateField("discord", event.target.value)}
                />
                {errors.discord && (
                  <span className="text-sm text-red-300">{errors.discord}</span>
                )}
              </label>

              <label className="block mb-4">
                <span className="block text-sm text-gray-300 mb-2">Game link</span>
                <input
                  className="admin-input"
                  placeholder="https://..."
                  value={form.game}
                  onChange={(event) => updateField("game", event.target.value)}
                />
                {errors.game && <span className="text-sm text-red-300">{errors.game}</span>}
              </label>
            </div>

            <div
              className="drop-zone"
              onDrop={handleDrop}
              onDragOver={(event) => event.preventDefault()}
            >
              <p className="text-base font-medium">Drop images here</p>
              <p className="text-sm text-gray-300 mt-2">
                Max {MAX_IMAGES} images. They will be compressed in the browser.
              </p>

              <label className="inline-block mt-4 cursor-pointer project-btn-alt">
                Choose files
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileInput}
                />
              </label>
            </div>

            {errors.images && (
              <p className="text-sm text-red-300 mt-3">{errors.images}</p>
            )}

            <div className="grid gap-4 mt-6 sm:grid-cols-2">
              {form.images.map((image, index) => (
                <div
                  key={`${image.slice(0, 20)}-${index}`}
                  className="rounded-2xl overflow-hidden border border-white/10 bg-black/20"
                >
                  <img src={image} alt={`Preview ${index + 1}`} className="preview-img h-48 w-full object-cover" />
                  <div className="p-3 flex items-center justify-between gap-3">
                    <span className="text-sm text-gray-300">Image {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="project-btn-alt"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button type="submit" disabled={isSubmitting} className="project-btn mt-6">
              {isSubmitting ? "Saving..." : editingId ? "Save Changes" : "Add Project"}
            </button>
          </form>

          <section className="card !text-left">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Existing Projects</h2>
                <p className="text-sm text-gray-300 mt-2">
                  Click edit to load a project back into the form.
                </p>
              </div>
              <span className="text-sm text-gray-400">{projects.length} total</span>
            </div>

            {isLoading && <p className="text-gray-300">Loading projects...</p>}

            {!isLoading && projects.length === 0 && (
              <p className="text-gray-400">No projects yet.</p>
            )}

            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl border border-white/12 bg-white/6 p-4 backdrop-blur-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p className="text-sm text-indigo-200 mt-1">{project.role}</p>
                      {project.description && (
                        <p className="text-sm text-gray-300 mt-3 line-clamp-3">
                          {project.description}
                        </p>
                      )}
                    </div>

                    {project.images?.[0] && (
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="h-20 w-28 rounded-xl object-cover border border-white/10"
                      />
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4">
                    <button onClick={() => startEditing(project)} className="project-btn" type="button">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="project-btn-alt"
                      type="button"
                      disabled={deletingId === project.id}
                    >
                      {deletingId === project.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  function handlePaste(event: ClipboardEvent<HTMLDivElement>) {
    const files: File[] = [];

    for (const item of Array.from(event.clipboardData.items)) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          files.push(file);
        }
      }
    }

    if (files.length) {
      void handleFiles(files);
    }
  }
}

function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const image = new Image();

    reader.onload = (event) => {
      image.src = event.target?.result as string;
    };

    reader.onerror = () => reject(new Error("Could not read file."));
    image.onerror = () => reject(new Error("Could not load image."));

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        reject(new Error("Could not create canvas context."));
        return;
      }

      const maxWidth = 1400;
      let width = image.width;
      let height = image.height;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      context.drawImage(image, 0, 0, width, height);

      resolve(canvas.toDataURL("image/jpeg", 0.78));
    };

    reader.readAsDataURL(file);
  });
}

function getReadableErrorMessage(error: { message?: string; details?: string }, fallback: string) {
  const combined = [error.message, error.details].filter(Boolean).join(" ");

  if (combined.includes("fetch failed") || combined.includes("ENOTFOUND")) {
    return "Supabase connection failed. Check NEXT_PUBLIC_SUPABASE_URL and project status.";
  }

  if (combined.includes("row-level security")) {
    return "Supabase blocked the action because RLS policy does not allow it.";
  }

  if (combined.includes("JWT")) {
    return "Supabase key is invalid or expired. Check NEXT_PUBLIC_SUPABASE_ANON_KEY.";
  }

  return fallback;
}
