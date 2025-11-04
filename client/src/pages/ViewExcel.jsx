import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ViewExcel() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20; // ✅ change this to control number of rows per page

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/list")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(data.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Excel download function
  const handleDownload = () => {
    if (data.length === 0) {
      alert("No data to export!");
      return;
    }

    const worksheetData = data.map((user) => ({
      Name: user.name,
      Email: user.email,
      Phone: user.phone,
      Place: user.place,
      "Registered At": new Date(user.createdAt).toLocaleString(),
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Registered Users</h1>

      <table className="border border-gray-300 bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-3">Name</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Email</th>
            <th className="p-3">Place</th>
            <th className="p-3">Registered At</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.place}</td>
                <td className="p-3">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-3 text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Pagination Controls */}
      {data.length > 0 && (
        <div className="flex items-center justify-center mt-6 gap-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>

          <span className="text-gray-700 font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      )}

      <button
        onClick={handleDownload}
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all"
      >
        Download Excel
      </button>
    </div>
  );
}

export default ViewExcel;