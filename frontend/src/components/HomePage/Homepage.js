import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme } from "@mui/material/styles";
import FunctionsIcon from "@mui/icons-material/Functions";
import CalculateIcon from "@mui/icons-material/Calculate";
import QuizIcon from "@mui/icons-material/Quiz";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ExploreIcon from "@mui/icons-material/Explore";
import ExtensionIcon from "@mui/icons-material/Extension";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid";
import { DemoProvider } from "@toolpad/core/internal";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Calculator from "../ToolOperations/Calculator";
import Formulas from "../ToolOperations/Formulas";
import GraphsAndGeomatry from "../ToolOperations/GraphsAndGeomatry";
import Geometry from "../ToolOperations/Geometry";
import Quizes from "../ToolOperations/Quizes";

import "./Heading.css";

const NAVIGATION = [
  {
    kind: "header",
    title: "Math Tools",
  },
  {
    segment: "calculator",
    title: "Calculator",
    icon: <CalculateIcon />,
    path: "/calculator",
  },
  {
    segment: "formulas",
    title: "Formulas",
    icon: <FunctionsIcon />,
    path: "/formulas",
  },
  {
    segment: "quizzes",
    title: "Quizzes",
    icon: <QuizIcon />,
    path: "/quizzes",
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Explore & Visualize",
  },
  {
    segment: "visualizations",
    title: "Visualizations",
    icon: <ShowChartIcon />,
    children: [
      {
        segment: "graphs",
        title: "Graphs",
        icon: <ExploreIcon />,
        path: "/visualizations/graphs",
      },
      {
        segment: "geometry",
        title: "Geometry",
        icon: <ExploreIcon />,
        path: "/visualizations/geometry",
      },
    ],
  },
];

const demoTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});
function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled("div")(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function DemoPageContent({ pathname }) {
  switch (pathname) {
    case "/calculator":
      return <Calculator />;
    case "/formulas":
      return <Formulas />;
    case "/quizzes":
      return <Quizes />;
    case "/visualizations/graphs":
      return <GraphsAndGeomatry />;
    case "/visualizations/geometry":
      return <Geometry />;

    default:
      return (
        <Box sx={{ py: 4, textAlign: "center" }}>
          <Typography>Dashboard content for {pathname}</Typography>
        </Box>
      );
  }
}

export default function HomePage(props) {
  const { window } = props;

  const router = useDemoRouter("/dashboard");

  const demoWindow = window ? window() : undefined;
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ height: "4rem" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography
              // variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <div className="marquee-container">
                <h4 className="marquee-text">Welcome to MathMagic 🚀</h4>
              </div>
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      >
        <DashboardLayout>
          <PageContainer>
            <DemoPageContent pathname={router.pathname} />
          </PageContainer>
          {/* <PageContainer>
            <Grid container spacing={1}>
              <Grid size={5} />
              <Grid size={12}>
                <Skeleton height={14} />
              </Grid>
              <Grid size={12}>
                {" "}
                <Skeleton height={14} />
              </Grid>
              <Grid size={4}>
                <Skeleton height={100} />
              </Grid>
              <Grid size={8}>
                <Skeleton height={100} />
              </Grid>
              <Grid size={12}>
                <Skeleton height={150} />
              </Grid>
              <Grid size={12}>
                <Skeleton height={14} />
              </Grid>
              <Grid size={3}>
                <Skeleton height={100} />
              </Grid>
              <Grid size={3}>
                <Skeleton height={100} />
              </Grid>
              <Grid size={3}>
                <Skeleton height={100} />
              </Grid>
              <Grid size={3}>
                <Skeleton height={100} />
              </Grid>
            </Grid>
          </PageContainer> */}
        </DashboardLayout>
      </AppProvider>
    </>
  );
}
