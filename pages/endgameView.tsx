import { NextHead, View, Button } from '../components/shared';
import { CardDirection } from '../components/shared/View/View';
import Link from 'next/link';

type EndgameViewProps = {
    score: number;
};

const EndgameView = ({ score }: EndgameViewProps) => {
    return (
        <div>
            <NextHead title="Results" />
            <View cardDirection={CardDirection.vertical}>
                <div className="container">
                    <h1 className="heading">You scored:</h1>
                    <h1 className="heading">{`${score}/10`}</h1>

                    <Link href="/">
                        <Button size="medium" type="subtle">
                            {'Play Again?'}
                        </Button>
                    </Link>
                </div>
            </View>
        </div>
    );
};

EndgameView.getInitialProps = ({ query: { score } }) => {
    return { score };
};

export default EndgameView;
