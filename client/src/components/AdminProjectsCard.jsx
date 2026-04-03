import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ImageUpload from './ImageUpload';

const AdminProjectsCard = () => {
    const [projects, setProjects] = useState([]);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const docRef = doc(db, 'content', 'projects');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists() && docSnap.data().items) {
                    setProjects(docSnap.data().items);
                }
            } catch (error) {
                console.error("Error fetching projects data", error);
            }
        };
        fetchProjects();
    }, []);

    const handleChange = (index, e) => {
        const updatedProjects = [...projects];
        if (e.target.name === 'tags') {
            updatedProjects[index][e.target.name] = e.target.value.split(',').map(tag => tag.trim());
        } else {
            updatedProjects[index][e.target.name] = e.target.value;
        }
        setProjects(updatedProjects);
    };

    const handleImageUpdate = (index, downloadURL) => {
        const updatedProjects = [...projects];
        updatedProjects[index]['image'] = downloadURL;
        setProjects(updatedProjects);
    };

    const handleAdd = () => {
        setProjects([...projects, { title: '', description: '', tags: [], image: '', github: '', demo: '' }]);
    };

    const handleRemove = (index) => {
        const updatedProjects = projects.filter((_, i) => i !== index);
        setProjects(updatedProjects);
    };

    const handleSave = async () => {
        setStatus('Saving...');
        try {
            await setDoc(doc(db, 'content', 'projects'), { items: projects });
            setStatus('Saved successfully!');
            setTimeout(() => setStatus(''), 3000);
        } catch (e) {
            console.error(e);
            setStatus('Error saving data!');
        }
    };

    return (
        <div className="admin-card col-span-2">
            <div className="card-header">
                <h2>Featured Projects</h2>
                <div className="card-actions">
                    <button className="badge badge-purple" onClick={handleAdd} style={{ border: 'none', cursor: 'pointer' }}>+ Add Project</button>
                </div>
            </div>
            <div className="card-body">
                {projects.map((project, index) => (
                    <div key={index} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--admin-border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <h4 style={{ margin: 0, fontWeight: 500 }}>Project {index + 1}</h4>
                            <button onClick={() => handleRemove(index)} style={{ color: '#ff4d4d', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Remove</button>
                        </div>
                        <div className="form-grid">
                            <div className="input-group">
                                <label>Title</label>
                                <input type="text" name="title" value={project.title || ''} onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div className="input-group">
                                <label>Tags (comma separated)</label>
                                <input type="text" name="tags" value={project.tags ? project.tags.join(', ') : ''} onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div className="input-group full-width">
                                <label>Description</label>
                                <textarea name="description" rows="2" value={project.description || ''} onChange={(e) => handleChange(index, e)}></textarea>
                            </div>
                            <div className="input-group">
                                <label>GitHub URL</label>
                                <input type="text" name="github" value={project.github || ''} onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div className="input-group">
                                <label>Live Demo URL</label>
                                <input type="text" name="demo" value={project.demo || ''} onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div className="input-group full-width">
                                <label>Featured Image</label>
                                <ImageUpload
                                    currentImage={project.image}
                                    onUploadSuccess={(url) => handleImageUpdate(index, url)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
                {projects.length === 0 && <p style={{ color: 'var(--admin-text-muted)' }}>No projects added yet.</p>}
            </div>
            <div className="card-footer">
                <button className="btn-primary" onClick={handleSave}>
                    Save Projects
                </button>
                {status && (
                    <span className={`status-msg ${status.includes('Error') ? 'error' : 'success'}`}>
                        {status}
                    </span>
                )}
            </div>
        </div>
    );
};

export default AdminProjectsCard;
