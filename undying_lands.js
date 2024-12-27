//Holds functions for grabbig values and performing calculations
function createDiceArrays(player) {
    let diceArray = [];
    let diceParameters = [];
    let targetDiv = document.getElementById('orderContainerPlayer');
    if (player==false) {
        targetDiv = document.getElementById('orderContainerOpponent');
    }
    let diceColors = targetDiv.querySelectorAll('[id^="diceColor-"]');
    console.log('diceColors', diceColors);
    for (let i = 0; i < diceColors.length; i++) { //bakes in assumption they're only ever be one inputField for each "dice color"
        let diceParametersForThisColor = {};
        let inputField = diceColors[i].querySelectorAll('[id^="counter-"]');
        let modifiers = diceColors[i].querySelectorAll('.form-check-input:checked'); //Will need a method for handling multiple modifiers
        let diceCount = inputField[0].value;
        
        //Code for building dice parameters set
        
        for (let j = 0; j < modifiers.length; j++) {
            let modifier = modifiers[j].getAttribute('data-modifier-type');
            diceParametersForThisColor[modifier] = true;
        }
        
        
        for (let j = 0; j < diceCount; j++) {
            diceArray.push(new Die(diceParametersForThisColor));
        }
    }
    diceArray.forEach((element, index, array) => array[index] = element.Result())
    return diceArray;
}


// creates all possible arrays of outcomes - Copilot helped with this
function generateCombinations(arrays) {
    if (!Array.isArray(arrays) || arrays.some(arr => !Array.isArray(arr))) {
        throw new TypeError('Input must be an array of arrays');
    }

    const results = [];

    const generate = (current, remaining) => {
        if (remaining.length === 0) {
            results.push(current);
            return;
        }

        const [first, ...rest] = remaining;
        for (const element of first) {
            generate([...current, element], rest);
        }
    };

    generate([], arrays);
    return results;
}

// Counts victories for the player
function countVictories({playerDiceCount, results, playerHasFight=false, tiedFight=true}) { //need to add elven blade

    let victories = 0;
    const outcomes = results.length;
    for (let x = 0; x < outcomes; x++) {
        let outcome = results[x];
        let playerOutcome = Math.max(...(outcome.slice(0, playerDiceCount)));
        let opponentOutcome = Math.max(...(outcome.slice(playerDiceCount)));

        if (playerHasFight) {
            if (playerOutcome >= opponentOutcome) {
                victories++;
                console.log('counting as having fight');
            }
        } else {
            if (playerOutcome > opponentOutcome) {
                victories++;
            }
            if (playerOutcome == opponentOutcome && tiedFight) {
                victories += 0.5;
            }
        }
    }
    return victories / outcomes;
}

function getFightValueState() {
    let difference = 0;
    const playerHasFightBaseDiv = document.getElementById('fightValueRadio');
    const playerHasFight = playerHasFightBaseDiv.querySelectorAll('.form-check-input:checked');
    for (let i = 0; i < playerHasFight.length; i++) {
        if (playerHasFight[i].checked)
            {
                difference = new Number(playerHasFight[i].getAttribute('data-numeric-value'));
            };
    }
    return difference;
}


function countVictoriesForAllDice() {
    let playerresults = createDiceArrays(true)
    let opponentResults = createDiceArrays(false);
    let allResults = playerresults.concat(opponentResults);
    let allCombinations = generateCombinations(allResults);

    const fightValueDifference = getFightValueState();
    const playerHasFight = fightValueDifference > 0 ? true : false;
    const tiedFight = fightValueDifference == 0 ? true : false;

    let victoryPercentage = countVictories({playerDiceCount: playerresults.length, results: allCombinations, playerHasFight: playerHasFight, tiedFight: tiedFight});
    document.getElementById('output').innerHTML = (100 * victoryPercentage).toFixed(2) + '%' + ' chance of winning';
    return ((100 * victoryPercentage).toFixed(2) + '%' + ' chance of winning');
    }