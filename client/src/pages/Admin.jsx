import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import AdminHeader from '../components/AdminHeader';
import AdminHeroCard from '../components/AdminHeroCard';
import AdminProjectsCard from '../components/AdminProjectsCard';
import AdminContactCard from '../components/AdminContactCard';
import AdminAboutCard from '../components/AdminAboutCard';
import AdminFooterCard from '../components/AdminFooterCard';
import AdminMessagesCard from '../components/AdminMessagesCard';
import AdminNavbarCard from '../components/AdminNavbarCard';
import AdminBlogCard from '../components/AdminBlogCard';
import './Admin.css';

// SVG Icons
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const ActivityIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const LogOutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const Admin = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <h2>port<span>Folio</span></h2>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active"><HomeIcon /></button>
          <button className="nav-item"><ActivityIcon /></button>
          <button className="nav-item"><UserIcon /></button>
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-item"><SettingsIcon /></button>
          <button className="nav-item" onClick={handleLogout} title="Logout"><LogOutIcon /></button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <AdminHeader />

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="dashboard-header-row">
            <h1>Content Management</h1>
            <div className="header-actions">
              <button className="status-btn"><span></span> Live Sync</button>
            </div>
          </div>

          <div className="cards-grid">
            {/* Modular Components */}
            <AdminNavbarCard />
            <AdminHeroCard />
            <AdminProjectsCard />
            <AdminBlogCard />
            <AdminAboutCard />
            <AdminFooterCard />
            <AdminContactCard />
            <AdminMessagesCard />

            {/* Stats Overview */}
            <div className="admin-card stats-card">
              <div className="card-header">
                <h2>Overview</h2>
              </div>
              <div className="card-body stats-list">
                 <div className="stat-item">
                    <div className="stat-icon purple">
                        <ActivityIcon />
                    </div>
                    <div className="stat-info">
                        <h3>Site Views</h3>
                        <p>+24% this week</p>
                    </div>
                    <div className="stat-value">12.4k</div>
                 </div>
                 <div className="stat-item">
                    <div className="stat-icon yellow">
                        <UserIcon />
                    </div>
                    <div className="stat-info">
                        <h3>Interactions</h3>
                        <p>Forms & Clicks</p>
                    </div>
                    <div className="stat-value">842</div>
                 </div>
                 <div className="stat-item break-card">
                     <div className="break-info">
                        <span className="time">v1.2.0</span>
                     </div>
                     <div className="break-content">
                        <h3>Portfolio Status</h3>
                        <p>Everything is running smoothly.</p>
                     </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
