

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