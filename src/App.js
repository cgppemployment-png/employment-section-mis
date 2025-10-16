import React, { useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function App() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleInitial: "",
    dateOfBirth: "",
    sex: "",
    csEligibility: "",
    workStatus: "",
    yearsAsJO: "",
    office: "",
    designation: "",
    natureOfWork: "",
    pwd: "",
    indigenous: "",
    soloParentId: "",
    landbankAccount: "",
    tin: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      // Update existing employee
      const updated = [...employees];
      updated[editingIndex] = formData;
      setEmployees(updated);
      setEditingIndex(null);
    } else {
      // Add new employee
      setEmployees([...employees, formData]);
    }

    // Reset form and close modal
    setFormData({
      lastName: "",
      firstName: "",
      middleInitial: "",
      dateOfBirth: "",
      sex: "",
      csEligibility: "",
      workStatus: "",
      yearsAsJO: "",
      office: "",
      designation: "",
      natureOfWork: "",
      pwd: "",
      indigenous: "",
      soloParentId: "",
      landbankAccount: "",
      tin: ""
    });
    setShowModal(false);
  };

  const handleEdit = (index) => {
    setFormData(employees[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const updated = [...employees];
      updated.splice(index, 1);
      setEmployees(updated);
    }
};
  const handleDownloadExcel = () => {
    if (employees.length === 0) {
      alert("No data to download!");
      return;
    }

    // Convert employee array to worksheet
    const worksheet = XLSX.utils.json_to_sheet(employees);

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

    // Generate Excel file and trigger download
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Employee_List.xlsx");
  };


  return (
    <div className="App">
      <h1>Employee Information System</h1>

      <button className="add-btn" onClick={() => setShowModal(true)}>
        ➕ Add Employee
      </button>

      <button className="download-btn" onClick={handleDownloadExcel}>
        📥 Download Excel
      </button>


      {/* Employee Table */}
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Middle Initial</th>
            <th>Date of Birth</th>
            <th>Sex</th>
            <th>CS Eligibility</th>
            <th>Work Status</th>
            <th>Years as JO/COS</th>
            <th>Office</th>
            <th>Designation</th>
            <th>Nature of Work</th>
            <th>PWD (Y)</th>
            <th>Indigenous People (Y)</th>
            <th>Solo Parent ID No.</th>
            <th>Landbank Account</th>
            <th>TIN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{emp.lastName}</td>
              <td>{emp.firstName}</td>
              <td>{emp.middleInitial}</td>
              <td>{emp.dateOfBirth}</td>
              <td>{emp.sex}</td>
              <td>{emp.csEligibility}</td>
              <td>{emp.workStatus}</td>
              <td>{emp.yearsAsJO}</td>
              <td>{emp.office}</td>
              <td>{emp.designation}</td>
              <td>{emp.natureOfWork}</td>
              <td>{emp.pwd}</td>
              <td>{emp.indigenous}</td>
              <td>{emp.soloParentId}</td>
              <td>{emp.landbankAccount}</td>
              <td>{emp.tin}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(index)}
                >
                  ✏️
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(index)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingIndex !== null ? "Edit Employee" : "Add New Employee"}</h2>
            <div className="form-grid">
              {Object.keys(formData).map((key) => (
                <div className="form-group" key={key}>
                  <label>{key}</label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button onClick={handleSave}>
                {editingIndex !== null ? "Update" : "Save"}
              </button>
              <button onClick={() => {
                setShowModal(false);
                setEditingIndex(null);
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default App;