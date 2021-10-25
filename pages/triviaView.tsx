import * as React from 'react';
import type { NextPage } from 'next';
import { NextHead, View, Button } from '../components/shared';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import { Reducer } from '../reducers/results';
import { FallbackMessage } from '../components/custom';
import { Routes } from '../types/navigation';
import { useAppContext } from '../context/useAppContext';

export interface TriviaQuestionType {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: Array<string>;
    question: string;
}

export interface TriviaViewProps {
    data: {
        responseCode?: number;
        results: Array<TriviaQuestionType>;
    };
}

const TriviaView: NextPage<TriviaViewProps> = ({ data }) => {
    const { dispatch } = useAppContext();

    const [questionCounter, setQuestionCounter] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState<Array<{ question: string; isCorrect: boolean }>>([]);

    const router = useRouter();
    const questions = data?.results;

    useEffect(() => {
        if (questionCounter > questions?.length - 1) finishGameAndMoveToResultsPage();
    }, [questionCounter]);

    const finishGameAndMoveToResultsPage = (): void => {
        const payload = {
            score,
            answers
        };
        dispatch({
            type: Reducer.GAME_FINISHED,
            payload
        });
        router.push({ pathname: Routes.results });
    };

    const moveToNextQuestion = (answer: TriviaQuestionType['correct_answer']): void => {
        verifyAnswerCorrectness(answer);
        setQuestionCounter(questionCounter + 1);
    };

    const verifyAnswerCorrectness = (answer: TriviaQuestionType['correct_answer']): void => {
        const isAnswerCorrect = answer === questions[questionCounter]?.correct_answer;
        if (isAnswerCorrect) {
            setScore((prevScore) => ++prevScore);
        }
        updateUserPickedAnswers(isAnswerCorrect);
    };

    const updateUserPickedAnswers = (isCorrect: boolean) => {
        const question = parseQuestion(questions[questionCounter]?.question);
        setAnswers((results) => [...results, { question, isCorrect }]);
    };

    const parseQuestion = (question: string): string => {
        return question ? `${parse(question)}` : '';
    };

    // Displaying view to communicate error and let user to try again
    if (data === null) return <FallbackMessage />;

    return (
        <>
            <NextHead title="Game" />
            <View cardDirection="vertical">
                <div className="game-container">
                    <h1 className="heading">{questions[questionCounter]?.category}</h1>

                    <div className="question-container">
                        <p>{parseQuestion(questions[questionCounter]?.question)}</p>
                    </div>

                    <div className="button-group">
                        <Button size="small" className="true" onClick={() => moveToNextQuestion('True')}>
                            True
                        </Button>
                        <Button size="small" className="false" onClick={() => moveToNextQuestion('False')}>
                            False
                        </Button>
                    </div>
                    <p className="questions-counter">{questionCounter + 1} of 10</p>
                </div>
            </View>
        </>
    );
};

export const getStaticProps = async (): Promise<{ props: { data: Record<string, null> | null } }> => {
    try {
        const res = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean`);
        const data = await res.json();
        return { props: { data } };
    } catch (error) {
        // Handiling API errors
        return { props: { data: null } };
    }
};

export default TriviaView;
