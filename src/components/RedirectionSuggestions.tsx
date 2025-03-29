import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// Define the suggestions for each category
const suggestions = {
  Poszukiwacz: [
    {
      title: "Iskra kreatywności",
      items: [
        "Zapisz pomysł na film YouTube lub treść marketingową",
        "Zrób notatkę o nowym pomyśle biznesowym",
        "Zaprojektuj prosty prototyp nowego produktu",
        "Zrób burzę mózgów i zapisz 5 nowych pomysłów",
      ],
    },
    {
      title: "Nauka i rozwój",
      items: [
        "Przeczytaj jeden rozdział książki edukacyjnej",
        "Obejrzyj krótki film edukacyjny",
        "Zapisz się na kurs online",
        "Zrób notatki z ostatnio nauczonych rzeczy",
      ],
    },
  ],
  Kochanek: [
    {
      title: "Połączenia z ludźmi",
      items: [
        "Napisz personalizowaną wiadomość do klienta/partnera",
        "Zadzwoń do przyjaciela/rodziny, zapytaj jak się mają",
        "Zaproponuj kawę/spotkanie z potencjalnym partnerem biznesowym",
        "Napisz pozytywną recenzję dla kogoś, kto na to zasłużył",
      ],
    },
    {
      title: "Outreach",
      items: [
        "Napisz post na LinkedIn nawiązujący do innych",
        "Odpowiedz na komentarze pod swoimi treściami",
        "Nawiąż kontakt z nową osobą w Twojej branży",
        "Zaproś kogoś na rozmowę podcast/wywiad",
      ],
    },
  ],
  Zdobywca: [
    {
      title: "Aktywność fizyczna",
      items: [
        "Zrób 10-20 pompek",
        "Wykonaj krótki spacer lub trening",
        "Zrób 1-minutową sesję planku",
        "Wykonaj 25 przysiadów",
      ],
    },
    {
      title: "Postęp biznesowy",
      items: [
        "Wykonaj dodatkowy cold call",
        "Wyślij ofertę do potencjalnego klienta",
        "Zakończ jedno małe zadanie z Twojej listy",
        "Ustaw konkretny cel na następny dzień",
      ],
    },
  ],
};

const RedirectionSuggestions: React.FC = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getIcon = (category: string) => {
    switch (category) {
      case "Poszukiwacz":
        return <LightbulbOutlinedIcon color="primary" />;
      case "Kochanek":
        return <FavoriteOutlinedIcon color="secondary" />;
      case "Zdobywca":
        return (
          <EmojiEventsOutlinedIcon sx={{ color: theme.palette.success.main }} />
        );
      default:
        return <CheckCircleOutlineIcon />;
    }
  };

  // Mobile view with accordions
  if (isMobile) {
    return (
      <Paper elevation={3} sx={{ mb: 3, overflow: "hidden", borderRadius: 2 }}>
        <Box
          sx={{
            p: 2,
            backgroundColor: theme.palette.primary.main,
            color: "white",
          }}
        >
          <Typography variant="h6">Na co przekierować energię?</Typography>
        </Box>

        {Object.entries(suggestions).map(
          ([category, categoryGroups], index) => (
            <Accordion key={index} disableGutters>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  px: 2,
                  py: 1,
                  "&.Mui-expanded": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ mr: 2 }}>{getIcon(category)}</Box>
                  <Typography variant="subtitle1">{category}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                {categoryGroups.map((group, groupIndex) => (
                  <Box key={groupIndex} sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        px: 2,
                        py: 1,
                        backgroundColor: theme.palette.action.hover,
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight="bold">
                        {group.title}
                      </Typography>
                    </Box>
                    <List dense>
                      {group.items.map((item, itemIndex) => (
                        <ListItem key={itemIndex}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircleOutlineIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                    {groupIndex < categoryGroups.length - 1 && <Divider />}
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          )
        )}
      </Paper>
    );
  }

  // Desktop view with tabs
  return (
    <Paper elevation={3} sx={{ mb: 3, overflow: "hidden", borderRadius: 2 }}>
      <Box
        sx={{
          p: 2,
          backgroundColor: theme.palette.primary.main,
          color: "white",
        }}
      >
        <Typography variant="h6">Na co przekierować energię?</Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            icon={<LightbulbOutlinedIcon />}
            label="Poszukiwacz"
            {...a11yProps(0)}
            sx={{ py: 2 }}
          />
          <Tab
            icon={<FavoriteOutlinedIcon />}
            label="Kochanek"
            {...a11yProps(1)}
            sx={{ py: 2 }}
          />
          <Tab
            icon={<EmojiEventsOutlinedIcon />}
            label="Zdobywca"
            {...a11yProps(2)}
            sx={{ py: 2 }}
          />
        </Tabs>
      </Box>

      {Object.values(suggestions).map((categoryGroups, index) => (
        <TabPanel key={index} value={value} index={index}>
          {categoryGroups.map((group, groupIndex) => (
            <Box key={groupIndex} sx={{ mb: 2 }}>
              <Box
                sx={{
                  py: 1,
                  px: 2,
                  backgroundColor: theme.palette.action.hover,
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {group.title}
                </Typography>
              </Box>
              <List dense>
                {group.items.map((item, itemIndex) => (
                  <ListItem key={itemIndex}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        color="primary"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ fontWeight: "medium" }}
                    />
                  </ListItem>
                ))}
              </List>
              {groupIndex < categoryGroups.length - 1 && (
                <Divider sx={{ my: 2 }} />
              )}
            </Box>
          ))}
        </TabPanel>
      ))}
    </Paper>
  );
};

export default RedirectionSuggestions;
