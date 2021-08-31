
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
        // display unit stats
        console.log(`name: ${this.name}\n cost: ${this.cost}\n power: ${this.power}\n res: ${this.res}`)
    }
}

class Effect extends Card {
    constructor(name, cost, magnitude, stat) {
        super(name, cost);
        this.magnitude = magnitude;
        this.stat = stat;
    }

    text() {
        // print text of effect
        if (this.magnitude > 0) {
            console.log(`Increase targets ${this.stat} by ${this.magnitude}`);
        } else {
            console.log(`Decrease target's ${this.stat} by ${this.magnitude}`);
        }
    }

    stats() {
        // display effect stats
        console.log([this.name, this.cost, this.magnitude, this.stat]);
    }

    play(target) {
        // can only target units
        if(target instanceof Unit) {
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
            throw new Error("Target must be a unit!");
        }
    }
}

// create red_ninja and apply hard algo to ninja
let red_ninja = new Unit("Red Belt Ninja", 3, 3, 4);
let hard_algo = new Effect("Hard Algorithm", 2, 3, "power");
hard_algo.play(red_ninja);

// create black_ninja and apply uh_promise
let black_ninja = new Unit("Black Belt Ninja", 4, 5, 4);
let uh_promise = new Effect("Unhandled Promise Rejection", 1, -2, "resilience");
uh_promise.play(red_ninja);

// create pair_programming effect and play it on red_ninja
let pair_programming = new Effect("Pair Programming", 3, 2, "power");
pair_programming.play(red_ninja);

// red_ninja attacks black_ninja
red_ninja.attack(black_ninja);

// show both units' stats
red_ninja.stats();
black_ninja.stats();