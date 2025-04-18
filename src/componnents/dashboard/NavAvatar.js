import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import Swal from "sweetalert2";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../api/axios";
import { LOGOUT } from "../../api/api";
import { Loading } from "notiflix";
export default function NavAvatar({ name = "" }) {
  const navigte = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const cookie = Cookie();
  const navigate = useNavigate();

  // Get the first character of the name or a default if empty
  const avatarChar =
    name && name.length > 0 ? name[0].toLocaleUpperCase() : "?";

  function handleLogOut() {
    handleClose();

    Swal.fire({
      title: "Are you sure ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "LogOut...",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Loading.arrows({
          fontSize: "50px",
          clickToClose: false,
        });
        await Axios.get(`/${LOGOUT}`)
          .then((result) => {
            if (result.status === 200) {
              Swal.fire({
                title: "You have been logged out!",
                icon: "success",
                timer: 1500,
              }).then(() => {
                cookie.remove("E-commerce");
                navigate("/login");
              });
            } else {
              Swal.fire({
                title: "Something went wrong",
                icon: "error",
                timer: 1500,
              });
            }
          })
          .catch((e) => {
            Swal.fire({
              title: "Something went wrong",
              icon: "error",
              timer: 1500,
            });
          })
          .finally(() => {
            Loading.remove();
          });
      }
    });
  }

  return (
    <div>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}>{avatarChar}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            navigate("/dashboard/profile");
            handleClose();
          }}
        >
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/dashboard/settings");
            handleClose();
          }}
        >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
