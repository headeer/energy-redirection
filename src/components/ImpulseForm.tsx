import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Slider,
  Box,
  useTheme,
  alpha,
  Stack,
  Tooltip,
  FormHelperText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { ImpulseEntry } from "../types/types";
import { getTodaysDate } from "../utils/dateUtils";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "../utils/i18n";
import AnimatedCheckbox from "./AnimatedCheckbox";

interface ImpulseFormProps {
  onAddImpulse: (impulse: ImpulseEntry) => void;
  todaysCount: number;
  onCategoryChange?: (
    category: "Poszukiwacz" | "Kochanek" | "Zdobywca"
  ) => void;
}

const ImpulseForm: React.FC<ImpulseFormProps> = ({
  onAddImpulse,
  todaysCount,
  onCategoryChange,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [strength, setStrength] = useState<number>(5);
  const [name, setName] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [redirected, setRedirected] = useState<boolean>(true);
  const [category, setCategory] = useState<
    "Poszukiwacz" | "Kochanek" | "Zdobywca"
  >("Poszukiwacz");

  // Dark green color
  const darkGreen = "#2e7d32";

  // Notify parent component when category changes
  useEffect(() => {
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  }, [category, onCategoryChange]);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as "Poszukiwacz" | "Kochanek" | "Zdobywca");
  };

  const handleStrengthChange = (_event: Event, newValue: number | number[]) => {
    setStrength(newValue as number);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleResultChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResult(event.target.value);
  };

  const handleRedirectedChange = (checked: boolean) => {
    setRedirected(checked);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newImpulse: ImpulseEntry = {
      id: uuidv4(),
      date: getTodaysDate(),
      name,
      strength,
      redirectionCount: todaysCount + 1,
      result,
      category,
      completed: false,
      redirected: redirected,
    };

    onAddImpulse(newImpulse);

    // Reset form
    setName("");
    setStrength(5);
    setResult("");
    setRedirected(true);
  };

  const getCategoryColor = () => {
    switch (category) {
      case "Poszukiwacz":
        return { main: darkGreen, dark: "#1b5e20" };
      case "Kochanek":
        return theme.palette.secondary;
      case "Zdobywca":
        return theme.palette.success;
      default:
        return { main: darkGreen, dark: "#1b5e20" };
    }
  };

  const categoryColor = getCategoryColor();

  return (
    <Paper
      elevation={3}
      sx={{
        mb: 3,
        overflow: "hidden",
        borderRadius: 2,
        transition: "all 0.3s ease",
      }}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: categoryColor.main,
          color: "white",
          display: "flex",
          alignItems: "center",
        }}
      >
        <FlashOnIcon sx={{ mr: 1 }} />
        <Typography variant="h6">{t("newImpulse")}</Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              id="name"
              label={t("impulseName")}
              value={name}
              onChange={handleNameChange}
              variant="outlined"
              placeholder={t("nameYourImpulse")}
            />

            <Box>
              <Typography gutterBottom fontWeight="medium">
                {t("impulseStrength", { strength })}
              </Typography>
              <Slider
                value={strength}
                onChange={handleStrengthChange}
                aria-labelledby="strength-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
                sx={{
                  color: categoryColor.main,
                  "& .MuiSlider-thumb": {
                    "&:hover, &.Mui-focusVisible": {
                      boxShadow: `0px 0px 0px 8px ${alpha(
                        categoryColor.main,
                        0.16
                      )}`,
                    },
                  },
                  "& .MuiSlider-rail": {
                    opacity: 0.32,
                  },
                }}
              />
            </Box>

            <FormControl fullWidth margin="normal">
              <InputLabel id="category-label">{t("category")}</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={category}
                onChange={handleCategoryChange}
                required
              >
                <MenuItem value="Poszukiwacz">{t("categoryExplorer")}</MenuItem>
                <MenuItem value="Kochanek">{t("categoryLover")}</MenuItem>
                <MenuItem value="Zdobywca">{t("categoryAchiever")}</MenuItem>
              </Select>
              <FormHelperText>{t("categoryHelperText")}</FormHelperText>
            </FormControl>

            <TextField
              fullWidth
              id="result"
              label={t("impulseResult")}
              multiline
              rows={3}
              value={result}
              onChange={handleResultChange}
              variant="outlined"
              placeholder={t("describeAction")}
            />

            <Box component="div" sx={{ mb: 2 }}>
              <Box
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <AnimatedCheckbox
                  label={t("redirectionToggleTitle")}
                  checked={redirected}
                  onChange={handleRedirectedChange}
                  size="medium"
                />
              </Box>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: "block",
                  ml: 4,
                  mt: 0.5,
                  fontStyle: "italic",
                }}
              >
                {redirected
                  ? t("redirectionCountedHint")
                  : t("redirectionNotCountedHint")}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Tooltip title={t("addImpulse")}>
                <span>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<AddIcon />}
                    disabled={!result.trim() || !name.trim()}
                    sx={{
                      bgcolor: categoryColor.main,
                      "&:hover": {
                        bgcolor: categoryColor.dark,
                      },
                      px: 3,
                    }}
                  >
                    {t("saveButton")}
                  </Button>
                </span>
              </Tooltip>
            </Box>
          </Stack>
        </form>
      </Box>
    </Paper>
  );
};

export default ImpulseForm;
