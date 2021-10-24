import * as React from 'react';
import type { NextPage } from 'next';
import { NextHead, View, Button } from '../components/shared';
import Image from 'next/image';
import Link from 'next/link';
import { Routes } from '../types/navigation';

const Home: NextPage = () => (
    <div>
        <NextHead title="Home" />
        <View>
            <div className="text-container">
                <h1 className="heading">Welcome to the Trivia Challenge!</h1>
                <p>You will be presented with 10 True or False questions.</p>
                <p>Can you score 100%?</p>

                <Link href={Routes.trivia} passHref>
                    <Button size="medium" type="subtle" className="start-button">
                        Begin
                    </Button>
                </Link>
            </div>
            <div className="image-container">
                <Image src="/assets/trivia-rafiki.svg" alt="Picture of Trivia game" width={600} height={600} />
            </div>
        </View>
    </div>
);

export default Home;
