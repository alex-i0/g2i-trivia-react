import Link from 'next/link';
import styles from '../scss/pages/FallbackView.module.scss';
import { NextHead, View, Button } from '../components/shared';
import { Routes } from '../types/navigation';

const FallbackView: React.FC = () => (
    <>
        <NextHead title="Troubles" />
        <View cardDirection="vertical">
            <div className={styles.messageContainer}>
                <h1 className={styles.heading}>Ughh Something Went Wrong</h1>

                <p className={styles.message}>In a few minutes try again!</p>
                <Link href={Routes.home} passHref>
                    <Button buttonType="subtle">Try Again</Button>
                </Link>
            </div>
        </View>
    </>
);

export default FallbackView;
