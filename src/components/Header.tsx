import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  useTheme,
  alpha,
} from "@mui/material";
import { formatDisplayDate } from "../utils/dateUtils";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";

const Header: React.FC = () => {
  const theme = useTheme();

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
              <ElectricBoltIcon
                sx={{
                  mr: 1.5,
                  fontSize: { xs: 24, sm: 32 },
                  color: alpha(theme.palette.common.white, 0.9),
                }}
              />
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.1rem", sm: "1.3rem" },
                  letterSpacing: "-0.5px",
                  color: alpha(theme.palette.common.white, 0.95),
                  textShadow: `0 2px 10px ${alpha(
                    theme.palette.common.black,
                    0.2
                  )}`,
                }}
              >
                Rytuał Przekierowania Energii
              </Typography>
            </Box>

            <Typography
              variant="subtitle1"
              sx={{
                color: alpha(theme.palette.common.white, 0.85),
                fontWeight: 500,
                fontSize: { xs: "0.875rem", sm: "1rem" },
                ml: { xs: 0, sm: "auto" },
              }}
            >
              {formatDisplayDate()}
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
