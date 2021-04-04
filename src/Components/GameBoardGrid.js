import { Grid } from "semantic-ui-react";

const SpecificGrid = (props) => {
  return (
    <Grid.Column
      textAlign="center"
      className={props.gridCSS}
      onClick={props.onClick}
    />
  );
};

const GameBoardGrids = (props) => {
  const onCellClick = props.onCellClick || (() => {});
  return props.gameBoard.gameBoardGrid.map((row, y) => {
    return row.map((column, x) => {
      let gridCSS = "eachGrid";
      if (column.isDamaged && column.shipInfo) gridCSS = "damagedGrid";
      if (column.isDamaged && !column.shipInfo) gridCSS = "missedShotGrid";
      if (
        !column.isDamaged &&
        column.shipInfo &&
        props.accessiblePlayer === "AI"
      )
        gridCSS = "ownShips";
      return (
        <SpecificGrid
          gridCSS={gridCSS}
          onClick={() => {
            onCellClick(x, y);
          }}
        />
      );
    });
  });
};

export { GameBoardGrids, SpecificGrid };
