import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  Container,
  Box,
  Tab,
  Tabs,
  Snackbar,
  Alert,
  IconButton,
  Fab,
  Grid,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import { ImpulseEntry, RewardType } from "./types/types";
import Header from "./components/Header";
import ImpulseForm from "./components/ImpulseForm";
import ImpulsesList from "./components/ImpulsesList";
import Stats from "./components/Stats";
import RedirectionSuggestions from "./components/RedirectionSuggestions";
import { Settings } from "./components/Settings";
import OnboardingFlow from "./components/onboarding/OnboardingFlow";
import { AppProviders } from "./providers/AppProviders";
import {
  loadRedirections,
  getTotalRedirections,
  addRedirection,
  saveRedirections,
} from "./utils/storage";
import { getTodaysDate } from "./utils/dateUtils";
import { useTranslation } from "./utils/i18n";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import { OnboardingProvider } from "./contexts/OnboardingContext";

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
    const storedData = loadRedirections("default");
    if (storedData) {
      setRedirections(storedData.redirections || []);
      setTotalRedirections(storedData.totalRedirections || 0);
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    saveRedirections("default", {
      redirections,
      totalRedirections,
    });
  }, [redirections, totalRedirections]);

  // Get today's redirections count
  const getTodaysRedirectionsCount = () => {
    return redirections.filter((r) => r.date === getTodaysDate()).length;
  };

  // Handle adding a new impulse
  const handleAddImpulse = (impulse: ImpulseEntry) => {
    const newRedirections = addRedirection("default", impulse);
    setRedirections(newRedirections);

    // Only update total if the impulse was redirected
    if (impulse.redirected) {
      setTotalRedirections((prev) => prev + 1);
    }
  };

  // Handle claiming a reward
  const handleClaimReward = (rewardType: RewardType) => {
    let rewardText = "";

    switch (rewardType) {
      case "small":
        setTotalRedirections((prev) => Math.max(0, prev - 5));
        rewardText = t("smallReward");
        break;
      case "medium":
        setTotalRedirections((prev) => Math.max(0, prev - 25));
        rewardText = t("mediumReward");
        break;
      case "large":
        setTotalRedirections((prev) => Math.max(0, prev - 100));
        rewardText = t("largeReward");
        break;
    }

    setRewardMessage(rewardText);
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
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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
          flex: 1,
          display: "flex",
          flexDirection: "column",
          py: 3,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 2fr 1fr" },
                  gap: 3,
                }}
              >
                {/* Left Column - Statistics */}
                <Box>
                  <Stats
                    totalRedirections={totalRedirections}
                    redirections={redirections}
                  />
                </Box>

                {/* Middle Column - Create Impulse and Today's Impulses */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <ImpulseForm
                    open={settingsOpen}
                    onClose={handleCloseSettings}
                    onAddImpulse={handleAddImpulse}
                  />
                  <ImpulsesList redirections={redirections} />
                </Box>

                {/* Right Column - Redirection Suggestions */}
                <Box>
                  <RedirectionSuggestions selectedCategory={selectedCategory} />
                </Box>
              </Box>
            }
          />
          <Route
            path="/onboarding"
            element={
              <OnboardingProvider>
                <OnboardingFlow />
              </OnboardingProvider>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>

      <Settings open={settingsOpen} onClose={handleCloseSettings} />

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
    </Box>
  );
}

function App() {
  return (
    <Router>
      <AppProviders>
        <AppContent />
      </AppProviders>
    </Router>
  );
}

export default App;
