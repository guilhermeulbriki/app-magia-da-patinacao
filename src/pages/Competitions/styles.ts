import styled, { css } from "styled-components/native";

interface ITrophyProps {
  selected: boolean;
}

interface ICompetitionItemProps {
  podium: 1 | 2 | 3 | 4 | 5;
}

interface IItemNameProps {
  white: boolean;
}

interface IItemCoupProps {
  white: boolean;
}

interface IItemPodiumProps {
  white: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Description = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 32px;
  margin-top: 24px;
`;

export const TextDescription = styled.Text`
  max-width: 200px;
  font-size: 18px;
  line-height: 28px;
  font-family: "Roboto_500Medium";
  color: #4f4f4f;
`;

export const ImageDescription = styled.Image``;

export const Trophys = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  padding: 0 32px;
  margin-top: 24px;
  margin-bottom: 16px;
`;

export const Trophy = styled.Image<ITrophyProps>`
  ${(props) =>
    props.selected === false &&
    css`
      opacity: 0.4;
    `}
`;

export const CompetitionsList = styled.View`
  width: 100%;
  padding: 0 32px;
`;

export const CompetitionItem = styled.View<ICompetitionItemProps>`
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  height: 58px;
  padding: 8px 16px;

  ${(props) =>
    props.podium === 1 &&
    css`
      background: #ffe983;
    `}

  ${(props) =>
    props.podium === 2 &&
    css`
      background: #c1c1c1;
    `}

  ${(props) =>
    props.podium === 3 &&
    css`
      background: #d09679;
    `}

  ${(props) =>
    props.podium === 4 &&
    css`
      background: #787878;
    `}

  ${(props) =>
    props.podium === 5 &&
    css`
      background: #5b5b5b;
    `}
`;

export const ItemDesctiption = styled.View``;

export const ItemName = styled.Text<IItemNameProps>`
  color: #4f4f4f;
  font-size: 14px;
  font-family: "Roboto_500Medium";

  ${(props) =>
    props.white === true &&
    css`
      color: #eaeaea;
    `}
`;

export const ItemCoup = styled.Text<IItemCoupProps>`
  color: #4f4f4f;
  font-size: 12px;

  ${(props) =>
    props.white === true &&
    css`
      color: #eaeaea;
    `}
`;

export const ItemPodium = styled.Text<IItemPodiumProps>`
  color: #4f4f4f;
  font-size: 20px;
  font-family: "Roboto_500Medium";

  ${(props) =>
    props.white === true &&
    css`
      color: #eaeaea;
    `}
`;

export const PaginationContent = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;

export const PaginationNumber = styled.Text`
  margin: 0 8px;
  font-size: 16px;
  color: #4f4f4f;
  font-family: "Roboto_500Medium";
`;
