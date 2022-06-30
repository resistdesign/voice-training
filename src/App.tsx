import React, { FC } from 'react';
import { Column, Row } from './Layout';

export const App: FC = () => {
  return (
    <Column>
      <Row>Voice Training</Row>
      <Column>
        <Row>Complete 5 repetitions of semioccluded voice exercises.</Row>
        <Row>
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
        </Row>
      </Column>
      <Column>
        <Row>Sustained “ee” at target pitch 5 times</Row>
        <Row>
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
        </Row>
      </Column>
      <Column>
        <Row>
          Read functional phrases with target speaking fundamental frequency and intonation X3 using target pitch from
          #2
        </Row>
        <Row>
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
        </Row>
      </Column>
      <Column>
        <Row>Carryover task</Row>
        <Row>
          <input type="checkbox" />
          <input type="text" />
        </Row>
      </Column>
    </Column>
  );
};
