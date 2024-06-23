import React, { FC } from "react";
import styled from "styled-components";

type Props = {
  panel?: React.ReactNode;
  children?: React.ReactNode;
};
// create a layout which splits the body into two panels vertically, one 20% and one 80%

const Container = styled.div(() => ({
  height: "100vh",
  width: "100vw",
  display: "grid",
  gridTemplateRows: "1fr 9fr",
}));

export const LayoutVertical2080: FC<Props> = ({ panel, children }) => {
  return (
    <Container>
      <div>{panel}</div>
      <div>{children}</div>
    </Container>
  );
};
