import React from 'react';

export const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <div className="search-bar">
        <SearchIcon />
        <input type="text" placeholder="Search..." />
      </div>
      <div className="admin-profile">
        <div className="profile-text">
          <span className="profile-name">Sumit Ramnani</span>
          <span className="profile-role">Admin</span>
        </div>
        <div className="profile-avatar">
          SR
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
