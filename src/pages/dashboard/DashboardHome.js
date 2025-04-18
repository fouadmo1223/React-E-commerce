import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  IconButton,
  useTheme,
  styled,
  alpha,
  Avatar,
  Chip,
  LinearProgress,
  Badge,
} from "@mui/material";
import {
  Category as CategoryIcon,
  TrendingUp,
  ShoppingCart,
  CalendarToday,
  MoreVert,
} from "@mui/icons-material";
import {
  FiUsers,
  FiShoppingBag,
  FiDollarSign,
  FiLayers,
  FiActivity,
  FiClock,
  FiPackage,
} from "react-icons/fi";
import { RiExchangeLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineAreaChart, AiOutlineTeam } from "react-icons/ai";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";

const GlassCard = styled(Card)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.85),
  backdropFilter: "blur(12px)",
  borderRadius: "16px",
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
  },
}));

const DashboardHome = () => {
  const theme = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // Data
  const stats = [
    {
      title: "Total Users",
      value: "1,245",
      change: "+12%",
      icon: <FiUsers size={24} />,
      color: theme.palette.primary.main,
    },
    {
      title: "Products",
      value: "856",
      change: "+5%",
      icon: <FiShoppingBag size={24} />,
      color: theme.palette.info.main,
    },
    {
      title: "Revenue",
      value: "$24,532",
      change: "+18%",
      icon: <FiDollarSign size={24} />,
      color: theme.palette.success.main,
    },
    {
      title: "Categories",
      value: "32",
      change: "+2",
      icon: <FiLayers size={24} />,
      color: theme.palette.warning.main,
    },
  ];

  const recentActivities = [
    {
      user: "John Doe",
      action: "added new product",
      time: "2 min ago",
      avatar: "/avatars/1.jpg",
    },
    {
      user: "Sarah Smith",
      action: "updated category",
      time: "10 min ago",
      avatar: "/avatars/2.jpg",
    },
    {
      user: "Admin",
      action: "created new user",
      time: "25 min ago",
      avatar: "/avatars/3.jpg",
    },
  ];

  const topProducts = [
    { name: "Wireless Headphones", sales: 1245, progress: 85 },
    { name: "Smart Watch", sales: 987, progress: 70 },
    { name: "Bluetooth Speaker", sales: 756, progress: 60 },
    { name: "Laptop Backpack", sales: 543, progress: 45 },
  ];

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Developer",
      status: "active",
      avatar: "/avatars/4.jpg",
    },
    {
      name: "Maria Garcia",
      role: "Designer",
      status: "active",
      avatar: "/avatars/5.jpg",
    },
    {
      name: "James Wilson",
      role: "Marketer",
      status: "away",
      avatar: "/avatars/6.jpg",
    },
    {
      name: "Sarah Lee",
      role: "Manager",
      status: "offline",
      avatar: "/avatars/7.jpg",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "Michael Brown",
      date: "12 May 2023",
      status: "shipped",
      amount: "$125.99",
    },
    {
      id: "#ORD-002",
      customer: "Emily Davis",
      date: "11 May 2023",
      status: "processing",
      amount: "$89.50",
    },
    {
      id: "#ORD-003",
      customer: "Robert Taylor",
      date: "10 May 2023",
      status: "delivered",
      amount: "$234.00",
    },
    {
      id: "#ORD-004",
      customer: "Jessica Martinez",
      date: "9 May 2023",
      status: "cancelled",
      amount: "$56.75",
    },
  ];

  const performanceMetrics = [
    {
      metric: "Page Views",
      value: "24,532",
      change: "+12%",
      icon: <FiActivity size={20} />,
    },
    {
      metric: "Conversion Rate",
      value: "3.2%",
      change: "+0.5%",
      icon: <TrendingUp fontSize="small" />,
    },
    {
      metric: "Avg. Session",
      value: "4m 32s",
      change: "+18%",
      icon: <FiClock size={20} />,
    },
    {
      metric: "Bounce Rate",
      value: "42%",
      change: "-5%",
      icon: <RiExchangeLine size={20} />,
    },
  ];

  // Chart Data
  const lineChartData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 2780 },
    { month: "May", revenue: 1890 },
    { month: "Jun", revenue: 2390 },
  ];

  const pieChartData = [
    { label: "Electronics", value: 35 },
    { label: "Clothing", value: 25 },
    { label: "Home", value: 20 },
    { label: "Books", value: 15 },
    { label: "Other", value: 5 },
  ];

  const barChartData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 6000 },
    { name: "Apr", sales: 2780 },
    { name: "May", sales: 1890 },
    { name: "Jun", sales: 2390 },
  ];

  const areaChartData = [
    { month: "Jan", users: 1000, sessions: 2400 },
    { month: "Feb", users: 1200, sessions: 2600 },
    { month: "Mar", users: 800, sessions: 2000 },
    { month: "Apr", users: 1600, sessions: 3200 },
    { month: "May", users: 1400, sessions: 2800 },
    { month: "Jun", users: 1800, sessions: 3800 },
  ];

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Section 1: Welcome Banner */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard
            sx={{
              mb: 4,
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.primary.dark,
                0.9
              )} 0%, ${alpha(theme.palette.secondary.dark, 0.9)} 100%)`,
              color: "white",
            }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h4" gutterBottom fontWeight="bold">
                    Welcome back, Admin! 👋
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Here's what's happening with your store today.
                  </Typography>
                </Box>
                <Chip
                  icon={<CalendarToday fontSize="small" />}
                  label="May 12, 2023"
                  sx={{
                    background: alpha("#fff", 0.2),
                    color: "white",
                    fontWeight: "medium",
                  }}
                />
              </Stack>
            </CardContent>
          </GlassCard>
        </motion.div>

        {/* Section 2: Stats Cards */}
        <Grid container spacing={3} mb={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <GlassCard>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: "12px",
                          background: alpha(stat.color, 0.1),
                          color: stat.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {stat.icon}
                      </Box>
                      <Box>
                        <Typography variant="h5" fontWeight="bold">
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stat.title}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        fontWeight: "medium",
                        color: stat.change.startsWith("+")
                          ? "success.main"
                          : "error.main",
                      }}
                    >
                      {stat.change} from last month
                    </Typography>
                  </CardContent>
                </GlassCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Section 3: Performance Metrics */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <GlassCard sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Performance Metrics
              </Typography>
              <Grid container spacing={3}>
                {performanceMetrics.map((metric, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: "12px",
                          background: alpha(theme.palette.primary.light, 0.1),
                          color: theme.palette.primary.main,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {metric.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {metric.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {metric.metric}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            mt: 0.5,
                            fontWeight: "medium",
                            color: metric.change.startsWith("+")
                              ? "success.main"
                              : "error.main",
                          }}
                        >
                          {metric.change} vs last month
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </GlassCard>
        </motion.div>

        {/* Section 4: Recent Activities & Team */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <GlassCard sx={{ height: "100%" }}>
                <CardContent>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={2}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      Recent Activities
                    </Typography>
                    <IconButton size="small">
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </Stack>
                  <Stack spacing={2}>
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={2}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              backgroundColor: alpha(
                                theme.palette.primary.light,
                                0.1
                              ),
                            },
                          }}
                        >
                          <Avatar src={activity.avatar} />
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body1">
                              <strong>{activity.user}</strong> {activity.action}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {activity.time}
                            </Typography>
                          </Box>
                          <IconButton size="small">
                            <IoIosArrowForward fontSize="small" />
                          </IconButton>
                        </Stack>
                        {index < recentActivities.length - 1 && (
                          <Divider sx={{ opacity: 0.5 }} />
                        )}
                      </motion.div>
                    ))}
                  </Stack>
                </CardContent>
              </GlassCard>
            </motion.div>
          </Grid>

          {/* Team Members */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <GlassCard sx={{ height: "100%" }}>
                <CardContent>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={2}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      Team Members
                    </Typography>
                    <IconButton size="small">
                      <AiOutlineTeam size={20} />
                    </IconButton>
                  </Stack>
                  <Grid container spacing={2}>
                    {teamMembers.map((member, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={2}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              backgroundColor: alpha(
                                theme.palette.primary.light,
                                0.1
                              ),
                            },
                          }}
                        >
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            variant="dot"
                            color={
                              member.status === "active"
                                ? "success"
                                : member.status === "away"
                                ? "warning"
                                : "error"
                            }
                          >
                            <Avatar src={member.avatar} />
                          </Badge>
                          <Box>
                            <Typography variant="body1" fontWeight="medium">
                              {member.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {member.role}
                            </Typography>
                          </Box>
                        </Stack>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </GlassCard>
            </motion.div>
          </Grid>
        </Grid>

        {/* Section 5: Top Products & Recent Orders */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <GlassCard>
                <CardContent>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={3}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      Top Selling Products
                    </Typography>
                    <IconButton size="small">
                      <FiPackage size={20} />
                    </IconButton>
                  </Stack>
                  <Stack spacing={3}>
                    {topProducts.map((product, index) => (
                      <Box key={index}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          mb={1}
                        >
                          <Typography variant="body1" fontWeight="medium">
                            {product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {product.sales} sales
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={product.progress}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.1
                            ),
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 4,
                              backgroundColor: theme.palette.primary.main,
                            },
                          }}
                        />
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </GlassCard>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <GlassCard>
                <CardContent>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={3}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      Recent Orders
                    </Typography>
                    <IconButton size="small">
                      <ShoppingCart fontSize="small" />
                    </IconButton>
                  </Stack>
                  <Stack spacing={2}>
                    {recentOrders.map((order, index) => (
                      <Stack
                        key={index}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: alpha(
                              theme.palette.primary.light,
                              0.1
                            ),
                          },
                        }}
                      >
                        <Box>
                          <Typography variant="body1" fontWeight="medium">
                            {order.id}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {order.customer}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: "right" }}>
                          <Typography variant="body2">
                            {order.amount}
                          </Typography>
                          <Chip
                            label={order.status}
                            size="small"
                            sx={{
                              mt: 0.5,
                              backgroundColor:
                                order.status === "shipped"
                                  ? alpha(theme.palette.info.main, 0.1)
                                  : order.status === "processing"
                                  ? alpha(theme.palette.warning.main, 0.1)
                                  : order.status === "delivered"
                                  ? alpha(theme.palette.success.main, 0.1)
                                  : alpha(theme.palette.error.main, 0.1),
                              color:
                                order.status === "shipped"
                                  ? theme.palette.info.main
                                  : order.status === "processing"
                                  ? theme.palette.warning.main
                                  : order.status === "delivered"
                                  ? theme.palette.success.main
                                  : theme.palette.error.main,
                              fontSize: "0.7rem",
                              height: 20,
                            }}
                          />
                        </Box>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </GlassCard>
            </motion.div>
          </Grid>
        </Grid>

        {/* Section 6: Charts */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Analytics Overview
        </Typography>

        <Grid container spacing={3} mb={4}>
          {/* Revenue Chart */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <GlassCard>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                    <FiDollarSign
                      color={theme.palette.primary.main}
                      size={20}
                    />
                    <Typography variant="h6" fontWeight="bold">
                      Revenue Overview
                    </Typography>
                  </Stack>
                  <Box sx={{ height: "300px" }}>
                    <LineChart
                      series={[
                        {
                          data: lineChartData.map((item) => item.revenue),
                          label: "Revenue",
                          area: true,
                          showMark: true,
                          color: theme.palette.primary.main,
                        },
                      ]}
                      xAxis={[
                        {
                          data: lineChartData.map((item) => item.month),
                          scaleType: "band",
                        },
                      ]}
                      sx={{
                        ".MuiLineElement-root": {
                          strokeWidth: 3,
                        },
                        ".MuiMarkElement-root": {
                          strokeWidth: 2,
                          scale: "0.8",
                          fill: "#fff",
                          stroke: theme.palette.primary.main,
                        },
                        ".MuiAreaElement-root": {
                          fill: `url(#gradient)`,
                        },
                      }}
                      margin={{ left: 70 }}
                    >
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={theme.palette.primary.main}
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor={theme.palette.primary.main}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </Box>
                </CardContent>
              </GlassCard>
            </motion.div>
          </Grid>

          {/* Sales Chart */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <GlassCard>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                    <ShoppingCart
                      color={theme.palette.primary.main}
                      fontSize="small"
                    />
                    <Typography variant="h6" fontWeight="bold">
                      Monthly Sales
                    </Typography>
                  </Stack>
                  <Box sx={{ height: "300px" }}>
                    <BarChart
                      series={[
                        {
                          data: barChartData.map((item) => item.sales),
                          label: "Sales",
                          color: theme.palette.secondary.main,
                        },
                      ]}
                      xAxis={[
                        {
                          data: barChartData.map((item) => item.name),
                          scaleType: "band",
                        },
                      ]}
                      sx={{
                        ".MuiBarElement-root": {
                          rx: 4,
                          ry: 4,
                        },
                      }}
                      margin={{ left: 70 }}
                    />
                  </Box>
                </CardContent>
              </GlassCard>
            </motion.div>
          </Grid>

          {/* Product Categories */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <GlassCard>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                    <CategoryIcon
                      color={theme.palette.primary.main}
                      fontSize="small"
                    />
                    <Typography variant="h6" fontWeight="bold">
                      Product Categories
                    </Typography>
                  </Stack>
                  <Box sx={{ height: "300px" }}>
                    <PieChart
                      series={[
                        {
                          data: pieChartData,
                          innerRadius: 50,
                          outerRadius: 100,
                          paddingAngle: 5,
                          cornerRadius: 5,
                          cx: 150,
                          cy: 150,
                        },
                      ]}
                      colors={COLORS}
                      slotProps={{
                        legend: {
                          direction: "row",
                          position: {
                            vertical: "bottom",
                            horizontal: "middle",
                          },
                          padding: 0,
                          labelStyle: {
                            fontSize: 12,
                            fill: theme.palette.text.primary,
                          },
                        },
                      }}
                    />
                  </Box>
                </CardContent>
              </GlassCard>
            </motion.div>
          </Grid>

          {/* User Activity */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <GlassCard>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                    <AiOutlineAreaChart
                      color={theme.palette.primary.main}
                      size={20}
                    />
                    <Typography variant="h6" fontWeight="bold">
                      User Activity
                    </Typography>
                  </Stack>
                  <Box sx={{ height: "300px" }}>
                    <LineChart
                      series={[
                        {
                          data: areaChartData.map((item) => item.users),
                          label: "Users",
                          area: true,
                          showMark: true,
                          color: theme.palette.primary.main,
                        },
                        {
                          data: areaChartData.map((item) => item.sessions),
                          label: "Sessions",
                          area: true,
                          showMark: true,
                          color: theme.palette.secondary.main,
                        },
                      ]}
                      xAxis={[
                        {
                          data: areaChartData.map((item) => item.month),
                          scaleType: "band",
                        },
                      ]}
                      sx={{
                        ".MuiLineElement-root": {
                          strokeWidth: 2,
                        },
                        ".MuiMarkElement-root": {
                          strokeWidth: 2,
                          scale: "0.6",
                          fill: "#fff",
                          stroke: theme.palette.primary.main,
                        },
                        ".MuiAreaElement-series-0": {
                          fill: `url(#usersGradient)`,
                        },
                        ".MuiAreaElement-series-1": {
                          fill: `url(#sessionsGradient)`,
                        },
                      }}
                      margin={{ left: 70 }}
                    >
                      <defs>
                        <linearGradient
                          id="usersGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={theme.palette.primary.main}
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor={theme.palette.primary.main}
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="sessionsGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={theme.palette.secondary.main}
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor={theme.palette.secondary.main}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </Box>
                </CardContent>
              </GlassCard>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </AnimatePresence>
  );
};

export default DashboardHome;
