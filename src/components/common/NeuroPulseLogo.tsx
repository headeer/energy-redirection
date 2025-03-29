import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const NeuroPulseLogo = (props: SvgIconProps) => (
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
