import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getUsers } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

function ViewExcel() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20; // change as needed
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) navigate("/login");
  }, [navigate]);


  useEffect(() => {
    getUsers()
      .then((res) => setData(res.data || []))
      .catch((err) => {
        console.error("Fetch error:", err);
        setData([]);
      });
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/login"), 800);
  };


  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.max(1, Math.ceil(data.length / usersPerPage));

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  // Download Excel (client-side)
  const handleDownload = () => {
    if (!data.length) {
      alert("No data to export!");
      return;
    }

    const worksheetData = data.map((user) => ({
      Name: user.name,
      Email: user.email,
      Phone: user.phone,
      Place: user.place,
      "Registered At": user.createdAt
        ? new Date(user.createdAt).toLocaleString()
        : "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "users.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-6">
      <div className="w-full flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
      <div className="w-full max-w-6xl">
        <h1 className="text-2xl sm:text-3xl font-bold mt-6 mb-2 text-center sm:text-left">
          Registered Users
        </h1>

        <p className="text-sm sm:text-base text-gray-600 mb-4 text-center sm:text-left">
          Total Registered: <span className="font-semibold">{data.length}</span>
        </p>

        {/* Table for sm+ screens (scrollable container for small devices too) */}
        <div className="hidden sm:block overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Place</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Registered At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {currentUsers.length > 0 ? (
                currentUsers.map((user, i) => (
                  <tr key={user._id ?? i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-800">{user.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{user.phone}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{user.email || "-"}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{user.place}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-6 text-center text-sm text-gray-500" colSpan="5">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Card list for small screens */}
        <div className="sm:hidden space-y-3">
          {currentUsers.length > 0 ? (
            currentUsers.map((user, i) => (
              <div
                key={user._id ?? i}
                className="bg-white p-4 rounded-lg shadow flex flex-col"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold text-gray-800">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.phone}</div>
                </div>
                <div className="text-xs text-gray-600 mb-1">Email: {user.email || "-"}</div>
                <div className="text-xs text-gray-600 mb-1">Place: {user.place}</div>
                <div className="text-xs text-gray-500 mt-2">
                  Registered: {user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-4 rounded-lg shadow text-center text-sm text-gray-500">
              No users found
            </div>
          )}
        </div>

        {/* Pagination + Actions */}
        <div className="fixed bottom-1 left-0 w-full py-3 flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
          {/* Pagination buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              Previous
            </button>

            <div className="text-sm text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              Next
            </button>
          </div>

          {/* Download button */}
          <button
            onClick={handleDownload}
            className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-all"
          >
            Download Excel
          </button>
        </div>
      </div>

    </div>
  );
}

export default ViewExcel;