import ProjectManager from "./components/ProjectManager";

function App() {
  return (
    <div className="App">
<h1 style={{ textAlign: "center", margin: "20px auto" }}>Project Management</h1>
<ProjectManager apiUrl="https://vercel.com/rimshas-projects-9ef85771/iad-project-manager-f9jg/api" />
{/* <ProjectManager apiUrl="http://localhost:5000/api" /> */}

    </div>
  );
}

export default App;
