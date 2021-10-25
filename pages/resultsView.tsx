import * as React from 'react';
import { NextHead, View, Button } from '../components/shared';
import Link from 'next/link';
import { NextPage } from 'next';
import { Routes } from '../types/navigation';
import { useAppContext } from '../context/useAppContext';

const ResultsView: NextPage = () => {
    const { score, answers } = useAppContext();

    return (
        <>
            <NextHead title="Results" />
            <View cardDirection="vertical">
                <div className="container">
                    <div className="heading-container">
                        <h1 className="heading">You scored:</h1>
                        <h1 className="heading">{`${score}/10`}</h1>
                    </div>

                    <div className="questions-container">
                        {answers.map(({ question, isCorrect }: { question: string; isCorrect: boolean }, index: number) => (
                            <p className="question" key={index}>
                                {isCorrect ? '✅ ' : '❌ '}
                                {question}
                            </p>
                        ))}
                    </div>

                    <div className="button-container">
                        <Link href={Routes.home} passHref>
                            <Button size="medium" buttonType="subtle">
                                Play Again?
                            </Button>
                        </Link>
                    </div>
                </div>
            </View>
        </>
    );
};

export default ResultsView;
