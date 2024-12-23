
//a class for die with 6 sides
class Die {
    constructor({twoHanded = false} = {}) {
        this.sides = 6;
        if (twoHanded) {
            this.duelOutcomes = [1, 1, 2, 3, 4, 6]; //-1 on duel roll
        } else {
            this.duelOutcomes = [1, 2, 3, 4, 5, 6];
        }
        if (twoHanded) {
            this.woundOutcomes = [2, 3, 4, 5, 6, 6]; //+1 on wounding roll // No, we're gonna rework this to just add 1 to the roll capped at 6
        } else {
            this.woundOutcomes = [1, 2, 3, 4, 5, 6];
        }
    }
}

//a class for a set of dice

class diceTray {
    constructor() {
        this.playerDice = 0;
        this.opponentDice = 0;
        this.playerArrayForDice =[];
        this.opponentArrayForDice =[];
        this.diceColors = [];
    }

    addColor() {
        this.diceColors.push(new thisColorIs());
    }

    dropColor(index) {
        if (index >= 0 && index < this.diceColors.length) {
            this.diceColors.splice(index, 1); // Remove one element at the specified index
        } else {
            console.log('Index out of range');
        }
    }
}

class thisColorIs { 
        constructor() {
            this.playerArrayForDiceColor =[];
            this.opponentArrayForDiceColor =[];
        }
        grabDie(player=true, { twoHanded = false }={}) { //may want to write this to construct a parameters dict from some list
            if (player) {
                this.playerDice++;
                if (twoHanded) {
                    this.playerArrayForDiceColor.push(new Die({twoHanded: true}));
                }
                else {
                    this.playerArrayForDiceColor.push(new Die());
                }
            }
            else {
                this.opponentDice++;
                if (twoHanded) {
                    this.opponentArrayForDiceColor.push(new Die({twoHanded: true}));
                }
                else {
                    this.opponentArrayForDiceColor.push(new Die());
                }
            }
        }

        dropDie(player=true) { 
            if (player) {
                this.playerDice--;
                this.playerArrayForDiceColor.pop();
            }
            else {
                this.opponentDice--;
                this.opponentArrayForDiceColor.pop();
            }
        }

        closeFist(player=true) {
            if (player) {
                    this.playerArrayForDiceColor.forEach(die => die.duelOutcomes = [1, 1, 2, 3, 4, 6]);
                    }
            else {
                    
                    }
            }
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
    console.log('playerDiceCount:', playerDiceCount);
    console.log('results:', results);
    console.log('playerHasFight:', playerHasFight);
    console.log('tiedFight:', tiedFight);

    let victories = 0;
    let outcomes = results.length;
    for (let x = 0; x < results.length; x++) {
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
    console.log('victories:', victories);
    console.log('outcomes:', outcomes);
    return victories / outcomes;
}