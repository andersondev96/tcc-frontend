import React, { useState } from 'react';

import { Container, InputRange, Legend } from './styles';

export const Range: React.FC = () => {
  const [valueType, setValueType] = useState(0);

  return (
  <Container>
    <InputRange
      type="range"
      max="10000"
      step="10"
      onChange={(e) => setValueType(Number(e.target.value))}
    />
    <Legend>{ valueType ? valueType : ''}</Legend>
  </Container>
);
}
