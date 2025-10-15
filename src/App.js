import React, { useState } from "react";
import * as XLSX from "xlsx";

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({
    no: "",
    lastName: "",
    firstName: "",
    middleInitial: "",
    dateOfBirth: "",
    sex: "",
    csEligibility: "",
    workStatus: "",
    yearsAsJoCos: "",
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...employees];
      updated[editingIndex] = form;
      setEmployees(updated);
      setEditingIndex(null);
    } else {
      setEmployees([...employees, form]);
    }
    setForm({
      no: "",
      lastName: "",
      firstName: "",
      middleInitial: "",
      dateOfBirth: "",
      sex: "",
      csEligibility: "",
      workStatus: "",
      yearsAsJoCos: "",
      office: "",
      designation: "",
      natureOfWork: "",
      pwd: "",
      indigenous: "",
      soloParentId: "",
      landbankAccount: "",
      tin: ""
    });
  };

  const handleEdit = (index) => {
    setForm(employees[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = employees.filter((_, i) => i !== index);
    setEmployees(updated);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(employees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    XLSX.writeFile(workbook, "employees.xlsx");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Employee Information System</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
          marginTop: "20px",
          background: "#f8f8f8",
          padding: "20px",
          borderRadius: "8px"
        }}
      >
        <h2 style={{ gridColumn: "1 / -1" }}>Personal Information</h2>
        <input name="no" value={form.no} onChange={handleChange} placeholder="No." required />
        <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" required />
        <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required />
        <input name="middleInitial" value={form.middleInitial} onChange={handleChange} placeholder="Middle Initial" />
        <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" />
        <input name="sex" value={form.sex} onChange={handleChange} placeholder="Sex" />
        <input name="pwd" value={form.pwd} onChange={handleChange} placeholder="PWD (Y/N)" />
        <input name="indigenous" value={form.indigenous} onChange={handleChange} placeholder="Indigenous People (Y/N)" />
        <input name="soloParentId" value={form.soloParentId} onChange={handleChange} placeholder="Solo Parent ID No." />

        <h2 style={{ gridColumn: "1 / -1" }}>Employment Information</h2>
        <input name="csEligibility" value={form.csEligibility} onChange={handleChange} placeholder="CS Eligibility" />
        <input name="workStatus" value={form.workStatus} onChange={handleChange} placeholder="Work Status" />
        <input name="yearsAsJoCos" value={form.yearsAsJoCos} onChange={handleChange} placeholder="Years as JO/COS" />
        <input name="office" value={form.office} onChange={handleChange} placeholder="Office" />
        <input name="designation" value={form.designation} onChange={handleChange} placeholder="Designation" />
        <input name="natureOfWork" value={form.natureOfWork} onChange={handleChange} placeholder="Nature of Work" />

        <h2 style={{ gridColumn: "1 / -1" }}>Financial Information</h2>
        <input name="landbankAccount" value={form.landbankAccount} onChange={handleChange} placeholder="Landbank Account" />
        <input name="tin" value={form.tin} onChange={handleChange} placeholder="TIN" />

        <button
          type="submit"
          style={{
            gridColumn: "1 / -1",
            padding: "10px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          {editingIndex !== null ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      <div style={{ marginTop: "30px" }}>
        <button onClick={exportToExcel} style={{ marginRight: "10px" }}>📊 Export to Excel</button>
        <button onClick={handlePrint}>🖨️ Print</button>
      </div>

      <table
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
          background: "#fff"
        }}
      >
        <thead>
          <tr>
            {[
              "No.",
              "Last Name",
              "First Name",
              "Middle Initial",
              "Date of Birth",
              "Sex",
              "CS Eligibility",
              "Work Status",
              "Years as JO/COS",
              "Office",
              "Designation",
              "Nature of Work",
              "PWD (Y)",
              "Indigenous (Y)",
              "Solo Parent ID No.",
              "Landbank Account",
              "TIN",
              "Actions"
            ].map((header) => (
              <th
                key={header}
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  background: "#eee",
                  textAlign: "left"
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={index}>
              {Object.values(emp).map((value, i) => (
                <td key={i} style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {value}
                </td>
              ))}
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <button onClick={() => handleEdit(index)} style={{ marginRight: "5px" }}>✏️ Edit</button>
                <button onClick={() => handleDelete(index)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
