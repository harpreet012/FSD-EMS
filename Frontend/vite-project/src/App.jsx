import { useEffect, useState } from "react";
import Navbar from "./Navbar";

function App() {
  const API_URL = "https://fsd-ems-backend.onrender.com/employees";

  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    salary: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");

  // =============================
  // GET EMPLOYEES
  // =============================

  const getEmployees = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }

      const data = await response.json();

      setEmployees(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  // =============================
  // HANDLE INPUT
  // =============================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =============================
  // ADD / UPDATE EMPLOYEE
  // =============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (editingId) {
        response = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) {
        throw new Error("Request Failed");
      }

      setFormData({
        name: "",
        department: "",
        salary: "",
      });

      setEditingId(null);

      getEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  // =============================
  // DELETE EMPLOYEE
  // =============================

  const deleteEmployee = async (_id) => {
    try {
      const response = await fetch(`${API_URL}/${_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete Failed");
      }

      getEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  // =============================
  // EDIT EMPLOYEE
  // =============================

  const editEmployee = (employee) => {
    setFormData({
      name: employee.name,
      department: employee.department,
      salary: employee.salary,
    });

    setEditingId(employee._id);
  };

  // =============================
  // SEARCH + FILTER
  // =============================

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDepartment =
      departmentFilter === "All" ||
      employee.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  const departments = [
    "All",
    ...new Set(employees.map((emp) => emp.department)),
  ];

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Employee Management System</h1>

        <h3>Total Employees : {filteredEmployees.length}</h3>

        {/* Search */}

        <div className="controls">
          <input
            type="text"
            placeholder="Search Employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={departmentFilter}
            onChange={(e) =>
              setDepartmentFilter(e.target.value)
            }
          >
            {departments.map((dept, index) => (
              <option key={index}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Form */}

        <form
          className="form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Employee Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {editingId
              ? "Update Employee"
              : "Add Employee"}
          </button>
        </form>

        {/* Cards */}

        <div className="employee-grid">
          {filteredEmployees.map((employee) => (
            <div
              key={employee._id}
              className="card"
            >
              <h3>{employee.name}</h3>

              <p>
                Department : {employee.department}
              </p>

              <p>
                Salary : ₹{employee.salary}
              </p>

              <div className="btn-group">
                <button
                  className="edit-btn"
                  onClick={() =>
                    editEmployee(employee)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Delete this employee?"
                      )
                    ) {
                      deleteEmployee(employee._id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;