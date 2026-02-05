import './Dashboard.css'

const Dashboard = ({ onLogout }) => {
  const currentTime = new Date().toLocaleString()

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </header>
      
      <main className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome to your Dashboard!</h2>
          <p>You have successfully logged in.</p>
          <p className="current-time">Current time: {currentTime}</p>
        </div>
        
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Profile</h3>
            <p>Manage your profile settings</p>
            <button className="card-btn">View Profile</button>
          </div>
          
          <div className="dashboard-card">
            <h3>Analytics</h3>
            <p>View your analytics data</p>
            <button className="card-btn">View Analytics</button>
          </div>
          
          <div className="dashboard-card">
            <h3>Settings</h3>
            <p>Configure your preferences</p>
            <button className="card-btn">Open Settings</button>
          </div>
          
          <div className="dashboard-card">
            <h3>Reports</h3>
            <p>Generate and view reports</p>
            <button className="card-btn">View Reports</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard