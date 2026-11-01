import { useState } from "react";

type Props = {
  onClose: () => void;
};

export default function CalcApp({ onClose }: Props) {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [equation, setEquation] = useState("");

  function handleDigit(digit: string) {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" || display === "Error: Div by 0" ? digit : display + digit);
    }
  }

  function handleDecimal() {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }

  function handleClear() {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setEquation("");
  }

  function handleBackspace() {
    if (waitingForOperand || display === "Error: Div by 0") {
      return;
    }
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  }

  function calculate(a: number, b: number, op: string): { result: number | null; error?: string } {
    switch (op) {
      case "+":
        return { result: a + b };
      case "-":
        return { result: a - b };
      case "×":
        return { result: a * b };
      case "÷":
        if (b === 0) return { result: null, error: "Error: Div by 0" };
        return { result: a / b };
      default:
        return { result: b };
    }
  }

  function handleOperator(nextOperator: string) {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setEquation(`${inputValue} ${nextOperator}`);
    } else if (operator) {
      const calc = calculate(previousValue, inputValue, operator);
      if (calc.error) {
        setDisplay(calc.error);
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
        setEquation("");
        return;
      }
      const newResult = calc.result ?? 0;
      // Round to 10 decimal places to prevent floating point imprecision
      const cleanResult = Math.round(newResult * 1e10) / 1e10;
      setDisplay(String(cleanResult));
      setPreviousValue(cleanResult);
      setEquation(`${cleanResult} ${nextOperator}`);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  }

  function handleEquals() {
    if (operator === null || previousValue === null) {
      return;
    }

    const inputValue = parseFloat(display);
    const calc = calculate(previousValue, inputValue, operator);

    if (calc.error) {
      setDisplay(calc.error);
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true);
      setEquation("");
      return;
    }

    const newResult = calc.result ?? 0;
    const cleanResult = Math.round(newResult * 1e10) / 1e10;
    setEquation(`${previousValue} ${operator} ${inputValue} =`);
    setDisplay(String(cleanResult));
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  }

  return (
    <section className="vt-location-flow vt-second-desktop vt-calc-app" aria-label="Calculator">
      <div className="vt-second-topbar">
        <strong>VEILTRACE // CALC — SYSTEM CALCULATOR</strong>
        <button type="button" onClick={onClose} className="vt-btn-return">
          Return ✕
        </button>
      </div>

      <div className="vt-calc-workspace">
        <div className="vt-calculator-case">
          {/* Header Bar */}
          <div className="vt-calc-brand">
            <span>VT-CALC // SEC-SYS-08</span>
            <span className="vt-calc-status-indicator" />
          </div>

          {/* Screen / Display */}
          <div className="vt-calc-display-wrap">
            <div className="vt-calc-equation">{equation || " "}</div>
            <div className="vt-calc-main-display" role="textbox" aria-label="Calculator screen" aria-live="polite">
              {display}
            </div>
          </div>

          {/* Keypad Grid */}
          <div className="vt-calc-keypad">
            <button type="button" className="vt-calc-btn vt-btn--fn" onClick={handleClear} aria-label="Clear">
              C
            </button>
            <button type="button" className="vt-calc-btn vt-btn--fn" onClick={handleBackspace} aria-label="Backspace">
              ⌫
            </button>
            <button
              type="button"
              className="vt-calc-btn vt-btn--fn"
              onClick={() => {
                const val = parseFloat(display);
                if (!isNaN(val)) setDisplay(String(-val));
              }}
              aria-label="Negate"
            >
              ±
            </button>
            <button type="button" className="vt-calc-btn vt-btn--op" onClick={() => handleOperator("÷")} aria-label="Divide">
              ÷
            </button>

            <button type="button" className="vt-calc-btn vt-btn--num" onClick={() => handleDigit("7")}>7</button>
            <button type="button" className="vt-calc-btn vt-btn--num" onClick={() => handleDigit("8")}>8</button>
            <button type="button" className="vt-calc-btn vt-btn--num" onClick={() => handleDigit("9")}>9</button>
            <button type="button" className="vt-calc-btn vt-btn--op" onClick={() => handleOperator("×")} aria-label="Multiply">
              ×
            </button>

            <button type="button" className="vt-calc-btn vt-btn--num" onClick={() => handleDigit("4")}>4</button>
            <button type="button" className="vt-calc-btn vt-btn--num" onClick={() => handleDigit("5")}>5</button>
            <button type="button" className="vt-calc-btn vt-btn--num" onClick={() => handleDigit("6")}>6</button>
            <button type="button" className="vt-calc-btn vt-btn--op" onClick={() => handleOperator("-")} aria-label="Subtract">
              −
            </button>

            <button type="button" className="vt-calc-btn vt-btn--num" onClick={() => handleDigit("1")}>1</button>
            <button type="button" className="vt-calc-btn vt-btn--num" onClick={() => handleDigit("2")}>2</button>
            <button type="button" className="vt-calc-btn vt-btn--num" onClick={() => handleDigit("3")}>3</button>
            <button type="button" className="vt-calc-btn vt-btn--op" onClick={() => handleOperator("+")} aria-label="Add">
              +
            </button>

            <button type="button" className="vt-calc-btn vt-btn--num vt-btn--zero" onClick={() => handleDigit("0")}>
              0
            </button>
            <button type="button" className="vt-calc-btn vt-btn--num" onClick={handleDecimal} aria-label="Decimal point">
              .
            </button>
            <button type="button" className="vt-calc-btn vt-btn--equals" onClick={handleEquals} aria-label="Equals">
              =
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
