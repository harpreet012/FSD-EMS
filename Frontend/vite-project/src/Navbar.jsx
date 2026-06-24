function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">EMS</div>

      <ul className="nav-links">
        <li><a href="#" className="active">Dashboard</a></li>
        <li><a href="#">Employees</a></li>
        <li><a href="#">Departments</a></li>
        <li><a href="#">Analytics</a></li>
      </ul>

      <button className="profile-btn">
        Harpreet
      </button>
    </nav>
  );
}

export default Navbar;