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
import { ImpulseEntry } from "./types/types";
import Header from "./components/Header";
import ImpulseForm from "./components/ImpulseForm";
import ImpulsesList from "./components/ImpulsesList";
import Stats from "./components/Stats";
import RedirectionSuggestions from "./components/RedirectionSuggestions";
import SuccessDialog from "./components/SuccessDialog";
import { Settings } from "./components/Settings";
import { AppProviders } from "./providers/AppProviders";
import {
  loadRedirections,
  getTotalRedirections,
  addRedirection,
  updateRedirection,
} from "./utils/storage";
import { getTodaysDate } from "./utils/dateUtils";
import { useTranslation } from "./utils/i18n";

function AppContent() {
  const { t } = useTranslation();
  const [redirections, setRedirections] = useState<ImpulseEntry[]>([]);
  const [totalRedirections, setTotalRedirections] = useState<number>(0);
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);
  const [rewardSnackbarOpen, setRewardSnackbarOpen] = useState<boolean>(false);
  const [rewardMessage, setRewardMessage] = useState<string>("");
  const [tabValue, setTabValue] = useState<number>(0);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

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

  // Handle completing an impulse
  const handleCompleteImpulse = (id: string) => {
    const impulse = redirections.find((r) => r.id === id);
    if (impulse) {
      const updatedImpulse = { ...impulse, completed: true };
      const updatedRedirections = updateRedirection(updatedImpulse);
      setRedirections(updatedRedirections);
      setSuccessDialogOpen(true);
    }
  };

  // Handle claiming a reward
  const handleClaimReward = (rewardType: "small" | "medium" | "large") => {
    let pointsToSubtract = 0;
    let rewardText = "";

    switch (rewardType) {
      case "small":
        pointsToSubtract = 5;
        rewardText = t("rewards");
        break;
      case "medium":
        pointsToSubtract = 25;
        rewardText = t("rewards");
        break;
      case "large":
        pointsToSubtract = 100;
        rewardText = t("rewards");
        break;
    }

    if (totalRedirections >= pointsToSubtract) {
      setTotalRedirections((prev) => prev - pointsToSubtract);
      setRewardMessage(`${t("claimed")}: ${rewardText}! 🎉`);
      setRewardSnackbarOpen(true);
    }
  };

  // Handle closing the success dialog
  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
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

  return (
    <>
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

      <Container maxWidth="lg" sx={{ py: 4 }}>
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
                <Tab label={t("form")} />
                <Tab label={t("suggestions")} />
              </Tabs>
              <Box sx={{ mt: 2, display: tabValue === 1 ? "block" : "none" }}>
                <RedirectionSuggestions />
              </Box>
            </Box>
          </Box>

          {/* Right Column */}
          <Box sx={{ width: { xs: "100%", md: "70%" } }}>
            <Box
              sx={{
                display: { xs: tabValue === 0 ? "block" : "none", md: "flex" },
                flexDirection: { md: "row" },
                gap: 3,
              }}
            >
              {/* Main Content Area */}
              <Box sx={{ width: { md: "60%" } }}>
                <ImpulseForm
                  onAddImpulse={handleAddImpulse}
                  todaysCount={getTodaysRedirectionsCount()}
                />
                <ImpulsesList
                  impulses={redirections}
                  onCompleteImpulse={handleCompleteImpulse}
                />
              </Box>

              {/* Desktop Suggestions Sidebar */}
              <Box
                sx={{
                  width: { md: "40%" },
                  display: { xs: "none", md: "block" },
                }}
              >
                <RedirectionSuggestions />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      <SuccessDialog
        open={successDialogOpen}
        onClose={handleCloseSuccessDialog}
      />

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
