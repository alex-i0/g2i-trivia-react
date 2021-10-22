import Head from 'next/head';
import { string } from 'prop-types';

type NextHeadProps = {
    title: string;
};

export const NextHead: React.FC<NextHeadProps> = ({ title }: NextHeadProps) => (
    <Head>
        <title>{`Trivia | ${title}`}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5" />
        <meta name="description" content="Play Trivia game today!!" />
        <meta name="keywords" content="trivia, react, g2i" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#00a300" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="theme-color" content="#d7e0fd" />
    </Head>
);

NextHead.propTypes = {
    title: string.isRequired
};
