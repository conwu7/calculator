import style from './calculator.module.scss';
import { MdKeyboardBackspace, MdExpandMore, MdDone } from 'react-icons/md';
import { useEffect, useState, useCallback } from 'react';
import CollapsibleCard from "./collapsible-card";

function Calculator() {
    const [currentNumberString, setCurrentNumberString] = useState("0");
    const [previousNumber, setPreviousNumber] = useState(null);
    const [previousDisplay, setPreviousDisplay] = useState("");
    const [currentOperator, setCurrentOperator] = useState(null);
    const [isOperatorActive, setOperatorStatus] = useState(false);
    const [currentNumberIsResult, setCurrentNumberAsResult] = useState(false);
    const [hasError, setErrorStatus] = useState(false);
    const [pastResults, setPastResults] = useState([]);
    const [moreButtonExpanded, setMoreButtonStatus] = useState(false);
    const inputFieldID = "pastedNumberField";
    // get past results from local storage
    useEffect(() => {
        setPastResults(JSON.parse(localStorage.getItem('calculatorPastResults')) || []);
    }, [])
    // on mobile set height to fullscreen. Doesn't always apply to device width > 800 due to max height set.
    useEffect(() => {
        setAppHeight();
    }, []);
    // used directly on previous expression/current number displayed on dom.
    // add thousand separators
    const formatForDisplay = useCallback( (str) => {
        // max digits for numbers displayed to user
        const maxDigits = {style:'decimal', maximumFractionDigits: 10, maximumSignificantDigits: 14};
        if (isNaN(Number(str))) return str;
        if (str === null) return str;
        // don't remove dot for decimal
        if (str.toString().slice(-1) === '.') {
            return `${Number(str.slice(0,-1)).toLocaleString()}.`
        }
        // don't remove zeros after a decimal
        if (str.toString().slice(-1) === "0" && str.toString().includes('.')) {
            console.log(str);
            const strArray = str.split('.');
            return `${strArray[0].toLocaleString()}.${strArray[1]}`
        }
        return Number(str).toLocaleString('en-US', maxDigits);
    }, [])
    // format current number for display - if current number is null, use previous number
    const formatCurrentNumberDisplayed = useCallback( (str) => {
        if (str === null) {return formatForDisplay(previousNumber)}
        return formatForDisplay(str);
    }, [formatForDisplay, previousNumber])
    // add new result to past results array. mutate where necessary
    const handlePastResults = useCallback( function (newResult) {
        let newArray = [...pastResults];
        if (pastResults.length >= 5) newArray.pop();
        newArray.unshift(newResult);
        setPastResults(newArray);
        localStorage.setItem('calculatorPastResults', JSON.stringify(newArray));
    }, [pastResults])
    // clear past results
    const handleClearPastResults = () => {
        setPastResults([]);
        localStorage.setItem('calculatorPastResults', JSON.stringify([]));
    }
    // function to handle selecting a past result - set it to current number string
    const handleUsePastResult = useCallback( function (pastResult, noLimit) {
        return () => {
            const resultToUse = pastResult.replace(/,/g, '');
            if (isNaN(Number(resultToUse))) return window.alert(pastResult + ' is not a valid number');
            if (resultToUse.length > 14 && !noLimit) return window.alert(`Number is too big - 14 digits max (${resultToUse.length})`);
            if (hasError) reset();
            else if (previousNumber) setPreviousDisplay(formatForDisplay(previousNumber));
            setCurrentNumberAsResult(false);
            if (isOperatorActive) {
                setOperatorStatus(false);
                if (currentOperator === '=') {
                    setPreviousDisplay("");
                    setPreviousNumber(null);
                    setCurrentOperator(null);
                }
            }
            setCurrentNumberString(resultToUse);
            setMoreButtonStatus(false);
        }
    }, [currentOperator, formatForDisplay, hasError, isOperatorActive, previousNumber])
    // function to handle pasted numbers
    const handlePastedNumber = useCallback(function (e) {
        e.preventDefault();
        const value = document.getElementById(inputFieldID).value;
        if (value === "") return
        handleUsePastResult(value)();
        document.activeElement.blur(); // remove focus from input so further keyboard presses are not sent to the text field
    }, [handleUsePastResult])
    // function to prevent erroneous entries when focus is on a button
    const preventClickEventOnKeyDown = (e) => e.preventDefault();
    // function to handle number clicks
    const handleNumbers = useCallback(
        (number) => {
            return (e) => {
                if (hasError) return;
                // if operator isn't active, you're not adding to the current number string
                if (numberTooBig(currentNumberString) && !isOperatorActive) return;
                if (currentNumberString && currentNumberString.includes('.') && number === '.') return
                if (previousNumber) setPreviousDisplay(formatForDisplay(previousNumber));
                setCurrentNumberAsResult(false);
                if (isOperatorActive) {
                    setOperatorStatus(false);
                    setCurrentNumberString(number.toString());
                    if (currentOperator === '=') {
                        setPreviousDisplay("");
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
            switch (currentNumberString) {
                case '-' :
                case '.' :
                case '-.' : {
                    return
                }
                default : break
            }
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
                    setPreviousDisplay(formatForDisplay(previousNumber));
                } else {
                    setPreviousDisplay(
                        `${formatForDisplay(previousNumber)} ${currentOperator} ${formatForDisplay(currentNumberString)}`
                    );
                }
                // if number is too big or small, set error status
                if (!isFinite(result) || isNaN(result)) {
                    setErrorStatus(true);
                    setCurrentNumberString("ERROR, CLEAR");
                    return
                }
                if (result > 999999999999999 || result < -999999999999999) {
                    setErrorStatus(true);
                    setCurrentNumberString("TOO LONG, CLEAR");
                    return
                }
                if (`${result}`.includes('e')) {
                    result = result.toFixed(12);
                }
                // set current number to null. prevent further operations until another number is selected
                // set previous to result. Setting previous number here since user can't mutate result directly
                setCurrentNumberString(null);
                setCurrentNumberAsResult(true);
                handlePastResults(formatForDisplay(result));
                setPreviousNumber(formatForDisplay(result).replace(/,/g,''));
            }
            // if no calculation is done, set the current operator and the previous number as the current number displayed
            setCurrentOperator(operator);
            if (typeof result === 'undefined' && currentNumberString) {
                setPreviousNumber(Number(currentNumberString));
                setCurrentNumberString(null);
            }
        }
    }, [
        currentNumberString, currentOperator, formatForDisplay,
        hasError, previousNumber, handlePastResults
    ])
    // function to remove last user entry
    const removeLastEntry  = useCallback( function () {
        if (currentNumberIsResult || isOperatorActive || hasError) return;
        const currentLength = currentNumberString.length;
        if (currentLength <= 1) return setCurrentNumberString("0");
        setCurrentNumberString(currentNumberString.slice(0, currentLength-1));
    }, [currentNumberString, currentNumberIsResult, hasError, isOperatorActive])
    // function to handle key presses
    const handleKeyUp = useCallback(
        (e) => {
            e.preventDefault();
            if (e.target.id === inputFieldID) return
            if (e.key >= 0 && e.key <= 9) {
                return handleNumbers((e.key))();
            }
            if (['*', '-', '/', '+', '=', '^'].includes(e.key)) {
                return handleOperators(e.key)();
            }
            switch (e.key) {
                case '.' : {
                    handleNumbers('.')();
                    break
                }
                case 'Backspace' : {
                    removeLastEntry();
                    break;
                }
                case 'Escape' : {
                    reset();
                    break
                }
                case 'Enter' : {
                    handleOperators('=')();
                    break
                }
                default : {
                    break
                }
            }
        }, [handleNumbers, handleOperators, removeLastEntry]
    )
    // add event listeners for keyboard - remove on unmount
    useEffect(() => {
        function scrollToTop () {
            document.body.scrollTop = 0;
            window.scrollTop = 0;
            document.body.scrollTo(0, 0);
            window.scrollTo(0, 0);
        }
        scrollToTop();
        document.getElementById(inputFieldID)
            .addEventListener('focusout', scrollToTop);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            document.getElementById(inputFieldID)
                .removeEventListener('focusout', scrollToTop);
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, [handleKeyUp]);
    // window resizing listener
    window.onresize = setAppHeight;
    function setAppHeight () {
        const containerEl = document.getElementsByClassName(`${style.container}`)[0];
        const newHeight = window.navigator.standalone ? window.innerHeight - 40 : window.innerHeight;
        containerEl.style.height = `${newHeight}px`;
    }
    // function to handle negative toggle
    function handleNegativeToggle () {
        if (hasError) return
        // using the toggle right after an operation
        if (currentNumberIsResult || isOperatorActive) {
            setCurrentNumberAsResult(false);
            setPreviousDisplay("");
            if (currentOperator === '=') {
                setOperatorStatus(false);
                setCurrentOperator(null);
                setCurrentNumberString(`${-1 * previousNumber}`);
                setPreviousNumber(null);
                return
            } else {
                setPreviousNumber(previousNumber * -1);
                return
            }
        }
        if (currentNumberString[0] === '-') setCurrentNumberString(currentNumberString.slice(1));
        else setCurrentNumberString(`-${currentNumberString}`);
    }
    // function for Clear - Reset
    function reset () {
        setCurrentNumberString("0");
        setCurrentNumberAsResult(false);
        setPreviousNumber(null);
        setCurrentOperator(null);
        setPreviousDisplay(null);
        setErrorStatus(false);
    }
    // all buttons in order (order is important)
    const buttons = [
        ["Clr", "operator", 'clear', reset],
        [<MdKeyboardBackspace />, 'operator', "backspace", removeLastEntry],
        [<>y<sup>a</sup></>, 'operator', 'powerOf', handleOperators('^')],
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
        return length >= 13;
    }
    // toggle past results container
    // status is optional - default is opposite of current status
    function toggleMoreOptions (newStatus) {
        if (newStatus && newStatus === 'collapse') return setMoreButtonStatus(false);
        setMoreButtonStatus(!moreButtonExpanded);
    }
    return (
        <div className="App" id="App">
          <div className={style.container}>
              <div className={style.displayContainer}>
                  <div className={style.operatorAndPreviousExpression}>
                      <span className={style.previousExpressionDisplay}>{previousDisplay}</span>
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
              <div className={style.moreOptionsContainer}>
                  <CollapsibleCard
                      cardHeader=
                          {
                              <button
                                  type="button"
                                  onKeyDown={preventClickEventOnKeyDown}
                                  onClick={toggleMoreOptions}
                                  tabIndex="-1"
                                  className={`${style.moreButton} ${moreButtonExpanded?style.expanded:""}`}
                              >
                                  <MdExpandMore />
                              </button>
                          }
                      wrapperClassName={style.optionsWrapper}
                      isCollapsed={!moreButtonExpanded}
                      toggleCollapse={toggleMoreOptions}
                      hideOnFocusLost={false}
                      disableHeaderButton={true}
                      >
                      <div className={style.optionsContainer}>
                          <div>
                              <form
                                  onSubmit={handlePastedNumber}
                                  className={style.pasteContainer}>
                                  <input
                                      className={style.pasteNumberField}
                                      id={inputFieldID}
                                      type="text"
                                      placeholder="Paste a number"
                                  />
                                  <button
                                      type="submit"
                                      className={style.applyPastedNumber}
                                      tabIndex="-1"
                                  >
                                    <MdDone />
                                  </button>

                              </form>
                              {
                                  pastResults.length === 0 ?
                                  <span className={style.pastResultsHeader}>NO RESULTS</span> :
                                  <span className={style.pastResultsHeader}>PAST RESULTS</span>
                              }
                              {
                                  pastResults.map((result, index) => (
                                      <button
                                          type="button"
                                          key={index}
                                          className={style.pastResult}
                                          onKeyDown={preventClickEventOnKeyDown}
                                          onClick={handleUsePastResult(result, true)}
                                          tabIndex="-1"
                                      >
                                          {result}
                                      </button>
                                  ))
                              }
                              {
                                  pastResults.length > 0 &&
                                      <button
                                          type="button"
                                          className={style.clearPastResults}
                                          onKeyDown={preventClickEventOnKeyDown}
                                          onClick={handleClearPastResults}
                                          tabIndex="-1"
                                      >
                                          Clear All Results
                                      </button>
                              }
                          </div>
                      </div>
                  </CollapsibleCard>

              </div>
              <div className={style.buttonContainer}>
              {
                  buttons.map(button => (
                      <button
                          type="button"
                          key={button[2]}
                          onKeyDown={preventClickEventOnKeyDown}
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
