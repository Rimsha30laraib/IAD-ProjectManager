const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use (cors(
  {
    origin:["https://deploy.mern-1whq.vercel.app"],
    methods;["POST","GET"],
    credentials:true
}
));
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

let projects = [];

app.get("/api/projects", (req, res) => {
  res.json({ status: "success", projects });
});

app.get("/api/projects/count", (req, res) => {
  res.json({ count: projects.length });
});

app.post("/api/projects", (req, res) => {
  const { name } = req.body;
  if (!name || name.length < 3) {
    return res.status(400).json({ status: "error", message: "Project name must be at least 3 characters" });
  }

  const newProject = { id: uuidv4(), name };
  projects.push(newProject);
  res.status(201).json({ status: "success", project: newProject });
});
app.put("/api/projects/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    
    console.log("Existing Projects:", projects); // Debugging line

    const project = projects.find((p) => p.id === id);

    if (!project) {
      console.log(`Project with ID ${id} not found`); // Debugging line
      return res.status(404).json({ status: "error", message: "Project not found" });
    }

    project.name = name;
    res.json({ status: "success", project });
});
    
app.delete("/api/projects/:id", (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex((p) => p.id === id);
  if (projectIndex === -1) {
    return res.status(404).json({ status: "error", message: "Project not found" });
  }

  const deletedProject = projects.splice(projectIndex, 1)[0];
  res.json({ status: "success", deletedProject });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
