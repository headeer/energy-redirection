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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  InputAdornment,
} from "@mui/material";
import { RewardSettings, RewardType } from "../types/types";
import { useTranslation } from "../utils/i18n";

interface EditRewardsDialogProps {
  open: boolean;
  onClose: () => void;
  rewardSettings: RewardSettings;
  onSave: (settings: RewardSettings) => void;
}

const defaultRewardSettings: RewardSettings = {
  small: {
    title: "Small reward",
    description: "5 redirections",
    threshold: 5,
  },
  medium: {
    title: "Medium reward",
    description: "25 redirections",
    threshold: 25,
  },
  large: {
    title: "Large reward",
    description: "100 redirections",
    threshold: 100,
  },
};

const EditRewardsDialog: React.FC<EditRewardsDialogProps> = ({
  open,
  onClose,
  rewardSettings,
  onSave,
}) => {
  const [editedSettings, setEditedSettings] = useState<RewardSettings>({
    ...rewardSettings,
  });
  const [selectedReward, setSelectedReward] = useState<RewardType>("small");
  const theme = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    if (open) {
      setEditedSettings({ ...rewardSettings });
    }
  }, [open, rewardSettings]);

  const handleRewardChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedReward(event.target.value as RewardType);
  };

  const handleInputChange = (
    field: keyof typeof editedSettings.small,
    value: string | number
  ) => {
    setEditedSettings((prev) => ({
      ...prev,
      [selectedReward]: {
        ...prev[selectedReward],
        [field]: field === "threshold" ? Number(value) : value,
      },
    }));
  };

  const handleSave = () => {
    onSave(editedSettings);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t("editRewards")}</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="reward-select-label">
              {t("selectRewardToEdit")}
            </InputLabel>
            <Select
              labelId="reward-select-label"
              value={selectedReward}
              label={t("selectRewardToEdit")}
              onChange={(e) => handleRewardChange(e as any)}
            >
              <MenuItem value="small">{t("smallReward")}</MenuItem>
              <MenuItem value="medium">{t("mediumReward")}</MenuItem>
              <MenuItem value="large">{t("largeReward")}</MenuItem>
            </Select>
          </FormControl>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
            {selectedReward === "small"
              ? t("smallRewardTitle")
              : selectedReward === "medium"
              ? t("mediumRewardTitle")
              : t("largeRewardTitle")}
          </Typography>

          <TextField
            fullWidth
            label={t("rewardTitle")}
            value={editedSettings[selectedReward].title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            margin="normal"
            variant="outlined"
          />

          <TextField
            fullWidth
            label={t("rewardDescription")}
            value={editedSettings[selectedReward].description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            margin="normal"
            variant="outlined"
            multiline
            rows={2}
          />

          <TextField
            fullWidth
            label={t("rewardThreshold")}
            type="number"
            value={editedSettings[selectedReward].threshold}
            onChange={(e) => handleInputChange("threshold", e.target.value)}
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {t("redirections")}
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("cancel")}</Button>
        <Button onClick={handleSave} variant="contained">
          {t("saveChanges")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRewardsDialog;
