import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  alpha,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "../utils/i18n";
import { SuggestionGroup, SuggestionCategories } from "../types/types";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// Default suggestions
const defaultSuggestions: SuggestionCategories = {
  Poszukiwacz: [
    {
      title: "subcatCreativeSpark",
      items: [
        "Zapisz pomysł na film YouTube lub treść marketingową",
        "Zrób notatkę o nowym pomyśle biznesowym",
        "Zaprojektuj prosty prototyp nowego produktu",
        "Zrób burzę mózgów i zapisz 5 nowych pomysłów",
      ],
    },
    {
      title: "subcatLearningDevelopment",
      items: [
        "Przeczytaj jeden rozdział książki edukacyjnej",
        "Obejrzyj krótki film edukacyjny",
        "Zapisz się na kurs online",
        "Zrób notatki z ostatnio nauczonych rzeczy",
      ],
    },
  ],
  Kochanek: [
    {
      title: "subcatPeopleConnections",
      items: [
        "Napisz personalizowaną wiadomość do klienta/partnera",
        "Zadzwoń do przyjaciela/rodziny, zapytaj jak się mają",
        "Zaproponuj kawę/spotkanie z potencjalnym partnerem biznesowym",
        "Napisz pozytywną recenzję dla kogoś, kto na to zasłużył",
      ],
    },
    {
      title: "subcatOutreach",
      items: [
        "Napisz post na LinkedIn nawiązujący do innych",
        "Odpowiedz na komentarze pod swoimi treściami",
        "Nawiąż kontakt z nową osobą w Twojej branży",
        "Zaproś kogoś na rozmowę podcast/wywiad",
      ],
    },
  ],
  Zdobywca: [
    {
      title: "subcatPhysicalActivity",
      items: [
        "Zrób 10-20 pompek",
        "Wykonaj krótki spacer lub trening",
        "Zrób 1-minutową sesję planku",
        "Wykonaj 25 przysiadów",
      ],
    },
    {
      title: "subcatBusinessProgress",
      items: [
        "Wykonaj dodatkowy cold call",
        "Wyślij ofertę do potencjalnego klienta",
        "Zakończ jedno małe zadanie z Twojej listy",
        "Ustaw konkretny cel na następny dzień",
      ],
    },
  ],
};

// Edit Dialog Component
interface EditSuggestionsDialogProps {
  open: boolean;
  onClose: () => void;
  suggestions: SuggestionCategories;
  onSave: (suggestions: SuggestionCategories) => void;
}

const EditSuggestionsDialog: React.FC<EditSuggestionsDialogProps> = ({
  open,
  onClose,
  suggestions,
  onSave,
}) => {
  const [editedSuggestions, setEditedSuggestions] =
    useState<SuggestionCategories>({ ...suggestions });
  const [selectedCategory, setSelectedCategory] = useState<string>(
    Object.keys(suggestions)[0] || ""
  );
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [addingCategory, setAddingCategory] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [groupTitle, setGroupTitle] = useState<string>("");
  const [editingItem, setEditingItem] = useState<{
    groupIndex: number;
    itemIndex: number;
  } | null>(null);
  const [itemText, setItemText] = useState<string>("");

  const theme = useTheme();

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setEditedSuggestions({ ...suggestions });
      setSelectedCategory(Object.keys(suggestions)[0] || "");
      setSelectedGroup(null);
    }
  }, [open, suggestions]);

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedCategory(event.target.value as string);
    setSelectedGroup(null);
  };

  const addCategory = () => {
    if (newCategoryName.trim() && !editedSuggestions[newCategoryName]) {
      setEditedSuggestions({
        ...editedSuggestions,
        [newCategoryName]: [],
      });
      setSelectedCategory(newCategoryName);
      setNewCategoryName("");
      setAddingCategory(false);
    }
  };

  const deleteCategory = () => {
    if (selectedCategory) {
      const { [selectedCategory]: _, ...rest } = editedSuggestions;
      setEditedSuggestions(rest);
      setSelectedCategory(Object.keys(rest)[0] || "");
    }
  };

  const handleSelectGroup = (index: number, title: string) => {
    setSelectedGroup(index);
    setGroupTitle(title);
  };

  const updateGroupTitle = () => {
    if (selectedGroup !== null && groupTitle.trim() && selectedCategory) {
      const updatedGroups = [...editedSuggestions[selectedCategory]];
      updatedGroups[selectedGroup] = {
        ...updatedGroups[selectedGroup],
        title: groupTitle,
      };

      setEditedSuggestions({
        ...editedSuggestions,
        [selectedCategory]: updatedGroups,
      });
    }
  };

  const addGroup = () => {
    if (selectedCategory) {
      const newGroup: SuggestionGroup = {
        title: "Nowa grupa",
        items: [],
      };

      setEditedSuggestions({
        ...editedSuggestions,
        [selectedCategory]: [...editedSuggestions[selectedCategory], newGroup],
      });

      // Select the new group
      const newIndex = editedSuggestions[selectedCategory].length;
      setSelectedGroup(newIndex);
      setGroupTitle("Nowa grupa");
    }
  };

  const deleteGroup = () => {
    if (selectedCategory && selectedGroup !== null) {
      const updatedGroups = editedSuggestions[selectedCategory].filter(
        (_, index) => index !== selectedGroup
      );

      setEditedSuggestions({
        ...editedSuggestions,
        [selectedCategory]: updatedGroups,
      });

      setSelectedGroup(null);
    }
  };

  const startEditItem = (
    groupIndex: number,
    itemIndex: number,
    text: string
  ) => {
    setEditingItem({ groupIndex, itemIndex });
    setItemText(text);
  };

  const saveEditedItem = () => {
    if (editingItem && selectedCategory && itemText.trim()) {
      const { groupIndex, itemIndex } = editingItem;
      const updatedGroups = [...editedSuggestions[selectedCategory]];
      const updatedItems = [...updatedGroups[groupIndex].items];
      updatedItems[itemIndex] = itemText;

      updatedGroups[groupIndex] = {
        ...updatedGroups[groupIndex],
        items: updatedItems,
      };

      setEditedSuggestions({
        ...editedSuggestions,
        [selectedCategory]: updatedGroups,
      });

      setEditingItem(null);
    }
  };

  const addItem = () => {
    if (selectedCategory && selectedGroup !== null) {
      const updatedGroups = [...editedSuggestions[selectedCategory]];
      updatedGroups[selectedGroup] = {
        ...updatedGroups[selectedGroup],
        items: [...updatedGroups[selectedGroup].items, "Nowa sugestia"],
      };

      setEditedSuggestions({
        ...editedSuggestions,
        [selectedCategory]: updatedGroups,
      });

      // Start editing the new item
      const newItemIndex = updatedGroups[selectedGroup].items.length - 1;
      startEditItem(selectedGroup, newItemIndex, "Nowa sugestia");
    }
  };

  const deleteItem = (groupIndex: number, itemIndex: number) => {
    if (selectedCategory) {
      const updatedGroups = [...editedSuggestions[selectedCategory]];
      const updatedItems = updatedGroups[groupIndex].items.filter(
        (_, idx) => idx !== itemIndex
      );

      updatedGroups[groupIndex] = {
        ...updatedGroups[groupIndex],
        items: updatedItems,
      };

      setEditedSuggestions({
        ...editedSuggestions,
        [selectedCategory]: updatedGroups,
      });
    }
  };

  const handleSave = () => {
    onSave(editedSuggestions);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edycja sugestii przekierowania</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", height: "500px" }}>
          {/* Left Panel - Categories */}
          <Box
            sx={{
              width: "30%",
              borderRight: `1px solid ${theme.palette.divider}`,
              pr: 2,
            }}
          >
            <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                Kategorie
              </Typography>
              <IconButton
                size="small"
                onClick={() => setAddingCategory(true)}
                sx={{ ml: "auto" }}
              >
                <AddIcon />
              </IconButton>
            </Box>

            {addingCategory ? (
              <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                <TextField
                  size="small"
                  fullWidth
                  label="Nazwa kategorii"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <IconButton size="small" onClick={addCategory}>
                  <AddIcon />
                </IconButton>
              </Box>
            ) : null}

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="category-select-label">
                Wybierz kategorię
              </InputLabel>
              <Select
                labelId="category-select-label"
                value={selectedCategory}
                label="Wybierz kategorię"
                onChange={(e) => handleCategoryChange(e as any)}
              >
                {Object.keys(editedSuggestions).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedCategory && (
              <Button
                variant="outlined"
                color="error"
                onClick={deleteCategory}
                startIcon={<DeleteIcon />}
                fullWidth
              >
                Usuń kategorię
              </Button>
            )}

            <Box sx={{ mt: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Grupy w kategorii
                </Typography>
                <IconButton
                  size="small"
                  onClick={addGroup}
                  sx={{ ml: "auto" }}
                  disabled={!selectedCategory}
                >
                  <AddIcon />
                </IconButton>
              </Box>

              <List dense>
                {selectedCategory &&
                  editedSuggestions[selectedCategory].map((group, index) => (
                    <ListItem
                      key={`${group.title}-${index}`}
                      sx={{
                        cursor: "pointer",
                        bgcolor:
                          selectedGroup === index
                            ? alpha(theme.palette.primary.main, 0.1)
                            : "transparent",
                        "&:hover": {
                          bgcolor: alpha(theme.palette.primary.main, 0.05),
                        },
                      }}
                      onClick={() => handleSelectGroup(index, group.title)}
                    >
                      <ListItemText primary={group.title} />
                    </ListItem>
                  ))}
              </List>

              {selectedGroup !== null && (
                <Box sx={{ mt: 2 }}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Nazwa grupy"
                    value={groupTitle}
                    onChange={(e) => setGroupTitle(e.target.value)}
                    sx={{ mb: 1 }}
                  />
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      onClick={updateGroupTitle}
                      size="small"
                    >
                      Aktualizuj
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={deleteGroup}
                      size="small"
                      startIcon={<DeleteIcon />}
                    >
                      Usuń grupę
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          {/* Right Panel - Items */}
          <Box sx={{ width: "70%", pl: 2, overflow: "auto" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Sugestie w grupie
              </Typography>
              {selectedGroup !== null && (
                <IconButton size="small" onClick={addItem} sx={{ ml: "auto" }}>
                  <AddIcon />
                </IconButton>
              )}
            </Box>

            {selectedCategory && selectedGroup !== null ? (
              <List>
                {editedSuggestions[selectedCategory][selectedGroup].items.map(
                  (item, itemIndex) => (
                    <ListItem
                      key={`item-${itemIndex}`}
                      secondaryAction={
                        <Box>
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={() =>
                              startEditItem(selectedGroup, itemIndex, item)
                            }
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => deleteItem(selectedGroup, itemIndex)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      }
                    >
                      {editingItem &&
                      editingItem.groupIndex === selectedGroup &&
                      editingItem.itemIndex === itemIndex ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <TextField
                            fullWidth
                            value={itemText}
                            onChange={(e) => setItemText(e.target.value)}
                            size="small"
                          />
                          <Button
                            onClick={saveEditedItem}
                            size="small"
                            sx={{ ml: 1 }}
                          >
                            Zapisz
                          </Button>
                        </Box>
                      ) : (
                        <ListItemText primary={item} />
                      )}
                    </ListItem>
                  )
                )}
              </List>
            ) : (
              <Typography color="textSecondary">
                Wybierz grupę, aby zobaczyć i edytować sugestie
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Anuluj</Button>
        <Button onClick={handleSave} variant="contained">
          Zapisz zmiany
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Define color mappings for each subcategory
const getSubcategoryStyle = (title: string, theme: any) => {
  switch (title) {
    case "subcatCreativeSpark":
      return {
        background:
          theme.palette.mode === "dark"
            ? "rgba(156, 39, 176, 0.15)" // Dark mode: softer purple, alpha already applied
            : "#F3E5F5", // Light mode: Light purple paper color
        textColor:
          theme.palette.mode === "dark"
            ? "#CE93D8" // Dark mode: Lighter purple
            : "#6A1B9A", // Light mode: Deep purple
        hoverColor:
          theme.palette.mode === "dark"
            ? "rgba(156, 39, 176, 0.25)" // Dark mode: slightly more intense, alpha already applied
            : "#E1BEE7", // Light mode: Medium purple
        iconColor: "secondary",
        itemTextColor: theme.palette.mode === "dark" ? "#CE93D8" : "#7B1FA2",
      };
    case "subcatLearningDevelopment":
      return {
        background:
          theme.palette.mode === "dark"
            ? "rgba(0, 150, 136, 0.15)" // Dark mode: softer teal, alpha already applied
            : "#E0F2F1", // Light mode: Light teal paper color
        textColor:
          theme.palette.mode === "dark"
            ? "#80CBC4" // Dark mode: Lighter teal
            : "#004D40", // Light mode: Deep teal
        hoverColor:
          theme.palette.mode === "dark"
            ? "rgba(0, 150, 136, 0.25)" // Dark mode: slightly more intense, alpha already applied
            : "#B2DFDB", // Light mode: Medium teal
        iconColor: "info",
        itemTextColor: theme.palette.mode === "dark" ? "#80CBC4" : "#00695C",
      };
    case "subcatPeopleConnections":
      return {
        background:
          theme.palette.mode === "dark"
            ? "rgba(233, 30, 99, 0.15)" // Dark mode: softer pink, alpha already applied
            : "#FCE4EC", // Light mode: Light pink paper color
        textColor:
          theme.palette.mode === "dark"
            ? "#F48FB1" // Dark mode: Lighter pink
            : "#880E4F", // Light mode: Deep pink
        hoverColor:
          theme.palette.mode === "dark"
            ? "rgba(233, 30, 99, 0.25)" // Dark mode: slightly more intense, alpha already applied
            : "#F8BBD0", // Light mode: Medium pink
        iconColor: "secondary",
        itemTextColor: theme.palette.mode === "dark" ? "#F48FB1" : "#AD1457",
      };
    case "subcatOutreach":
      return {
        background:
          theme.palette.mode === "dark"
            ? "rgba(255, 87, 34, 0.15)" // Dark mode: softer orange, alpha already applied
            : "#FBE9E7", // Light mode: Light orange paper color
        textColor:
          theme.palette.mode === "dark"
            ? "#FFAB91" // Dark mode: Lighter orange
            : "#BF360C", // Light mode: Deep orange
        hoverColor:
          theme.palette.mode === "dark"
            ? "rgba(255, 87, 34, 0.25)" // Dark mode: slightly more intense, alpha already applied
            : "#FFCCBC", // Light mode: Medium orange
        iconColor: "error",
        itemTextColor: theme.palette.mode === "dark" ? "#FFAB91" : "#D84315",
      };
    case "subcatPhysicalActivity":
      return {
        background:
          theme.palette.mode === "dark"
            ? "rgba(76, 175, 80, 0.15)" // Dark mode: softer green, alpha already applied
            : "#E8F5E9", // Light mode: Light green paper color
        textColor:
          theme.palette.mode === "dark"
            ? "#A5D6A7" // Dark mode: Lighter green
            : "#1B5E20", // Light mode: Deep green
        hoverColor:
          theme.palette.mode === "dark"
            ? "rgba(76, 175, 80, 0.25)" // Dark mode: slightly more intense, alpha already applied
            : "#C8E6C9", // Light mode: Medium green
        iconColor: "success",
        itemTextColor: theme.palette.mode === "dark" ? "#A5D6A7" : "#2E7D32",
      };
    case "subcatBusinessProgress":
      return {
        background:
          theme.palette.mode === "dark"
            ? "rgba(33, 150, 243, 0.15)" // Dark mode: softer blue, alpha already applied
            : "#E3F2FD", // Light mode: Light blue paper color
        textColor:
          theme.palette.mode === "dark"
            ? "#90CAF9" // Dark mode: Lighter blue
            : "#0D47A1", // Light mode: Deep blue
        hoverColor:
          theme.palette.mode === "dark"
            ? "rgba(33, 150, 243, 0.25)" // Dark mode: slightly more intense, alpha already applied
            : "#BBDEFB", // Light mode: Medium blue
        iconColor: "primary",
        itemTextColor: theme.palette.mode === "dark" ? "#90CAF9" : "#1565C0",
      };
    default:
      return {
        background:
          theme.palette.mode === "dark"
            ? "rgba(66, 66, 66, 0.2)" // Dark mode: soft gray
            : "#ECEFF1", // Light mode: light gray paper color
        textColor: theme.palette.text.primary,
        hoverColor:
          theme.palette.mode === "dark"
            ? "rgba(66, 66, 66, 0.3)" // Dark mode: slightly more intense
            : "#CFD8DC", // Light mode: medium gray
        iconColor: "primary",
        itemTextColor: theme.palette.text.primary,
      };
  }
};

// Update interface to accept selectedCategory prop
interface RedirectionSuggestionsProps {
  selectedCategory?: string;
}

const RedirectionSuggestions: React.FC<RedirectionSuggestionsProps> = ({
  selectedCategory,
}) => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [localSuggestions, setLocalSuggestions] =
    useState<SuggestionCategories>(defaultSuggestions);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Load saved suggestions from localStorage on mount
  useEffect(() => {
    const savedSuggestions = localStorage.getItem("redirectionSuggestions");
    if (savedSuggestions) {
      try {
        setLocalSuggestions(JSON.parse(savedSuggestions));
      } catch (e) {
        console.error("Failed to parse saved suggestions:", e);
      }
    }
  }, []);

  // Update selected tab when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      const categoryIndex = Object.keys(localSuggestions).findIndex(
        (category) => category === selectedCategory
      );
      if (categoryIndex !== -1) {
        setValue(categoryIndex);
      }
    }
  }, [selectedCategory, localSuggestions]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleEditSuggestions = () => {
    setIsEditDialogOpen(true);
  };

  const handleSaveSuggestions = (newSuggestions: SuggestionCategories) => {
    setLocalSuggestions(newSuggestions);
    localStorage.setItem(
      "redirectionSuggestions",
      JSON.stringify(newSuggestions)
    );
  };

  const getIcon = (category: string) => {
    switch (category) {
      case "Poszukiwacz":
        return <LightbulbOutlinedIcon color="primary" />;
      case "Kochanek":
        return <FavoriteOutlinedIcon color="secondary" />;
      case "Zdobywca":
        return (
          <EmojiEventsOutlinedIcon sx={{ color: theme.palette.success.main }} />
        );
      default:
        return <CheckCircleOutlineIcon />;
    }
  };

  // Gradient styles for each category
  const getCategoryGradient = (category: string) => {
    switch (category) {
      case "Poszukiwacz":
        return `linear-gradient(to right, ${alpha("#3949ab", 0.05)}, ${alpha(
          "#3949ab",
          0.01
        )})`;
      case "Kochanek":
        return `linear-gradient(to right, ${alpha("#d81b60", 0.05)}, ${alpha(
          "#d81b60",
          0.01
        )})`;
      case "Zdobywca":
        return `linear-gradient(to right, ${alpha("#2e7d32", 0.05)}, ${alpha(
          "#2e7d32",
          0.01
        )})`;
      default:
        return undefined;
    }
  };

  // Mobile view with accordions
  if (isMobile) {
    return (
      <Paper
        elevation={3}
        sx={{
          mb: 3,
          overflow: "hidden",
          borderRadius: 2,
          bgcolor: "background.paper",
          transition: "all 0.3s ease",
        }}
      >
        <Box
          sx={{
            p: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{t("redirectionSuggestions")}</Typography>
          <IconButton
            color="inherit"
            sx={{ ml: "auto" }}
            onClick={handleEditSuggestions}
          >
            <EditIcon />
          </IconButton>
        </Box>

        {Object.entries(localSuggestions).map(
          ([category, categoryGroups], index) => (
            <Accordion
              key={index}
              disableGutters
              sx={{
                bgcolor: "background.paper",
                "&:before": {
                  display: "none",
                },
                background: getCategoryGradient(category),
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  px: 2,
                  py: 1,
                  "&.Mui-expanded": {
                    backgroundColor: alpha(theme.palette.action.hover, 0.5),
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ mr: 2 }}>{getIcon(category)}</Box>
                  <Typography variant="subtitle1">{category}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                {categoryGroups.map((group, groupIndex) => (
                  <Box key={groupIndex} sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        px: 2,
                        py: 1,
                        backgroundColor: alpha(theme.palette.action.hover, 0.5),
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight="bold">
                        {t(group.title as any)}
                      </Typography>
                    </Box>
                    <List dense>
                      {group.items.map((item, itemIndex) => (
                        <ListItem
                          key={itemIndex}
                          sx={{
                            py: 1,
                            transition: "all 0.2s ease",
                            "&:hover": {
                              bgcolor: alpha(theme.palette.action.hover, 0.8),
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircleOutlineIcon
                              fontSize="small"
                              color="primary"
                            />
                          </ListItemIcon>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                    {groupIndex < categoryGroups.length - 1 && <Divider />}
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          )
        )}

        <EditSuggestionsDialog
          open={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          suggestions={localSuggestions}
          onSave={handleSaveSuggestions}
        />
      </Paper>
    );
  }

  // Desktop view with tabs
  return (
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
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: "white",
          display: "flex",
          alignItems: "center",
          boxShadow: `0 2px 6px 0 ${alpha(theme.palette.primary.dark, 0.3)}`,
        }}
      >
        <Typography variant="h6">{t("redirectionSuggestions")}</Typography>
        <IconButton
          color="inherit"
          sx={{ ml: "auto" }}
          onClick={handleEditSuggestions}
        >
          <EditIcon />
        </IconButton>
      </Box>

      <Box
        component="div"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          background: alpha(theme.palette.primary.main, 0.05),
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          sx={{
            "& .MuiTab-root": {
              fontWeight: 500,
              transition: "all 0.2s ease",
              py: 1.5,
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
              },
              "&.Mui-selected": {
                fontWeight: 600,
              },
            },
          }}
        >
          {Object.keys(localSuggestions).map((category, index) => (
            <Tab
              key={category}
              icon={getIcon(category)}
              label={category}
              {...a11yProps(index)}
              sx={{ py: 2 }}
            />
          ))}
        </Tabs>
      </Box>

      {Object.entries(localSuggestions).map(
        ([category, categoryGroups], index) => (
          <TabPanel key={category} value={value} index={index}>
            <Box
              sx={{
                background: getCategoryGradient(category),
                borderRadius: 2,
                p: 1,
                boxShadow: `inset 0 2px 10px 0 ${alpha(
                  theme.palette.common.black,
                  0.05
                )}`,
              }}
            >
              {categoryGroups.map((group, groupIndex) => (
                <Box key={groupIndex} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      py: 1,
                      px: 2,
                      backgroundColor: getSubcategoryStyle(group.title, theme)
                        .background,
                      borderRadius: 2,
                      mb: 2,
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? `0 2px 8px 0 ${alpha(
                              theme.palette.common.black,
                              0.2
                            )}`
                          : `0 2px 8px 0 ${alpha(
                              theme.palette.common.black,
                              0.05
                            )}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: `0 4px 12px 0 ${alpha(
                          theme.palette.common.black,
                          0.1
                        )}`,
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{
                        color: getSubcategoryStyle(group.title, theme)
                          .textColor,
                      }}
                    >
                      {t(group.title as any)}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        bgcolor: alpha(
                          getSubcategoryStyle(group.title, theme).textColor,
                          0.1
                        ),
                      }}
                    >
                      <Typography
                        variant="caption"
                        fontWeight="bold"
                        sx={{
                          color: getSubcategoryStyle(group.title, theme)
                            .textColor,
                        }}
                      >
                        {group.items.length}
                      </Typography>
                    </Box>
                  </Box>
                  <List dense sx={{ px: 1 }}>
                    {group.items.map((item, itemIndex) => (
                      <ListItem
                        key={itemIndex}
                        sx={{
                          borderRadius: 1,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            bgcolor: getSubcategoryStyle(group.title, theme)
                              .hoverColor,
                          },
                          py: 0.5,
                          my: 0.5,
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleOutlineIcon
                            fontSize="small"
                            color={
                              getSubcategoryStyle(group.title, theme)
                                .iconColor as any
                            }
                            sx={{
                              transition: "all 0.2s ease",
                              "&:hover": {
                                transform: "scale(1.2)",
                              },
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{
                            fontWeight: "medium",
                            fontSize: "0.9rem",
                            color: getSubcategoryStyle(group.title, theme)
                              .itemTextColor,
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  {groupIndex < categoryGroups.length - 1 && (
                    <Divider sx={{ my: 2, opacity: 0.6 }} />
                  )}
                </Box>
              ))}
            </Box>
          </TabPanel>
        )
      )}

      <EditSuggestionsDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        suggestions={localSuggestions}
        onSave={handleSaveSuggestions}
      />
    </Paper>
  );
};

export default RedirectionSuggestions;
