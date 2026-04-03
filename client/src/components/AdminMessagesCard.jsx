import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const AdminMessagesCard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    } catch (error) {
      console.error("Error fetching messages", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        await deleteDoc(doc(db, 'messages', id));
        setMessages(messages.filter(m => m.id !== id));
      } catch (error) {
        console.error("Error deleting message", error);
      }
    }
  };

  return (
    <div className="admin-card">
      <div className="card-header">
        <h2>Messages</h2>
        <button className="badge badge-purple" onClick={fetchMessages} style={{ border: 'none', cursor: 'pointer' }}>Refresh</button>
      </div>
      <div className="card-body">
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p style={{ color: 'var(--admin-text-muted)' }}>No messages yet.</p>
        ) : (
          <div className="messages-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <strong style={{ color: 'white' }}>{msg.name}</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
                    {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleDateString() : 'Just now'}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)', marginBottom: '10px' }}>{msg.email}</div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#e2e8f0' }}>{msg.message}</p>
                <button 
                  onClick={() => handleDelete(msg.id)}
                  style={{ position: 'absolute', right: '10px', bottom: '10px', color: '#ff4d4d', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessagesCard;
