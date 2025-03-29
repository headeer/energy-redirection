import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Checkbox,
  Chip,
  Divider,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useTranslation } from "../../utils/i18n";
import { useOnboarding } from "../../contexts/OnboardingContext";
import { UserSuggestion } from "../../types/types";
import { v4 as uuidv4 } from "uuid";
import { SelectChangeEvent } from "@mui/material/Select";

// Define preset suggestions
const presetSuggestions = {
  Poszukiwacz: [
    "Przeczytaj artykuł na interesujący temat",
    "Obejrzyj film dokumentalny",
    "Narysuj lub naszkicuj coś",
    "Zapisz pomysł na projekt kreatywny",
    "Znajdź nowy podcast edukacyjny",
    "Rozwiąż łamigłówkę lub zagadkę",
    "Naucz się nowego słowa w obcym języku",
    "Stwórz playlistę inspirujących piosenek",
    "Zapisz się na kurs online",
    "Napisz krótki wiersz lub opowiadanie",
  ],
  Kochanek: [
    "Zadzwoń do bliskiej osoby",
    "Napisz list lub wiadomość do przyjaciela",
    "Zaplanuj spotkanie z kimś ważnym",
    "Zaoferuj pomoc komuś w potrzebie",
    "Przygotuj niespodziankę dla bliskiej osoby",
    "Wysłuchaj kogoś bez przerywania",
    "Podziękuj komuś za coś miłego",
    "Zaproś znajomych na wspólne spędzenie czasu",
    "Napisz listę rzeczy, za które jesteś wdzięczny/a",
    "Zrób coś miłego dla siebie",
  ],
  Zdobywca: [
    "Ustal nowy cel do osiągnięcia",
    "Zrób plan działania na najbliższy tydzień",
    "Przeczytaj artykuł o rozwoju osobistym",
    "Zrób krótki trening fizyczny",
    "Uporządkuj przestrzeń wokół siebie",
    "Zakończ zadanie, które odkładasz",
    "Naucz się nowej umiejętności praktycznej",
    "Zaplanuj budżet lub oszczędności",
    "Zrób listę swoich mocnych stron",
    "Zrób coś, co stanowi dla Ciebie wyzwanie",
  ],
};

const PresetSuggestions: React.FC = () => {
  const { t } = useTranslation();
  const { state, addSuggestion, removeSuggestion, setStepCompleted } =
    useOnboarding();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);

  // Find existing preset suggestions
  useEffect(() => {
    const existingPresets = state.personalSuggestions
      .filter((suggestion) => suggestion.isPreset)
      .map((suggestion) => suggestion.action);

    setSelectedSuggestions(existingPresets);
  }, [state.personalSuggestions]);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleToggleSuggestion = (suggestion: string, category: string) => {
    if (selectedSuggestions.includes(suggestion)) {
      // Remove suggestion
      setSelectedSuggestions(
        selectedSuggestions.filter((s) => s !== suggestion)
      );

      // Find and remove from state
      const suggestionToRemove = state.personalSuggestions.find(
        (s) => s.action === suggestion && s.isPreset
      );

      if (suggestionToRemove) {
        removeSuggestion(suggestionToRemove.id);
      }
    } else {
      // Add suggestion
      setSelectedSuggestions([...selectedSuggestions, suggestion]);

      // Add to state
      const newSuggestion: UserSuggestion = {
        id: uuidv4(),
        category,
        action: suggestion,
        isPreset: true,
      };

      addSuggestion(newSuggestion);
    }

    // Mark step as completed if at least one suggestion is selected
    setStepCompleted(2, true);
  };

  // Filter suggestions based on search term and selected category
  const filteredSuggestions = React.useMemo(() => {
    const filteredResult: Record<string, string[]> = {};

    Object.entries(presetSuggestions).forEach(([category, suggestions]) => {
      // Only include categories the user has selected in onboarding
      if (!state.selectedCategories.includes(category)) {
        return;
      }

      // If a category is selected, only show that category
      if (selectedCategory && category !== selectedCategory) {
        return;
      }

      // Filter by search term
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filtered.length > 0) {
        filteredResult[category] = filtered;
      }
    });

    return filteredResult;
  }, [searchTerm, selectedCategory, state.selectedCategories]);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
        {t("reviewPresets")}
      </Typography>

      <Typography variant="body1" paragraph>
        {t("reviewPresetsDescription")}
      </Typography>

      <Box sx={{ mb: 4, mt: 3 }}>
        <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mb: 3,
            }}
          >
            <FormControl fullWidth variant="outlined" sx={{ flex: 1 }}>
              <InputLabel id="category-filter-label">
                {t("filterByCategory")}
              </InputLabel>
              <Select
                labelId="category-filter-label"
                value={selectedCategory}
                onChange={handleCategoryChange}
                label={t("filterByCategory")}
              >
                <MenuItem value="">
                  <em>{t("allCategories")}</em>
                </MenuItem>
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
              label={t("searchSuggestions")}
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ flex: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {Object.keys(filteredSuggestions).length === 0 ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ p: 2, textAlign: "center" }}
            >
              {t("noSuggestionsFound")}
            </Typography>
          ) : (
            Object.entries(filteredSuggestions).map(
              ([category, suggestions]) => (
                <Box key={category} sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {t(
                      category === "Poszukiwacz"
                        ? "explorer"
                        : category === "Kochanek"
                        ? "lover"
                        : "conqueror"
                    )}
                  </Typography>

                  <Paper variant="outlined" sx={{ borderRadius: 2 }}>
                    <List dense>
                      {suggestions.map((suggestion, index) => (
                        <React.Fragment key={suggestion}>
                          {index > 0 && <Divider />}
                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() =>
                                handleToggleSuggestion(suggestion, category)
                              }
                            >
                              <Checkbox
                                edge="start"
                                checked={selectedSuggestions.includes(
                                  suggestion
                                )}
                                tabIndex={-1}
                                disableRipple
                              />
                              <ListItemText primary={suggestion} />
                            </ListItemButton>
                          </ListItem>
                        </React.Fragment>
                      ))}
                    </List>
                  </Paper>
                </Box>
              )
            )
          )}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          {t("selectedPresets")}
        </Typography>

        {selectedSuggestions.length === 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ p: 2, textAlign: "center" }}
          >
            {t("noPresetsSelected")}
          </Typography>
        ) : (
          <List sx={{ bgcolor: "background.paper", borderRadius: 2, mb: 3 }}>
            {state.personalSuggestions
              .filter((s: UserSuggestion) => s.isPreset)
              .map((suggestion: UserSuggestion, index: number) => (
                <React.Fragment key={suggestion.id}>
                  {index > 0 && <Divider />}
                  <ListItem>
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
              ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default PresetSuggestions;
