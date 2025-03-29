import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  alpha,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { SuggestionGroup, SuggestionCategories } from "../types/types";
import { useTranslation } from "../utils/i18n";

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
  const { t } = useTranslation();

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
        title: "subcatCreativeSpark", // Default title, will be translated
        items: [],
      };

      setEditedSuggestions({
        ...editedSuggestions,
        [selectedCategory]: [...editedSuggestions[selectedCategory], newGroup],
      });

      // Select the new group
      const newIndex = editedSuggestions[selectedCategory].length;
      setSelectedGroup(newIndex);
      setGroupTitle("subcatCreativeSpark");
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

  const addItem = () => {
    if (
      selectedCategory &&
      selectedGroup !== null &&
      editedSuggestions[selectedCategory][selectedGroup]
    ) {
      const updatedGroups = [...editedSuggestions[selectedCategory]];
      updatedGroups[selectedGroup] = {
        ...updatedGroups[selectedGroup],
        items: [...updatedGroups[selectedGroup].items, ""],
      };

      setEditedSuggestions({
        ...editedSuggestions,
        [selectedCategory]: updatedGroups,
      });

      setEditingItem({
        groupIndex: selectedGroup,
        itemIndex: updatedGroups[selectedGroup].items.length - 1,
      });
      setItemText("");
    }
  };

  const startEditItem = (groupIndex: number, itemIndex: number) => {
    setEditingItem({ groupIndex, itemIndex });
    setItemText(
      editedSuggestions[selectedCategory][groupIndex].items[itemIndex]
    );
  };

  const saveItem = () => {
    if (
      editingItem &&
      selectedCategory &&
      editingItem.groupIndex < editedSuggestions[selectedCategory].length
    ) {
      const updatedGroups = [...editedSuggestions[selectedCategory]];
      const group = updatedGroups[editingItem.groupIndex];
      const updatedItems = [...group.items];
      updatedItems[editingItem.itemIndex] = itemText;

      updatedGroups[editingItem.groupIndex] = {
        ...group,
        items: updatedItems,
      };

      setEditedSuggestions({
        ...editedSuggestions,
        [selectedCategory]: updatedGroups,
      });

      setEditingItem(null);
      setItemText("");
    }
  };

  const deleteItem = (groupIndex: number, itemIndex: number) => {
    if (selectedCategory) {
      const updatedGroups = [...editedSuggestions[selectedCategory]];
      const group = updatedGroups[groupIndex];
      const updatedItems = group.items.filter(
        (_, index) => index !== itemIndex
      );

      updatedGroups[groupIndex] = {
        ...group,
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

  const subcategoryOptions = [
    { value: "subcatCreativeSpark", label: t("subcatCreativeSpark") },
    {
      value: "subcatLearningDevelopment",
      label: t("subcatLearningDevelopment"),
    },
    { value: "subcatPeopleConnections", label: t("subcatPeopleConnections") },
    { value: "subcatOutreach", label: t("subcatOutreach") },
    { value: "subcatPhysicalActivity", label: t("subcatPhysicalActivity") },
    { value: "subcatBusinessProgress", label: t("subcatBusinessProgress") },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      sx={{ "& .MuiDialog-paper": { p: 2 } }}
    >
      <DialogTitle>{t("redirectionSuggestions")}</DialogTitle>
      <DialogContent sx={{ minHeight: "60vh" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          {/* Left side - Category selector */}
          <Box sx={{ width: { xs: "100%", sm: "30%" }, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              {t("category")}
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <Select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e as any)}
                displayEmpty
              >
                {Object.keys(editedSuggestions).map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", mb: 2 }}>
              {addingCategory ? (
                <Box sx={{ display: "flex", width: "100%" }}>
                  <TextField
                    size="small"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder={t("category")}
                    sx={{ flex: 1 }}
                  />
                  <Button onClick={addCategory} sx={{ ml: 1 }}>
                    {t("saveButton")}
                  </Button>
                </Box>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setAddingCategory(true)}
                  sx={{ flex: 1 }}
                >
                  {t("addImpulse")}
                </Button>
              )}

              <IconButton
                color="error"
                onClick={deleteCategory}
                disabled={Object.keys(editedSuggestions).length <= 1}
                sx={{ ml: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Group selector */}
            {selectedCategory && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  {t("suggestions")}
                </Typography>

                <Box>
                  {editedSuggestions[selectedCategory]?.map((group, index) => (
                    <Box
                      key={index}
                      onClick={() => handleSelectGroup(index, group.title)}
                      sx={{
                        p: 1.5,
                        borderRadius: 1,
                        mb: 0.5,
                        bgcolor:
                          selectedGroup === index
                            ? alpha(theme.palette.primary.main, 0.1)
                            : "transparent",
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: alpha(theme.palette.primary.main, 0.05),
                        },
                      }}
                    >
                      <Typography>{t(group.title as any)}</Typography>
                    </Box>
                  ))}
                </Box>

                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={addGroup}
                  size="small"
                  sx={{ mt: 1 }}
                >
                  {t("addImpulse")}
                </Button>
              </>
            )}
          </Box>

          {/* Right side - Group editor */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", sm: "block" } }}
          />

          <Box sx={{ width: { xs: "100%", sm: "68%" } }}>
            {selectedCategory && selectedGroup !== null && (
              <>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="subcategory-select-label">
                      {t("subcategory")}
                    </InputLabel>
                    <Select
                      labelId="subcategory-select-label"
                      value={
                        groupTitle ||
                        editedSuggestions[selectedCategory][selectedGroup].title
                      }
                      onChange={(e) => setGroupTitle(e.target.value)}
                      label={t("subcategory")}
                    >
                      {subcategoryOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Box sx={{ display: "flex", ml: 1 }}>
                    <Button
                      variant="contained"
                      onClick={updateGroupTitle}
                      disabled={!groupTitle}
                      sx={{ minWidth: 40, px: 1 }}
                    >
                      <EditIcon fontSize="small" />
                    </Button>
                    <IconButton color="error" onClick={deleteGroup}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Typography variant="subtitle1" gutterBottom>
                  {t("suggestions")}
                </Typography>

                <List>
                  {editedSuggestions[selectedCategory][selectedGroup].items.map(
                    (item, itemIndex) => (
                      <ListItem
                        key={itemIndex}
                        sx={{
                          border: `1px solid ${alpha(
                            theme.palette.divider,
                            0.5
                          )}`,
                          borderRadius: 1,
                          mb: 1,
                        }}
                        secondaryAction={
                          <Box>
                            <IconButton
                              edge="end"
                              onClick={() =>
                                startEditItem(selectedGroup, itemIndex)
                              }
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              edge="end"
                              color="error"
                              onClick={() =>
                                deleteItem(selectedGroup, itemIndex)
                              }
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        }
                      >
                        <ListItemText
                          primary={
                            editingItem?.groupIndex === selectedGroup &&
                            editingItem?.itemIndex === itemIndex ? (
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <TextField
                                  fullWidth
                                  size="small"
                                  value={itemText}
                                  onChange={(e) => setItemText(e.target.value)}
                                  autoFocus
                                />
                                <Button onClick={saveItem} sx={{ ml: 1 }}>
                                  {t("saveButton")}
                                </Button>
                              </Box>
                            ) : (
                              item
                            )
                          }
                        />
                      </ListItem>
                    )
                  )}
                </List>

                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={addItem}
                  sx={{ mt: 1 }}
                >
                  {t("addImpulse")}
                </Button>
              </>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("cancel")}</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          {t("saveButton")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditSuggestionsDialog;
