// Note to self:
// Left off without testing Effect cards

class Card {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
    }
}

class Unit extends Card {
    constructor(name, cost, power, res) {
        super(name, cost);
        this.power = power;
        this.res = res;
    }
    attack( target ) {
        target.res -= this.power;
    }
    stats() {
        console.log([this.name, this.cost, this.power, this.res])
    }
}

class Effect extends Card {
    constructor(name, cost, magnitude, stat) {
        super(name, cost);
        this.magnitude = magnitude;
        this.stat = stat;
    }
    play( target ) {
        // can only target units
        if( target instanceof Unit ) {
            // if magnitude is positive
            if (this.magnitude > 0) {
                // determine stat to increase
                if (this.stat == "power") {
                    target.power += this.magnitude;
                } else {
                    target.res += this.magnitude;
                }
            } else {
                // determine stat to decrease
                if (this.stat == "resilience") {
                    target.res += this.magnitude;
                } else {
                    target.power += this.magnitude;
                }
            }
        } else {
            throw new Error( "Target must be a unit!" );
        }
    }
    text() {
        if (this.magnitude > 0) {
            console.log(`Increase targets ${this.stat} by ${this.magnitude}`);
        } else {
            console.log(`Decrease target's ${this.stat} by ${this.magnitude}`);
        }
    }
    stats() {
        console.log([this.name, this.cost, this.magnitude, this.stat]);
    }
}

let red_ninja = new Unit("Red Belt Ninja", 3, 3, 4);
let black_ninja = new Unit("Black Belt Ninja", 4, 5, 4);

let hard_algo = new Effect("Hard Algorithm", 2, -3, "power");
hard_algo.text();

red_ninja.stats();
hard_algo.play(red_ninja);
red_ninja.stats();