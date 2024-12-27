//a class for die with 6 sides
class Die {
    constructor({twoHanded = false, rerollones = false} = {}) {

        this.currentoutcome = [1, 2, 3, 4, 5, 6];
        this.sides = 6;
        this.max = 6;
        this.min = 1;
        this.baseoutcome = [1, 2, 3, 4, 5, 6]; //you may eventually want to modify this to be changed in place for saving the dice for wounding
        this.twoHanded = twoHanded;
        this.rerollones = rerollones;

    }
       Result() {
            let returnArray = this.baseoutcome;
            //Natural Result Rerolls
            if (this.rerollones) {
                returnArray = [1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]; 
                }
            
            //Plus-Minus Modifiers 
            if (this.twoHanded) {
                returnArray.forEach((face, index, die) => {
                    die[index] = (face==1 || face== 6) ? face : face-1;
                });
            
            }

            this.currentoutcome = returnArray;
            return returnArray;

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

const parentElement = document.getElementById('myTab');
const tabCount = parentElement.querySelectorAll('.nav-item');
const tabElements = document.querySelectorAll('.tab-pane');
const orderContainer = document.querySelectorAll('[id^="orderContainer"]');
const addItemBtn = document.querySelectorAll('[id^="addItemBtn"]');

for (let i=0; i<tabCount.length; i++) {
    document.addEventListener('DOMContentLoaded', () => {

        addItemBtn[i].addEventListener('click', () => {
            const itemId = `diceColor-${Date.now()}`;
            const itemHtml = `
                <div class="card mt-3" id="${itemId}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            
                            <div class="input-group ml-3">
                                <div class="input-group-prepend">
                                    <button class="btn btn-secondary" type="button" onclick="changeItemCount('counter-${itemId}', -1)">-</button>
                                </div>
                                <input type="text" id="counter-${itemId}" class="form-control text-center" value="0">
                                <div class="input-group-append">
                                    <button class="btn btn-secondary" type="button" onclick="changeItemCount('counter-${itemId}', 1)">+</button>
                                </div>
                            </div>
                            <button class="btn btn-danger ml-3" type="button" onclick="removeItem('${itemId}')">Remove</button>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="form-check form-check-inline ml-3">
                            <input class="form-check-input" type="checkbox" id="2h-${itemId}" data-modifier-type="twoHanded">
                            <label class="form-check-label" for="2h-${itemId}">Two-Handing</label>
                            
                        </div>
                        <div class="form-check form-check-inline ml-3">
                            <input class="form-check-input" type="checkbox" id="rr1-${itemId}" data-modifier-type="rerollones">
                            <label class="form-check-label" for="rr1-${itemId}">Rerolling Ones</label>
                        </div>
                    </div>


                </div>
            `;
            orderContainer[i].insertAdjacentHTML('beforeend', itemHtml);
        });
    });

}

function removeItem(itemId) {
    const itemElement = document.getElementById(itemId);
    itemElement.remove();
}

function changeItemCount(itemId, change) {
    const itemElement = document.getElementById(itemId);
    let currentCount = parseInt(itemElement.value, 10);
    currentCount += change;
    if (currentCount < 0) currentCount = 0;
    itemElement.value = currentCount;

}