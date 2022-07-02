import React, { FC, useEffect, useMemo, useState } from 'react';
import { Column, Row } from './Layout';
import { SheetView } from './SheetView';
import { JSONLocalStorage } from './Utils/JSONLocalStorage';
import { Sheet } from './Types';
import styled, { createGlobalStyle } from 'styled-components';

const APP_NAME = 'VoiceTraining';
const SHEET_ITEM_TYPE_NAME = 'Sheet';
const SHEET_ITEM_SERVICE = new JSONLocalStorage<Sheet>(APP_NAME, SHEET_ITEM_TYPE_NAME);

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

export const App: FC = () => {
  const [query, setQuery] = useState<Partial<Sheet>>({});
  const sheetList = useMemo<Sheet[]>(() => SHEET_ITEM_SERVICE.search(query), [query]);
  const [currentSheet, setCurrentSheet] = useState<Sheet | undefined>(undefined);

  useEffect(() => {
    if (currentSheet) {
      SHEET_ITEM_SERVICE.update(currentSheet);
    }
  }, [currentSheet]);

  return (
    <AppBase>
      <GlobalStyle />
      <Header>
        <HeaderTitle>Voice Training</HeaderTitle>
      </Header>
      <Column>Sheet List</Column>
      <Column>{currentSheet ? <SheetView sheet={currentSheet} /> : undefined}</Column>
    </AppBase>
  );
};
