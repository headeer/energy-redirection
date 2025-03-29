import React, { ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  useTheme,
  alpha,
  SvgIcon,
} from "@mui/material";
import { formatDisplayDate } from "../utils/dateUtils";
import { useTranslation } from "../utils/i18n";

interface HeaderProps {
  children?: ReactNode;
}

const NeuroPulseLogo = (props: any) => (
  <SvgIcon viewBox="0 0 200 200" {...props}>
    <defs>
      <linearGradient id="neuroPulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#6a0dad" stopOpacity={1} />
        <stop offset="100%" stopColor="#00d4ff" stopOpacity={1} />
      </linearGradient>
    </defs>

    {/* Background Circle */}
    <circle
      cx="100"
      cy="100"
      r="90"
      stroke="url(#neuroPulseGrad)"
      strokeWidth="5"
      fill="none"
    />

    {/* Pulse Waveform */}
    <polyline
      points="40,120 70,90 90,130 110,70 130,110 160,80"
      stroke="url(#neuroPulseGrad)"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Brain Shape (Stylized) */}
    <path
      d="M60 80 Q80 40, 100 60 Q120 40, 140 80"
      stroke="url(#neuroPulseGrad)"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
    />
  </SvgIcon>
);

const Header: React.FC<HeaderProps> = ({ children }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <AppBar
      position="sticky"
      sx={{
        backdropFilter: "blur(20px)",
        backgroundColor: alpha(theme.palette.primary.main, 0.95),
        boxShadow: `0 2px 10px 0 ${alpha(theme.palette.common.black, 0.1)}`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, sm: 70 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              width: "100%",
              alignItems: { xs: "flex-start", sm: "center" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mr: { xs: 0, sm: 3 },
                mb: { xs: 0.5, sm: 0 },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 1.5,
                }}
              >
                <NeuroPulseLogo
                  sx={{
                    fontSize: { xs: 40, sm: 48 },
                    animation: "pulse 2s infinite",
                    "@keyframes pulse": {
                      "0%": {
                        transform: "scale(1)",
                        opacity: 1,
                      },
                      "50%": {
                        transform: "scale(1.1)",
                        opacity: 0.9,
                      },
                      "100%": {
                        transform: "scale(1)",
                        opacity: 1,
                      },
                    },
                  }}
                />
              </Box>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  letterSpacing: "-0.5px",
                  textShadow: `0 2px 10px ${alpha(
                    theme.palette.common.black,
                    0.2
                  )}`,
                  background: `linear-gradient(45deg, #6a0dad 0%, #ffffff 50%, #00d4ff 100%)`,
                  backgroundSize: "200% auto",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  animation: "shine 3s linear infinite",
                  "@keyframes shine": {
                    "0%": {
                      backgroundPosition: "0% center",
                    },
                    "100%": {
                      backgroundPosition: "200% center",
                    },
                  },
                }}
              >
                NeuroPulse
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ml: { xs: 0, sm: "auto" },
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  color: alpha(theme.palette.common.white, 0.85),
                  fontWeight: 500,
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                {formatDisplayDate()}
              </Typography>
              {children}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
