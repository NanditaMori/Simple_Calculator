import React from 'react';
import './Display.css';

type Props = {
  expression: string;
  result: string;
};

const Display: React.FC<Props> = ({ expression, result }) => (
  <div className="display">
    <div className="expression" title={expression}>
      {expression || '0'}
    </div>
    <div className="result" title={result}>
      {result}
    </div>
  </div>
);

export default Display;
