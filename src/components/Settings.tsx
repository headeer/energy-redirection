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
        width: isMobile ? "100%" : "320px",
        bgcolor: "background.default",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: "transform 0.3s ease-in-out",
        transform: open ? "translateX(0)" : "translateX(100%)",
        boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
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
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {t("settingsTitle")}
        </Typography>
        <IconButton onClick={onClose} edge="end" aria-label="close">
          <CloseIcon />
        </IconButton>
      </Paper>

      <Box sx={{ p: 3, flex: 1, overflow: "auto" }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Brightness4Icon color="primary" sx={{ mr: 1 }} />
            <Typography variant="subtitle1" fontWeight={500}>
              {t("themeSetting")}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
            <Brightness7Icon sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="body2" sx={{ flex: 1 }}>
              {t("lightTheme")}
            </Typography>
            <Switch
              checked={themeMode === "dark"}
              onChange={toggleThemeMode}
              color="primary"
              inputProps={{ "aria-label": "toggle dark mode" }}
            />
            <Brightness4Icon sx={{ ml: 1, color: "text.secondary" }} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {t("darkTheme")}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <TranslateIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="subtitle1" fontWeight={500}>
              {t("languageSetting")}
            </Typography>
          </Box>
          <FormControl component="fieldset" sx={{ pl: 1 }}>
            <RadioGroup
              aria-label="language"
              name="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value as "pl" | "en")}
            >
              <FormControlLabel
                value="pl"
                control={<Radio color="primary" />}
                label={t("polish")}
              />
              <FormControlLabel
                value="en"
                control={<Radio color="primary" />}
                label={t("english")}
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};
