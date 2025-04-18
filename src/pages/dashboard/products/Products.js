import { useState, useEffect, useMemo, useCallback } from "react";
import useGetData from "../../../hooks/useGetData";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../../componnents/Loading";
import { CATEGORIES, PRODUCT, PRODUCTS } from "../../../api/api";
import useDeleteData from "../../../hooks/useDeleteData";
import TableShow from "../TableShow";
import { useNavigate } from "react-router-dom";
import PaginatedItems from "../../../componnents/dashboard/pagination/ReactPagiantion";
import ItemsPerPage from "../../../componnents/dashboard/pagination/ItemsPerPage";

export default function Products() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { getData } = useGetData();
  const { deleteData } = useDeleteData();

  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const getCategoryTitle = useMemo(() => {
    return (categoryId) => {
      const category = categories.find((cat) => cat.id === categoryId);
      return category ? category.title : "Unknown Category";
    };
  }, [categories]);

  const handleSearch = useCallback(
    (searchValue) => {
      if (!searchValue) {
        setFilteredProducts(allProducts);
        return;
      }

      const lowercasedSearch = searchValue.toLowerCase();
      const filtered = allProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(lowercasedSearch) ||
          getCategoryTitle(product.category)
            .toLowerCase()
            .includes(lowercasedSearch) ||
          product.price.toString().includes(lowercasedSearch) ||
          product.rating.toString().includes(lowercasedSearch)
      );

      setFilteredProducts(filtered);
      setPage(0);
    },
    [allProducts, getCategoryTitle]
  );

  useEffect(() => {
    setFilteredProducts(allProducts);
  }, [allProducts]);

  const pageCount = useMemo(
    () => Math.ceil(filteredProducts.length / itemsPerPage),
    [filteredProducts.length, itemsPerPage]
  );

  const currentItems = useMemo(
    () =>
      filteredProducts.slice(page * itemsPerPage, (page + 1) * itemsPerPage),
    [filteredProducts, page, itemsPerPage]
  );

  const columns = useMemo(
    () => [
      { key: "id", header: "ID" },
      { key: "title", header: "Title" },
      {
        key: "category",
        header: "Category",
        render: (value) => getCategoryTitle(value),
      },
      { key: "price", header: "Price" },
      { key: "rating", header: "Rating" },
    ],
    [getCategoryTitle]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allProducts, allCategories] = await Promise.all([
          getData(PRODUCTS),
          getData(CATEGORIES),
        ]);
        setAllProducts(allProducts);
        setCategories(allCategories);
      } catch (err) {
        setError(err.message);
        toast.error(`Failed to load data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = async (productID) => {
    navigate(`/dashboard/product/edit/${productID}`);
  };

  const handleDelete = async (productId) => {
    try {
      await deleteData(`${PRODUCT}/${productId}`);
      setAllProducts(allProducts.filter((product) => product.id !== productId));
      return true;
    } catch (err) {
      throw err;
    }
  };

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
            title="Products Page"
            emptyMessage="No Products Found"
            emptyDescription="It looks like there are no Products in the system yet. Would you like to add one?"
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={loading}
            hideActionsForItem={(item) => item.role === "1995"}
            onSearch={handleSearch}
            searchPlaceholder="Search products..."
            style={{ width: "100%", flex: 1 }}
          />
        </div>

        <div
          style={{
            width: "100%",
            padding: "16px 0",
            backgroundColor: "#f8f9fa",
          }}
        >
          <div
            className="d-flex align-items-center justify-content-center gap-4"
            style={{ gap: "20px" }}
          >
            <ItemsPerPage
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              setPage={setPage}
            />

            {filteredProducts.length > itemsPerPage && (
              <PaginatedItems
                setPage={setPage}
                itemsPerPage={itemsPerPage}
                items={filteredProducts}
                pageCount={pageCount}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
