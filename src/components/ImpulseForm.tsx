import React, { useState } from "react";
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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { ImpulseEntry } from "../types/types";
import { getTodaysDate } from "../utils/dateUtils";
import { v4 as uuidv4 } from "uuid";

interface ImpulseFormProps {
  onAddImpulse: (impulse: ImpulseEntry) => void;
  todaysCount: number;
}

const ImpulseForm: React.FC<ImpulseFormProps> = ({
  onAddImpulse,
  todaysCount,
}) => {
  const theme = useTheme();
  const [strength, setStrength] = useState<number>(5);
  const [result, setResult] = useState<string>("");
  const [redirected, setRedirected] = useState<boolean>(true);
  const [category, setCategory] = useState<
    "Poszukiwacz" | "Kochanek" | "Zdobywca"
  >("Poszukiwacz");

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as "Poszukiwacz" | "Kochanek" | "Zdobywca");
  };

  const handleStrengthChange = (_event: Event, newValue: number | number[]) => {
    setStrength(newValue as number);
  };

  const handleResultChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResult(event.target.value);
  };

  const handleRedirectedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRedirected(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newImpulse: ImpulseEntry = {
      id: uuidv4(),
      date: getTodaysDate(),
      strength,
      redirectionCount: todaysCount + 1,
      result,
      category,
      completed: false,
      redirected: redirected,
    };

    onAddImpulse(newImpulse);

    // Reset form
    setStrength(5);
    setResult("");
    setRedirected(true);
  };

  const getCategoryColor = () => {
    switch (category) {
      case "Poszukiwacz":
        return theme.palette.primary;
      case "Kochanek":
        return theme.palette.secondary;
      case "Zdobywca":
        return theme.palette.success;
      default:
        return theme.palette.primary;
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
        <Typography variant="h6">Zapisz nowy impuls</Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Box>
              <Typography gutterBottom fontWeight="medium">
                Siła impulsu: {strength}/10
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

            <FormControl fullWidth>
              <InputLabel id="category-select-label">Kategoria</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={category}
                label="Kategoria"
                onChange={handleCategoryChange}
              >
                <MenuItem value="Poszukiwacz">
                  📝 Poszukiwacz - "Iskry Kreatywności" 💡
                </MenuItem>
                <MenuItem value="Kochanek">
                  📝 Kochanek - "Połączenia Serca" ❤️
                </MenuItem>
                <MenuItem value="Zdobywca">
                  📝 Zdobywca - "Szlak Zwycięstw" 🏆
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              id="result"
              label="Rezultat jaki podjąłem"
              multiline
              rows={3}
              value={result}
              onChange={handleResultChange}
              variant="outlined"
              placeholder="Opisz, jakie działanie podjąłeś w odpowiedzi na impuls..."
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={redirected}
                  onChange={handleRedirectedChange}
                  color={redirected ? "success" : "default"}
                  sx={{
                    "&.Mui-checked": {
                      color: theme.palette.success.main,
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" fontWeight="medium">
                  Udało mi się przekierować energię (tylko wtedy otrzymasz
                  punkt)
                </Typography>
              }
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Tooltip title="Dodaj nowy impuls">
                <span>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<AddIcon />}
                    disabled={!result.trim()}
                    sx={{
                      bgcolor: categoryColor.main,
                      "&:hover": {
                        bgcolor: categoryColor.dark,
                      },
                      px: 3,
                    }}
                  >
                    Dodaj impuls
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
