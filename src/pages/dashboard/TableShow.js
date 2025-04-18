import { useState, useEffect } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "hover.css/css/hover-min.css";
import {
  faPenToSquare,
  faTrash,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Typography, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

AOS.init();

export default function TableShow({
  data,
  columns,
  title,
  emptyMessage = "No data found",
  emptyDescription = "It looks like there are no records in the system yet.",
  onEdit,
  onDelete,
  editModalFields = false,
  isLoading = false,
  hideActionsForItem = false,
  onSearch,
  searchPlaceholder = "Search...",
}) {
  const [editModalShow, setEditModalShow] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [actionLoading, setActionLoading] = useState({
    edit: false,
    delete: false,
    itemId: null,
  });
  const [lightboxShow, setLightboxShow] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (onSearch) {
      const timerId = setTimeout(() => {
        onSearch(searchTerm);
      }, 300);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [searchTerm, onSearch]);

  const handleEditClick = (item, event) => {
    event?.target?.blur();
    if (title !== "Products Page") {
      setCurrentItem(item);
      setEditModalShow(true);
    } else {
      onEdit(item.id);
    }
  };

  const handleDelete = async (itemId, event) => {
    event?.target?.blur();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showClass: {
        popup: `animate__animated animate__backInLeft`,
      },
      hideClass: {
        popup: `animate__animated animate__backOutLeft`,
      },
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setActionLoading({ edit: false, delete: true, itemId });
      try {
        await onDelete(itemId);
        toast.success("Item deleted successfully!");
      } catch (error) {
        toast.error(`Failed to delete item: ${error.message}`);
      } finally {
        setActionLoading({ edit: false, delete: false, itemId: null });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setActionLoading({ edit: true, delete: false, itemId: currentItem.id });
    try {
      await onEdit(currentItem);
      toast.success("Item updated successfully!");
      setEditModalShow(false);
    } catch (error) {
      toast.error(`Failed to update item: ${error.message}`);
    } finally {
      setActionLoading({ edit: false, delete: false, itemId: null });
    }
  };

  const handleImageClick = (imageUrl) => {
    setCurrentImage(imageUrl);
    setLightboxShow(true);
  };

  const isItemLoading = (itemId) => {
    return (
      actionLoading.itemId === itemId &&
      (actionLoading.edit || actionLoading.delete)
    );
  };

  return (
    <div className="p-1" style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 2,
          mt: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" component="h2">
            {title}
          </Typography>
        </motion.div>
      </Box>

      {onSearch && (
        <Box sx={{ width: "25%", mb: 3 }}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              transition: "all 0.3s ease",
              boxShadow: isSearchFocused
                ? "0px 4px 20px rgba(0, 0, 0, 0.1)"
                : "none",
              border: "1px solid",
              borderColor: isSearchFocused ? "primary.main" : "divider",
            }}
            elevation={isSearchFocused ? 3 : 0}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon color={isSearchFocused ? "primary" : "action"} />
            </IconButton>
          </Paper>
        </Box>
      )}

      {isLoading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : data?.length > 0 ? (
        <>
          <Table responsive striped bordered hover data-aos="zoom-in">
            <thead>
              <tr data-aos="fade-right" data-aos-delay="300">
                {columns.map((column) => (
                  <th key={column.key}>{column.header}</th>
                ))}
                {(onEdit || onDelete) && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  {columns.map((column) => (
                    <td key={`${item.id}-${column.key}`}>
                      {column.key === "id" ? (
                        index + 1
                      ) : column.key.toLowerCase().includes("image") ? (
                        item[column.key] && (
                          <div
                            onClick={() => handleImageClick(item[column.key])}
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              src={item[column.key]}
                              alt=""
                              style={{
                                maxWidth: "50px",
                                maxHeight: "50px",
                                borderRadius: "4px",
                              }}
                            />
                          </div>
                        )
                      ) : column.render ? (
                        column.render(item[column.key], item)
                      ) : column.key === "price" ? (
                        item[column.key] + " $ "
                      ) : column.key.toLowerCase().includes("description") ? (
                        <span title={item[column.key]}>
                          {item[column.key]?.length > 25
                            ? `${item[column.key].substring(0, 25)}...`
                            : item[column.key]}
                        </span>
                      ) : (
                        item[column.key]
                      )}
                    </td>
                  ))}
                  {(onEdit || onDelete) && !hideActionsForItem?.(item) && (
                    <td>
                      {onEdit && (
                        <button
                          className="btn btn-sm btn-primary p-2 me-2 hvr-hang"
                          style={{ transition: "0.3s", fontSize: "15px" }}
                          onClick={(event) => handleEditClick(item, event)}
                          disabled={isItemLoading(item.id)}
                        >
                          {actionLoading.edit &&
                          actionLoading.itemId === item.id ? (
                            <span
                              className="spinner-border spinner-border-sm me-1"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : (
                            <>
                              Edit{" "}
                              <FontAwesomeIcon
                                icon={faPenToSquare}
                                style={{ marginLeft: "5px" }}
                              />
                            </>
                          )}
                        </button>
                      )}

                      {onDelete && (
                        <button
                          className="btn btn-sm btn-danger p-2 hvr-buzz"
                          style={{ transition: "0.3s", fontSize: "15px" }}
                          onClick={(e) => handleDelete(item.id, e)}
                          disabled={isItemLoading(item.id)}
                        >
                          {actionLoading.delete &&
                          actionLoading.itemId === item.id ? (
                            <span
                              className="spinner-border spinner-border-sm me-1"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : (
                            <>
                              Delete{" "}
                              <FontAwesomeIcon
                                icon={faTrash}
                                style={{ marginLeft: "5px" }}
                              />
                            </>
                          )}
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "300px",
            textAlign: "center",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            mt: 4,
          }}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <Typography
            variant="h4"
            component={motion.div}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{ mb: 2, fontWeight: "bold", color: "text.primary" }}
          >
            {emptyMessage}
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 3, color: "text.secondary" }}
            data-aos="fade-up"
            data-aos-delay="500"
          >
            {emptyDescription}
          </Typography>
        </Box>
      )}

      <Modal
        show={lightboxShow}
        onHide={() => setLightboxShow(false)}
        centered
        size="lg"
        className="lightbox-modal"
      >
        <Modal.Header className="border-0">
          <Button
            variant="link"
            onClick={() => setLightboxShow(false)}
            className="position-absolute end-0 top-0 p-3"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </Button>
        </Modal.Header>
        <Modal.Body className="text-center p-0 d-flex align-items-center justify-content-center">
          <img
            src={currentImage}
            alt="Enlarged view"
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
            }}
          />
        </Modal.Body>
      </Modal>

      {editModalFields && currentItem && (
        <Modal show={editModalShow} onHide={() => setEditModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditSubmit}>
              {editModalFields.map((field) => (
                <Form.Group key={field.name} className="mb-3">
                  <Form.Label>{field.label}</Form.Label>
                  {field.name === "image" ? (
                    <>
                      {currentItem[field.name] && (
                        <div
                          onClick={() =>
                            handleImageClick(currentItem[field.name])
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={currentItem[field.name]}
                            alt="Current"
                            style={{
                              maxWidth: "100px",
                              maxHeight: "100px",
                              marginBottom: "10px",
                            }}
                          />
                        </div>
                      )}
                      <Form.Control
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              setCurrentItem((prev) => ({
                                ...prev,
                                [field.name]: event.target.result,
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </>
                  ) : (
                    <Form.Control
                      type={field.type || "text"}
                      name={field.name}
                      value={currentItem[field.name] || ""}
                      onChange={handleInputChange}
                      required={field.required !== false}
                    />
                  )}
                </Form.Group>
              ))}

              <div className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  onClick={() => setEditModalShow(false)}
                  className="me-2"
                  disabled={actionLoading.edit}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={actionLoading.edit}
                >
                  {actionLoading.edit ? (
                    <span
                      className="spinner-border spinner-border-sm me-1"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
