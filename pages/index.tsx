import type { NextPage } from 'next';
import { NextHead, View, Button } from '../components/shared';
import Image from 'next/image';
import Link from 'next/link';
import { Routes } from '../types/navigation';
import styles from '../scss/pages/index.module.scss';

const Home: NextPage = () => (
    <>
        <NextHead title="Home" />
        <View>
            <div className={styles.textContainer}>
                <h1 className={styles.heading}>Welcome to the Trivia Challenge!</h1>
                <p className={styles.subheading}>You will be presented with 10 True or False questions.</p>
                <p className={styles.subheading}>Can you score 100%?</p>

                <Link href={Routes.trivia} passHref>
                    <Button buttonType="subtle" className={styles.startButton}>
                        Begin
                    </Button>
                </Link>
            </div>
            <div className={styles.imageContainer}>
                <Image src="/assets/trivia-rafiki.svg" alt="Picture of Trivia game" width={600} height={600} />
            </div>
        </View>
    </>
);

export default Home;
