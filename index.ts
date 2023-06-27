import {type} from "os";

const prompt = require("prompt-sync")({ sigint: true});
const FIZZ: string = "Fizz";
const BUZZ: string = "Buzz";
const BANG: string = "Bang";
const BONG: string = "Bong";
const FEZZ: string = "Fezz";
const REVERSE: string = "Reverse";

function fizzbuzz(): void {

    let maxNum: number | null = getUserInput();

    while (maxNum === null) {
        maxNum = getUserInput();
    }

    const activeRules: Map<string, boolean> = setRules();
    for (let i: number = 1; i <= maxNum; i++) {
        let output: Array<string> = [];
        let foundEleven: boolean = false;

        if (i % 11 === 0 && activeRules.get(BONG)) {
            output.push(BONG);
            foundEleven = true;
        }
        if (i % 3 === 0 && activeRules.get(FIZZ) && !foundEleven) {
            output.push(FIZZ);
        }
        if (i % 5 === 0 && activeRules.get(BUZZ) && !foundEleven) {
            output.push(BUZZ);
        }

        if (i % 7 === 0 && activeRules.get(BANG) && !foundEleven) {
            output.push(BANG);
        }

        if (i % 13 === 0 && activeRules.get(FEZZ)) {
            let containsB: string | undefined = output.find(a => a.includes("B"));
            let fezz: string = FEZZ
            if (containsB) {
                output.splice(output.indexOf(containsB), 0, fezz);
            } else {
                output.push(fezz);
            }
        }

        if (i % 17 === 0 && activeRules.get(REVERSE)) {
            output.reverse();
        }

        if (output.length !== 0) {
            console.log(output.join(""));
        } else {
            console.log(i);
        }
    }
}

function getUserInput(): number | null {
    const maxNumber:string = prompt("Insert max number: ");
    const convertedNumber: number = Number(maxNumber)
    return Number.isNaN(convertedNumber) ? null : convertedNumber;
}

function setRules(): Map<string, boolean> {

    const allRules: Array<string> = [FIZZ, BUZZ, BANG, BONG, FEZZ, REVERSE];

    const activeRules: Map<string, boolean> = new Map<string, boolean>();

    allRules.forEach((rule: string): void =>
        {
            const activeRule: string = prompt("Activate " + rule + "? (y to activate, n (or anything else) to deactivate) ");
            activeRules.set(rule, activeRule === "y");
        }
    )
    return activeRules;
}

fizzbuzz();