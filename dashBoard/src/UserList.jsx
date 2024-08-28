import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ITEMS_PER_PAGE = 10;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/all-users");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.national_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const updateCommissionerStatus = async (userId, status) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "تأكيد التحديث",
      text: `هل أنت متأكد أنك تريد ${status ? "تعيين" : "إلغاء"} مفوض؟`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "لا",
    });

    if (result.isConfirmed) {
      try {
        await axios.patch(
          `http://localhost:4000/api/users/${userId}/commissioner`,
          {
            is_commissioner: status,
          }
        );
        // Update the local state to reflect the change
        setUsers(
          users.map((user) =>
            user.national_id === userId
              ? { ...user, is_commissioner: status }
              : user
          )
        );
        Swal.fire("تم التحديث!", "تم تحديث حالة المفوض بنجاح.", "success");
      } catch (error) {
        console.error("Error updating commissioner status:", error);
        Swal.fire("خطأ!", "حدث خطأ أثناء تحديث حالة المفوض.", "error");
      }
    }
  };

  return (
    <div className="container mx-auto p-6 rtl">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900">
        قائمة المستخدمين
      </h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="ابحث بالاسم الكامل أو رقم الهوية"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
          <thead className="bg-gray-600 text-white">
            <tr className="text-sm font-medium">
              <th className="py-4 px-3 md:px-6 text-right">ID</th>
              <th className="py-4 px-3 md:px-6 text-right">
                البريد الإلكتروني
              </th>
              <th className="py-4 px-3 md:px-6 text-right">الاسم الكامل</th>
              <th className="py-4 px-3 md:px-6 text-right">نوع المستخدم</th>
              <th className="py-4 px-3 md:px-6 text-right">رقم الدائرة</th>
              <th className="py-4 px-3 md:px-6 text-right">صوت محلي</th>
              <th className="py-4 px-3 md:px-6 text-right">صوت حزب</th>
              <th className="py-4 px-3 md:px-6 text-right">مفوض</th>
              <th className="py-4 px-3 md:px-6 text-right">تاريخ الإنشاء</th>
              <th className="py-4 px-3 md:px-6 text-right">تاريخ التحديث</th>
              <th className="py-4 px-3 md:px-6 text-right">
                تحديث الحالة
              </th>{" "}
              {/* Added this column */}
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {Array.isArray(paginatedUsers) &&
              paginatedUsers.map((user) => (
                <tr
                  key={user.national_id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-4 px-3 md:px-6">{user.national_id}</td>
                  <td className="py-4 px-3 md:px-6">{user.email}</td>
                  <td className="py-4 px-3 md:px-6">{user.full_name}</td>
                  <td className="py-4 px-3 md:px-6">{user.user_type}</td>
                  <td className="py-4 px-3 md:px-6">{user.district_id}</td>
                  <td className="py-4 px-3 md:px-6">
                    {user.is_voted_local ? "نعم" : "لا"}
                  </td>
                  <td className="py-4 px-3 md:px-6">
                    {user.is_voted_party ? "نعم" : "لا"}
                  </td>
                  <td className="py-4 px-3 md:px-6">
                    {user.is_commissioner ? "نعم" : "لا"}
                  </td>
                  <td className="py-4 px-3 md:px-6">
                    {new Date(user.createdAt).toLocaleString("ar-EG")}
                  </td>
                  <td className="py-4 px-3 md:px-6">
                    {new Date(user.updatedAt).toLocaleString("ar-EG")}
                  </td>
                  <td className="py-4 px-3 md:px-6">
                    <button
                      onClick={() =>
                        updateCommissionerStatus(
                          user.national_id,
                          !user.is_commissioner
                        )
                      }
                      className="px-3 py-1 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 transition-colors duration-300"
                    >
                      {user.is_commissioner ? "إلغاء مفوض" : "تعيين مفوض"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 disabled:bg-gray-300 transition-colors duration-300"
        >
          السابق
        </button>
        <span className="text-gray-800 text-lg">
          صفحة {currentPage} من {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 disabled:bg-gray-300 transition-colors duration-300"
        >
          التالي
        </button>
      </div>
    </div>
  );
};

export default UserList;
