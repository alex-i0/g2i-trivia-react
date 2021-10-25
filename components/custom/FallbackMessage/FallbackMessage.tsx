import { NextHead, View, Button } from '../../shared';
import Link from 'next/link';
import { Routes } from '../../../types/navigation';

export const FallbackMessage: React.FC = () => (
    <>
        <NextHead title="Troubles" />
        <View cardDirection="vertical">
            <div className="game-container">
                <h1 className="heading">Ughh Something Went Wrong</h1>

                <p>In a few minutes try again!</p>
                <Link href={Routes.home} passHref>
                    <Button size="medium" buttonType="subtle">
                        Try Again
                    </Button>
                </Link>
            </div>
        </View>
    </>
);
