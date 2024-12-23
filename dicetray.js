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

//Adding buttons dynamically

document.addEventListener('DOMContentLoaded', () => {
    const orderContainer = document.getElementById('orderContainer');
    const addItemBtn = document.getElementById('addItemBtn');

    addItemBtn.addEventListener('click', () => {
        const itemId = `item-${Date.now()}`;
        const itemHtml = `
            <div class="card mt-3" id="${itemId}">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <input type="text" class="form-control" placeholder="Item Name">
                        <div class="input-group ml-3">
                            <div class="input-group-prepend">
                                <button class="btn btn-secondary" type="button" onclick="changeItemCount('${itemId}', -1)">-</button>
                            </div>
                            <input type="text" class="form-control text-center" value="0" readonly>
                            <div class="input-group-append">
                                <button class="btn btn-secondary" type="button" onclick="changeItemCount('${itemId}', 1)">+</button>
                            </div>
                        </div>
                        <button class="btn btn-danger ml-3" type="button" onclick="removeItem('${itemId}')">Remove</button>
                    </div>
                </div>
            </div>
        `;
        orderContainer.insertAdjacentHTML('beforeend', itemHtml);
    });
});

function removeItem(itemId) {
    const itemElement = document.getElementById(itemId);
    itemElement.remove();
}

function changeItemCount(itemId, change) {
    const itemElement = document.getElementById(itemId);
    const inputElement = itemElement.querySelector('input[type="text"]:not([readonly]) + input[readonly]');
    let currentCount = parseInt(inputElement.value, 10);
    currentCount += change;
    if (currentCount < 0) currentCount = 0;
    inputElement.value = currentCount;
}