import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { data, Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";

const UserListPage = () => {
  const { data, isLoading, error, refetch } = useGetUsersQuery();
  const users = data?.message;
  //   console.log("details-", users);

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center py-3">Users</h1>

      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <table className="w-full border-collapse border border-gray-300 text-sm my-2">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                NAME
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                EMAIL
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                ADMIN
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left"></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-200"
              >
                <td className="border border-gray-300 px-4 py-2">{user._id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href={`mailto:${user.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {user.email}
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.isAdmin ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex items-center justify-center gap-3">
                    {/* EDIT PRODUCT */}
                    <Link to={`/admin/user/${user._id}/edit`} title="Edit User">
                      <button className="p-2 rounded-md hover:bg-gray-300 transition-colors duration-200">
                        <FaEdit />
                      </button>
                    </Link>

                    {/* DELETE PRODUCT */}
                    <button
                      title="Delete User"
                      onClick={() => deleteHandler(user._id)}
                      className="border p-2 rounded-md bg-gray-300 hover:bg-red-600 hover:text-white transition-colors duration-200"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserListPage;
