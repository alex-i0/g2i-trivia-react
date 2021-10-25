import { NextHead, View, Button } from '../components/shared';
import Link from 'next/link';
import { NextPage } from 'next';
import { Routes } from '../types/navigation';
import { useAppContext } from '../context/useAppContext';
import styles from '../scss/pages/resultsView.module.scss';

const ResultsView: NextPage = () => {
    const { score, answers } = useAppContext();

    return (
        <>
            <NextHead title="Results" />
            <View cardDirection="vertical">
                <div className={styles.container}>
                    <div className={styles.headingContainer}>
                        <h1 className={styles.heading}>You scored:</h1>
                        <h1 className={styles.heading}>{`${score}/10`}</h1>
                    </div>

                    <div className={styles.questionsContainer}>
                        {answers.map(({ question, isCorrect }: { question: string; isCorrect: boolean }, index: number) => (
                            <p className={styles.question} key={index}>
                                {isCorrect ? '✅ ' : '❌ '}
                                {question}
                            </p>
                        ))}
                    </div>

                    <div className={styles.buttonContainer}>
                        <Link href={Routes.home} passHref>
                            <Button buttonType="subtle">Play Again?</Button>
                        </Link>
                    </div>
                </div>
            </View>
        </>
    );
};

export default ResultsView;
