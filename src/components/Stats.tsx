import React from "react";
import {
  Paper,
  Typography,
  Box,
  LinearProgress,
  useTheme,
  alpha,
  Button,
  Tooltip,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface StatsProps {
  totalRedirections: number;
  onClaimReward: (rewardType: "small" | "medium" | "large") => void;
}

const Stats: React.FC<StatsProps> = ({ totalRedirections, onClaimReward }) => {
  const theme = useTheme();

  // Calculate progress towards rewards
  const smallRewardProgress = Math.min((totalRedirections / 5) * 100, 100);
  const mediumRewardProgress = Math.min((totalRedirections / 25) * 100, 100);
  const largeRewardProgress = Math.min((totalRedirections / 100) * 100, 100);

  const smallRewardAchieved = totalRedirections >= 5;
  const mediumRewardAchieved = totalRedirections >= 25;
  const largeRewardAchieved = totalRedirections >= 100;

  const handleRewardClick = (rewardType: "small" | "medium" | "large") => {
    if (
      (rewardType === "small" && smallRewardAchieved) ||
      (rewardType === "medium" && mediumRewardAchieved) ||
      (rewardType === "large" && largeRewardAchieved)
    ) {
      onClaimReward(rewardType);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        mb: 3,
        overflow: "hidden",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: theme.palette.primary.main,
          color: "white",
          display: "flex",
          alignItems: "center",
        }}
      >
        <EmojiEventsIcon sx={{ mr: 1 }} />
        <Typography variant="h6">Twoje statystyki</Typography>
      </Box>

      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 1.5,
            backgroundColor: alpha(theme.palette.primary.main, 0.04),
            borderRadius: 2,
          }}
        >
          <LocalFireDepartmentIcon
            color="primary"
            sx={{
              fontSize: 48,
              mb: 1,
              filter: `drop-shadow(0 2px 4px ${alpha(
                theme.palette.primary.main,
                0.4
              )})`,
            }}
          />

          <Typography
            variant="h3"
            align="center"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 700,
              textShadow: `0 2px 10px ${alpha(
                theme.palette.primary.main,
                0.3
              )}`,
            }}
          >
            {totalRedirections}
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            sx={{
              color: theme.palette.text.secondary,
              mb: 1,
            }}
          >
            Przekierowane impulsy
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 0.5,
            }}
          >
            <TrendingUpIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 500,
              }}
            >
              Twój mózg tworzy nowe ścieżki!
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            cursor: smallRewardAchieved ? "pointer" : "default",
            transition: "all 0.2s",
            "&:hover": smallRewardAchieved
              ? {
                  backgroundColor: alpha(theme.palette.success.main, 0.05),
                  padding: 1,
                  borderRadius: 1,
                }
              : {},
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
              Mała nagroda (5 przekierowań)
              {smallRewardAchieved && (
                <Tooltip title="Kliknij, aby odebrać nagrodę">
                  <CheckCircleIcon
                    color="success"
                    fontSize="small"
                    sx={{ ml: 0.5 }}
                  />
                </Tooltip>
              )}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                color: smallRewardAchieved
                  ? theme.palette.success.main
                  : theme.palette.text.secondary,
              }}
            >
              {smallRewardAchieved ? (
                <Box
                  component="span"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  Osiągnięto!{" "}
                  <DeleteOutlineIcon
                    fontSize="inherit"
                    sx={{ ml: 0.5, fontSize: "1rem" }}
                  />
                </Box>
              ) : (
                `${Math.round(smallRewardProgress)}%`
              )}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={smallRewardProgress}
            sx={{
              height: 8,
              borderRadius: 4,
              mb: 2,
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                backgroundColor: smallRewardAchieved
                  ? theme.palette.success.main
                  : theme.palette.primary.main,
              },
            }}
          />
        </Box>

        <Box
          sx={{
            cursor: mediumRewardAchieved ? "pointer" : "default",
            transition: "all 0.2s",
            "&:hover": mediumRewardAchieved
              ? {
                  backgroundColor: alpha(theme.palette.success.main, 0.05),
                  padding: 1,
                  borderRadius: 1,
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
              Średnia nagroda (25 przekierowań)
              {mediumRewardAchieved && (
                <Tooltip title="Kliknij, aby odebrać nagrodę">
                  <CheckCircleIcon
                    color="success"
                    fontSize="small"
                    sx={{ ml: 0.5 }}
                  />
                </Tooltip>
              )}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                color: mediumRewardAchieved
                  ? theme.palette.success.main
                  : theme.palette.text.secondary,
              }}
            >
              {mediumRewardAchieved ? (
                <Box
                  component="span"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  Osiągnięto!{" "}
                  <DeleteOutlineIcon
                    fontSize="inherit"
                    sx={{ ml: 0.5, fontSize: "1rem" }}
                  />
                </Box>
              ) : (
                `${Math.round(mediumRewardProgress)}%`
              )}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={mediumRewardProgress}
            sx={{
              height: 8,
              borderRadius: 4,
              mb: 2,
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                backgroundColor: mediumRewardAchieved
                  ? theme.palette.success.main
                  : theme.palette.primary.main,
              },
            }}
          />
        </Box>

        <Box
          sx={{
            cursor: largeRewardAchieved ? "pointer" : "default",
            transition: "all 0.2s",
            "&:hover": largeRewardAchieved
              ? {
                  backgroundColor: alpha(theme.palette.success.main, 0.05),
                  padding: 1,
                  borderRadius: 1,
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
              Duża nagroda (100 przekierowań)
              {largeRewardAchieved && (
                <Tooltip title="Kliknij, aby odebrać nagrodę">
                  <CheckCircleIcon
                    color="success"
                    fontSize="small"
                    sx={{ ml: 0.5 }}
                  />
                </Tooltip>
              )}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                color: largeRewardAchieved
                  ? theme.palette.success.main
                  : theme.palette.text.secondary,
              }}
            >
              {largeRewardAchieved ? (
                <Box
                  component="span"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  Osiągnięto!{" "}
                  <DeleteOutlineIcon
                    fontSize="inherit"
                    sx={{ ml: 0.5, fontSize: "1rem" }}
                  />
                </Box>
              ) : (
                `${Math.round(largeRewardProgress)}%`
              )}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={largeRewardProgress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                backgroundColor: largeRewardAchieved
                  ? theme.palette.success.main
                  : theme.palette.primary.main,
              },
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default Stats;
