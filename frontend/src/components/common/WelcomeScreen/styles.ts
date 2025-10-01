import styled from "styled-components";

type ContainerProps = {
    fadeOut: boolean;
}

export const Container = styled.div(({ fadeOut }: ContainerProps) => (`
    min-height:100vh;
    background-image: url('/assets/images/bg.jpg');
    bacgrkound-position:center;
    background-size:cover;
    display:flex;
    align-items:center;
    justify-content:center;

    .bg {
        width:100vw;
        height:100vh;
        background-color:transparent;
        backdrop-filter:blur(20px);
        opacity: ${(fadeOut ? 0 : 1)};
        transition: opacity 1s linear;
        display:flex;
        align-items:center;
        justify-content:center;
    }

    .content {
        display:flex;
        align-items:center;
        justify-content:center;

        .welcomeText {
            text-align: center;
            color: white;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
            animation: fadeInUp 2s ease-out;

            h1 {
                font-size: 3.5rem;
                font-weight: 300;
                margin: 0 0 10px 0;
                letter-spacing: 2px;
                animation: slideInFromLeft 1.5s ease-out;
            }

            h2 {
                font-size: 4rem;
                font-weight: 700;
                margin: 0 0 10px 0;
                background: linear-gradient(45deg, #007AFF, #5856D6, #FF2D92);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                animation: slideInFromRight 1.8s ease-out;
            }

            h3 {
                font-size: 2.5rem;
                font-weight: 400;
                margin: 0;
                color: #FFD60A;
                animation: slideInFromBottom 2.1s ease-out;
            }
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInFromRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInFromBottom {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .content .welcomeText {
            h1 {
                font-size: 2.5rem;
            }
            
            h2 {
                font-size: 3rem;
            }
            
            h3 {
                font-size: 2rem;
            }
        }
    }

    @media (max-width: 480px) {
        .content .welcomeText {
            h1 {
                font-size: 2rem;
            }
            
            h2 {
                font-size: 2.5rem;
            }
            
            h3 {
                font-size: 1.5rem;
            }
        }
    }
`));