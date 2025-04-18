import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../../assets/imgs/Shopping Bag Online Market Logo (1).png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Badge } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../../contetx/UserContetx";
import Swal from "sweetalert2";
import { Loading } from "notiflix";
import { Axios } from "../../api/axios";
import { LOGOUT } from "../../api/api";
import Cookie from "cookie-universal";
import { CartLengthContext } from "../../contetx/CartLengthContext";

const pages = [
  {
    name: "Products",
    icon: <InventoryIcon sx={{ mr: 1 }} />,
    path: "/products",
  },
  { name: "Cart", icon: <ShoppingCartIcon sx={{ mr: 1 }} />, path: "/cart" },
  {
    name: "Checkout",
    icon: <PointOfSaleIcon sx={{ mr: 1 }} />,
    path: "/checkout",
  },
  {
    name: "Contact Us",
    icon: <ContactMailIcon sx={{ mr: 1 }} />,
    path: "/contact",
  },
];

function Navbar() {
  const cookie = Cookie();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { cartLength, setCartLength } = useContext(CartLengthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  // Remove direct state setting in render and use useEffect instead
  const isLoggedIn = !!user; // Convert to boolean

  const settings = [
    "Profile",
    "Account",
    ...(user?.role === "1995" ? ["Dashboard"] : []),
    isLoggedIn ? "Logout" : "Login",
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Loading.arrows({
          fontSize: "50px",
          clickToClose: false,
        });
        try {
          const result = await Axios.get(`/${LOGOUT}`);
          if (result.status === 200) {
            Swal.fire({
              title: "You have been logged out!",
              icon: "success",
              timer: 1500,
            }).then(() => {
              cookie.remove("E-commerce");
              cookie.remove("user");
              localStorage.removeItem("products");
              setUser(null); // Clear user context
              navigate("/login");
            });
          }
        } catch (e) {
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            timer: 1500,
          });
        } finally {
          Loading.remove();
        }
      }
    });
  };

  return (
    <AppBar
      style={{
        background: isScrolled ? "white" : "white",
        color: "black",
        boxShadow: isScrolled ? "0 2px 4px rgba(0, 0, 0, 0.11)" : "none",
        position: "sticky",
        top: 0,
        zIndex: 1100,
        transition: "all 0.3s ease",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Typography
     
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <img width={"auto"} height={"60px"} src={Logo} alt="logo" />
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.path}
                  sx={{
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {page.icon}
                  <Typography sx={{ textAlign: "center", ml: 1 }}>
                    {page.name}
                    {page.name === "Cart" && cartLength > 0 && (
                      <Badge
                        badgeContent={cartLength}
                        color="error"
                        sx={{
                          ml: 1,
                          "& .MuiBadge-badge": {
                            top: -5,
                            right: -5,
                          },
                        }}
                      />
                    )}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <img width={"auto"} height={"60px"} src={Logo} alt="logo" />
          </Typography>

          {/* Desktop Navigation Links */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              gap: 2,
            }}
          >
            {pages.map((page) => (
              <Button
                
                key={page.name}
                component={Link}
                to={page.path}
                sx={{
                  my: 2,
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "primary.main",
                  },
                }}
              >
                {page.icon}
                {page.name}
                {page.name === "Cart" && cartLength > 0 && (
                  <Badge
                    badgeContent={cartLength}
                    color="info"
                    sx={{
                      ml: 1,
                      "& .MuiBadge-badge": {
                        top: -5,
                        right: -5,
                      },
                    }}
                  />
                )}
              </Button>
            ))}
          </Box>

          {/* User Settings */}
          <Box
            
            sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}
          >
            {isLoggedIn ? (
              <>
                <Typography variant="body1" sx={{ mr: 2 }}>
                  {user?.name}
                </Typography>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar>
                      {user?.username
                        ? user.username.charAt(0).toUpperCase()
                        : ""}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={
                        setting === "Logout"
                          ? handleLogout
                          : handleCloseUserMenu
                      }
                      component={setting === "Logout" ? "div" : Link}
                      to={
                        setting !== "Logout" ? `/${setting.toLowerCase()}` : "#"
                      }
                      sx={{
                        transition: ".3s",
                        "&:hover": {
                          backgroundColor: "#0d6efd",
                          color: "white",
                          marginInlineStart: "10px",
                        },
                      }}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                color="primary"
                variant="outlined"
                size="medium"
                sx={{
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
