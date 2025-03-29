import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Tab,
  Tabs,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { ImpulseEntry, RewardType } from "./types/types";
import Header from "./components/Header";
import ImpulseForm from "./components/ImpulseForm";
import ImpulsesList from "./components/ImpulsesList";
import Stats from "./components/Stats";
import RedirectionSuggestions from "./components/RedirectionSuggestions";
import { Settings } from "./components/Settings";
import { AppProviders } from "./providers/AppProviders";
import {
  loadRedirections,
  getTotalRedirections,
  addRedirection,
} from "./utils/storage";
import { getTodaysDate } from "./utils/dateUtils";
import { useTranslation } from "./utils/i18n";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

function AppContent() {
  const { t } = useTranslation();
  const [redirections, setRedirections] = useState<ImpulseEntry[]>([]);
  const [totalRedirections, setTotalRedirections] = useState<number>(0);
  const [rewardSnackbarOpen, setRewardSnackbarOpen] = useState<boolean>(false);
  const [rewardMessage, setRewardMessage] = useState<string>("");
  const [tabValue, setTabValue] = useState<number>(0);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<
    "Poszukiwacz" | "Kochanek" | "Zdobywca"
  >("Poszukiwacz");
  const theme = useTheme();

  // Load data from local storage on component mount
  useEffect(() => {
    const loadedRedirections = loadRedirections();
    setRedirections(loadedRedirections);

    // Only count redirected impulses for the total
    const redirectedCount = loadedRedirections.filter(
      (r) => r.redirected
    ).length;
    setTotalRedirections(redirectedCount);
  }, []);

  // Get today's redirections count
  const getTodaysRedirectionsCount = () => {
    return redirections.filter((r) => r.date === getTodaysDate()).length;
  };

  // Handle adding a new impulse
  const handleAddImpulse = (impulse: ImpulseEntry) => {
    const newRedirections = addRedirection(impulse);
    setRedirections(newRedirections);

    // Only update total if the impulse was redirected
    if (impulse.redirected) {
      setTotalRedirections((prev) => prev + 1);
    }
  };

  // Handle claiming a reward
  const handleClaimReward = (rewardType: RewardType) => {
    // Reduce the total redirections when claiming a reward
    let rewardText = "";

    switch (rewardType) {
      case "small":
        setTotalRedirections((prev) => Math.max(0, prev - 5));
        rewardText = t("rewards");
        break;
      case "medium":
        setTotalRedirections((prev) => Math.max(0, prev - 25));
        rewardText = t("rewards");
        break;
      case "large":
        setTotalRedirections((prev) => Math.max(0, prev - 100));
        rewardText = t("rewards");
        break;
    }

    setRewardMessage(`${t("claimed")}: ${rewardText}! 🎉`);
    setRewardSnackbarOpen(true);
  };

  // Handle closing the reward snackbar
  const handleCloseRewardSnackbar = () => {
    setRewardSnackbarOpen(false);
  };

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Settings handlers
  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleCloseSettings = () => {
    setSettingsOpen(false);
  };

  // Handle category change
  const handleCategoryChange = (
    category: "Poszukiwacz" | "Kochanek" | "Zdobywca"
  ) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            theme.palette.mode === "light"
              ? `
              linear-gradient(120deg, ${alpha(
                theme.palette.primary.light,
                0.05
              )} 0%, ${alpha(theme.palette.background.default, 0.7)} 100%),
              url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='${encodeURIComponent(
                theme.palette.primary.main
              )}' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")
            `
              : `
              linear-gradient(120deg, ${alpha(
                theme.palette.primary.dark,
                0.15
              )} 0%, ${alpha(theme.palette.background.default, 0.9)} 100%),
              url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='${encodeURIComponent(
                theme.palette.primary.light
              )}' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")
            `,
          backgroundAttachment: "fixed",
        }}
      >
        <Header>
          <IconButton
            color="inherit"
            edge="end"
            onClick={toggleSettings}
            aria-label="settings"
            sx={{ ml: 1 }}
          >
            <SettingsIcon />
          </IconButton>
        </Header>

        <Container
          maxWidth="lg"
          sx={{
            py: 4,
            "& .MuiPaper-root": {
              boxShadow:
                theme.palette.mode === "dark"
                  ? `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.3)}`
                  : `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.1)}`,
              backdropFilter: "blur(4px)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
            }}
          >
            {/* Left Column */}
            <Box sx={{ width: { xs: "100%", md: "30%" } }}>
              <Stats
                totalRedirections={totalRedirections}
                onClaimReward={handleClaimReward}
              />

              {/* Mobile tabs for switching between content */}
              <Box sx={{ display: { xs: "block", md: "none" }, mb: 2 }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  aria-label="content tabs"
                >
                  <Tab label={t("newImpulse")} />
                  <Tab label={t("redirectionSuggestions")} />
                </Tabs>
                <Box sx={{ mt: 2, display: tabValue === 1 ? "block" : "none" }}>
                  <RedirectionSuggestions selectedCategory={selectedCategory} />
                </Box>
              </Box>
            </Box>

            {/* Right Column */}
            <Box sx={{ width: { xs: "100%", md: "70%" } }}>
              <Box
                sx={{
                  display: {
                    xs: tabValue === 0 ? "block" : "none",
                    md: "flex",
                  },
                  flexDirection: { md: "row" },
                  gap: 3,
                }}
              >
                {/* Main Content Area */}
                <Box sx={{ width: { md: "60%" } }}>
                  <ImpulseForm
                    onAddImpulse={handleAddImpulse}
                    todaysCount={getTodaysRedirectionsCount()}
                    onCategoryChange={handleCategoryChange}
                  />
                  <ImpulsesList impulses={redirections} />
                </Box>

                {/* Desktop Suggestions Sidebar */}
                <Box
                  sx={{
                    width: { md: "40%" },
                    display: { xs: "none", md: "block" },
                  }}
                >
                  <RedirectionSuggestions selectedCategory={selectedCategory} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>

        <Snackbar
          open={rewardSnackbarOpen}
          autoHideDuration={4000}
          onClose={handleCloseRewardSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseRewardSnackbar}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {rewardMessage}
          </Alert>
        </Snackbar>

        <Settings open={settingsOpen} onClose={handleCloseSettings} />
      </Box>
    </>
  );
}

function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}

export default App;
