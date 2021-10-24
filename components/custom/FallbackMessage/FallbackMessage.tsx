import * as React from 'react';
import type { NextPage } from 'next';
import { NextHead, View, Button } from '../../shared';
import { CardDirection } from '../../shared/View/View';
import Link from 'next/link';
import { Routes } from '../../../types/navigation';

export const FallbackMessage: NextPage = () => (
    <div>
        <NextHead title="Troubles" />
        <View cardDirection={CardDirection.vertical}>
            <div className="game-container">
                <h1 className="heading">Ughh Something Went Wrong</h1>

                <p>In a few minutes try again!</p>
                <Link href={Routes.home} passHref>
                    <Button size="medium" type="subtle">
                        Try Again
                    </Button>
                </Link>
            </div>
        </View>
    </div>
);
