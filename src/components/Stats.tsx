import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  LinearProgress,
  useTheme,
  alpha,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "../utils/i18n";
import { RewardSettings, RewardType } from "../types/types";
import EditRewardsDialog from "./EditRewardsDialog";

interface StatsProps {
  totalRedirections: number;
  onClaimReward: (rewardType: RewardType) => void;
}

// Default reward settings
const defaultRewardSettings: RewardSettings = {
  small: {
    title: "Small reward",
    description: "5 redirections",
    threshold: 5,
  },
  medium: {
    title: "Medium reward",
    description: "25 redirections",
    threshold: 25,
  },
  large: {
    title: "Large reward",
    description: "100 redirections",
    threshold: 100,
  },
};

const Stats: React.FC<StatsProps> = ({ totalRedirections, onClaimReward }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [isEditRewardsOpen, setIsEditRewardsOpen] = useState(false);
  const [rewardSettings, setRewardSettings] = useState<RewardSettings>(
    defaultRewardSettings
  );

  // Dark green color
  const darkGreen = "#2e7d32";
  const darkGreenLight = "#4caf50";

  // Load saved reward settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("rewardSettings");
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setRewardSettings(parsedSettings);
      } catch (e) {
        console.error("Failed to parse saved reward settings:", e);
      }
    }
  }, []);

  // Calculate progress towards rewards
  const smallRewardProgress = Math.min(
    (totalRedirections / rewardSettings.small.threshold) * 100,
    100
  );
  const mediumRewardProgress = Math.min(
    (totalRedirections / rewardSettings.medium.threshold) * 100,
    100
  );
  const largeRewardProgress = Math.min(
    (totalRedirections / rewardSettings.large.threshold) * 100,
    100
  );

  const smallRewardAchieved =
    totalRedirections >= rewardSettings.small.threshold;
  const mediumRewardAchieved =
    totalRedirections >= rewardSettings.medium.threshold;
  const largeRewardAchieved =
    totalRedirections >= rewardSettings.large.threshold;

  const handleRewardClick = (rewardType: RewardType) => {
    if (
      (rewardType === "small" && smallRewardAchieved) ||
      (rewardType === "medium" && mediumRewardAchieved) ||
      (rewardType === "large" && largeRewardAchieved)
    ) {
      onClaimReward(rewardType);
    }
  };

  const handleEditRewards = () => {
    setIsEditRewardsOpen(true);
  };

  const handleSaveRewardSettings = (settings: RewardSettings) => {
    setRewardSettings(settings);
    localStorage.setItem("rewardSettings", JSON.stringify(settings));
  };

  const pulseVariants = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          mb: 3,
          overflow: "hidden",
          borderRadius: 2,
          transition: "all 0.3s ease",
          background:
            theme.palette.mode === "dark"
              ? alpha(theme.palette.background.paper, 0.85)
              : alpha(theme.palette.background.paper, 0.95),
          backdropFilter: "blur(10px)",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        }}
      >
        <Box
          sx={{
            p: 2,
            background: `linear-gradient(135deg, ${darkGreen} 0%, ${theme.palette.primary.dark} 100%)`,
            color: "white",
            display: "flex",
            alignItems: "center",
            boxShadow: `0 2px 6px 0 ${alpha(theme.palette.primary.dark, 0.3)}`,
          }}
        >
          <EmojiEventsIcon
            sx={{
              mr: 1,
              animation: "rotate 2s infinite alternate",
              "@keyframes rotate": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(10deg)" },
              },
            }}
          />
          <Typography variant="h6">{t("stats")}</Typography>
          <IconButton
            color="inherit"
            sx={{ ml: "auto" }}
            onClick={handleEditRewards}
            size="small"
          >
            <EditIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Statistics display */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 2,
              px: 3,
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.primary.light,
                0.08
              )} 0%, ${alpha(theme.palette.primary.main, 0.12)} 100%)`,
              borderRadius: 3,
              boxShadow: `0 8px 24px 0 ${alpha(
                theme.palette.primary.main,
                0.15
              )}`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-50%",
                width: "200%",
                height: "100%",
                background: `linear-gradient(to right, transparent, ${alpha(
                  theme.palette.common.white,
                  0.1
                )}, transparent)`,
                animation: "shimmer 2s infinite",
                "@keyframes shimmer": {
                  "0%": { transform: "translateX(-150%)" },
                  "100%": { transform: "translateX(150%)" },
                },
              },
            }}
          >
            {/* Total redirections display */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <div>
                <LocalFireDepartmentIcon
                  color="primary"
                  sx={{
                    fontSize: "2.5rem",
                    mr: 2,
                    filter: `drop-shadow(0 2px 5px ${alpha(
                      theme.palette.primary.main,
                      0.4
                    )})`,
                  }}
                />
              </div>

              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                  background: `linear-gradient(45deg, ${darkGreen}, ${darkGreenLight})`,
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  filter: `drop-shadow(0 2px 2px ${alpha(
                    theme.palette.common.black,
                    0.1
                  )})`,
                  fontSize: { xs: "2.5rem", sm: "3rem" },
                }}
              >
                {totalRedirections}
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  ml: 1,
                  display: "flex",
                  alignItems: "flex-start",
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                }}
              >
                <div
                  style={{
                    transform: "rotate(20deg)",
                    transformOrigin: "center",
                    transition: "transform 1.5s ease-out",
                  }}
                >
                  <TrendingUpIcon color="success" sx={{ mr: 0.5 }} />
                </div>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    fontWeight: 500,
                    fontSize: "0.7rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: darkGreen,
                  }}
                >
                  {t("redirectedImpulses")}
                </Typography>
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                mb: 1,
                fontStyle: "italic",
                opacity: 0.85,
              }}
            >
              {t("brainCreatingPaths")}
            </Typography>
          </Box>

          {/* Small reward */}
          <Box
            sx={{
              cursor: smallRewardAchieved ? "pointer" : "default",
              transition: "all 0.3s",
              p: 2,
              borderRadius: 2,
              border: `1px solid ${alpha(
                smallRewardAchieved ? darkGreen : theme.palette.divider,
                0.2
              )}`,
              background: smallRewardAchieved
                ? `linear-gradient(135deg, ${alpha(
                    darkGreenLight,
                    0.08
                  )} 0%, ${alpha(darkGreen, 0.12)} 100%)`
                : undefined,
              "&:hover": smallRewardAchieved
                ? {
                    transform: "translateY(-3px)",
                    boxShadow: `0 8px 24px 0 ${alpha(darkGreen, 0.2)}`,
                  }
                : {},
              position: "relative",
              overflow: "hidden",
            }}
            onClick={() => handleRewardClick("small")}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                sx={{
                  mr: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {rewardSettings.small.title} ({rewardSettings.small.threshold}{" "}
                {t("redirections")})
                {smallRewardAchieved && (
                  <div>
                    <Tooltip title={t("claimReward")}>
                      <StarIcon
                        color="warning"
                        fontSize="small"
                        sx={{
                          ml: 0.5,
                          animation: "pulse 1.5s infinite",
                          "@keyframes pulse": {
                            "0%": { opacity: 0.7, transform: "scale(1)" },
                            "50%": { opacity: 1, transform: "scale(1.2)" },
                            "100%": { opacity: 0.7, transform: "scale(1)" },
                          },
                        }}
                      />
                    </Tooltip>
                  </div>
                )}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 500,
                  color: smallRewardAchieved
                    ? darkGreen
                    : theme.palette.text.secondary,
                }}
              >
                {smallRewardAchieved
                  ? t("achieved")
                  : `${Math.round(smallRewardProgress)}%`}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={smallRewardProgress}
              sx={{
                height: 8,
                borderRadius: 4,
                mb: 1,
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,
                  background: smallRewardAchieved
                    ? `linear-gradient(to right, ${darkGreen}, ${darkGreenLight})`
                    : `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
                },
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {rewardSettings.small.description}
            </Typography>
          </Box>

          {/* Medium reward */}
          <Box
            sx={{
              cursor: mediumRewardAchieved ? "pointer" : "default",
              transition: "all 0.3s",
              p: 2,
              borderRadius: 2,
              border: `1px solid ${alpha(
                mediumRewardAchieved ? darkGreen : theme.palette.divider,
                0.2
              )}`,
              background: mediumRewardAchieved
                ? `linear-gradient(135deg, ${alpha(
                    darkGreenLight,
                    0.08
                  )} 0%, ${alpha(darkGreen, 0.12)} 100%)`
                : undefined,
              "&:hover": mediumRewardAchieved
                ? {
                    transform: "translateY(-3px)",
                    boxShadow: `0 8px 24px 0 ${alpha(darkGreen, 0.2)}`,
                  }
                : {},
            }}
            onClick={() => handleRewardClick("medium")}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                sx={{
                  mr: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {rewardSettings.medium.title} ({rewardSettings.medium.threshold}{" "}
                {t("redirections")})
                {mediumRewardAchieved && (
                  <div>
                    <Tooltip title={t("claimReward")}>
                      <StarIcon
                        color="warning"
                        fontSize="small"
                        sx={{
                          ml: 0.5,
                          animation: "pulse 1.5s infinite",
                          "@keyframes pulse": {
                            "0%": { opacity: 0.7, transform: "scale(1)" },
                            "50%": { opacity: 1, transform: "scale(1.2)" },
                            "100%": { opacity: 0.7, transform: "scale(1)" },
                          },
                        }}
                      />
                    </Tooltip>
                  </div>
                )}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 500,
                  color: mediumRewardAchieved
                    ? darkGreen
                    : theme.palette.text.secondary,
                }}
              >
                {mediumRewardAchieved
                  ? t("achieved")
                  : `${Math.round(mediumRewardProgress)}%`}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={mediumRewardProgress}
              sx={{
                height: 8,
                borderRadius: 4,
                mb: 1,
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,
                  background: mediumRewardAchieved
                    ? `linear-gradient(to right, ${darkGreen}, ${darkGreenLight})`
                    : `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                },
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {rewardSettings.medium.description}
            </Typography>
          </Box>

          {/* Large reward */}
          <Box
            sx={{
              cursor: largeRewardAchieved ? "pointer" : "default",
              transition: "all 0.3s",
              p: 2,
              borderRadius: 2,
              border: `1px solid ${alpha(
                largeRewardAchieved ? darkGreen : theme.palette.divider,
                0.2
              )}`,
              background: largeRewardAchieved
                ? `linear-gradient(135deg, ${alpha(
                    darkGreenLight,
                    0.08
                  )} 0%, ${alpha(darkGreen, 0.12)} 100%)`
                : undefined,
              "&:hover": largeRewardAchieved
                ? {
                    transform: "translateY(-3px)",
                    boxShadow: `0 8px 24px 0 ${alpha(darkGreen, 0.2)}`,
                  }
                : {},
            }}
            onClick={() => handleRewardClick("large")}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                sx={{
                  mr: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {rewardSettings.large.title} ({rewardSettings.large.threshold}{" "}
                {t("redirections")})
                {largeRewardAchieved && (
                  <div>
                    <Tooltip title={t("claimReward")}>
                      <StarIcon
                        color="warning"
                        fontSize="small"
                        sx={{
                          ml: 0.5,
                          animation: "pulse 1.5s infinite",
                          "@keyframes pulse": {
                            "0%": { opacity: 0.7, transform: "scale(1)" },
                            "50%": { opacity: 1, transform: "scale(1.2)" },
                            "100%": { opacity: 0.7, transform: "scale(1)" },
                          },
                        }}
                      />
                    </Tooltip>
                  </div>
                )}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 500,
                  color: largeRewardAchieved
                    ? darkGreen
                    : theme.palette.text.secondary,
                }}
              >
                {largeRewardAchieved
                  ? t("achieved")
                  : `${Math.round(largeRewardProgress)}%`}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={largeRewardProgress}
              sx={{
                height: 8,
                borderRadius: 4,
                mb: 1,
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,
                  background: largeRewardAchieved
                    ? `linear-gradient(to right, ${darkGreen}, ${darkGreenLight})`
                    : `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                },
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {rewardSettings.large.description}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <EditRewardsDialog
        open={isEditRewardsOpen}
        onClose={() => setIsEditRewardsOpen(false)}
        rewardSettings={rewardSettings}
        onSave={handleSaveRewardSettings}
      />
    </>
  );
};

export default Stats;
