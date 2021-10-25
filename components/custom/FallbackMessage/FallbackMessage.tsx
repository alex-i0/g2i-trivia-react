import { NextHead, View, Button } from '../../shared';
import Link from 'next/link';
import { Routes } from '../../../types/navigation';
import styles from './FallbackMessage.module.scss';

export const FallbackMessage: React.FC = () => (
    <>
        <NextHead title="Troubles" />
        <View cardDirection="vertical">
            <div className={styles.messageContainer}>
                <h1 className={styles.heading}>Ughh Something Went Wrong</h1>

                <p>In a few minutes try again!</p>
                <Link href={Routes.home} passHref>
                    <Button buttonType="subtle">Try Again</Button>
                </Link>
            </div>
        </View>
    </>
);
