import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AdminBlogCard = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingBlog, setEditingBlog] = useState(null);
    const [status, setStatus] = useState('');

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, 'blogs'), orderBy('date', 'desc'));
            const querySnapshot = await getDocs(q);
            const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBlogs(list);
        } catch (error) {
            console.error("Error fetching blogs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleAdd = () => {
        setEditingBlog({ title: '', content: '', date: new Date().toISOString() });
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this blog?')) {
            try {
                await deleteDoc(doc(db, 'blogs', id));
                setBlogs(blogs.filter(b => b.id !== id));
            } catch (error) {
                console.error("Error deleting blog", error);
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setStatus('Saving...');
        try {
            if (editingBlog.id) {
                await updateDoc(doc(db, 'blogs', editingBlog.id), editingBlog);
            } else {
                await addDoc(collection(db, 'blogs'), editingBlog);
            }
            setStatus('Saved!');
            setEditingBlog(null);
            fetchBlogs();
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            console.error(error);
            setStatus('Error saving');
        }
    };

    return (
        <div className="admin-card col-span-2">
            <div className="card-header">
                <h2>Blogs Management</h2>
                <button className="badge badge-purple" onClick={handleAdd} style={{ border: 'none', cursor: 'pointer' }}>+ Add New Blog</button>
            </div>
            <div className="card-body">
                {editingBlog ? (
                    <form onSubmit={handleSave} className="form-grid">
                        <div className="input-group full-width">
                            <label>Blog Title</label>
                            <input type="text" value={editingBlog.title} onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})} />
                        </div>
                        <div className="input-group full-width">
                            <label>Content</label>
                            <textarea rows="10" value={editingBlog.content} onChange={(e) => setEditingBlog({...editingBlog, content: e.target.value})}></textarea>
                        </div>
                        <div className="card-footer" style={{ borderTop: 'none', paddingLeft: 0 }}>
                            <button type="submit" className="btn-primary">Save Blog</button>
                            <button type="button" className="btn-secondary" onClick={() => setEditingBlog(null)} style={{ border: 'none', background: 'transparent', marginLeft: '10px', color: 'white', cursor: 'pointer' }}>Cancel</button>
                            {status && <span className="status-msg success" style={{marginLeft: '20px'}}>{status}</span>}
                        </div>
                    </form>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                        {blogs.map(blog => (
                            <div key={blog.id} style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                <h3 style={{ fontSize: '1rem', marginBottom: '10px', color: 'white' }}>{blog.title}</h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <button onClick={() => handleEdit(blog)} style={{ background: 'transparent', border: 'none', color: '#a855f7', cursor: 'pointer', fontSize: '0.85rem' }}>Edit</button>
                                    <button onClick={() => handleDelete(blog.id)} style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '0.85rem' }}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminBlogCard;
