import styles from '../scss/pages/triviaView.module.scss';
import parse from 'html-react-parser';
import type { NextPage } from 'next';
import { NextHead, View, Button } from '../components/shared';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Routes } from '../types/navigation';
import { useAppContext } from '../context/useAppContext';
import { fetchTriviaQuestions } from '../utils/fetchTriviaQuestions';

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
    const { setDispatch } = useAppContext();

    const [questionCounter, setQuestionCounter] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState<Array<{ question: string; isCorrect: boolean }>>([]);

    const router = useRouter();
    const questions = data?.results;

    useEffect(() => {
        // Displaying view to communicate error and let user to try again
        if (data === null) router.push({ pathname: Routes.fallback });

        if (questionCounter > questions?.length - 1) finishGameAndMoveToResultsPage();
    }, [questionCounter, data]);

    const finishGameAndMoveToResultsPage = (): void => {
        const payload = {
            score,
            answers
        };
        setDispatch?.({
            type: 'GAME_FINISHED',
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

    return (
        <>
            <NextHead title="Game" />
            <View cardDirection="vertical">
                <div className={styles.gameContainer}>
                    <h1 className={styles.heading}>{questions?.[questionCounter]?.category}</h1>

                    <div className={styles.questionContainer}>
                        <p>{parseQuestion(questions?.[questionCounter]?.question)}</p>
                    </div>

                    <div className={styles.buttonGroup}>
                        <Button size="small" className={styles.true} onClick={() => moveToNextQuestion('True')}>
                            True
                        </Button>
                        <Button size="small" className={styles.false} onClick={() => moveToNextQuestion('False')}>
                            False
                        </Button>
                    </div>
                    <p className={styles.questionsCounter}>{questionCounter + 1} of 10</p>
                </div>
            </View>
        </>
    );
};

// Break the url link to see the FallbackView
export const getStaticProps = async () => await fetchTriviaQuestions(`https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean`);

export default TriviaView;
