import { NextHead, View, Button } from '../components/shared';
import { CardDirection } from '../components/shared/View/View';
import Link from 'next/link';
import { NextPage } from 'next';
import { useContext } from 'react';
import { Context } from '../context/AppContext';

const EndgameView: NextPage = () => {
    const {
        state: { score, answers }
    } = useContext(Context);

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
                                {isCorrect ? '✅' : '❌'}
                                {question}
                            </p>
                        ))}
                    </div>

                    <div className="button-container">
                        <Link href="/">
                            <Button size="medium" type="subtle">
                                {'Play Again?'}
                            </Button>
                        </Link>
                    </div>
                </div>
            </View>
        </div>
    );
};

export default EndgameView;
