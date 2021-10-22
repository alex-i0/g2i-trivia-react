import type { NextPage } from 'next';
import { NextHead, View, Button } from '../components/shared';
import { CardDirection } from '../components/shared/View/View';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import { Context } from '../context/AppContext';
import { Reducer } from '../reducers/results';

export interface TriviaQuestionType {
    category: string;
    correct_answer: 'True' | 'False';
    difficulty: 'hard';
    incorrect_answers: Array<'True' | 'False'>;
    question: string;
}

export interface TriviaViewProps {
    data: {
        responseCode: number;
        results: Array<TriviaQuestionType>;
    };
}

const TriviaView: NextPage<TriviaViewProps> = ({ data }) => {
    const { dispatch } = useContext(Context);

    const [questionCounter, setQuestionCounter] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);

    const router = useRouter();
    const questions = data.results;

    useEffect(() => {
        if (questionCounter > questions.length - 1) {
            router.push({ pathname: '/endgameView' });
            const payload = {
                score,
                answers
            };
            dispatch({
                type: Reducer.GAME_FINISHED,
                payload
            });
        }
    }, [questionCounter]);

    const moveToNextQuestion = (answer: TriviaQuestionType['correct_answer']) => {
        verifyAnswerCorectness(answer);
        setQuestionCounter(questionCounter + 1);
    };

    const verifyAnswerCorectness = (answer: TriviaQuestionType['correct_answer']) => {
        if (answer === questions[questionCounter]?.correct_answer) {
            setScore(score + 1);
            setAnswers((results) => [...results, { question: parseQuestion(questions[questionCounter]?.question), isCorrect: true }]);
        } else {
            setAnswers((results) => [...results, { question: parseQuestion(questions[questionCounter]?.question), isCorrect: false }]);
        }
    };

    const parseQuestion = (question: string): string => {
        return question ? `${parse(question)}` : '';
    };

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
                            {'True'}
                        </Button>
                        <Button size="small" className="false" onClick={() => moveToNextQuestion('False')}>
                            {'False'}
                        </Button>
                    </div>
                    <p className="questions-counter">{questionCounter + 1} of 10</p>
                </div>
            </View>
        </div>
    );
};

//TODO: Add error handling for API
export async function getStaticProps() {
    const res = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean`);
    const data = await res.json();

    if (!data) return { notFound: true };

    return { props: { data } };
}

export default TriviaView;
