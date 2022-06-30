import styled from 'styled-components';

export const Base = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

export const FlexBase = styled(Base)`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Column = styled(FlexBase)`
  flex-direction: column;
  align-items: stretch;
`;

export const Row = styled(FlexBase)`
  flex-direction: row;
  align-items: center;
`;
