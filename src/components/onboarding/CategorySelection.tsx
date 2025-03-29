import React from "react";
import {
  Box,
  Typography,
  Chip,
  Card,
  CardContent,
  Alert,
  Grid,
} from "@mui/material";
import { useTranslation } from "../../utils/i18n";
import { useOnboarding } from "../../contexts/OnboardingContext";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

interface CategoryCardProps {
  title: string;
  description: string;
  id: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onToggle: (id: string) => void;
  disabled: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  id,
  icon,
  isSelected,
  onToggle,
  disabled,
}) => {
  return (
    <Card
      sx={{
        cursor: disabled && !isSelected ? "not-allowed" : "pointer",
        transition: "all 0.2s ease-in-out",
        borderColor: isSelected ? "primary.main" : "divider",
        borderWidth: 2,
        borderStyle: "solid",
        opacity: disabled && !isSelected ? 0.6 : 1,
        transform: isSelected ? "scale(1.02)" : "none",
        "&:hover": {
          transform: disabled && !isSelected ? "none" : "scale(1.02)",
          boxShadow: isSelected ? 6 : 3,
        },
      }}
      onClick={() => (!disabled || isSelected ? onToggle(id) : null)}
      elevation={isSelected ? 4 : 1}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box
            sx={{
              mr: 2,
              color: isSelected ? "primary.main" : "text.secondary",
              bgcolor: isSelected
                ? "rgba(106, 13, 173, 0.1)"
                : "background.default",
              p: 1,
              borderRadius: "50%",
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" component="h3" fontWeight={600}>
            {title}
          </Typography>
          {isSelected && (
            <Chip
              label="Selected"
              size="small"
              color="primary"
              sx={{ ml: "auto" }}
            />
          )}
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const CategorySelection: React.FC = () => {
  const { t } = useTranslation();
  const { state, addCategory, removeCategory, setStepCompleted } =
    useOnboarding();

  const categories = [
    {
      id: "Poszukiwacz",
      title: t("explorer"),
      description:
        "For those who seek knowledge, creativity, and new experiences.",
      icon: <ExploreIcon fontSize="large" />,
    },
    {
      id: "Kochanek",
      title: t("lover"),
      description:
        "For those who prioritize relationships, emotions, and connections.",
      icon: <FavoriteIcon fontSize="large" />,
    },
    {
      id: "Zdobywca",
      title: t("conqueror"),
      description:
        "For those who strive for achievement, progress, and mastery.",
      icon: <EmojiEventsIcon fontSize="large" />,
    },
  ];

  const handleToggleCategory = (categoryId: string) => {
    if (state.selectedCategories.includes(categoryId)) {
      removeCategory(categoryId);
    } else {
      addCategory(categoryId);
    }

    // Mark this step as completed if at least one category is selected
    setStepCompleted(0, state.selectedCategories.length > 0);
  };

  const isCategoryLimitReached = state.selectedCategories.length >= 3;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
        {t("selectCategories")}
      </Typography>

      <Typography variant="body1" paragraph>
        {t("selectCategoriesDescription")}
      </Typography>

      {isCategoryLimitReached && (
        <Alert severity="info" sx={{ mb: 3 }}>
          {t("categoryLimit")}
        </Alert>
      )}

      <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 3 }}>
        {categories.map((category) => (
          <Box key={category.id} sx={{ flex: { xs: "100%", md: "1 1 30%" } }}>
            <CategoryCard
              title={category.title}
              description={category.description}
              id={category.id}
              icon={category.icon}
              isSelected={state.selectedCategories.includes(category.id)}
              onToggle={handleToggleCategory}
              disabled={
                isCategoryLimitReached &&
                !state.selectedCategories.includes(category.id)
              }
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategorySelection;
