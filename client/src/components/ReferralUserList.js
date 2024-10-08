import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { fetchReferralUsers, deleteReferralUser } from '../services/apiClient';

const ReferralUserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    try {
      const response = await fetchReferralUsers(page);
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch users', 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteReferralUser(id);
        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
        fetchUsers(); 
      } catch (error) {
        Swal.fire('Error', 'Failed to delete user', 'error');
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Referral Users</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Mobile</th>
            <th className="border p-2">Referral Code</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.mobile}</td>
              <td className="border p-2">{user.referralCode}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page <= 1}
          className="mr-2 py-2 px-4 bg-blue-600 text-white rounded-lg"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page >= totalPages}
          className="py-2 px-4 bg-blue-600 text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReferralUserList;
