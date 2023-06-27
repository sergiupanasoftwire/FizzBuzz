const prompt = require("prompt-sync")({ sigint: true});

class Rule {
    divider: number;
    name: string;

    constructor(divider: number, name: string) {
        this.divider = divider;
        this.name = name;
    }
}

const FIZZ: Rule = new Rule(3, "Fizz");
const BUZZ: Rule = new Rule(5, "Buzz");
const BANG: Rule = new Rule(7, "Bang");
const BONG: Rule= new Rule(11, "Bong");
const FEZZ: Rule = new Rule(13, "Fezz");
const REVERSE: Rule = new Rule(17, "Reverse");
const STANDARD_RULES: Array<Rule> = [FIZZ, BUZZ, BANG, BONG, FEZZ, REVERSE];
const INSERT_MAX_NUMBER_PROMPT: string = "Insert max number: ";
const INSERT_CUSTOM_RULE_DIVIDER_NUMBER_PROMPT: string = "Insert new rule's divider: ";
const INSERT_CUSTOM_RULE_NAME_PROMPT: string = "Insert new rule's name: ";
const INVALID_INPUT_PROMPT: string = "Invalid input.";

function fizzbuzz(): void {

    let maxNum: number | null = getUserInput(INSERT_MAX_NUMBER_PROMPT);

    while (maxNum === null) {
        console.log(INVALID_INPUT_PROMPT);
        maxNum = getUserInput(INSERT_MAX_NUMBER_PROMPT);
    }

    const rulesStatus: Map<Rule, boolean> = setRules();
    for (let currentNumber: number = 1; currentNumber <= maxNum; currentNumber++) {
        let output: Array<string> = [];
        let foundEleven: boolean = false;

        if (currentNumber % 11 === 0 && rulesStatus.get(BONG)) {
            output.push(BONG.name);
            foundEleven = true;
        }
        if (currentNumber % 3 === 0 && rulesStatus.get(FIZZ) && !foundEleven) {
            output.push(FIZZ.name);
        }
        if (currentNumber % 5 === 0 && rulesStatus.get(BUZZ) && !foundEleven) {
            output.push(BUZZ.name);
        }

        if (currentNumber % 7 === 0 && rulesStatus.get(BANG) && !foundEleven) {
            output.push(BANG.name);
        }

        if (currentNumber % 13 === 0 && rulesStatus.get(FEZZ)) {
            let containsB: string | undefined = output.find(a => a.includes("B"));
            let fezz: string = FEZZ.name;
            if (containsB) {
                output.splice(output.indexOf(containsB), 0, fezz);
            } else {
                output.push(fezz);
            }
        }

        if (currentNumber % 17 === 0 && rulesStatus.get(REVERSE)) {
            output.reverse();
        }

        rulesStatus.forEach(
            (active, rule) => {
                if (STANDARD_RULES.includes(rule)) {
                    return;
                }

                if (active && currentNumber % rule.divider === 0) {
                    output.push(rule.name);
                }
            }
        )

        if (output.length !== 0) {
            console.log(output.join(""));
        } else {
            console.log(currentNumber);
        }
    }
}

function getUserInput(displayMessage: string): number | null {
    const maxNumber:string = prompt(displayMessage);
    const convertedNumber: number = Number(maxNumber)
    return Number.isNaN(convertedNumber) ? null : convertedNumber;
}

function getCustomRules(): Array<Rule> {
    const customRules: Array<Rule> = new Array<Rule>();
    while (true) {
        const addingRules: string = prompt("Add a new custom rule? (y for yes, anything else for no): ");
        if (addingRules !== "y") {
            break;
        }

        let newRuleDivider: number | null = getUserInput(INSERT_CUSTOM_RULE_DIVIDER_NUMBER_PROMPT);
        while (newRuleDivider === null) {
            console.log(INVALID_INPUT_PROMPT);
            newRuleDivider = getUserInput(INSERT_CUSTOM_RULE_DIVIDER_NUMBER_PROMPT);
        }

        let newRuleName: string = prompt(INSERT_CUSTOM_RULE_NAME_PROMPT);
        customRules.push(new Rule(newRuleDivider, newRuleName));
    }
    return customRules;
}

function setRules(): Map<Rule, boolean> {

    const allRules: Array<Rule> = new Array<Rule>()
        .concat(STANDARD_RULES)
        .concat(getCustomRules());

    const rulesStatus: Map<Rule, boolean> = new Map<Rule, boolean>();

    allRules.forEach((rule: Rule): void =>
        {
            const activeRule: string = prompt("Activate "
                + rule.name
                + "? (y to activate, n (or anything else) to deactivate) ");

            rulesStatus.set(rule, activeRule === "y");
        }
    );

    return rulesStatus;
}

fizzbuzz();