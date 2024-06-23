import React, { FC } from "react";
import styled from "styled-components";

type Props = {
  panel?: React.ReactNode;
  children?: React.ReactNode;
};
// create a layout which splits the body into two panels vertically, one 20% and one 80%

const Container = styled.div(() => ({
  display: "grid",
}));

export const LayoutVertical2080: FC<Props> = ({ panel, children }) => {
  return (
    <Container>
      <div style={{ height: "20vh" }}>{panel}</div>
      <div style={{ height: "80vh" }}>{children}</div>
    </Container>
  );
};
