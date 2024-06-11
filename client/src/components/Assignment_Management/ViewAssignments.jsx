import React, { useState, useEffect } from "react";
import api from '../../api/api';

const ViewAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await api.get("/api/getAllAssignment");
        console.log("Fetched Assignments Data:", response.data);
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments", error);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div>
      <h1>Assignment Records</h1>
      {assignments.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Employee Name</th>
              <th>Branch Name</th>
              <th>Assigned Date</th>
              <th>Returned Date</th>
              <th>Status</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment._id}>
                <td>{assignment.productId ? assignment.productId.name : "Product not found"}</td>
                <td>{assignment.employeeId ? assignment.employeeId.username : "Employee not found"}</td>
                <td>{assignment.branchId ? assignment.branchId.name : "Branch not found"}</td>
                <td>{new Date(assignment.assignedDate).toLocaleDateString()}</td>
                <td>{assignment.returnedDate ? new Date(assignment.returnedDate).toLocaleDateString() : "N/A"}</td>
                <td>{assignment.currentStatus}</td>
                <td>{assignment.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No assignments found.</p>
      )}
    </div>
  );
};

export default ViewAssignments;
