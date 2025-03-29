import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import { useTranslation } from "../../utils/i18n";
import { useOnboarding } from "../../contexts/OnboardingContext";
import { UserSuggestion } from "../../types/types";
import { v4 as uuidv4 } from "uuid";
import { SelectChangeEvent } from "@mui/material/Select";

const SuggestionInput: React.FC = () => {
  const { t } = useTranslation();
  const { state, addSuggestion, removeSuggestion, setStepCompleted } =
    useOnboarding();

  const [category, setCategory] = useState("");
  const [action, setAction] = useState("");
  const [error, setError] = useState("");

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleActionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAction(event.target.value);
  };

  const handleAddSuggestion = () => {
    // Validate inputs
    if (!category) {
      setError("Please select a category");
      return;
    }

    if (!action.trim()) {
      setError("Please enter a suggestion");
      return;
    }

    // Create new suggestion
    const newSuggestion: UserSuggestion = {
      id: uuidv4(),
      category,
      action: action.trim(),
      isPreset: false,
    };

    // Add suggestion
    addSuggestion(newSuggestion);

    // Reset form
    setCategory("");
    setAction("");
    setError("");

    // Mark step as completed if at least one suggestion is added
    setStepCompleted(1, true);
  };

  const handleRemoveSuggestion = (id: string) => {
    removeSuggestion(id);

    // Mark step as incomplete if no suggestions remain
    if (state.personalSuggestions.length <= 1) {
      setStepCompleted(1, false);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
        {t("addSuggestions")}
      </Typography>

      <Typography variant="body1" paragraph>
        {t("addSuggestionsDescription")}
      </Typography>

      <Box sx={{ mb: 4, mt: 3 }}>
        <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <FormControl fullWidth variant="outlined" sx={{ flex: 1 }}>
              <InputLabel id="category-select-label">
                {t("chooseCategory")}
              </InputLabel>
              <Select
                labelId="category-select-label"
                value={category}
                onChange={handleCategoryChange}
                label={t("chooseCategory")}
                error={!!error && !category}
              >
                {state.selectedCategories.map((cat: string) => (
                  <MenuItem key={cat} value={cat}>
                    {t(
                      cat === "Poszukiwacz"
                        ? "explorer"
                        : cat === "Kochanek"
                        ? "lover"
                        : "conqueror"
                    )}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              variant="outlined"
              label={t("redirectToWhat")}
              value={action}
              onChange={handleActionChange}
              error={!!error && !action.trim()}
              helperText={error}
              sx={{ flex: 2 }}
            />

            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddSuggestion}
              sx={{
                height: { sm: 56 },
                alignSelf: { xs: "flex-end", sm: "center" },
                whiteSpace: "nowrap",
              }}
            >
              {t("add")}
            </Button>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          {t("yourSuggestions")}
        </Typography>

        {state.personalSuggestions.length === 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ p: 2, textAlign: "center" }}
          >
            {t("noSuggestionsYet")}
          </Typography>
        ) : (
          <List sx={{ bgcolor: "background.paper", borderRadius: 2, mb: 3 }}>
            {state.personalSuggestions.map(
              (suggestion: UserSuggestion, index: number) => (
                <React.Fragment key={suggestion.id}>
                  {index > 0 && <Divider component="li" />}
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveSuggestion(suggestion.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={suggestion.action}
                      secondary={
                        <Chip
                          label={t(
                            suggestion.category === "Poszukiwacz"
                              ? "explorer"
                              : suggestion.category === "Kochanek"
                              ? "lover"
                              : "conqueror"
                          )}
                          size="small"
                          color={
                            suggestion.category === "Poszukiwacz"
                              ? "info"
                              : suggestion.category === "Kochanek"
                              ? "secondary"
                              : "success"
                          }
                          sx={{ mt: 1 }}
                        />
                      }
                    />
                  </ListItem>
                </React.Fragment>
              )
            )}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default SuggestionInput;
