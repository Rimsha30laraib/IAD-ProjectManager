import ProjectManager from "./components/ProjectManager";

function App() {
  return (
    <div className="App">
<h1 style={{ textAlign: "center", margin: "20px auto" }}>Project Management</h1>
{/* <ProjectManager apiUrl="https://iad-project-manager-fde9.vercel.app/api" /> */}
<ProjectManager apiUrl="http://localhost:5000/api" />

    </div>
  );
}

export default App;
