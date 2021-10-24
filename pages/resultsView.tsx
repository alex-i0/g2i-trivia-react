import * as React from 'react';
import { NextHead, View, Button } from '../components/shared';
import { CardDirection } from '../components/shared/View/View';
import Link from 'next/link';
import { NextPage } from 'next';
import { useContext } from 'react';
import { Context } from '../context/AppContext';
import { Routes } from '../types/navigation';

const ResultsView: NextPage = () => {
    const {
        state: { score, answers }
    } = useContext<any>(Context);

    return (
        <div>
            <NextHead title="Results" />
            <View cardDirection={CardDirection.vertical}>
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
                            <Button size="medium" type="subtle">
                                Play Again?
                            </Button>
                        </Link>
                    </div>
                </div>
            </View>
        </div>
    );
};

export default ResultsView;
