import styled from "styled-components";

export type ICardGrid = {
  items: number;
};

function getCardSize(items: number) {
  const cardWidthMultiplier = 0.75;
  const widthRounded = Math.round((100 / items) * cardWidthMultiplier);
  return widthRounded;
}

export const CardGrid = styled.div<ICardGrid>(({ items }) => ({
  display: "grid",
  height: "100%",
  justifyContent: "center",
  alignContent: "center",
  gap: "1vh",
  // rowGap: "1vh",
  // make sure the cards fit in every orientation
  "@media screen and (orientation:landscape)": {
    gridTemplateColumns: `repeat(${items}, ${getCardSize(items)}vh)`,
    gridTemplateRows: `repeat(${items}, ${getCardSize(items)}vh)`,
  },
  "@media screen and (orientation:portrait)": {
    gridTemplateColumns: `repeat(${items}, ${getCardSize(items)}vw)`,
    gridTemplateRows: `repeat(${items}, ${getCardSize(items)}vw)`,
  },
}));

export const GridTile = styled.div({
  // outline: "thin dashed red",
  perspective: "600px",
});
