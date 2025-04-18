import { useEffect, useState } from "react";
import { Axios } from "../../api/axios";
import { CATEGORIES } from "../../api/api";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Divider,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Star, AccessTime, Menu, Close } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledAside = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  padding: theme.spacing(2),
  height: "calc(100vh - 70px)",
  overflowY: "auto",
  width: "250px",
  borderRight: `1px solid ${theme.palette.divider}`,
  position: "relative", // Needed for absolute positioning of child elements
  transition: "transform 0.3s ease-in-out",
  transform: "translateX(0)",
  "&.closed": {
    transform: "translateX(-100%)",
  },
  "& .MuiListItemButton-root": {
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: theme.palette.grey[300],
    },
    "&.active": {
      backgroundColor: theme.palette.primary.light,
      "& .MuiListItemIcon-root": {
        color: theme.palette.primary.main,
      },
    },
  },
}));

const ToggleButton = styled(IconButton)(({ theme, openaside }) => ({
  position: "absolute",
  left: openaside ? "17%" : "1%", // Position inside the right edge of the aside
  top: "15%",
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.grey[200],
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
  transition: "transform 0.3s ease-in-out",
  transform: openaside === "true" ? "rotate(0deg)" : "rotate(180deg)",
}));
export default function ProductsAside() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState([]);
  const [openAside, setOpenAside] = useState(true);
  const [activeFilter, setActiveFilter] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Axios.get(`${CATEGORIES}`);
        setCategories(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    console.log(checked);
  };

  const toggleAside = () => {
    setOpenAside((prev)=>!prev);
  };

  const handleFilterClick = (filterName) => {
    console.log(`Filter clicked: ${filterName}`);
    setActiveFilter(filterName);
  };

  return (
    <>
      <ToggleButton
        onClick={toggleAside}
        size="small"
        openaside={openAside.toString()}
      >
        {openAside ? <Close fontSize="small" /> : <Menu fontSize="small" />}
      </ToggleButton>

      <StyledAside className={openAside ? "" : "closed"}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Filter Products
        </Typography>

        <List>
          <ListItemButton
            className={activeFilter === "recent" ? "active" : ""}
            onClick={() => handleFilterClick("recent")}
          >
            <ListItemIcon>
              <AccessTime
                color={activeFilter === "recent" ? "primary" : "inherit"}
              />
            </ListItemIcon>
            <ListItemText primary="Recently Added" />
          </ListItemButton>

          <ListItemButton
            className={activeFilter === "top" ? "active" : ""}
            onClick={() => handleFilterClick("top")}
          >
            <ListItemIcon>
              <Star color={activeFilter === "top" ? "primary" : "inherit"} />
            </ListItemIcon>
            <ListItemText primary="Top Rated" />
          </ListItemButton>

          <Divider sx={{ my: 1 }} />

          <Typography
            variant="subtitle1"
            sx={{ mt: 2, mb: 1, fontWeight: 500 }}
          >
            Categories
          </Typography>

          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {categories.slice(0, 3).map((category) => (
                <ListItem key={category.id} disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(category.id)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        value={category.id}
                        edge="start"
                        checked={checked.indexOf(category.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText primary={category.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </List>
      </StyledAside>
    </>
  );
}
