import { ShuffleArray } from "./Utils";

export enum Difficulty {
    ANY = "any",
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & { answers: string[] };

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty, category: any) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}${difficulty!=="any" ? "&difficulty="+difficulty : ""}&type=multiple${category!=="any" ? "&category="+category : ""}`;
    const data = await (await fetch(endpoint)).json();
    return data.results.length!==0 ? data.results.map((question: Question) => ({ ...question, answers: ShuffleArray([...question.incorrect_answers, question.correct_answer])})) : null;
}