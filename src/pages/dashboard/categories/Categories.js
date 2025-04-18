import { useState, useEffect, useCallback } from "react";
import useGetData from "../../../hooks/useGetData";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../../componnents/Loading";
import { CATEGORIE } from "../../../api/api";
import useDeleteData from "../../../hooks/useDeleteData";
import TableShow from "../TableShow";
import RoundedPagination from "../../../componnents/dashboard/pagination/MUIPagniation";

export default function Categories() {
  const [allCategories, setAllCategories] = useState([]); // Store all categories
  const [filteredCategories, setFilteredCategories] = useState([]); // Store filtered categories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { getData, putData } = useGetData();
  const { deleteData } = useDeleteData();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getData("categories");
        setAllCategories(categoriesData);
        setFilteredCategories(categoriesData); // Initialize filtered data
      } catch (err) {
        setError(err.message);
        toast.error(`Failed to load categories: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Search/filter function with debounce
  const handleSearch = useCallback(
    (searchValue) => {
      if (!searchValue) {
        setFilteredCategories(allCategories);
        setCurrentPage(1); // Reset to first page
        return;
      }

      const lowercasedSearch = searchValue.toLowerCase();
      const filtered = allCategories.filter(
        (category) =>
          category.title.toLowerCase().includes(lowercasedSearch)
      );

      setFilteredCategories(filtered);
      setCurrentPage(1); // Reset to first page when searching
    },
    [allCategories]
  );

  // Calculate paginated data based on filtered results
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleEdit = async (category) => {
    const originalCategories = [...allCategories];
    try {
      const updatedCategories = allCategories.map((cat) =>
        cat.id === category.id ? { ...cat, ...category } : cat
      );

      setAllCategories(updatedCategories);
      setFilteredCategories(updatedCategories); // Update filtered list too

      await putData(`${CATEGORIE}/edit/${category.id}`, category);
      return true;
    } catch (err) {
      setAllCategories(originalCategories);
      setFilteredCategories(originalCategories);
      console.error("Edit failed:", err);
      throw err;
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await deleteData(`${CATEGORIE}/${categoryId}`);
      const updatedCategories = allCategories.filter(
        (cat) => cat.id !== categoryId
      );
      setAllCategories(updatedCategories);
      setFilteredCategories(updatedCategories); // Update filtered list too
      return true;
    } catch (err) {
      throw err;
    }
  };

  const columns = [
    { key: "id", header: "ID" },
    { key: "title", header: "Title" },
    { key: "image", header: "Image" },
  ];

  const editModalFields = [
    { name: "title", label: "Title", required: true },
    { name: "image", label: "Image", required: true },
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
            title="Categories Page"
            emptyMessage="No Categories Found"
            emptyDescription="It looks like there are no Categories in the system yet. Would you like to add one?"
            addButtonText="Add New Category"
            addButtonPath="/dashboard/category/add"
            onEdit={handleEdit}
            onDelete={handleDelete}
            editModalFields={editModalFields}
            isLoading={loading}
            hideActionsForItem={(item) => item.role === "1995"}
            style={{ width: "100%", flex: 1 }}
            onSearch={handleSearch} // Pass search handler
            searchPlaceholder="Search categories..."
          />
        </div>

        <div
          style={{
            width: "100%",
            padding: "16px 0",
            backgroundColor: "#f8f9fa",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {filteredCategories.length > itemsPerPage && (
            <RoundedPagination
              count={Math.ceil(filteredCategories.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  );
}
