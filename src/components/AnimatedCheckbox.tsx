import React, { useState } from "react";
import { Box, Typography, useTheme, Checkbox } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { alpha } from "@mui/material/styles";

interface AnimatedCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: "small" | "medium" | "large";
}

const AnimatedCheckbox: React.FC<AnimatedCheckboxProps> = ({
  label,
  checked,
  onChange,
  size = "medium",
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // Size mapping
  const sizeMap = {
    small: {
      box: 20,
      icon: 16,
      fontSize: 14,
    },
    medium: {
      box: 24,
      icon: 18,
      fontSize: 16,
    },
    large: {
      box: 28,
      icon: 20,
      fontSize: 18,
    },
  };

  const { box, icon, fontSize } = sizeMap[size];

  // Use dark green color instead of success
  const darkGreen = "#2e7d32"; // You can adjust this to your preferred shade

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none",
      }}
      onClick={() => onChange(!checked)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mr: 1,
        }}
      >
        <Box
          sx={{
            width: box,
            height: box,
            borderRadius: 1.5,
            border: `2px solid ${
              checked ? darkGreen : theme.palette.text.secondary
            }`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: checked ? darkGreen : "transparent",
            transform: isHovered && !checked ? "scale(1.05)" : "scale(1)",
            boxShadow:
              isHovered && !checked
                ? `0 0 0 4px ${alpha(darkGreen, 0.4)}`
                : "none",
            transition: "all 0.2s ease",
          }}
        >
          <DoneIcon
            sx={{
              fontSize: icon,
              color: "#fff",
              opacity: checked ? 1 : 0,
              transform: checked ? "scale(1)" : "scale(0)",
              transition: "all 0.3s ease",
            }}
          />
        </Box>
      </Box>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          fontSize,
          color: checked ? darkGreen : theme.palette.text.primary,
          transition: "color 0.2s ease",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default AnimatedCheckbox;
