import React from 'react';
import Header from './Header.jsx';
import WorkPlace from './WorkPlace.jsx';
import Sidebar from './Sidebar.jsx';

export default () => (
  <div className="app-container">
    <Header />
    <div className="content">
      <Sidebar />
      <WorkPlace />
    </div>
  </div>
);
