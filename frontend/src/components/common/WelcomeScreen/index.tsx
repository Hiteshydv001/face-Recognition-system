import * as C from './styles';

type Props = {
    fadeOut: boolean;
    userId?: string;
}

export const WelcomeScreen = ({ fadeOut, userId }: Props) => {
    return (
        <C.Container fadeOut={fadeOut}>
            <div className="bg">
                <div className="content">
                    <div className="welcomeText">
                        <h1>Welcome to</h1>
                        <h2>Face Recognition Project</h2>
                        <h3>Hello, {userId || 'User'}!</h3>
                    </div>
                </div>
            </div>
        </C.Container>
    );
}