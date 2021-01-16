import style from './calculator.module.scss';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useEffect, useState, useCallback } from 'react';

function Calculator() {
    const [currentNumberString, setCurrentNumberString] = useState("0");
    const [previousNumber, setPreviousNumber] = useState(null);
    const [previousExpression, setPreviousExpression] = useState("");
    const [currentOperator, setCurrentOperator] = useState(null);
    const [isOperatorActive, setOperatorStatus] = useState(false);
    const [currentNumberIsResult, setCurrentNumberAsResult] = useState(false);
    const [hasError, setErrorStatus] = useState(false);


    // on mobile set height to fullscreen. Doesn't always apply to device width > 800 due to max height set.
    useEffect(() => {
        setAppHeight();

    }, []);
    const formatForDisplay = useCallback( (str) => {
        // max digits for numbers displayed to user
        const maxDigits = {style:'decimal', maximumFractionDigits: 10, maximumSignificantDigits: 14};
        if (isNaN(Number(str))) return str;
        return Number(str).toLocaleString('en-US', maxDigits);
    }, []
    )
    const formatCurrentNumberDisplayed = useCallback( (str) => {
        if (str === null) {return formatForDisplay(previousNumber)}
        return formatForDisplay(str);
    }, [formatForDisplay, previousNumber]
    )
    // properly handle javascript's in-precision with decimals
    const formatUnwieldyNumbers = useCallback( (value) => {
        // max digits for numbers displayed to user
        const maxDigits = {style:'decimal', maximumFractionDigits: 10, maximumSignificantDigits: 14};
        if (value.toString().includes('e')) {
            return Number.parseFloat(value).toPrecision(6);
        }
        return value.toLocaleString('en-US', maxDigits).replace(/,/g,'');
    }, []
    )
    // function to handle number clicks
    const handleNumbers = useCallback(
        (number) => {
            return () => {
                if (hasError) return;
                if (numberTooBig(currentNumberString) && !isOperatorActive) return;
                if (currentNumberString && currentNumberString.includes('.') && number === '.') return
                if (previousNumber) setPreviousExpression(formatForDisplay(previousNumber));
                setCurrentNumberAsResult(false);
                if (isOperatorActive) {
                    setOperatorStatus(false);
                    setCurrentNumberString(number.toString());
                    if (currentOperator === '=') {
                        setPreviousExpression("");
                        setPreviousNumber(null);
                        setCurrentOperator(null);
                    }
                } else if (number === '.') {
                    setCurrentNumberString(`${currentNumberString}${number}`);
                } else if (currentNumberString === "0" || !currentNumberString) {
                    setCurrentNumberString(number.toString());
                } else if (currentNumberString === "-0") {
                    setCurrentNumberString(`-${number.toString()}`);
                } else {
                    setCurrentNumberString(`${currentNumberString}${number}`);
                }
            }
        }, [currentNumberString, currentOperator, hasError, isOperatorActive, previousNumber, formatForDisplay]
    )
    // function to handle operator clicks
    const handleOperators = useCallback( (operator) => {
        return () => {
            if (hasError) return
            setOperatorStatus(true);
            // handle arithmetic if there is a previous number
            let result;
            if (previousNumber !== null && currentNumberString !== null && currentOperator) {
                switch (currentOperator) {
                    case '+' : {
                        result = Number(previousNumber) + Number(currentNumberString);
                        break
                    }
                    case '-' : {
                        result = Number(previousNumber) - Number(currentNumberString);
                        break
                    }
                    case '*' : {
                        result = Number(previousNumber) * Number(currentNumberString);
                        break
                    }
                    case '/' : {
                        result = Number(previousNumber) / Number(currentNumberString);
                        break
                    }
                    case '^' : {
                        result = Number(previousNumber) ** Number(currentNumberString);
                        break
                    }
                    case '=' : {
                        result = Number(previousNumber);
                        break
                    }
                    default : {
                        result = Number(previousNumber);
                    }
                }
                // After clicking an operator that does arithmetic - show the last expression. If = just show the last number
                if (currentOperator === '=') {
                    setPreviousExpression(formatForDisplay(previousNumber));
                } else {
                    setPreviousExpression(
                        `${formatForDisplay(previousNumber)} ${currentOperator} ${formatForDisplay(currentNumberString)}`
                    );
                }
                // if number is too big or small, set error status
                if (!isFinite(result) || isNaN(result)) {
                    setErrorStatus(true);
                    setCurrentNumberString("ERROR, CLEAR");
                    return
                }
                if (result > 99999999999999 || result < -99999999999999) {
                    setErrorStatus(true);
                    setCurrentNumberString("TOO LONG, CLEAR");
                    return
                }
                // set current number to null. prevent further operations until another number is selected
                // set previous to result. Setting previous number here since user can't mutate result directly
                setCurrentNumberString(null);
                setCurrentNumberAsResult(true);
                setPreviousNumber(formatUnwieldyNumbers(result));
            }
            // if no calculation is done, set the current operator and the previous number as the current number displayed
            setCurrentOperator(operator);
            if (!result && currentNumberString) {
                setPreviousNumber(Number(currentNumberString));
                setCurrentNumberString(null);
            }
        }
    }, [currentNumberString, currentOperator, formatForDisplay, formatUnwieldyNumbers, hasError, previousNumber]
    )
    // function to handle key presses
    const handleKeyUp = useCallback(
        (e) => {
            if (e.key >= 0 && e.key <= 9) {
                console.log(e.key);
                return handleNumbers((e.key))();
            }
            if (['*', '-', '/', '+', '='].includes(e.key)) {
                return handleOperators(e.key)();
            }
            console.log(e.key);
            switch (e.key) {
                case 'Escape' : {
                    reset();
                    break
                }
                case 'Enter' : {
                    handleOperators('=')();
                    break
                }
                default : {
                    console.log('Hey there!');
                }
            }
        }, [handleNumbers, handleOperators]
    )
    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);
        return () => window.removeEventListener('keyup', handleKeyUp)
    }, [handleKeyUp]);
    window.onresize = setAppHeight;
    function setAppHeight () {
        const containerEl = document.getElementsByClassName(`${style.container}`)[0];
        const newHeight = window.navigator.standalone === true ? window.innerHeight - 40 : window.innerHeight;
        containerEl.style.height = `${newHeight}px`;
    }
    // function to handle negative toggle
    function handleNegativeToggle () {
        if (hasError || isOperatorActive) return;
        if (currentNumberString[0] === '-') {
            setCurrentNumberString(currentNumberString.slice(1));
        } else {
            setCurrentNumberString(`-${currentNumberString}`);
        }
    }
    // function to remove last user entry
    function removeLastEntry () {
        if (currentNumberIsResult || isOperatorActive || hasError) return;
        const currentLength = currentNumberString.length;
        if (currentLength <= 1) return setCurrentNumberString("0");
        setCurrentNumberString(currentNumberString.slice(0, currentLength-1));
    }
    // function for Clear - Reset
    function reset () {
        setPreviousNumber(null);
        setCurrentOperator(null);
        setCurrentNumberString("0");
        setCurrentNumberAsResult(false);
        setPreviousExpression(null);
        setErrorStatus(false);
    }
    const buttons = [
        ["Clr", "operator", 'clear', reset],
        [<MdKeyboardBackspace />, 'operator', "backspace", removeLastEntry],
        [<>z<sup>a</sup></>, 'operator', 'powerOf', handleOperators('^')],
        ["÷", 'operator', 'divide', handleOperators('/')],
        ["7", 'regular', 'seven', handleNumbers(7)],
        ["8", 'regular', 'eight', handleNumbers(8)],
        ["9", 'regular', 'nine', handleNumbers(9)],
        ["×", 'operator', 'multiply', handleOperators('*')],
        ["4", 'regular', 'four', handleNumbers(4)],
        ["5", 'regular', 'five', handleNumbers(5)],
        ["6", 'regular', 'six', handleNumbers(6)],
        ["-", 'operator', 'subtract', handleOperators('-')],
        ["1", 'regular', 'one', handleNumbers(1)],
        ["2", 'regular', 'two', handleNumbers(2)],
        ["3", 'regular', 'three', handleNumbers(3)],
        ["+", 'operator', 'add', handleOperators('+')],
        ["0", 'regular', 'zero', handleNumbers(0)],
        [".", 'regular', 'dot', handleNumbers('.')],
        ["±", 'regular', 'plusMinus', handleNegativeToggle],
        ["=", 'operator', 'equals', handleOperators('=')],
    ];
    // check if a current number has more than 12 significant digits
    function numberTooBig (str) {
        if (str === null) return false;
        const numberStr = str.toString();
        let length = str.length;
        if (numberStr.includes('.')) length--;
        if (numberStr.includes('-')) length--;
        // note - this means 13 numbers are allowed since it's typically checking the current number
        return length >= 12;
    }
    return (
        <div className="App">
          <div className={style.container} id="kawa">
              <div className={style.displayContainer}>
                  <div className={style.operatorAndPreviousExpression}>
                      <span className={style.previousExpressionDisplay}>{previousExpression}</span>
                      <span className={style.currentOperatorDisplay}>{currentOperator}</span>
                  </div>
                  <span className={`${style.currentNumberDisplay} ${hasError?style.errorCurrentNumber:""}`}>
                       <span
                           className={style.answer}
                       >
                           {currentNumberIsResult ? "(Ans)" : ""}
                       </span>
                      {formatCurrentNumberDisplayed(currentNumberString)}
                  </span>
              </div>
              <div className={style.buttonContainer}>
              {
                  buttons.map(button => (
                      <button
                          key={button[2]}
                          onClick={button[3]}
                          className={`${style[button[1]]} ${style[button[2]]}`}
                          data-operator={button[2]}
                          tabIndex="-1"
                      >
                          <span>{(hasError && button[0] !=='Clr') ?"":button[0]}</span>
                      </button>
                  ))
              }
              </div>
            </div>
        </div>
  );
}

export default Calculator;
