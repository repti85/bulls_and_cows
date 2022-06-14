import React, { createRef } from "react";
import { useState, useEffect } from "react";
import ResultList from "./Components/ResultList";
import InfoBar from "./Components/InfoBar";

function App() {
   
    const stepData = {
        stepCount: 0,
        userNumber: '',
        bulls: 0,
        cows: 0,
        randomNumber: ''
    }

    const [value, setValue] = useState('');
    const [randomNumberSTR, setRandomNumberSTR] = useState('');
    const [stepsCount, setStepsCount] = useState(0);
    const [steps, setSteps] = useState([]);
    const [info, setInfo] = useState('')   
    const [disableBtnReset, setDisableBtnReset] = useState(true);
    const [disableBtnShot, setDisableBtnShot] = useState(false);   
    const input = React.createRef()
    const newGameBtn = React.createRef();

    function randomNumber() {
       
        const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const newArr = [];
        let temp = 9;
        for (let i = 1; i < 5; i++) {
            let random = Math.floor(Math.random() * temp);           
            newArr.push(arr[random])            
            arr.splice(random, 1);
            temp -= 1;           
        }
        setRandomNumberSTR(newArr.join(''));
    }
    useEffect(() => {
        randomNumber();        
    }, [])

    console.log(`randomNumber ${randomNumberSTR}`);
    let userNumber = value;
    console.log(`userNumber ${userNumber}`);
    stepData.userNumber = userNumber

    const check = () => {
       
        if ((parseInt(userNumber).toString()).length === 4) { //4-digit number check
            if (new Set(userNumber).size !== userNumber.length) { //repeated digits check
                setInfo('Цифры не должны повторяться')
            } else {
                setInfo('');
                calc()
            }
        } else {
            setInfo('Введите 4-значное число')
        }
    }

    const calc = () => {
       
        let bullsCount = 0;
        let cowsCount = 0;

        for (let i = 0; i < randomNumberSTR.length; i++) {
            if (randomNumberSTR[i] === userNumber[i]) {
                bullsCount += 1;
            }
            if (randomNumberSTR.indexOf(userNumber[i]) >= 0) {
                cowsCount += 1;
            }
        }

        if (bullsCount === 4) {
            setInfo('Congratulations!!! You are win :)')
            input.current.readOnly = true
            setDisableBtnReset(false);            
            setDisableBtnShot(true);

        }

        cowsCount = cowsCount - bullsCount;
        setStepsCount(stepsCount + 1)
        stepData.stepCount = stepsCount + 1;
        stepData.bulls = bullsCount;
        stepData.cows = cowsCount;
        stepData.randomNumber = randomNumberSTR;
        setSteps(steps => [stepData, ...steps]);
        setValue('');
        input.current.focus();
    }

    const reset = () => {
        setSteps([]);
        setStepsCount(0);
        setInfo('');
        setValue('');
        randomNumber();
        input.current.focus();
        input.current.readOnly = false
        setDisableBtnShot(false);
        setDisableBtnReset(true);        
    }
   
    return (
        <div className="container">
            <div className="title">
                <h1>Логическая игра <br/> "Быки и коровы"</h1>               
                <div>
                <h4>Правила игры</h4>
Компьютер задумывает четыре различные цифры из 0,1,2,...9. Игрок делает ходы, чтобы узнать эти цифры и их порядок.
Каждый ход состоит из четырёх цифр, 0 может стоять на первом месте.
В ответ компьютер показывает число отгаданных цифр, стоящих на своих местах (число быков) и число отгаданных цифр, стоящих не на своих местах (число коров).
<h4>Пример</h4>
Компьютер задумал 0834.
Игрок сделал ход 8134.
Компьютер ответил: 2 быка (цифры 3 и 4) и 1 корова (цифра 8).
                </div>
            </div>
            <div className="form">
                <input className="input" ref={input} autoFocus maxLength={4} value={value} onChange={(event) => setValue(event.target.value)} />
                <button disabled={disableBtnShot} onClick={check}>Сделать ход</button>
                <button ref={newGameBtn} disabled={disableBtnReset} onClick={reset}>Новая игра</button>
            </div>            
            <div>
                <InfoBar info={info} />
            </div>
            <div>
                <ResultList steps={steps} />
            </div>
        </div>
    );

}
export default App;

