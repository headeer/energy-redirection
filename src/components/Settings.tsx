import React from "react";
import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  IconButton,
  Paper,
  Switch,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import TranslateIcon from "@mui/icons-material/Translate";
import { useTranslation } from "../utils/i18n";
import { useAppTheme } from "../utils/theme";
import { alpha } from "@mui/material/styles";

interface SettingsProps {
  open: boolean;
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ open, onClose }) => {
  const { t, language, setLanguage } = useTranslation();
  const { themeMode, toggleThemeMode } = useAppTheme();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: isMobile ? "100%" : "350px",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: "transform 0.3s ease-in-out",
        transform: open ? "translateX(0)" : "translateX(100%)",
        boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.15)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderLeft: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          background: `linear-gradient(135deg, #6a0dad 0%, #00d4ff 100%)`,
          color: "white",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {t("settingsTitle")}
        </Typography>
        <IconButton
          onClick={onClose}
          edge="end"
          aria-label="close"
          sx={{ color: "white" }}
        >
          <CloseIcon />
        </IconButton>
      </Paper>

      <Box sx={{ p: 3, flex: 1, overflow: "auto" }}>
        <Box
          sx={{
            mb: 4,
            p: 2,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.primary.light, 0.05),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            {themeMode === "dark" ? (
              <Brightness4Icon
                sx={{
                  mr: 1.5,
                  color: "#6a0dad",
                  fontSize: 28,
                }}
              />
            ) : (
              <Brightness7Icon
                sx={{
                  mr: 1.5,
                  color: "#00d4ff",
                  fontSize: 28,
                }}
              />
            )}
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color={theme.palette.text.primary}
            >
              {t("themeSetting")}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pl: 1,
              py: 1,
              px: 2,
              borderRadius: 1.5,
              bgcolor: alpha(theme.palette.background.default, 0.4),
            }}
          >
            <Brightness7Icon
              sx={{
                color: themeMode === "light" ? "#00d4ff" : "text.secondary",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                flex: 1,
                ml: 1,
                color:
                  themeMode === "light"
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                fontWeight: themeMode === "light" ? 600 : 400,
              }}
            >
              {t("lightTheme")}
            </Typography>
            <Switch
              checked={themeMode === "dark"}
              onChange={toggleThemeMode}
              color="primary"
              inputProps={{ "aria-label": "toggle dark mode" }}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#6a0dad",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: alpha("#6a0dad", 0.5),
                },
              }}
            />
            <Typography
              variant="body2"
              sx={{
                mr: 1,
                color:
                  themeMode === "dark"
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                fontWeight: themeMode === "dark" ? 600 : 400,
              }}
            >
              {t("darkTheme")}
            </Typography>
            <Brightness4Icon
              sx={{
                color: themeMode === "dark" ? "#6a0dad" : "text.secondary",
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.primary.light, 0.05),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <TranslateIcon
              sx={{
                mr: 1.5,
                color: "#00d4ff",
                fontSize: 28,
              }}
            />
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color={theme.palette.text.primary}
            >
              {t("languageSetting")}
            </Typography>
          </Box>

          <FormControl component="fieldset" sx={{ pl: 1, width: "100%" }}>
            <RadioGroup
              aria-label="language"
              name="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value as "pl" | "en")}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1.5,
                  px: 2,
                  mb: 1,
                  borderRadius: 1.5,
                  bgcolor:
                    language === "pl"
                      ? alpha("#6a0dad", 0.1)
                      : alpha(theme.palette.background.default, 0.4),
                  border:
                    language === "pl"
                      ? `1px solid ${alpha("#6a0dad", 0.2)}`
                      : "none",
                }}
              >
                <FormControlLabel
                  value="pl"
                  control={
                    <Radio
                      sx={{
                        color: "#6a0dad",
                        "&.Mui-checked": {
                          color: "#6a0dad",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body1"
                      fontWeight={language === "pl" ? 600 : 400}
                      color={
                        language === "pl"
                          ? "#6a0dad"
                          : theme.palette.text.primary
                      }
                    >
                      {t("polish")}
                    </Typography>
                  }
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    bgcolor:
                      language === "pl" ? alpha("#6a0dad", 0.1) : "transparent",
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color={language === "pl" ? "#6a0dad" : "text.secondary"}
                  >
                    PL
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1.5,
                  px: 2,
                  borderRadius: 1.5,
                  bgcolor:
                    language === "en"
                      ? alpha("#00d4ff", 0.1)
                      : alpha(theme.palette.background.default, 0.4),
                  border:
                    language === "en"
                      ? `1px solid ${alpha("#00d4ff", 0.2)}`
                      : "none",
                }}
              >
                <FormControlLabel
                  value="en"
                  control={
                    <Radio
                      sx={{
                        color: "#00d4ff",
                        "&.Mui-checked": {
                          color: "#00d4ff",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body1"
                      fontWeight={language === "en" ? 600 : 400}
                      color={
                        language === "en"
                          ? "#00d4ff"
                          : theme.palette.text.primary
                      }
                    >
                      {t("english")}
                    </Typography>
                  }
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    bgcolor:
                      language === "en" ? alpha("#00d4ff", 0.1) : "transparent",
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color={language === "en" ? "#00d4ff" : "text.secondary"}
                  >
                    EN
                  </Typography>
                </Box>
              </Box>
            </RadioGroup>
          </FormControl>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
            opacity: 0.7,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            NeuroPulse v1.0
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
