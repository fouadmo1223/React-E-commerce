import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "cookie-universal";
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  TextField,
  Avatar,
  IconButton,
  Tabs,
  Tab,
  useTheme,
  CircularProgress,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  AccountCircle,
  Security,
  Notifications,
  Palette,
  Language,
  Help,
  Logout,
  ArrowForward,
  DarkMode,
  LightMode,
  Edit,
  Check,
  Close,
  Email as EmailIcon,
  Phone,
  LocationOn,
  Work,
  Payment,
  PrivacyTip,
  Storage,
  Apps,
  Wifi,
  BatteryFull,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";

import { baseUrl, LOGOUT } from "../../api/api";
import Swal from "sweetalert2";
import { Loading } from "notiflix";
import { Axios } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const AnimatedContainer = motion(Container);
const AnimatedPaper = motion(Paper);
const AnimatedListItem = motion(ListItem);

const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.primary.main,
    height: 4,
    borderRadius: "2px 2px 0 0",
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: theme.palette.text.secondary,
  "&.Mui-selected": {
    color: theme.palette.primary.main,
  },
}));

const SettingItem = ({ icon, title, description, action, onClick }) => {
  return (
    <AnimatedListItem
      whileHover={{ scale: 1.01 }}
      sx={{
        px: 3,
        py: 2,
        borderRadius: 2,
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
      onClick={onClick}
    >
      <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>
      <ListItemText
        primary={title}
        secondary={description}
        primaryTypographyProps={{ fontWeight: "medium" }}
      />
      {action}
    </AnimatedListItem>
  );
};

export default function Settings() {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [darkMode, setDarkMode] = useState(theme.palette.mode === "dark");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");
  const navigate = useNavigate();
  const cookie = Cookie();
  const token = cookie.get("E-commerce");
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    dataSharing: false,
  });
  const [storageSettings, setStorageSettings] = useState({
    autoClearCache: true,
    storageLimit: "2GB",
  });
  const [appSettings, setAppSettings] = useState({
    autoUpdate: true,
    batterySaver: false,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Merge response data with defaults
        setUser({ ...response.data });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // You would typically dispatch an action to change the theme here
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  const handleSaveName = async () => {
    try {
      setUser({ ...user, name: tempName });
      setEditingName(false);
      setSuccess("Name updated successfully");
    } catch (err) {
      setError("Failed to update name");
    }
  };

  const handleSaveEmail = async () => {
    try {
      await axios.patch(
        "/api/user/email",
        { email: tempEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser({ ...user, email: tempEmail });
      setEditingEmail(false);
      setSuccess("Email updated successfully");
    } catch (err) {
      setError("Failed to update email");
    }
  };

  function handleLogOut() {
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

  const settingsSections = [
    {
      title: "Account",
      icon: <AccountCircle />,
      content: (
        <>
          <Box sx={{ display: "flex", alignItems: "center", p: 3, gap: 3 }}>
            <Avatar
              sx={{ width: 80, height: 80 }}
              src={user?.avatar || "/default-avatar.png"}
            />
            <Box sx={{ flex: 1 }}>
              {editingName ? (
                <Box
                  sx={{ display: "flex", gap: 1, alignItems: "center", mb: 2 }}
                >
                  <TextField
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    size="small"
                    fullWidth
                    autoFocus
                  />
                  <IconButton onClick={handleSaveName} color="primary">
                    <Check />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setEditingName(false);
                      setTempName(user?.name || "");
                    }}
                  >
                    <Close />
                  </IconButton>
                </Box>
              ) : (
                <Typography
                  variant="h6"
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  {user?.name || "Loading..."}
                  <IconButton size="small" onClick={() => setEditingName(true)}>
                    <Edit fontSize="small" />
                  </IconButton>
                </Typography>
              )}

              {editingEmail ? (
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <TextField
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    size="small"
                    fullWidth
                    type="email"
                  />
                  <IconButton onClick={handleSaveEmail} color="primary">
                    <Check />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setEditingEmail(false);
                      setTempEmail(user?.email || "");
                    }}
                  >
                    <Close />
                  </IconButton>
                </Box>
              ) : (
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  color="text.secondary"
                >
                  <EmailIcon fontSize="small" />
                  {user?.email || "Loading..."}
                  <IconButton
                    size="small"
                    onClick={() => setEditingEmail(true)}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </Typography>
              )}
            </Box>
          </Box>
          <Divider />
          <List>
            <SettingItem
              icon={<Security />}
              title="Password & Security"
              description="Change password and security settings"
              action={<ArrowForward />}
            />
            <SettingItem
              icon={<Phone />}
              title="Phone Number"
              description={user?.phone || "Not set"}
              action={<ArrowForward />}
            />
            <SettingItem
              icon={<LocationOn />}
              title="Location"
              description={user?.location || "Not set"}
              action={<ArrowForward />}
            />
          </List>
        </>
      ),
    },
    {
      title: "Appearance",
      icon: <Palette />,
      content: (
        <List>
          <SettingItem
            icon={darkMode ? <DarkMode /> : <LightMode />}
            title="Dark Mode"
            description={darkMode ? "On" : "Off"}
            action={
              <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
                color="primary"
              />
            }
          />
          <SettingItem
            icon={<Palette />}
            title="Theme Color"
            description="Customize your theme color"
            action={<ArrowForward />}
          />
          <SettingItem
            icon={<Apps />}
            title="App Layout"
            description="Change app layout style"
            action={<ArrowForward />}
          />
        </List>
      ),
    },
    {
      title: "Notifications",
      icon: <Notifications />,
      content: (
        <List>
          <SettingItem
            icon={<Notifications />}
            title="Enable Notifications"
            description="Receive app notifications"
            action={
              <Switch
                checked={notifications}
                onChange={toggleNotifications}
                color="primary"
              />
            }
          />
          <SettingItem
            icon={<Notifications />}
            title="Notification Sounds"
            description="Customize notification sounds"
            action={<ArrowForward />}
          />
          <SettingItem
            icon={<Notifications />}
            title="Email Notifications"
            description="Manage email notifications"
            action={<ArrowForward />}
          />
        </List>
      ),
    },
    {
      title: "Privacy",
      icon: <PrivacyTip />,
      content: (
        <List>
          <SettingItem
            icon={<PrivacyTip />}
            title="Profile Visibility"
            description="Who can see your profile"
            action={
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={privacySettings.profileVisibility}
                  onChange={(e) =>
                    setPrivacySettings({
                      ...privacySettings,
                      profileVisibility: e.target.value,
                    })
                  }
                >
                  <MenuItem value="public">Public</MenuItem>
                  <MenuItem value="friends">Friends Only</MenuItem>
                  <MenuItem value="private">Private</MenuItem>
                </Select>
              </FormControl>
            }
          />
          <SettingItem
            icon={<PrivacyTip />}
            title="Data Sharing"
            description="Allow data for analytics"
            action={
              <Switch
                checked={privacySettings.dataSharing}
                onChange={(e) =>
                  setPrivacySettings({
                    ...privacySettings,
                    dataSharing: e.target.checked,
                  })
                }
                color="primary"
              />
            }
          />
          <SettingItem
            icon={<PrivacyTip />}
            title="Location Privacy"
            description="Manage location services"
            action={<ArrowForward />}
          />
        </List>
      ),
    },
    {
      title: "Storage",
      icon: <Storage />,
      content: (
        <List>
          <SettingItem
            icon={<Storage />}
            title="Auto Clear Cache"
            description="Automatically clear cache"
            action={
              <Switch
                checked={storageSettings.autoClearCache}
                onChange={(e) =>
                  setStorageSettings({
                    ...storageSettings,
                    autoClearCache: e.target.checked,
                  })
                }
                color="primary"
              />
            }
          />
          <SettingItem
            icon={<Storage />}
            title="Storage Limit"
            description="Set storage limit"
            action={
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={storageSettings.storageLimit}
                  onChange={(e) =>
                    setStorageSettings({
                      ...storageSettings,
                      storageLimit: e.target.value,
                    })
                  }
                >
                  <MenuItem value="1GB">1GB</MenuItem>
                  <MenuItem value="2GB">2GB</MenuItem>
                  <MenuItem value="5GB">5GB</MenuItem>
                </Select>
              </FormControl>
            }
          />
          <SettingItem
            icon={<Storage />}
            title="Manage Storage"
            description="View and clear storage"
            action={<ArrowForward />}
          />
        </List>
      ),
    },
    {
      title: "Language",
      icon: <Language />,
      content: (
        <List>
          <SettingItem
            icon={<Language />}
            title="App Language"
            description="Change app language"
            action={
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Spanish">Spanish</MenuItem>
                  <MenuItem value="French">French</MenuItem>
                  <MenuItem value="German">German</MenuItem>
                </Select>
              </FormControl>
            }
          />
          <SettingItem
            icon={<Language />}
            title="Region"
            description="Set your region"
            action={<ArrowForward />}
          />
          <SettingItem
            icon={<Language />}
            title="Keyboard Languages"
            description="Manage input languages"
            action={<ArrowForward />}
          />
        </List>
      ),
    },
    {
      title: "Billing",
      icon: <Payment />,
      content: (
        <List>
          <SettingItem
            icon={<Payment />}
            title="Payment Methods"
            description="Manage your payment options"
            action={<ArrowForward />}
          />
          <SettingItem
            icon={<Payment />}
            title="Subscription"
            description="View and manage subscription"
            action={<ArrowForward />}
          />
          <SettingItem
            icon={<Payment />}
            title="Billing History"
            description="View past transactions"
            action={<ArrowForward />}
          />
        </List>
      ),
    },
    {
      title: "Advanced",
      icon: <Work />,
      content: (
        <List>
          <SettingItem
            icon={<Wifi />}
            title="Network Settings"
            description="Configure network options"
            action={<ArrowForward />}
          />
          <SettingItem
            icon={<BatteryFull />}
            title="Battery Saver"
            description="Optimize battery usage"
            action={
              <Switch
                checked={appSettings.batterySaver}
                onChange={(e) =>
                  setAppSettings({
                    ...appSettings,
                    batterySaver: e.target.checked,
                  })
                }
                color="primary"
              />
            }
          />
          <SettingItem
            icon={<Apps />}
            title="Auto Updates"
            description="Automatically update app"
            action={
              <Switch
                checked={appSettings.autoUpdate}
                onChange={(e) =>
                  setAppSettings({
                    ...appSettings,
                    autoUpdate: e.target.checked,
                  })
                }
                color="primary"
              />
            }
          />
        </List>
      ),
    },
  ];

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <AnimatedContainer
      maxWidth="md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{ py: 4 }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 2 }}>
        <SettingsIcon sx={{ fontSize: 40 }} color="primary" />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Settings
        </Typography>
      </Box>

      <StyledTabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        {settingsSections.map((section, index) => (
          <StyledTab
            key={index}
            label={section.title}
            icon={section.icon}
            iconPosition="start"
          />
        ))}
      </StyledTabs>

      <AnimatedPaper
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        elevation={3}
        sx={{ borderRadius: 4, overflow: "hidden" }}
      >
        {settingsSections[tabValue].content}

        <Divider />

        <List>
          <SettingItem
            icon={<Help />}
            title="Help & Support"
            description="Get help with the app"
            action={<ArrowForward />}
          />
          <SettingItem
            icon={<Logout />}
            title="Logout"
            description="Sign out of your account"
            action={<ArrowForward />}
            onClick={handleLogOut}
            sx={{ color: "error.main" }}
            
          />
        </List>
      </AnimatedPaper>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          {new Date().getFullYear()}
        </Typography>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
      >
        <Alert severity="success" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      </Snackbar>
    </AnimatedContainer>
  );
}
