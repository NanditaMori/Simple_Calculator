import React, { useState, useEffect } from 'react';
import Display from './Display';
import Button from './Button';
import './Calculator.css';



const buttonLabels: string[][] = [
  ['C', '⌫', '(', ')'],
  ['7', '8', '9', '÷'],
  ['4', '5', '6', '×'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
];

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Apply dark mode class to root element
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);


// Keyboard handling
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if ((key >= '0' && key <= '9') || key === '.' || key === '(' || key === ')') {
        append(key);
      } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === 'x') {
        const op = key === '*' ? '×' : key === '/' ? '÷' : key;
        append(op);
      } else if (key === 'Enter') {
        calculate();
      } else if (key === 'Backspace') {
        backspace();
      } else if (key === 'Escape') {
        clear();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
      window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const append = (value: string) => {
    setExpression(prev => prev + value);
  };

  const clear = () => {
    setExpression('');
    setResult('');
  };

  const backspace = () => {
    setExpression(prev => prev.slice(0, -1));
  };

  const calculate = () => {
    if (!expression) return;
    const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/');
    try {
      // eslint-disable-next-line no-new-func
      const evalResult = Function(`'use strict'; return (${sanitized})`)();
      const formatted = Number.isFinite(evalResult) ? evalResult.toString() : 'Error';
      setResult(formatted);
    } catch {
      setResult('Error');
    }
  };

  const handleButtonClick = (label: string) => {
    if (label === 'C') clear();
    else if (label === '⌫') backspace();
    else if (label === '=') calculate();
    else append(label);
  };

  return (
    <div className="calculator">
      <div className="toolbar">
        <button className="toggle" onClick={() => setDarkMode(d => !d)}>
          {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>
      <Display expression={expression} result={result} />
      <div className="grid">
        {buttonLabels.map((row, i) =>
          row.map(label => (
            <Button key={label + i} label={label} onClick={() => handleButtonClick(label)} />
          ))
        )}
      </div>
    </div>
  );
};

export default Calculator;
