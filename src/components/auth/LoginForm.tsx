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
  Divider,
  Container,
  Paper,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { signIn, resetPassword, signInWithGoogle } from "../../firebase/auth";
import { useTranslation } from "../../utils/i18n";
import { NeuroPulseLogo } from "../common/NeuroPulseLogo";

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signIn(email, password);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || t("loginError"));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError(t("emailRequired"));
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await resetPassword(email);
      setResetSent(true);
    } catch (err: any) {
      console.error("Password reset error:", err);
      setError(err.message || t("resetPasswordError"));
    } finally {
      setLoading(false);
    }
  };

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
              {t("login")}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {resetSent && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {t("resetPasswordEmailSent")}
              </Alert>
            )}

            <TextField
              label={t("email")}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              autoFocus
              autoComplete="email"
            />

            <TextField
              label={t("password")}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              autoComplete="current-password"
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

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <MuiLink
                component="button"
                variant="body2"
                onClick={handleResetPassword}
                type="button"
                sx={{ textDecoration: "none" }}
              >
                {t("forgotPassword")}
              </MuiLink>

              <MuiLink
                component={Link}
                to="/register"
                variant="body2"
                sx={{ textDecoration: "none" }}
              >
                {t("needAccount")}
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
              {loading ? <CircularProgress size={24} /> : t("login")}
            </Button>

            <Divider sx={{ my: 2 }}>OR</Divider>

            <Button
              variant="outlined"
              size="large"
              fullWidth
              startIcon={<GoogleIcon />}
              onClick={async () => {
                setLoading(true);
                try {
                  await signInWithGoogle();
                  if (onSuccess) onSuccess();
                } catch (err: any) {
                  setError(err.message || "Error signing in with Google");
                } finally {
                  setLoading(false);
                }
              }}
              sx={{
                height: 48,
                borderRadius: 2,
                borderColor: "#6a0dad",
                color: "#6a0dad",
                "&:hover": {
                  borderColor: "#00d4ff",
                  backgroundColor: "#00d4ff10",
                },
              }}
            >
              {t("signInWithGoogle")}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginForm;
