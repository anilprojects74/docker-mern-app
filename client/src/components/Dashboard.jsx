import React from 'react';
import MainLayout from '../layout/MainLayout'

const Dashboard = () => {

  return (
    <MainLayout>
      <div>
        <h2 className="mb-4">Welcome to Your Dashboard!</h2>

        <div className="info-box p-4 mb-3 bg-white shadow-sm rounded">
          <h5>User Stats</h5>
          <p>This is where your dashboard data or analytics would appear.</p>
        </div>

        <div className="info-box p-4 bg-white shadow-sm rounded">
          <h5>Recent Activity</h5>
          <p>Display your recent activity or logs here.</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
