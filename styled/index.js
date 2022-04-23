import styled from "styled-components";

const Main = styled.main`
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;

  border-bottom: 1px solid #3a3a3c;

  font-weight: 700;
  font-size: 1.6rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
`;

const GameSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;
const TileContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 5px;

  height: 360px;
  width: 350px;
`;
const TileRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
`;

const Tile = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  border: 2px solid #3a3a3c;
  font-size: 3.2rem;
  font-weight: bold;
  line-height: 3.2rem;
  text-transform: uppercase;

  user-select: none;
`;

const TileCursor = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  font-size: 3.2rem;
  font-weight: bold;
  line-height: 3.2rem;
  text-transform: uppercase;

  user-select: none;
`;

const KeyboardSection = styled.section`
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const KeyboardRow = styled.div`
  width: 100%;
  margin: 0 auto 8px;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const KeyboardButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0 6px 0 0;
  height: 58px;
  flex: 1;

  border: 0;
  border-radius: 4px;
  background-color: ${props => props.primary ? "#FF0000" : "#1D2D5B"};
  font-weight: bold;
  text-transform: uppercase;
  color: #d7dadc;

  cursor: pointer;
  user-select: none;

  &:last-of-type {
    margin: 2;
  }
`;

export {
    Main,
    Header,
    GameSection,
    TileContainer,
    TileRow,
    Tile,
    TileCursor,
    KeyboardSection,
    KeyboardRow,
    KeyboardButton
}