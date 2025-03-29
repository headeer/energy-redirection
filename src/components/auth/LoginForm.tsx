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
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { signIn, resetPassword, signInWithGoogle } from "../../firebase/auth";
import { useTranslation } from "../../utils/i18n";

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
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" component="h1" textAlign="center" gutterBottom>
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
                aria-label={showPassword ? "hide password" : "show password"}
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
        }}
      >
        {t("signInWithGoogle")}
      </Button>
    </Box>
  );
};

export default LoginForm;
