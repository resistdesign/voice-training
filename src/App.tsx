import React, { FC, useEffect, useMemo, useState } from 'react';
import { Column, Row } from './Layout';
import { SheetView } from './SheetView';
import { JSONLocalStorage } from './Utils/JSONLocalStorage';
import { Sheet } from './Types';

const APP_NAME = 'VoiceTraining';
const SHEET_ITEM_TYPE_NAME = 'Sheet';
const SHEET_ITEM_SERVICE = new JSONLocalStorage<Sheet>(APP_NAME, SHEET_ITEM_TYPE_NAME);

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
    <Column>
      <Row>Voice Training</Row>
      <Column>Sheet List</Column>
      <Column>
        <SheetView />
      </Column>
    </Column>
  );
};
