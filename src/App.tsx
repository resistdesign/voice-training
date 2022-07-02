import React, { FC, useCallback, useMemo, useState } from 'react';
import { Base, Column, Row } from './Layout';
import { SheetView } from './SheetView';
import { JSONLocalStorage } from './Utils/JSONLocalStorage';
import { Sheet } from './Types';
import styled, { createGlobalStyle } from 'styled-components';
import { DEFAULT_SHEET } from './Constants';

const APP_NAME = 'VoiceTraining';
const SHEET_ITEM_TYPE_NAME = 'Sheet';
const SHEET_ITEM_SERVICE = new JSONLocalStorage<Sheet>(APP_NAME, SHEET_ITEM_TYPE_NAME);

const SheetItemBase = styled(Row)`
  justify-content: stretch;
`;
const SheetItemLabel = styled(Row)`
  cursor: pointer;
  letter-spacing: normal;

  transition: letter-spacing 500ms ease-in-out;

  :hover {
    letter-spacing: 0.0625em;
  }
`;
const SheetItemSpacer = styled(Base)`
  flex: 1 1 auto;
  width: auto;
`;
const SheetItem: FC<{ sheet: Sheet; onSelectSheet: (sheet: Sheet) => void; onDeleteSheet: (sheet: Sheet) => void }> = ({
  sheet,
  onSelectSheet,
  onDeleteSheet,
}) => {
  const { name } = sheet;
  const onClickLabel = useCallback(() => onSelectSheet(sheet), [sheet, onSelectSheet]);
  const onClickDeleteButton = useCallback(() => onDeleteSheet(sheet), [sheet, onDeleteSheet]);

  return (
    <SheetItemBase>
      <SheetItemLabel onClick={onClickLabel}>{name}</SheetItemLabel>
      <SheetItemSpacer />
      <button onClick={onClickDeleteButton}>X</button>
    </SheetItemBase>
  );
};

const GlobalStyle = createGlobalStyle`
  html,
  body {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
    font-family: sans-serif;
  }
`;

const AppBase = styled(Column)`
  padding: 1em;
`;
const Header = styled(Column)`
  padding: 1em 0;
`;
const HeaderTitle = styled(Row)`
  font-size: 2em;
`;
const SheetList = styled(Column)`
  gap: 0.5em;
`;

export const App: FC = () => {
  const [query, setQuery] = useState<Partial<Sheet>>({});
  const onRefreshQuery = useCallback(() => setQuery({ ...query }), [query, setQuery]);
  const sheetList = useMemo<Sheet[]>(
    () =>
      SHEET_ITEM_SERVICE.search(query).sort((sA: Sheet, sB: Sheet) =>
        sA.name > sB.name ? -1 : sA.name < sB.name ? 1 : 0
      ),
    [query]
  );
  const [currentSheet, setCurrentSheet] = useState<Sheet | undefined>(undefined);
  const onSelectSheet = useCallback((sheet: Sheet) => setCurrentSheet(sheet), [setCurrentSheet]);
  const onDeselectSheet = useCallback(() => {
    setCurrentSheet(undefined);
    onRefreshQuery();
  }, [setCurrentSheet, onRefreshQuery]);
  const onCreateSheet = useCallback(() => {
    SHEET_ITEM_SERVICE.create({
      ...DEFAULT_SHEET,
      name: new Date().toLocaleString(),
    });
    onRefreshQuery();
  }, [onRefreshQuery]);
  const onDeleteSheet = useCallback(
    ({ id }: Sheet) => {
      SHEET_ITEM_SERVICE.delete(id);
      onRefreshQuery();
    },
    [onRefreshQuery]
  );
  const onSheetChange = useCallback(
    (sheet: Sheet) => setCurrentSheet(SHEET_ITEM_SERVICE.update(sheet)),
    [setCurrentSheet]
  );

  return (
    <AppBase>
      <GlobalStyle />
      <Header>
        <HeaderTitle>Voice Training</HeaderTitle>
      </Header>
      {!currentSheet ? (
        <SheetList>
          {sheetList.map((s, i) => (
            <SheetItem key={`SheetItem:${i}`} sheet={s} onSelectSheet={onSelectSheet} onDeleteSheet={onDeleteSheet} />
          ))}
          <button onClick={onCreateSheet}>+ New Sheet</button>
        </SheetList>
      ) : undefined}
      {currentSheet ? (
        <Column>
          <SheetView sheet={currentSheet} onSheetChange={onSheetChange} onClose={onDeselectSheet} />
        </Column>
      ) : undefined}
    </AppBase>
  );
};
