import React, { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useTranslation } from "../../utils/i18n";
import { useOnboarding } from "../../contexts/OnboardingContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../../firebase/auth";
import CategorySelection from "./CategorySelection";
import SuggestionInput from "./SuggestionInput";
import PresetSuggestions from "./PresetSuggestions";

const OnboardingFlow: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    state,
    nextStep,
    previousStep,
    completeOnboarding,
    setStepCompleted,
  } = useOnboarding();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentStep = state.steps[state.currentStep];

  // Redirect if no user
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleNext = () => {
    nextStep();
  };

  const handleBack = () => {
    previousStep();
  };

  const handleFinish = async () => {
    if (!user) return;

    setIsSubmitting(true);

    try {
      // Update user profile with onboarding data
      await updateUserProfile(user.uid, {
        selectedCategories: state.selectedCategories,
        personalSuggestions: state.personalSuggestions,
        onboardingCompleted: true,
      });

      completeOnboarding();
      navigate("/");
    } catch (error) {
      console.error("Error saving onboarding data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    if (state.currentStep < state.steps.length - 1) {
      // Mark current step as completed anyway
      setStepCompleted(state.currentStep, true);
      nextStep();
    }
  };

  // Render step content based on currentStep
  const renderStepContent = () => {
    switch (state.currentStep) {
      case 0:
        return <CategorySelection />;
      case 1:
        return <SuggestionInput />;
      case 2:
        return <PresetSuggestions />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          mt: 4,
          mb: 8,
          p: { xs: 2, sm: 4 },
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
          {t("onboardingTitle")}
        </Typography>

        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          {t("onboardingDescription")}
        </Typography>

        <Stepper activeStep={state.currentStep} sx={{ mb: 4 }}>
          {state.steps.map((step, index) => (
            <Step key={step.id} completed={step.completed}>
              <StepLabel>{step.title}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4, mb: 2 }}>{renderStepContent()}</Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={state.currentStep === 0 || isSubmitting}
          >
            {t("previous")}
          </Button>

          <Box>
            {state.currentStep < state.steps.length - 1 && (
              <Button
                variant="text"
                onClick={handleSkip}
                sx={{ mr: 1 }}
                disabled={isSubmitting}
              >
                {t("skip")}
              </Button>
            )}

            {state.currentStep < state.steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={
                  !state.steps[state.currentStep].completed || isSubmitting
                }
              >
                {t("next")}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleFinish}
                disabled={
                  !state.steps[state.currentStep].completed || isSubmitting
                }
              >
                {t("finish")}
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default OnboardingFlow;
