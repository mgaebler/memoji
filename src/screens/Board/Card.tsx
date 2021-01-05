import { FC } from "react";
import styled from "styled-components";
import IconDiamond from "./assets/diamond.svg";

type ICardContainer = {
  flipped: boolean;
};

export const CardContainer = styled.div<ICardContainer>((props) => ({
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  position: "relative",
  transition: "transform 600ms",
  transformStyle: "preserve-3d",
  transform: props.flipped ? "rotateY(180deg)" : "rotateY(0deg)",
}));

const CardBase = styled.div({
  height: "100%",
  width: "100%",
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "thin solid #ffffff60",
  backfaceVisibility: "hidden",
  borderRadius: 16,
  boxShadow: "1px 1px 5px",
});

export const CardFront = styled(CardBase)({
  backgroundColor: "#f5f5f5",
  transform: "rotateY(180deg)",
});

export const CardBack = styled(CardBase)({
  backgroundColor: "#bbdefb",
  backgroundImage: `url(${IconDiamond})`,
  backgroundPosition: "center",
  backgroundRepeat: "repeat",
  backgroundSize: 16,
});

export const CardImage: FC = ({ children }) => (
  <svg width="100%" height="100%" viewBox="0 0 16 16">
    <text
      x={8}
      y={9.5}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={10}
    >
      {children}
    </text>
  </svg>
);
