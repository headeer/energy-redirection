import React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
  Zoom,
  useTheme,
  alpha,
  Avatar,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Zoom ref={ref} {...props} />;
});

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ open, onClose }) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="success-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: 4,
          maxWidth: "360px",
          textAlign: "center",
          overflow: "hidden",
          bgcolor: "background.paper",
          boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.2)}`,
        },
      }}
    >
      <Box
        sx={{
          bgcolor: theme.palette.success.main,
          py: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            background: `radial-gradient(circle, ${alpha(
              theme.palette.common.white,
              0.1
            )} 0%, transparent 70%)`,
            zIndex: 0,
          }}
        />

        <Typography
          variant="h5"
          component="h2"
          sx={{
            color: "white",
            fontWeight: 600,
            position: "relative",
            zIndex: 1,
          }}
        >
          Brawo!
        </Typography>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 4,
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: alpha(theme.palette.success.main, 0.1),
              mb: 2,
              boxShadow: `0 4px 12px 0 ${alpha(
                theme.palette.success.main,
                0.3
              )}`,
            }}
          >
            <CheckCircleIcon
              color="success"
              sx={{
                fontSize: 42,
                animation: "pulse 1.5s infinite",
                "@keyframes pulse": {
                  "0%": {
                    transform: "scale(0.95)",
                    opacity: 0.9,
                  },
                  "70%": {
                    transform: "scale(1.1)",
                    opacity: 1,
                  },
                  "100%": {
                    transform: "scale(0.95)",
                    opacity: 0.9,
                  },
                },
              }}
            />
          </Avatar>

          <Typography
            variant="h6"
            color="text.primary"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Przekierowałeś swoją energię!
          </Typography>

          <Typography
            id="success-dialog-description"
            variant="body1"
            sx={{
              mb: 4,
              color: theme.palette.text.secondary,
            }}
          >
            Twój mózg właśnie zbudował nową ścieżkę neuronową. Z każdym
            przekierowaniem stajesz się silniejszy!
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              p: 2,
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.primary.main, 0.06),
            }}
          >
            <LocalFireDepartmentIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Kontynuuj serię przekierowań dla większego progresu!
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="success"
            onClick={onClose}
            sx={{
              borderRadius: 12,
              px: 4,
              py: 1,
              fontSize: "1rem",
              fontWeight: 600,
              boxShadow: `0 4px 12px 0 ${alpha(
                theme.palette.success.main,
                0.3
              )}`,
              "&:hover": {
                boxShadow: `0 6px 16px 0 ${alpha(
                  theme.palette.success.main,
                  0.4
                )}`,
                bgcolor: theme.palette.success.dark,
              },
            }}
          >
            Świetnie!
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
