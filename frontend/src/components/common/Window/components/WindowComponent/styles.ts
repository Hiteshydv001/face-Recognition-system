import styled from "styled-components";

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    color:#000;
    height: calc(75vh - 35px);

    /* Github Profile */
    .comingSoon {
        font-size:50px;
        font-weight:bold;
    }

    .githubProfile {
        display:flex;
        flex-direction: column;
        width:100%;
        height:100%;
        padding: 20px;
        overflow-y: auto;

        .profileHeader {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);

            img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                flex-shrink: 0;
            }

            .profileInfo {
                display: flex;
                flex-direction: column;
                gap: 8px;

                .profileDescTitle {
                    font-weight: bold;
                    font-size: 28px;
                    color: #000;
                    margin: 0;
                }

                .profileDescItem {
                    color: #666;
                    font-size: 16px;
                    margin: 0;
                }
            }
        }

        .browserMockup {
            flex: 1;
            margin-bottom: 15px;
            min-height: 400px;
            border: 1px solid #e1e4e8;
            border-radius: 8px;
            overflow: hidden;
            background: white;
        }

        .browserHeader {
            background: #f6f8fa;
            border-bottom: 1px solid #e1e4e8;
            padding: 8px 12px;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .browserControls {
            display: flex;
            gap: 6px;
        }

        .browserButton {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            
            &.close {
                background: #ff5f56;
            }
            
            &.minimize {
                background: #ffbd2e;
            }
            
            &.maximize {
                background: #27ca3f;
            }
        }

        .addressBar {
            flex: 1;
            background: white;
            border: 1px solid #e1e4e8;
            border-radius: 4px;
            padding: 4px 8px;
            font-size: 12px;
            color: #586069;
        }

        .githubContent {
            padding: 20px;
            height: 340px;
            overflow-y: auto;
        }

        .githubProfileCard {
            max-width: 600px;
            margin: 0 auto;
        }

        .avatarSection {
            text-align: center;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 1px solid #e1e4e8;

            .avatar {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 12px;
                font-size: 32px;
            }

            h2 {
                margin: 0 0 8px;
                font-size: 24px;
                color: #24292f;
            }

            .bio {
                color: #656d76;
                margin: 0;
                font-size: 16px;
            }
        }

        .statsSection {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 16px;
            margin-bottom: 24px;

            .stat {
                text-align: center;
                padding: 12px;
                border: 1px solid #e1e4e8;
                border-radius: 6px;
                background: #f6f8fa;

                strong {
                    display: block;
                    color: #24292f;
                    font-size: 14px;
                    margin-bottom: 4px;
                }

                span {
                    color: #656d76;
                    font-size: 12px;
                }
            }
        }

        .projectsPreview {
            h3 {
                color: #24292f;
                font-size: 16px;
                margin: 0 0 12px;
            }

            .project {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 12px;
                margin-bottom: 8px;
                border: 1px solid #e1e4e8;
                border-radius: 6px;
                background: white;

                .projectName {
                    color: #0969da;
                    font-weight: 600;
                    font-size: 14px;
                }

                .projectLang {
                    color: #656d76;
                    font-size: 12px;
                    background: #f6f8fa;
                    padding: 2px 8px;
                    border-radius: 12px;
                }
            }
        }

        .profileFooter {
            padding-top: 10px;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            text-align: center;

            a {
                color: #400EA8;
                font-weight: bold;
                font-size: 16px;
                text-decoration: none;
                border-bottom: 1px solid #e1e1e1;
                padding: 8px 16px;
                display: inline-block;
                border-radius: 4px;
                transition: all 0.2s ease;

                &:hover {
                    background-color: #f5f5f5;
                    border-bottom-color: #400EA8;
                }
            }
        }
    }
    
    .componentImage {
        width:150px;
        height:150px;
    }

    @media(max-width: 1440px) {
        .githubProfile {
            padding: 15px;

            .profileHeader {
                gap: 15px;
                margin-bottom: 15px;

                img {
                    width: 60px;
                    height: 60px;
                }

                .profileInfo {
                    .profileDescTitle {
                        font-size: 24px;
                    }

                    .profileDescItem {
                        font-size: 14px;
                    }
                }
            }

            .browserMockup {
                min-height: 300px;
            }

            .githubContent {
                padding: 15px;
                height: 260px;
            }

            .avatarSection {
                .avatar {
                    width: 60px;
                    height: 60px;
                    font-size: 24px;
                }

                h2 {
                    font-size: 20px;
                }

                .bio {
                    font-size: 14px;
                }
            }

            .statsSection {
                gap: 12px;

                .stat {
                    padding: 8px;

                    strong {
                        font-size: 12px;
                    }

                    span {
                        font-size: 10px;
                    }
                }
            }

            .projectsPreview {
                h3 {
                    font-size: 14px;
                }

                .project {
                    padding: 6px 10px;

                    .projectName {
                        font-size: 12px;
                    }

                    .projectLang {
                        font-size: 10px;
                        padding: 1px 6px;
                    }
                }
            }

            .profileFooter a {
                font-size: 14px;
                padding: 6px 12px;
            }
        }
    }

    /* Github Folder */
    .githubFolder {
        display:flex;
        flex-direction: column;
        align-items:center;
        justify-content: center;
        width:100%;
        height:100%;
        text-align:center;

        img {
            width:150px;
            height:150px;
        }

        .githubFolderTitle {
            font-weight:bold;
            font-size:35px;
        }

        .githubFolderFeedBack {
            font-weight:500;
            font-size:20px;
        }

        .githubFolderLink {
            font-weight:800;
            font-size:25px;
            border-bottom:1px solid rgba(0, 0, 0, 0.2);

            a {
                text-decoration:none;
            }
        }
    }

    /* Spotify Player */
    .spotifyPlayer {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1db954, #191414);
        color: white;
        overflow-y: auto;
        
        .spotifyHeader {
            background: rgba(0, 0, 0, 0.3);
            padding: 15px 20px;
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            
            .spotifyLogo {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                
                .spotifyIcon {
                    font-size: 24px;
                    color: #1db954;
                }
                
                h2 {
                    margin: 0;
                    font-size: 18px;
                    font-weight: bold;
                }
            }
        }
        
        .spotifyWebPlayer {
            padding: 20px;
            background: rgba(0, 0, 0, 0.2);
            
            iframe {
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            }
        }
        
        .additionalPlaylists {
            padding: 20px;
            
            h3 {
                color: white;
                margin: 0 0 15px;
                font-size: 16px;
                font-weight: bold;
                text-align: center;
            }
            
            .playlistGrid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                
                .playlistItem {
                    iframe {
                        border-radius: 8px;
                        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
                    }
                }
            }
        }
        
        .spotifyFooter {
            padding: 15px 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.2);
            
            .spotifyLinks {
                display: flex;
                justify-content: center;
                gap: 15px;
                flex-wrap: wrap;
                
                .spotifyLink {
                    color: #1db954;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 12px;
                    padding: 6px 12px;
                    border: 1px solid #1db954;
                    border-radius: 20px;
                    display: inline-block;
                    transition: all 0.3s ease;
                    
                    &:hover {
                        background: #1db954;
                        color: white;
                        transform: translateY(-1px);
                    }
                }
            }
        }
    }
    
    /* Discord App */
    .discordApp {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: #36393f;
        color: white;
        overflow: hidden;
        
        .discordHeader {
            background: #202225;
            padding: 12px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #2f3136;
            flex-shrink: 0;
            
            .discordLogo {
                display: flex;
                align-items: center;
                gap: 10px;
                
                .discordIcon {
                    font-size: 20px;
                    color: #5865f2;
                }
                
                h2 {
                    margin: 0;
                    font-size: 16px;
                    font-weight: bold;
                    color: white;
                }
            }
            
            .discordStatus {
                display: flex;
                align-items: center;
                gap: 8px;
                
                .statusIndicator {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    
                    &.online {
                        background: #3ba55c;
                    }
                }
                
                .username {
                    font-size: 12px;
                    color: #b9bbbe;
                }
            }
        }
        
        .discordMain {
            display: flex;
            flex: 1;
            overflow: hidden;
            
            .serverList {
                width: 50px;
                background: #202225;
                padding: 12px 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                border-right: 1px solid #2f3136;
                
                .serverIcon {
                    width: 36px;
                    height: 36px;
                    background: #36393f;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 16px;
                    transition: all 0.3s ease;
                    
                    &.home {
                        background: #5865f2;
                    }
                    
                    &.active {
                        border-radius: 12px;
                    }
                    
                    &:hover {
                        border-radius: 12px;
                        background: #5865f2;
                    }
                }
                
                .addServer {
                    width: 36px;
                    height: 36px;
                    background: #36393f;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 18px;
                    color: #3ba55c;
                    border: 2px dashed #3ba55c;
                    transition: all 0.3s ease;
                    
                    &:hover {
                        background: #3ba55c;
                        color: white;
                        border-color: #3ba55c;
                    }
                }
            }
            
            .channelList {
                width: 180px;
                background: #2f3136;
                padding: 16px 0;
                overflow-y: auto;
                
                .serverName {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 16px 16px;
                    border-bottom: 1px solid #36393f;
                    margin-bottom: 16px;
                    
                    h3 {
                        margin: 0;
                        font-size: 14px;
                        font-weight: bold;
                        color: white;
                    }
                    
                    .serverDropdown {
                        color: #b9bbbe;
                        font-size: 12px;
                    }
                }
                
                .channelCategory {
                    margin-bottom: 16px;
                    
                    .categoryName {
                        display: block;
                        padding: 0 16px 8px;
                        font-size: 10px;
                        font-weight: bold;
                        color: #8e9297;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    
                    .channel {
                        display: flex;
                        align-items: center;
                        padding: 6px 16px;
                        cursor: pointer;
                        transition: background 0.2s ease;
                        
                        &:hover {
                            background: #34373c;
                        }
                        
                        &.active {
                            background: #393c43;
                        }
                        
                        .channelHash, .voiceIcon {
                            color: #8e9297;
                            font-size: 14px;
                        }
                        
                        .channelName {
                            font-size: 14px;
                            color: #dcddde;
                        }
                    }
                }
            }
            
            .chatArea {
                flex: 1;
                display: flex;
                flex-direction: column;
                background: #36393f;
                
                .chatHeader {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 16px;
                    border-bottom: 1px solid #2f3136;
                    background: #36393f;
                    
                    .channelHash {
                        color: #8e9297;
                        font-size: 18px;
                        margin-right: 4px;
                    }
                    
                    .currentChannel {
                        font-size: 16px;
                        font-weight: bold;
                        color: white;
                    }
                    
                    .chatControls {
                        display: flex;
                        gap: 12px;
                        
                        .chatBtn {
                            background: transparent;
                            border: none;
                            font-size: 16px;
                            cursor: pointer;
                            padding: 4px;
                            border-radius: 4px;
                            transition: background 0.2s ease;
                            
                            &:hover {
                                background: #2f3136;
                            }
                        }
                    }
                }
                
                .messageArea {
                    flex: 1;
                    overflow-y: auto;
                    padding: 16px;
                    
                    .welcomeMessage {
                        margin-bottom: 24px;
                        
                        h2 {
                            margin: 0 0 8px;
                            font-size: 24px;
                            color: white;
                        }
                        
                        p {
                            margin: 0;
                            color: #b9bbbe;
                            font-size: 14px;
                        }
                    }
                    
                    .message {
                        display: flex;
                        gap: 12px;
                        margin-bottom: 16px;
                        
                        .avatar {
                            width: 32px;
                            height: 32px;
                            border-radius: 50%;
                            background: #5865f2;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 16px;
                            flex-shrink: 0;
                        }
                        
                        .messageContent {
                            flex: 1;
                            
                            .messageHeader {
                                display: flex;
                                align-items: center;
                                gap: 8px;
                                margin-bottom: 2px;
                                
                                .username {
                                    font-size: 14px;
                                    font-weight: bold;
                                    color: white;
                                }
                                
                                .timestamp {
                                    font-size: 11px;
                                    color: #72767d;
                                }
                            }
                            
                            .messageText {
                                font-size: 14px;
                                color: #dcddde;
                                line-height: 1.4;
                            }
                        }
                    }
                }
                
                .messageInput {
                    padding: 16px;
                    background: #36393f;
                    
                    .inputArea {
                        display: flex;
                        background: #40444b;
                        border-radius: 8px;
                        padding: 8px 12px;
                        align-items: center;
                        gap: 8px;
                        
                        .messageField {
                            flex: 1;
                            background: transparent;
                            border: none;
                            color: #dcddde;
                            font-size: 14px;
                            outline: none;
                            
                            &::placeholder {
                                color: #72767d;
                            }
                        }
                        
                        .sendBtn {
                            background: transparent;
                            border: none;
                            font-size: 16px;
                            cursor: pointer;
                            padding: 4px;
                            border-radius: 4px;
                        }
                    }
                }
            }
        }
        
        .discordFooter {
            background: #202225;
            padding: 8px 16px;
            border-top: 1px solid #2f3136;
            flex-shrink: 0;
            
            .discordLinks {
                display: flex;
                justify-content: center;
                gap: 12px;
                flex-wrap: wrap;
                
                .discordLink {
                    color: #5865f2;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 11px;
                    padding: 4px 8px;
                    border: 1px solid #5865f2;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                    
                    &:hover {
                        background: #5865f2;
                        color: white;
                    }
                }
            }
        }
    }

    @media(max-width: 1440px) {
        .spotifyPlayer {
            .spotifyWebPlayer {
                padding: 15px;
                
                iframe {
                    height: 300px;
                }
            }
            
            .additionalPlaylists {
                padding: 15px;
                
                .playlistGrid {
                    grid-template-columns: 1fr;
                    gap: 10px;
                    
                    .playlistItem iframe {
                        height: 120px;
                    }
                }
            }
            
            .spotifyFooter .spotifyLinks {
                gap: 8px;
                
                .spotifyLink {
                    font-size: 10px;
                    padding: 4px 8px;
                }
            }
        }
        
        .discordApp {
            .discordHeader {
                padding: 8px 12px;
                
                .discordLogo h2 {
                    font-size: 14px;
                }
                
                .discordStatus .username {
                    font-size: 10px;
                }
            }
            
            .discordMain {
                .serverList {
                    width: 40px;
                    
                    .serverIcon, .addServer {
                        width: 28px;
                        height: 28px;
                        font-size: 12px;
                    }
                }
                
                .channelList {
                    width: 140px;
                    
                    .serverName h3 {
                        font-size: 12px;
                    }
                    
                    .categoryName {
                        font-size: 8px;
                    }
                    
                    .channel .channelName {
                        font-size: 12px;
                    }
                }
                
                .chatArea {
                    .chatHeader {
                        padding: 8px 12px;
                        
                        .currentChannel {
                            font-size: 14px;
                        }
                        
                        .chatBtn {
                            font-size: 14px;
                        }
                    }
                    
                    .messageArea {
                        padding: 12px;
                        
                        .welcomeMessage h2 {
                            font-size: 18px;
                        }
                        
                        .message {
                            margin-bottom: 12px;
                            
                            .avatar {
                                width: 28px;
                                height: 28px;
                                font-size: 14px;
                            }
                            
                            .messageContent {
                                .messageHeader .username {
                                    font-size: 12px;
                                }
                                
                                .messageText {
                                    font-size: 12px;
                                }
                            }
                        }
                    }
                    
                    .messageInput {
                        padding: 12px;
                        
                        .inputArea .messageField {
                            font-size: 12px;
                        }
                    }
                }
            }
            
            .discordFooter {
                padding: 6px 12px;
                
                .discordLinks {
                    gap: 8px;
                    
                    .discordLink {
                        font-size: 9px;
                        padding: 3px 6px;
                    }
                }
            }
        }
    }

    /* Kindle Web View */
    .kindleWebView {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #232f3e 0%, #131a22 100%);
        color: white;
        padding: 20px;
        
        .kindleMessage {
            text-align: center;
            max-width: 500px;
            
            .kindleIcon {
                font-size: 64px;
                margin-bottom: 20px;
            }
            
            h2 {
                color: #ff9900;
                font-size: 28px;
                margin: 0 0 20px 0;
                font-weight: 600;
            }
            
            p {
                color: #ffffff;
                font-size: 16px;
                margin: 0 0 15px 0;
                line-height: 1.5;
            }
            
            .kindleOpenButton {
                display: inline-block;
                background: #ff9900;
                color: white;
                text-decoration: none;
                padding: 15px 30px;
                border-radius: 8px;
                font-size: 18px;
                font-weight: 600;
                margin: 20px 0;
                transition: all 0.3s ease;
                
                &:hover {
                    background: #e88900;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(255, 153, 0, 0.3);
                }
            }
            
            .alternativeOptions {
                margin-top: 40px;
                
                h3 {
                    color: #ffffff;
                    font-size: 18px;
                    margin: 0 0 20px 0;
                    font-weight: 500;
                }
                
                .optionsList {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    
                    .optionLink {
                        color: #87ceeb;
                        text-decoration: none;
                        padding: 10px 20px;
                        border: 1px solid #444;
                        border-radius: 6px;
                        font-size: 14px;
                        transition: all 0.2s ease;
                        
                        &:hover {
                            background: #444;
                            border-color: #ff9900;
                            color: #ffffff;
                        }
                    }
                }
            }
        }
        
        /* Responsive Design */
        @media (max-width: 600px) {
            padding: 15px;
            
            .kindleMessage {
                .kindleIcon {
                    font-size: 48px;
                }
                
                h2 {
                    font-size: 22px;
                }
                
                p {
                    font-size: 14px;
                }
                
                .kindleOpenButton {
                    padding: 12px 24px;
                    font-size: 16px;
                }
                
                .alternativeOptions {
                    margin-top: 30px;
                    
                    h3 {
                        font-size: 16px;
                    }
                }
            }
        }
    }
`;