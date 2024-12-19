import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewProject from "./Components/Pages/NewProject";
import Contact from "./Components/Pages/Contact";
import Company from "./Components/Pages/Company";
import Home from "./Components/Pages/Home";
import Projects from "./Components/Pages/Projects";

import Container from "./Components/Layout/Container";
import Navbar from "./Components/Layout/Navbar";
import Footer from './Components/Layout/Footer'
import Project from "./Components/project/Project";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
    
  );
}

export default App;
