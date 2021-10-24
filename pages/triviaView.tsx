import * as React from 'react';
import type { NextPage } from 'next';
import { NextHead, View, Button } from '../components/shared';
import { CardDirection } from '../components/shared/View/View';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import { Context } from '../context/AppContext';
import { Reducer } from '../reducers/results';
import { FallbackMessage } from '../components/custom';
import { number, shape, arrayOf, string } from 'prop-types';
import { Routes } from '../types/navigation';

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
    const { dispatch } = useContext<any>(Context);

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
        verifyAnswerCorectness(answer);
        setQuestionCounter(questionCounter + 1);
    };

    const verifyAnswerCorectness = (answer: TriviaQuestionType['correct_answer']): void => {
        if (answer === questions[questionCounter]?.correct_answer) {
            setScore(score + 1);
            updateUserPickedAnswers(true);
        } else {
            updateUserPickedAnswers(false);
        }
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
        <div>
            <NextHead title="Game" />
            <View cardDirection={CardDirection.vertical}>
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
        </div>
    );
};

export const getStaticProps = async (): Promise<{ props: { data: Record<any, null> | null } }> => {
    try {
        const res = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean`);
        const data = await res.json();
        return { props: { data } };
    } catch (error) {
        // Handiling API errors
        return { props: { data: null } };
    }
};

TriviaView.propTypes = {
    data: shape({
        responseCode: number,
        results: arrayOf(
            shape({
                category: string.isRequired,
                correct_answer: string.isRequired,
                difficulty: string.isRequired,
                incorrect_answers: arrayOf(string).isRequired,
                question: string.isRequired
            }).isRequired
        )
    }).isRequired
};

export default TriviaView;
