import * as C from "./styles";

type Props = {
  name: string;
};

export const WindowComponent = ({ name }: Props) => {
  return (
    <C.Container>
      {name === "github_profile" && (
        <div className="githubProfile">
          <div className="profileHeader">
            <img
              className="profileImage"
              src="/assets/images/logo.png"
              alt="logo"
            />
            <div className="profileInfo">
              <span className="profileDescTitle">Hey, I'm Hitesh!</span>
              <span className="profileDescItem">
                Python • React • Machine Learning <br />Face Recognition & AI Expert
              </span>
            </div>
          </div>
          <div className="browserMockup">
            <div className="browserHeader">
              <div className="browserControls">
                <div className="browserButton close"></div>
                <div className="browserButton minimize"></div>
                <div className="browserButton maximize"></div>
              </div>
              <div className="addressBar">
                <span>🔒 https://github.com/Hiteshydv001</span>
              </div>
            </div>
            <div className="githubContent">
              <div className="githubProfileCard">
                <div className="avatarSection">
                  <div className="avatar">👨‍💻</div>
                  <h2>Hiteshydv001</h2>
                  <p className="bio">Face Recognition & AI Expert</p>
                </div>
                <div className="statsSection">
                  <div className="stat">
                    <strong>Repositories</strong>
                    <span>Multiple Projects</span>
                  </div>
                  <div className="stat">
                    <strong>Specialization</strong>
                    <span>Python • ML • React</span>
                  </div>
                  <div className="stat">
                    <strong>Focus Areas</strong>
                    <span>Computer Vision • Authentication</span>
                  </div>
                </div>
                <div className="projectsPreview">
                  <h3>🚀 Featured Projects</h3>
                  <div className="project">
                    <span className="projectName">Face Recognition Auth</span>
                    <span className="projectLang">Python</span>
                  </div>
                  <div className="project">
                    <span className="projectName">MacOS Simulation</span>
                    <span className="projectLang">React</span>
                  </div>
                  <div className="project">
                    <span className="projectName">AI Solutions</span>
                    <span className="projectLang">Machine Learning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="profileFooter">
            <a href="https://github.com/Hiteshydv001" target="_blank">
              Visit Full GitHub Profile
            </a>
          </div>
        </div>
      )}

      {name === "github_folder" && (
        <div className="githubFolder">
          <img
            className="componentImage"
            src={`/assets/images/icons/appicons/github_folder.png`}
            alt="icon"
          />
          <p className="githubFolderTitle">
            Check out my projects <br /> and repositories below.
          </p>
          <p className="githubFolderFeedBack">
            I create innovative solutions with AI and face recognition 🚀
          </p>
          <p className="githubFolderLink">
            <a href="https://github.com/Hiteshydv001" target="_blank">
              View my GitHub
            </a>
          </p>
        </div>
      )}

      {name === "spotify" && (
        <div className="spotifyPlayer">
          <div className="spotifyHeader">
            <div className="spotifyLogo">
              <span className="spotifyIcon">♫</span>
              <h2>Spotify Web Player</h2>
            </div>
          </div>
          
          <div className="spotifyWebPlayer">
            <iframe 
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0" 
              width="100%" 
              height="352" 
              frameBorder="0" 
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              title="Spotify Playlist Player"
            />
          </div>
          
          <div className="additionalPlaylists">
            <h3>🎵 Popular Playlists</h3>
            <div className="playlistGrid">
              <div className="playlistItem">
                <iframe 
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd?utm_source=generator&theme=0" 
                  width="100%" 
                  height="152" 
                  frameBorder="0" 
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  title="RapCaviar Playlist"
                />
              </div>
              <div className="playlistItem">
                <iframe 
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4JAvHpjipBk?utm_source=generator&theme=0" 
                  width="100%" 
                  height="152" 
                  frameBorder="0" 
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  title="New Music Friday"
                />
              </div>
            </div>
          </div>
          
          <div className="spotifyFooter">
            <div className="spotifyLinks">
              <a href="https://open.spotify.com" target="_blank" className="spotifyLink">
                🎵 Full Spotify Web Player
              </a>
              <a href="https://open.spotify.com/browse/featured" target="_blank" className="spotifyLink">
                🔥 Browse Featured
              </a>
              <a href="https://open.spotify.com/search" target="_blank" className="spotifyLink">
                🔍 Search Music
              </a>
            </div>
          </div>
        </div>
      )}

      {name === "discord" && (
        <div className="discordApp">
          <div className="discordHeader">
            <div className="discordLogo">
              <span className="discordIcon">💬</span>
              <h2>Discord</h2>
            </div>
            <div className="discordStatus">
              <span className="statusIndicator online"></span>
              <span className="username">Hitesh#0001</span>
            </div>
          </div>
          
          <div className="discordMain">
            <div className="serverList">
              <div className="serverIcon home active">🏠</div>
              <div className="serverIcon">🎮</div>
              <div className="serverIcon">�</div>
              <div className="serverIcon">🤖</div>
              <div className="serverIcon">🎵</div>
              <div className="addServer">+</div>
            </div>
            
            <div className="channelList">
              <div className="serverName">
                <h3>AI Development Hub</h3>
                <span className="serverDropdown">▼</span>
              </div>
              
              <div className="channelCategory">
                <span className="categoryName">📝 TEXT CHANNELS</span>
                <div className="channel active">
                  <span className="channelHash"># </span>
                  <span className="channelName">general</span>
                </div>
                <div className="channel">
                  <span className="channelHash"># </span>
                  <span className="channelName">face-recognition</span>
                </div>
                <div className="channel">
                  <span className="channelHash"># </span>
                  <span className="channelName">machine-learning</span>
                </div>
                <div className="channel">
                  <span className="channelHash"># </span>
                  <span className="channelName">project-showcase</span>
                </div>
              </div>
              
              <div className="channelCategory">
                <span className="categoryName">🔊 VOICE CHANNELS</span>
                <div className="channel voice">
                  <span className="voiceIcon">🔊 </span>
                  <span className="channelName">General Voice</span>
                </div>
                <div className="channel voice">
                  <span className="voiceIcon">🔊 </span>
                  <span className="channelName">Study Room</span>
                </div>
              </div>
            </div>
            
            <div className="chatArea">
              <div className="chatHeader">
                <span className="channelHash"># </span>
                <span className="currentChannel">general</span>
                <div className="chatControls">
                  <button className="chatBtn">📌</button>
                  <button className="chatBtn">👥</button>
                  <button className="chatBtn">🔍</button>
                </div>
              </div>
              
              <div className="messageArea">
                <div className="welcomeMessage">
                  <h2>Welcome to #general</h2>
                  <p>This is the beginning of the #general channel.</p>
                </div>
                
                <div className="message">
                  <div className="avatar">🤖</div>
                  <div className="messageContent">
                    <div className="messageHeader">
                      <span className="username">AI Bot</span>
                      <span className="timestamp">Today at 2:30 PM</span>
                    </div>
                    <div className="messageText">
                      Welcome to our AI Development Hub! Feel free to share your machine learning projects here.
                    </div>
                  </div>
                </div>
                
                <div className="message">
                  <div className="avatar">👨‍💻</div>
                  <div className="messageContent">
                    <div className="messageHeader">
                      <span className="username">DevHitesh</span>
                      <span className="timestamp">Today at 2:35 PM</span>
                    </div>
                    <div className="messageText">
                      Just finished implementing face recognition authentication! Check out the demo in #project-showcase 🚀
                    </div>
                  </div>
                </div>
                
                <div className="message">
                  <div className="avatar">⚛️</div>
                  <div className="messageContent">
                    <div className="messageHeader">
                      <span className="username">ReactDev</span>
                      <span className="timestamp">Today at 2:40 PM</span>
                    </div>
                    <div className="messageText">
                      That macOS simulation looks incredible! How did you integrate the face auth? 🤔
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="messageInput">
                <div className="inputArea">
                  <input 
                    type="text" 
                    placeholder="Message #general" 
                    className="messageField"
                    readOnly
                  />
                  <button className="sendBtn">😊</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="discordFooter">
            <div className="discordLinks">
              <a href="https://discord.com/app" target="_blank" className="discordLink">
                💬 Open Discord Web
              </a>
              <a href="https://discord.com/download" target="_blank" className="discordLink">
                📱 Download App
              </a>
              <a href="https://discord.com/nitro" target="_blank" className="discordLink">
                ⚡ Get Nitro
              </a>
            </div>
          </div>
        </div>
      )}

      {name === "kindle" && (
        <div className="kindleWebView">
          <div className="kindleMessage">
            <div className="kindleIcon">📚</div>
            <h2>Amazon Kindle Cloud Reader</h2>
            <p>Click the button below to open Kindle in a new tab:</p>
            <a 
              href="https://read.amazon.com" 
              target="_blank" 
              className="kindleOpenButton"
              rel="noopener noreferrer"
            >
              📖 Open Kindle Cloud Reader
            </a>
            <div className="alternativeOptions">
              <h3>Alternative Reading Options:</h3>
              <div className="optionsList">
                <a href="https://www.amazon.com/kindle-store" target="_blank" className="optionLink">
                  🛒 Browse Kindle Store
                </a>
                <a href="https://www.amazon.com/kindle-unlimited" target="_blank" className="optionLink">
                  📚 Kindle Unlimited
                </a>
                <a href="https://www.amazon.com/kindle" target="_blank" className="optionLink">
                  📱 Download Kindle Apps
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {name !== "github_profile" && name !== "github_folder" && name !== "spotify" && name !== "discord" && name !== "kindle" && (
        <>
          <img
            className="componentImage"
            src={`/assets/images/icons/appicons/${name}.png`}
            alt="icon"
          />
          <p className="comingSoon">App coming soon!</p>
        </>
      )}
    </C.Container>
  );
};