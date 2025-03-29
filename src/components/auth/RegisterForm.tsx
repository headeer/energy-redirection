import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
  Alert,
  Link as MuiLink,
  Container,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../firebase/auth";
import { useTranslation } from "../../utils/i18n";
import { NeuroPulseLogo } from "../common/NeuroPulseLogo";

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError(t("passwordsDoNotMatch"));
      return;
    }

    setLoading(true);

    try {
      await registerUser(email, password, displayName);
      setVerificationSent(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || t("registerError"));
    } finally {
      setLoading(false);
    }
  };

  if (verificationSent) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={10}
            sx={{
              p: 4,
              borderRadius: 3,
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 3,
              }}
            >
              <NeuroPulseLogo
                sx={{
                  fontSize: 60,
                  color: "primary.main",
                  mb: 2,
                }}
              />
            </Box>

            <Typography variant="h5" component="h1" gutterBottom>
              {t("verifyEmail")}
            </Typography>

            <Alert severity="success" sx={{ mb: 3 }}>
              {t("verifyEmailSent")}
            </Alert>

            <Typography variant="body1" paragraph>
              {t("clickLinkInEmail")}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/login")}
              sx={{
                mt: 2,
                background: "linear-gradient(45deg, #6a0dad 0%, #00d4ff 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #5a0c8d 0%, #00bfe6 100%)",
                },
              }}
            >
              {t("backToLogin")}
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              p: 3,
              background: "linear-gradient(135deg, #6a0dad 0%, #00d4ff 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <NeuroPulseLogo
              sx={{
                fontSize: 70,
                color: "white",
                mb: 2,
              }}
            />
            <Typography
              variant="h4"
              component="h1"
              color="white"
              fontWeight="bold"
              sx={{
                backgroundImage:
                  "linear-gradient(45deg, #ffffff 0%, #f0f0f0 100%)",
                backgroundClip: "text",
                textFillColor: "transparent",
                mb: 0,
              }}
            >
              NeuroPulse
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
              p: 4,
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              textAlign="center"
              gutterBottom
            >
              {t("register")}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              label={t("displayName")}
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              fullWidth
              autoFocus
            />

            <TextField
              label={t("email")}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              autoComplete="email"
            />

            <TextField
              label={t("password")}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      aria-label={
                        showPassword ? "hide password" : "show password"
                      }
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label={t("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              required
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleConfirmPasswordVisibility}
                      edge="end"
                      aria-label={
                        showConfirmPassword
                          ? "hide confirm password"
                          : "show confirm password"
                      }
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ textAlign: "right", mt: 1 }}>
              <MuiLink
                component={Link}
                to="/login"
                variant="body2"
                sx={{ textDecoration: "none" }}
              >
                {t("alreadyHaveAccount")}
              </MuiLink>
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              sx={{
                mt: 2,
                height: 48,
                borderRadius: 2,
                background: "linear-gradient(45deg, #6a0dad 0%, #00d4ff 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #5a0c8d 0%, #00bfe6 100%)",
                },
              }}
            >
              {loading ? <CircularProgress size={24} /> : t("register")}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterForm;
