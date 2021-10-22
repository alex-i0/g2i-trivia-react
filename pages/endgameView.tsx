import { NextHead, View, Button } from '../components/shared';
import { CardDirection } from '../components/shared/View/View';
import Link from 'next/link';
import { NextPage } from 'next';

interface EndgameViewProps {
    score?: string;
}

const EndgameView: NextPage<EndgameViewProps> = ({ score }) => {
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

EndgameView.getInitialProps = ({ query }) => {
    const score = `${query.score}`;
    return { score };
};

export default EndgameView;
