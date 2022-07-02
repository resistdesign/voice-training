import React, { FC, useCallback } from 'react';
import { Base, Column, Row } from './Layout';
// @ts-ignore
import GreyHeartIcon from 'url:./Assets/Graphics/Icons/grey-heart.svg';
// @ts-ignore
import HeartIcon from 'url:./Assets/Graphics/Icons/heart.svg';
import styled from 'styled-components';
import { Sheet } from './Types';

const Title = styled(Row)`
  font-size: 1.5em;
  justify-content: stretch;
`;
const TitleSpacer = styled(Base)`
  flex: 1 1 auto;
  width: auto;
`;
const HeartCheckboxBase = styled(Base)<{ checked?: boolean }>`
  flex: 0 0 auto;
  background: url('${(p) => (p.checked ? HeartIcon : GreyHeartIcon)}');
  width: 2em;
  height: 2em;
  cursor: pointer;
`;
const CheckboxRow = styled(Row)`
  gap: 0.5em;
`;
const QuoteInput = styled.input`
  width: 50em;
`;
const HeartCheckboxForArrayIndex: FC<{
  checked: boolean;
  property: keyof Sheet;
  index: number;
  onToggle: (property: keyof Sheet, index: number) => void;
}> = ({ checked, property, index, onToggle }) => {
  const onClick = useCallback(() => onToggle(property, index), [property, index, onToggle]);

  return <HeartCheckboxBase checked={checked} onClick={onClick} />;
};

export type SheetViewProps = {
  sheet: Sheet;
  onSheetChange: (sheet: Sheet) => void;
  onClose: () => void;
};

export const SheetView: FC<SheetViewProps> = ({ sheet, onSheetChange, onClose }) => {
  const {
    name,
    semioccluded: [sO1, sO2, sO3, sO4, sO5],
    sustainedPitch: [sP1, sP2, sP3, sP4, sP5],
    functionalPhrases: [fP1, fP2, fP3],
    carryover,
    carryover: { complete: carryoverComplete, quote: carryoverQuote },
    notes,
  } = sheet;
  const onSheetPropertyChange = useCallback(
    (property: keyof Sheet, value: any) =>
      onSheetChange({
        ...sheet,
        [property]: value,
      }),
    [sheet, onSheetChange]
  );
  const onToggleBooleanArrayIndex = useCallback(
    (property: keyof Sheet, index: number) =>
      onSheetPropertyChange(
        property,
        (sheet[property] as boolean[]).map((v, i) => (i === index ? !v : v))
      ),
    [sheet, onSheetPropertyChange]
  );
  const onCarryoverPropertyChange = useCallback(
    (property: keyof Sheet['carryover'], value: any) =>
      onSheetPropertyChange('carryover', {
        ...carryover,
        [property]: value,
      }),
    [carryover, onSheetPropertyChange]
  );
  const onToggleCarryoverComplete = useCallback(
    () => onCarryoverPropertyChange('complete', !carryoverComplete),
    [carryoverComplete, onCarryoverPropertyChange]
  );
  const onCarryoverQuoteChange = useCallback(
    ({ currentTarget: { value = '' } }) => onCarryoverPropertyChange('quote', value),
    [onCarryoverPropertyChange]
  );
  const onNotesChange = useCallback(
    ({ currentTarget: { value = '' } }) => onSheetPropertyChange('notes', value),
    [onSheetPropertyChange]
  );

  return (
    <Column>
      <Column>
        <Title>
          {name}
          <TitleSpacer />
          <button onClick={onClose}>Done</button>
        </Title>
      </Column>
      <Column>
        <Row>Complete 5 repetitions of semioccluded voice exercises.</Row>
        <CheckboxRow>
          <HeartCheckboxForArrayIndex
            checked={sO1}
            property="semioccluded"
            index={0}
            onToggle={onToggleBooleanArrayIndex}
          />
          <HeartCheckboxForArrayIndex
            checked={sO2}
            property="semioccluded"
            index={1}
            onToggle={onToggleBooleanArrayIndex}
          />
          <HeartCheckboxForArrayIndex
            checked={sO3}
            property="semioccluded"
            index={2}
            onToggle={onToggleBooleanArrayIndex}
          />
          <HeartCheckboxForArrayIndex
            checked={sO4}
            property="semioccluded"
            index={3}
            onToggle={onToggleBooleanArrayIndex}
          />
          <HeartCheckboxForArrayIndex
            checked={sO5}
            property="semioccluded"
            index={4}
            onToggle={onToggleBooleanArrayIndex}
          />
        </CheckboxRow>
      </Column>
      <Column>
        <Row>Sustained “ee” at target pitch 5 times</Row>
        <CheckboxRow>
          <HeartCheckboxForArrayIndex
            checked={sP1}
            property="sustainedPitch"
            index={0}
            onToggle={onToggleBooleanArrayIndex}
          />
          <HeartCheckboxForArrayIndex
            checked={sP2}
            property="sustainedPitch"
            index={1}
            onToggle={onToggleBooleanArrayIndex}
          />
          <HeartCheckboxForArrayIndex
            checked={sP3}
            property="sustainedPitch"
            index={2}
            onToggle={onToggleBooleanArrayIndex}
          />
          <HeartCheckboxForArrayIndex
            checked={sP4}
            property="sustainedPitch"
            index={3}
            onToggle={onToggleBooleanArrayIndex}
          />
          <HeartCheckboxForArrayIndex
            checked={sP5}
            property="sustainedPitch"
            index={4}
            onToggle={onToggleBooleanArrayIndex}
          />
        </CheckboxRow>
      </Column>
      <Column>
        <Row>
          Read functional phrases with target speaking fundamental frequency and intonation X3 using target pitch from
          #2
        </Row>
        <CheckboxRow>
          <HeartCheckboxForArrayIndex
            checked={fP1}
            property="functionalPhrases"
            index={0}
            onToggle={onToggleBooleanArrayIndex}
          />
          <HeartCheckboxForArrayIndex
            checked={fP2}
            property="functionalPhrases"
            index={1}
            onToggle={onToggleBooleanArrayIndex}
          />
          <HeartCheckboxForArrayIndex
            checked={fP3}
            property="functionalPhrases"
            index={2}
            onToggle={onToggleBooleanArrayIndex}
          />
        </CheckboxRow>
      </Column>
      <Column>
        <Row>Carryover task</Row>
        <CheckboxRow>
          <HeartCheckboxBase checked={carryoverComplete} onClick={onToggleCarryoverComplete} />
          <QuoteInput type="text" value={carryoverQuote} onChange={onCarryoverQuoteChange} />
        </CheckboxRow>
      </Column>
      <Column>
        <Row>Notes</Row>
        <Row>
          <textarea value={notes} cols={100} rows={15} onChange={onNotesChange} />
        </Row>
      </Column>
    </Column>
  );
};
