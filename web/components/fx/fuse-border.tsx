import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";

// Keyframes for the rotating animation
const rotate = keyframes`
  100% {
    transform: rotate(-360deg);
  }
`;

const CardWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const RotatingBorder = styled.div<{
  borderWidth: number;
  color: React.CSSProperties["color"];
}>`
  position: absolute;
  top: -${({ borderWidth }) => borderWidth}px;
  bottom: -${({ borderWidth }) => borderWidth}px;
  left: -${({ borderWidth }) => borderWidth}px;
  right: -${({ borderWidth }) => borderWidth}px;
  border-radius: inherit;
  overflow: hidden;
  z-index: 1;
  &:before {
    content: "";
    background-image: conic-gradient(
      ${({ color }) => color} 0deg,
      20deg,
      transparent 120deg
    );
    height: 150%;
    width: 150%;
    position: absolute;
    left: -25%;
    top: -25%;
    animation: ${rotate} 2s infinite linear;
  }
`;

const CardContent = styled.div<{ borderWidth: number }>`
  position: relative;
  z-index: 2;
  padding: ${({ borderWidth }) => borderWidth}px;
`;

interface RotatingBorderCardProps extends React.PropsWithChildren<{}> {
  borderWidth?: number;
  color?: React.CSSProperties["color"];
  borderRadius?: React.CSSProperties["borderRadius"];
  enabled?: boolean;
}

export function FuseBorder({
  children,
  borderWidth = 4, // Default value
  borderRadius = 8,
  color = "blue",
  enabled = true,
}: RotatingBorderCardProps) {
  return (
    <CardWrapper>
      <motion.div
        variants={{
          enabled: {
            opacity: 1,
          },
          disabled: {
            opacity: 0,
          },
        }}
        animate={enabled ? "enabled" : "disabled"}
      >
        <RotatingBorder
          borderWidth={borderWidth}
          color={color}
          style={{
            borderRadius,
          }}
        />
      </motion.div>
      <CardContent borderWidth={borderWidth}>{children}</CardContent>
    </CardWrapper>
  );
}
