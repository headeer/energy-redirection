import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Box,
  IconButton,
  Rating,
  Divider,
  Button,
  useTheme,
  Avatar,
  Card,
  CardContent,
  Tooltip,
  alpha,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FlagIcon from "@mui/icons-material/Flag";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { ImpulseEntry } from "../types/types";
import { getTodaysDate } from "../utils/dateUtils";

interface ImpulsesListProps {
  impulses: ImpulseEntry[];
  onCompleteImpulse: (id: string) => void;
}

const ImpulsesList: React.FC<ImpulsesListProps> = ({
  impulses,
  onCompleteImpulse,
}) => {
  const theme = useTheme();

  // Filter today's impulses
  const todaysImpulses = impulses.filter(
    (impulse) => impulse.date === getTodaysDate()
  );

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "Poszukiwacz":
        return "💡";
      case "Kochanek":
        return "❤️";
      case "Zdobywca":
        return "🏆";
      default:
        return "📝";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Poszukiwacz":
        return theme.palette.primary.main;
      case "Kochanek":
        return theme.palette.secondary.main;
      case "Zdobywca":
        return theme.palette.success.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const handleSave = (result: string) => {
    // In a real app, this would save to notes or somewhere else
    const text = `Impuls result: ${result}`;

    // Create a blob and download it
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `impuls-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
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
        <FlagIcon sx={{ mr: 1 }} />
        <Typography variant="h6">
          Dzisiejsze impulsy ({todaysImpulses.length})
        </Typography>
      </Box>

      {todaysImpulses.length === 0 ? (
        <Box
          sx={{
            p: 4,
            textAlign: "center",
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
          }}
        >
          <Typography variant="body1" color="text.secondary">
            Brak impulsów na dzisiaj. Dodaj swój pierwszy impuls!
          </Typography>
        </Box>
      ) : (
        <List sx={{ p: 0 }}>
          {todaysImpulses.map((impulse, index) => {
            const categoryColor = getCategoryColor(impulse.category);

            return (
              <Card
                key={impulse.id}
                sx={{
                  mx: 2,
                  mt: index === 0 ? 2 : 0,
                  mb: index === todaysImpulses.length - 1 ? 2 : 2,
                  position: "relative",
                  borderLeft: `4px solid ${categoryColor}`,
                  transition: "all 0.2s",
                  "&:hover": {
                    boxShadow: `0 4px 20px 0 ${alpha(categoryColor, 0.2)}`,
                    transform: "translateY(-2px)",
                  },
                  ...(impulse.completed && {
                    opacity: 0.85,
                    boxShadow: "none",
                  }),
                  ...(impulse.redirected === false && {
                    borderLeft: `4px solid ${theme.palette.warning.main}`,
                  }),
                }}
                elevation={impulse.completed ? 1 : 3}
              >
                {impulse.completed && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      bgcolor: "success.main",
                      borderRadius: "50%",
                      p: 0.5,
                      display: "flex",
                    }}
                  >
                    <CheckCircleIcon fontSize="small" sx={{ color: "white" }} />
                  </Box>
                )}

                <CardContent>
                  <Box sx={{ display: "flex", mb: 1, alignItems: "center" }}>
                    <Avatar
                      sx={{
                        bgcolor: impulse.redirected
                          ? categoryColor
                          : theme.palette.warning.main,
                        width: 36,
                        height: 36,
                        mr: 2,
                      }}
                    >
                      {impulse.redirected ? (
                        getCategoryEmoji(impulse.category)
                      ) : (
                        <WarningAmberIcon fontSize="small" />
                      )}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        Impuls #{impulse.redirectionCount}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Chip
                          label={impulse.category}
                          size="small"
                          sx={{
                            bgcolor: alpha(categoryColor, 0.1),
                            color: categoryColor,
                            fontWeight: "medium",
                          }}
                        />
                        <Chip
                          label={
                            impulse.redirected
                              ? "Przekierowany"
                              : "Nieprzekierowany"
                          }
                          size="small"
                          sx={{
                            bgcolor: impulse.redirected
                              ? alpha(theme.palette.success.main, 0.1)
                              : alpha(theme.palette.warning.main, 0.1),
                            color: impulse.redirected
                              ? theme.palette.success.main
                              : theme.palette.warning.main,
                            fontWeight: "medium",
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mr: 1 }}
                      >
                        Siła impulsu:
                      </Typography>
                      <Rating
                        name="read-only"
                        value={impulse.strength / 2}
                        precision={0.5}
                        readOnly
                        max={5}
                        size="small"
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      Rezultat:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        mt: 0.5,
                        px: 2,
                        py: 1.5,
                        borderRadius: 1,
                        backgroundColor: alpha(
                          impulse.redirected
                            ? theme.palette.primary.main
                            : theme.palette.warning.main,
                          0.04
                        ),
                      }}
                    >
                      {impulse.result}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                  >
                    <Tooltip title="Zapisz notatkę">
                      <Button
                        size="small"
                        startIcon={<SaveAltIcon />}
                        onClick={() => handleSave(impulse.result)}
                        sx={{ mr: 1 }}
                      >
                        Zapisz
                      </Button>
                    </Tooltip>

                    {!impulse.completed && (
                      <Tooltip title="Oznacz jako zakończone">
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          startIcon={<CheckCircleOutlineIcon />}
                          onClick={() => onCompleteImpulse(impulse.id)}
                        >
                          Zakończ
                        </Button>
                      </Tooltip>
                    )}
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </List>
      )}
    </Paper>
  );
};

export default ImpulsesList;
