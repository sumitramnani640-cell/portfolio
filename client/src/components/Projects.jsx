import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './Projects.css';

const fallbackProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'A blazing fast, modern shopping experience built with React and Node.js.',
    tags: ['React', 'Node.js', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1557821552-171051530dcb?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Fintech Dashboard',
    description: 'A data-rich dashboard with real-time analytics and visualizations.',
    tags: ['React', 'D3.js', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Social App Concept',
    description: 'A vibrant social platform with messaging and story features.',
    tags: ['React Native', 'GraphQL'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
  }
];

const Projects = () => {
  const [projectData, setProjectData] = useState(fallbackProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const docRef = doc(db, 'content', 'projects');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().items) {
          setProjectData(docSnap.data().items);
        }
      } catch (error) {
        console.error("Error fetching projects data from Firestore", error);
      }
    };
    fetchProjects();
  }, []);
  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title gradient-text">Featured Work</h2>
      <div className="projects-grid">
        {projectData.map((project, index) => (
          <div key={index} className="project-card glass-panel">
            <div className="project-image-wrapper">
              <img src={project.image} alt={project.title} className="project-image" />
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
