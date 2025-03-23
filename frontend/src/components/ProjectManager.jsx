import { useState, useEffect } from "react";
import "./ProjectManager.css";
import axios from 'axios'
const ProjectManager = ({ apiUrl }) => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");
  const [error, setError] = useState("");
  const [projectCount, setProjectCount] = useState(0);
  const [editingProject, setEditingProject] = useState(null);
  const [editedName, setEditedName] = useState("");
  axios.defaults.withCredentials =true;
 const handleSubmit = (e) =>{
 e.preventDefault();
   axios.post('https://iad-project-manager.vercel.app/register',{name,email,password})
   .then(result=> console.log(result))
   .catch(err => console.log(err))
 }
  // Fetch projects & count
  const fetchProjects = async () => {
    try {
      const res = await fetch(`${apiUrl}/projects`);
      if (!res.ok) throw new Error("Failed to fetch projects.");
      
      const data = await res.json();
      setProjects(data.projects || []);

      const countRes = await fetch(`${apiUrl}/projects/count`);
      if (!countRes.ok) throw new Error("Failed to fetch project count.");
      
      const countData = await countRes.json();
      setProjectCount(countData.count || 0);
      setError("");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch projects.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Refresh Button Functionality
  const refreshProjects = () => {
    fetchProjects();
  };

  // Add new project
  const addProject = async () => {
    if (newProject.length < 3) {
      setError("Project name must be at least 3 characters.");
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newProject }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setProjects([...projects, data.project]);
      setProjectCount((prev) => prev + 1);
      setNewProject("");
      setError("");
    } catch (err) {
      console.error("Add error:", err);
      setError(err.message);
    }
  };

  // Edit (Update) a project
  const editProject = async (id) => {
    if (!editedName.trim()) return;
    
    try {
      const response = await fetch(`${apiUrl}/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editedName }),
      });

      if (!response.ok) throw new Error("Failed to update project.");

      setProjects(
        projects.map((project) =>
          project.id === id ? { ...project, name: editedName } : project
        )
      );

      setEditingProject(null); // Exit edit mode
      setEditedName(""); // Clear input
    } catch (err) {
      console.error("Edit error:", err);
      setError("Failed to update project.");
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/projects/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Failed to delete project.");

      setProjects(projects.filter((project) => project.id !== id));
      setProjectCount((prev) => prev - 1);
      setError("");
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="project-manager">
      <h2>Project Manager</h2>
      <p>Total Projects: <span style={{ fontWeight: "bold", color: "red" }}>{projectCount}</span></p>

      <input
        type="text"
        value={newProject}
        onChange={(e) => setNewProject(e.target.value)}
        placeholder="Enter project name"
      />
      <button onClick={addProject} style={{ backgroundColor: "blue", color: "white", marginLeft: "10px" }}>
        Add Project
      </button>

      <button onClick={refreshProjects} style={{ backgroundColor: "green", color: "white", marginLeft: "10px" }}>
        Refresh
      </button>

      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {editingProject === project.id ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <button onClick={() => editProject(project.id)}>Save</button>
                <button onClick={() => { setEditingProject(null); setEditedName(""); }}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                {project.name}
                <button onClick={() => { setEditingProject(project.id); setEditedName(project.name); }}>
                  Edit
                </button>
                <button onClick={() => deleteProject(project.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectManager;
