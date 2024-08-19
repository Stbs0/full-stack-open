export const parseProcessArgs = (args: string[]): number[] => {
const processArgs: string[] = args.slice(2);
const numbers : number[]= processArgs.map(a=>Number(a))
const isAllNumber: boolean = numbers.every((argv) => typeof argv === "number"); 
if (!isAllNumber) {
    throw new Error("please use numbers")
}

return numbers
}