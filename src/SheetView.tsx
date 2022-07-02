import React, { FC } from 'react';
import { Base, Column, Row } from './Layout';
// @ts-ignore
import GreyHeartIcon from 'url:./Assets/Graphics/Icons/grey-heart.svg';
// @ts-ignore
import HeartIcon from 'url:./Assets/Graphics/Icons/heart.svg';
import styled from 'styled-components';
import { Sheet } from './Types';

const Title = styled(Row)`
  font-size: 1.5em;
`;
const HeartCheckbox = styled(Base)<{ checked?: boolean }>`
  background: url('${(p) => (p.checked ? HeartIcon : GreyHeartIcon)}');
  width: 2em;
  height: 2em;
  cursor: pointer;
`;
const CheckboxRow = styled(Row)`
  gap: 0.5em;
`;

export type SheetViewProps = {
  sheet: Sheet;
};

export const SheetView: FC<SheetViewProps> = ({ sheet }) => {
  const {
    name,
    semioccluded: [sO1, sO2, sO3, sO4, sO5],
    sustainedPitch: [sP1, sP2, sP3, sP4, sP5],
    functionalPhrases: [fP1, fP2, fP3],
    carryover: { complete: carryoverComplete, quote: carryoverQuote },
    notes,
  } = sheet;

  return (
    <Column>
      <Column>
        <Title>{name}</Title>
      </Column>
      <Column>
        <Row>Complete 5 repetitions of semioccluded voice exercises.</Row>
        <CheckboxRow>
          <HeartCheckbox />
          <HeartCheckbox />
          <HeartCheckbox />
          <HeartCheckbox />
          <HeartCheckbox />
        </CheckboxRow>
      </Column>
      <Column>
        <Row>Sustained “ee” at target pitch 5 times</Row>
        <CheckboxRow>
          <HeartCheckbox />
          <HeartCheckbox />
          <HeartCheckbox />
          <HeartCheckbox />
          <HeartCheckbox />
        </CheckboxRow>
      </Column>
      <Column>
        <Row>
          Read functional phrases with target speaking fundamental frequency and intonation X3 using target pitch from
          #2
        </Row>
        <CheckboxRow>
          <HeartCheckbox />
          <HeartCheckbox />
          <HeartCheckbox />
        </CheckboxRow>
      </Column>
      <Column>
        <Row>Carryover task</Row>
        <CheckboxRow>
          <HeartCheckbox />
          <input type="text" />
        </CheckboxRow>
      </Column>
    </Column>
  );
};
