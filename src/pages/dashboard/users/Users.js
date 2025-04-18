import { useState, useEffect, useCallback } from "react";
import useGetData from "../../../hooks/useGetData";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../../componnents/Loading";
import { USER } from "../../../api/api";
import useDeleteData from "../../../hooks/useDeleteData";
import { Axios } from "../../../api/axios";
import TableShow from "../TableShow";
import PaginatedItems from "../../../componnents/dashboard/pagination/ReactPagiantion";
import ItemsPerPage from "../../../componnents/dashboard/pagination/ItemsPerPage";

export default function Users() {
  const [allUsers, setAllUsers] = useState([]); // Store all users
  const [filteredUsers, setFilteredUsers] = useState([]); // Store filtered users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { getData, putData } = useGetData();
  const { deleteData } = useDeleteData();

  // pagination with react
  const [page, setPage] = useState(0); // react-paginate uses 0-based index
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page

  // Search/filter function with debounce
  const handleSearch = useCallback(
    (searchValue) => {
      if (!searchValue) {
        setFilteredUsers(allUsers);
        setPage(0); // Reset to first page
        return;
      }

      const lowercasedSearch = searchValue.toLowerCase();
      const filtered = allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(lowercasedSearch) ||
          user.email.toLowerCase().includes(lowercasedSearch) ||
          user.id.toString().includes(lowercasedSearch) ||
          user.role.toLowerCase().includes(lowercasedSearch)
      );

      setFilteredUsers(filtered);
      setPage(0); // Reset to first page when searching
    },
    [allUsers]
  );

  // Calculate paginated data based on filtered results
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentItems = filteredUsers.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const currentUserResponse = await Axios.get(`/${USER}`);
        setUser(currentUserResponse.data);

        const allUsersData = await getData("users");
        const filteredUsersData = allUsersData.filter(
          (userr) => userr.id !== currentUserResponse.data.id
        );

        setAllUsers(filteredUsersData);
        setFilteredUsers(filteredUsersData);
      } catch (err) {
        setError(err.message);
        toast.error(`Failed to load users: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = async (user) => {
    const originalUsers = [...allUsers];
    try {
      const updatedUsers = allUsers.map((u) =>
        u.id === user.id ? { ...u, ...user } : u
      );

      setAllUsers(updatedUsers);
      setFilteredUsers(updatedUsers);

      await putData(`${USER}/edit/${user.id}`, user);
      toast.success("User updated successfully");
      return true;
    } catch (err) {
      setAllUsers(originalUsers);
      setFilteredUsers(originalUsers);
      toast.error(`Failed to update user: ${err.message}`);
      throw err;
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteData(`${USER}/${userId}`);
      const updatedUsers = allUsers.filter((u) => u.id !== userId);
      setAllUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      return true;
    } catch (err) {
      toast.error(`Failed to delete user: ${err.message}`);
      throw err;
    }
  };

  const columns = [
    { key: "id", header: "ID" },
    { key: "name", header: "Username" },
    { key: "email", header: "Email" },
    {
      key: "role",
      header: "Role",
      render: (value) => {
        switch (value) {
          case "1995":
            return "Admin";
          case "2001":
            return "User";
          case "1999":
            return "Product Manager";
          default:
            return "Writer";
        }
      },
    },
  ];

  const editModalFields = [
    { name: "name", label: "Name", required: true },
    { name: "email", label: "Email", type: "email", required: true },
  ];

  if (loading) {
    return (
      <div
        className="d-flex m-auto justify-content-center align-items-center"
        style={{ height: "89vh" }}
      >
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger m-3">Error: {error}</div>;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <div
          style={{
            flex: 1,
            width: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TableShow
            data={currentItems}
            columns={columns}
            title="Users Page"
            emptyMessage="No Users Found"
            emptyDescription="It looks like there are no users in the system yet. Would you like to add one?"
            addButtonText="Add New User"
            addButtonPath="user/add"
            onEdit={handleEdit}
            onDelete={handleDelete}
            editModalFields={editModalFields}
            isLoading={loading}
            hideActionsForItem={(item) => item.role === "1995"}
            style={{ width: "100%", flex: 1 }}
            onSearch={handleSearch} // Pass search handler
            searchPlaceholder="Search users..."
          />
        </div>

        <div
          style={{
            width: "100%",
            padding: "16px 0",
            backgroundColor: "#f8f9fa",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <ItemsPerPage
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            setPage={setPage}
          />

          {filteredUsers.length > itemsPerPage && (
            <PaginatedItems
              setPage={setPage}
              itemsPerPage={itemsPerPage}
              items={filteredUsers}
              pageCount={pageCount}
              forcePage={page}
            />
          )}
        </div>
      </div>
    </>
  );
}
