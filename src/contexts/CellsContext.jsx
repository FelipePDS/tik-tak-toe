import React, { createContext, useContext, useState } from 'react';

import { usePlayerContext } from './PlayersContext';
import { boardLinesProps } from '../utils/cellsUtil';

const CellsContext = createContext();

export function CellsContextProvider({ children }) {
  const { 
    playerTurn,
    togglePlayerTurn,
    addPlayerPlay
  } = usePlayerContext();

  const [boardLines, setBoardLines] = useState(boardLinesProps);

  function toggleCell(lineIndex, cellIndex) {
    const cellIsMarked = boardLines[lineIndex][0].cells[cellIndex].isMarked;

    if (!cellIsMarked) {
      let newBoardLine = boardLines;
      newBoardLine[lineIndex][0].cells[cellIndex].isMarked = true;
      newBoardLine[lineIndex][0].cells[cellIndex].playerMarkedCell = playerTurn;

      setBoardLines(newBoardLine);
      addPlayerPlay(boardLines[lineIndex][0].cells[cellIndex].id, playerTurn);
      togglePlayerTurn();
    }
  }

  function restartBoardLines() {
    setBoardLines(boardLinesProps);
  }

  return (
    <CellsContext.Provider value={{
      boardLines,
      toggleCell,
      restartBoardLines
    }}>
      {children}
    </CellsContext.Provider>
  );
}

export function useCellsContext() {
  return useContext(CellsContext);
}
