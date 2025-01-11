export type Answer = {
  id: number;
  text: string;
};

export type Question = {
  id: number;
  text: string;
  type: 'Radio' | 'Checkbox' | 'Text';
  answers: Answer[];
};

export type QuizAttempt = {
  email: string;
  answers: QuizAnswer[];
}

export type QuizAnswer = {
  questionId: number;
  selectedAnswerIds: number[];
  textAnswer?: string;
}

export type HighScore = {
  position: number;
  email: string;
  score: number;
  dateTime: string;
}