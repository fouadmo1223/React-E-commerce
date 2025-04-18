import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Cookie from "cookie-universal";

// MUI Components
import {
  Container,
  Typography,
  Avatar,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  LinearProgress,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Skeleton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Fab,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  Work,
  School,
  Star,
  LinkedIn,
  GitHub,
  Twitter,
  Instagram,
  CameraAlt,
  Edit,
  Add,
  Language,
  Code,
  Build,
  Group,
  EmojiEvents,
  Description,
} from "@mui/icons-material";

// Styles
import { styled, alpha } from "@mui/material/styles";
import { baseUrl } from "../../api/api";

const GradientCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.main,
    0.1
  )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
  borderRadius: "20px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
  },
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  position: "relative",
  marginBottom: theme.spacing(4),
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: -8,
    left: 0,
    width: "60px",
    height: "4px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: "2px",
  },
}));

const SkillBar = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 6,
  marginTop: theme.spacing(1),
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  "& .MuiLinearProgress-bar": {
    borderRadius: 6,
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  margin: theme.spacing(0.5),
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  marginRight: { md: theme.spacing(4) },
  marginBottom: { xs: theme.spacing(3), md: 0 },
}));

const EditFab = styled(Fab)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const AddButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: "white",
  "&:hover": {
    opacity: 0.9,
  },
}));

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [editSection, setEditSection] = useState(null);
  const [editData, setEditData] = useState({});
  const cookie = Cookie();
  const token = cookie.get("E-commerce");
  const navigate = useNavigate();

  // Default user data structure with 8 sections
  const defaultUser = {
    name: "Your Name",
    title: "Professional Title",
    bio: "A brief introduction about yourself and your professional background.",
    email: "your.email@example.com",
    phone: "010168389",
    location: "City, Country",
    company: "Current Company",
    avatar: "/default-avatar.png",
    social: {
      linkedin: "",
      github: "",
      twitter: "",
      instagram: "",
    },
    // Section 1: Skills
    skills: [
      { name: "React", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "HTML/CSS", level: 95 },
      { name: "Redux Toolkit", level: 80 },
      { name: "php", level: 80 },
    ],
    // Section 2: Experience
    experience: [
      {
        position: "Frontend Developer",
        company: "Tech Company",
        startDate: "2020",
        endDate: "Present",
        description: "Developed web applications using React and Node.js",
      },
    ],
    // Section 3: Education
    education: [
      {
        degree: "B.Sc Computer Science",
        school: "University Name",
        fieldOfStudy: "Computer Engineering",
        startDate: "2016",
        endDate: "2020",
      },
    ],
    // Section 4: Projects
    projects: [
      {
        name: "E-commerce Platform",
        description: "A full-featured online shopping platform",
        technologies: ["React", "Node.js", "MongoDB"],
        image: "/default-project.png",
      },
    ],
    // Section 5: Achievements
    achievements: [
      {
        title: "Best Developer Award",
        issuer: "Tech Conference 2023",
        date: "2023",
      },
    ],
    // Section 6: Languages
    languages: [
      { name: "English", level: "Fluent" },
      { name: "Arabic", level: "Native" },
    ],
    // Section 7: Certifications
    certifications: [
      {
        name: "React Professional",
        issuer: "React Institute",
        date: "2022",
      },
    ],
    // Section 8: Volunteer Work
    volunteer: [
      {
        organization: "Code for Good",
        role: "Mentor",
        duration: "2021-Present",
        description: "Teaching coding to underprivileged youth",
      },
    ],
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Merge response data with defaults
        setUser({ ...defaultUser, ...response.data });
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Use default user if API fails
        setUser(defaultUser);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        // Here you would typically upload the image to your server
        // For demo purposes, we're just setting the preview
        setUser({ ...user, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const openEditDialog = (section, data = {}) => {
    setEditSection(section);
    setEditData(data);
  };

  const closeEditDialog = () => {
    setEditSection(null);
    setEditData({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const saveEdit = () => {
    if (editSection) {
      // Handle different section updates
      if (editSection.startsWith("skills")) {
        const newSkills = [...user.skills];
        const skillIndex = parseInt(editSection.split("-")[1]);
        if (skillIndex >= 0) {
          newSkills[skillIndex] = editData;
          setUser({ ...user, skills: newSkills });
        } else {
          setUser({ ...user, skills: [...user.skills, editData] });
        }
      } else if (editSection === "profile") {
        setUser({ ...user, ...editData });
      }
    }
    closeEditDialog();
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" width="100%" height={400} />
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {[...Array(8)].map((_, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Skeleton variant="rectangular" width="100%" height={200} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Edit Dialog */}
      <Dialog open={Boolean(editSection)} onClose={closeEditDialog}>
        <DialogTitle>
          {editSection === "profile"
            ? "Edit Profile"
            : editSection?.startsWith("skills")
            ? "Edit Skill"
            : `Edit ${editSection}`}
        </DialogTitle>
        <DialogContent>
          {editSection === "profile" && (
            <>
              <TextField
                margin="dense"
                name="name"
                label="Full Name"
                fullWidth
                value={editData.name || user.name}
                onChange={handleEditChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                name="title"
                label="Professional Title"
                fullWidth
                value={editData.title || user.title}
                onChange={handleEditChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                name="bio"
                label="Bio"
                fullWidth
                multiline
                rows={4}
                value={editData.bio || user.bio}
                onChange={handleEditChange}
              />
            </>
          )}
          {editSection?.startsWith("skills") && (
            <>
              <TextField
                margin="dense"
                name="name"
                label="Skill Name"
                fullWidth
                value={editData.name || ""}
                onChange={handleEditChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                name="level"
                label="Proficiency Level"
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                fullWidth
                value={editData.level || ""}
                onChange={handleEditChange}
              />
            </>
          )}
          {/* Add similar fields for other sections */}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>Cancel</Button>
          <Button onClick={saveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Section 1: Profile Header */}
      <GradientCard
        data-aos="fade-down"
        sx={{
          mb: 6,
          p: { xs: 3, md: 4 },
          position: "relative",
        }}
      >
        <EditFab size="small" onClick={() => openEditDialog("profile", user)}>
          <Edit fontSize="small" />
        </EditFab>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
          }}
        >
          <AvatarContainer>
            <Avatar
              src={avatarPreview || user.avatar}
              sx={{
                width: 150,
                height: 150,
                border: "4px solid",
                borderColor: "primary.main",
              }}
            />
            <IconButton
              component="label"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              <CameraAlt fontSize="small" />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </IconButton>
          </AvatarContainer>
          <Box
            style={{ marginLeft: "30px" }}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <Typography variant="h3" component="h1" gutterBottom>
              {user.name}
            </Typography>
            <Typography
              variant="h5"
              color="primary"
              fontWeight="bold"
              gutterBottom
            >
              {user.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: { xs: "center", md: "flex-start" },
                gap: 1,
                mt: 2,
              }}
            >
              <Chip
                icon={<LocationOn />}
                label={user.location}
                variant="outlined"
              />
              <Chip
                icon={<Work />}
                label={user.company}
                variant="outlined"
                color="primary"
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              {user.social?.linkedin && (
                <SocialIcon aria-label="LinkedIn" href={user.social.linkedin}>
                  <LinkedIn />
                </SocialIcon>
              )}
              {user.social?.github && (
                <SocialIcon aria-label="GitHub" href={user.social.github}>
                  <GitHub />
                </SocialIcon>
              )}
              {user.social?.twitter && (
                <SocialIcon aria-label="Twitter" href={user.social.twitter}>
                  <Twitter />
                </SocialIcon>
              )}
              {user.social?.instagram && (
                <SocialIcon aria-label="Instagram" href={user.social.instagram}>
                  <Instagram />
                </SocialIcon>
              )}
            </Box>
          </Box>
        </Box>
      </GradientCard>

      {/* Section 2: About & Contact */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6} data-aos="fade-right">
          <GradientCard sx={{ height: "100%" }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <SectionHeader variant="h4">About Me</SectionHeader>
                <IconButton onClick={() => openEditDialog("profile", user)}>
                  <Edit />
                </IconButton>
              </Box>
              <Typography variant="body1" color="text.secondary">
                {user.bio}
              </Typography>
            </CardContent>
          </GradientCard>
        </Grid>
        <Grid item xs={12} md={6} data-aos="fade-left">
          <GradientCard sx={{ height: "100%" }}>
            <CardContent>
              <SectionHeader variant="h4">Contact Information</SectionHeader>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      <Email />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Email" secondary={user.email} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "secondary.main" }}>
                      <Phone />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Phone" secondary={user.phone} />
                </ListItem>
              </List>
            </CardContent>
          </GradientCard>
        </Grid>
      </Grid>

      {/* Section 3: Skills */}
      <Box data-aos="fade-right" sx={{ mb: 6 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <SectionHeader variant="h4">
            <Code sx={{ mr: 1, verticalAlign: "middle" }} />
            Skills & Expertise
          </SectionHeader>
          <Button
            startIcon={<Add />}
            onClick={() => openEditDialog("skills-new", { level: 50 })}
          >
            Add Skill
          </Button>
        </Box>
        <Grid container spacing={3}>
          {user.skills.map((skill, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <GradientCard>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6">{skill.name}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => openEditDialog(`skills-${index}`, skill)}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </Box>
                  <SkillBar
                    variant="determinate"
                    value={skill.level}
                    color={
                      skill.level > 75
                        ? "primary"
                        : skill.level > 50
                        ? "secondary"
                        : "warning"
                    }
                  />
                  <Typography variant="caption" color="text.secondary">
                    {skill.level}% proficiency
                  </Typography>
                </CardContent>
              </GradientCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Section 4: Experience & Education */}
      <Box data-aos="fade-right" sx={{ mb: 6 }}>
        <Paper sx={{ p: 2, borderRadius: "20px", background: "transparent" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: "space-around",
              },
            }}
          >
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Work sx={{ mr: 1 }} />
                  Experience
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <School sx={{ mr: 1 }} />
                  Education
                </Box>
              }
            />
          </Tabs>
          <Box sx={{ p: 3 }}>
            {tabValue === 0 && (
              <>
                <Box sx={{ textAlign: "right", mb: 2 }}>
                  <AddButton
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() =>
                      openEditDialog("experience", {
                        position: "",
                        company: "",
                        startDate: "",
                        endDate: "",
                        description: "",
                      })
                    }
                  >
                    Add Experience
                  </AddButton>
                </Box>
                <List>
                  {user.experience.map((exp, index) => (
                    <React.Fragment key={index}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "primary.main" }}>
                            <Work />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={exp.position}
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {exp.company}
                              </Typography>
                              <br />
                              {exp.startDate} - {exp.endDate || "Present"}
                              <br />
                              {exp.description}
                            </>
                          }
                        />
                        <IconButton
                          edge="end"
                          onClick={() => openEditDialog("experience", exp)}
                        >
                          <Edit />
                        </IconButton>
                      </ListItem>
                      {index < user.experience.length - 1 && (
                        <Divider variant="inset" component="li" />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </>
            )}
            {tabValue === 1 && (
              <>
                <Box sx={{ textAlign: "right", mb: 2 }}>
                  <AddButton
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() =>
                      openEditDialog("education", {
                        degree: "",
                        school: "",
                        fieldOfStudy: "",
                        startDate: "",
                        endDate: "",
                      })
                    }
                  >
                    Add Education
                  </AddButton>
                </Box>
                <List>
                  {user.education.map((edu, index) => (
                    <React.Fragment key={index}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "secondary.main" }}>
                            <School />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={edu.degree}
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {edu.school}
                              </Typography>
                              <br />
                              {edu.fieldOfStudy}
                              <br />
                              {edu.startDate} - {edu.endDate}
                            </>
                          }
                        />
                        <IconButton
                          edge="end"
                          onClick={() => openEditDialog("education", edu)}
                        >
                          <Edit />
                        </IconButton>
                      </ListItem>
                      {index < user.education.length - 1 && (
                        <Divider variant="inset" component="li" />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </>
            )}
          </Box>
        </Paper>
      </Box>

      {/* Section 5: Projects */}
      <Box data-aos="fade-right" sx={{ mb: 6 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <SectionHeader variant="h4">
            <Build sx={{ mr: 1, verticalAlign: "middle" }} />
            Featured Projects
          </SectionHeader>
          <AddButton
            variant="contained"
            startIcon={<Add />}
            onClick={() =>
              openEditDialog("project", {
                name: "",
                description: "",
                technologies: [],
              })
            }
          >
            Add Project
          </AddButton>
        </Box>
        <Grid container spacing={3}>
          {user.projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <GradientCard>
                <Box
                  sx={{
                    height: 180,
                    backgroundImage: `url(${
                      project.image || "/default-project.png"
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      {project.name}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => openEditDialog("project", project)}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {project.description}
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {project.technologies.map((tech, i) => (
                      <Chip
                        key={i}
                        label={tech}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
              </GradientCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Section 6: Achievements */}
      <Box data-aos="fade-right" sx={{ mb: 6 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <SectionHeader variant="h4">
            <EmojiEvents sx={{ mr: 1, verticalAlign: "middle" }} />
            Achievements
          </SectionHeader>
          <AddButton
            variant="contained"
            startIcon={<Add />}
            onClick={() =>
              openEditDialog("achievement", {
                title: "",
                issuer: "",
                date: "",
              })
            }
          >
            Add Achievement
          </AddButton>
        </Box>
        <Grid container spacing={3}>
          {user.achievements.map((achievement, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <GradientCard>
                <CardContent sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      mr: 3,
                      width: 56,
                      height: 56,
                    }}
                  >
                    <Star fontSize="large" />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h6">{achievement.title}</Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          openEditDialog("achievement", achievement)
                        }
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {achievement.issuer} • {achievement.date}
                    </Typography>
                  </Box>
                </CardContent>
              </GradientCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Section 7: Languages */}
      <Box data-aos="fade-right" sx={{ mb: 6 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <SectionHeader variant="h4">
            <Language sx={{ mr: 1, verticalAlign: "middle" }} />
            Languages
          </SectionHeader>
          <AddButton
            variant="contained"
            startIcon={<Add />}
            onClick={() =>
              openEditDialog("language", {
                name: "",
                level: "",
              })
            }
          >
            Add Language
          </AddButton>
        </Box>
        <Grid container spacing={3}>
          {user.languages.map((language, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <GradientCard>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6">{language.name}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => openEditDialog("language", language)}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {language.level}
                  </Typography>
                </CardContent>
              </GradientCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Section 8: Volunteer Work */}
      <Box data-aos="fade-right">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <SectionHeader variant="h4">
            <Group sx={{ mr: 1, verticalAlign: "middle" }} />
            Volunteer Work
          </SectionHeader>
          <AddButton
            variant="contained"
            startIcon={<Add />}
            onClick={() =>
              openEditDialog("volunteer", {
                organization: "",
                role: "",
                duration: "",
                description: "",
              })
            }
          >
            Add Volunteer Work
          </AddButton>
        </Box>
        <Grid container spacing={3}>
          {user.volunteer.map((volunteer, index) => (
            <Grid item xs={12} key={index}>
              <GradientCard>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography variant="h6">
                        {volunteer.organization}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        sx={{ mb: 1 }}
                      >
                        {volunteer.role} • {volunteer.duration}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {volunteer.description}
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={() => openEditDialog("volunteer", volunteer)}
                    >
                      <Edit />
                    </IconButton>
                  </Box>
                </CardContent>
              </GradientCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
