import React, { useEffect, useState } from "react";
import api from "../../api/api";
import AdminMenu from "../Menu/AdminMenu";

const UserAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAssignments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }

        const decodedToken = decodeToken(token);
        const userId = decodedToken.id;

        const response = await api.get(`/api/assignments/${userId}`);
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching user assignments", error);
        setError("Error fetching user assignments");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAssignments();
  }, []);

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      console.error("Error decoding token:", error);
      return {};
    }
  };

  const handleReturnAssignment = async (assignmentId) => {
    try {
      await api.put(`/api/assignments/return/${assignmentId}`);
      setAssignments(assignments.map(assignment => 
        assignment._id === assignmentId ? { ...assignment, currentStatus: "returned", returnedDate: new Date() } : assignment
      ));
    } catch (error) {
      console.error("Error returning assignment", error);
      setError("Error returning assignment");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (assignments.length === 0) {
    return <p>No assignments found</p>;
  }

  return (
    <div>
      < AdminMenu />

    
    <div className="container mt-5">
      <h1>Your Assignments</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Branch</th>
            <th>Assigned Date</th>
            <th>Returned Date</th>
            <th>Status</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment._id}>
              <td>{assignment.productId ? assignment.productId.name : "N/A"}</td>
              <td>{assignment.branchId ? assignment.branchId.name : "N/A"}</td>
              <td>{new Date(assignment.assignedDate).toLocaleDateString()}</td>
              <td>{assignment.returnedDate ? new Date(assignment.returnedDate).toLocaleDateString() : "N/A"}</td>
              <td>{assignment.currentStatus}</td>
              <td>{assignment.quantity}</td>
              <td>
                {assignment.currentStatus === "assigned" && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleReturnAssignment(assignment._id)}
                  >
                    Return
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default UserAssignments;
