import axios from "axios";

import { Question, QuizAttempt, HighScore } from '../types/quizTypes.ts';

const api = axios.create({
  baseURL: 'http://localhost:5098/api'
});

export const getQuestions = () => 
  api.get<Question[]>('/questions').then(res => res.data);

export const submitQuiz = (attempt: QuizAttempt) => 
  api.post<number>('/quiz/submit', attempt).then(res => res.data);

export const getHighScores = () => 
  api.get<HighScore[]>('/quiz/highscores').then(res => res.data);