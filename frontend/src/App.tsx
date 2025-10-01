import { useState, useEffect } from "react";
import * as C from "./App.styles";

import { LockScreen } from "./components/common/LockScreen";
import { Loading } from "./components/common/Loading";
import { WelcomeScreen } from "./components/common/WelcomeScreen";
import { MenuIcon } from "./components/screen/MenuIcon";
import { Window } from "./components/common/Window";

import { MenuIconListLeft } from "./data/MenuIconList";
import { MenuIconListRight } from "./data/MenuIconList";
import { MenuLeftItems } from "./data/MenuList/MenuLeftItems";
import { MenuRightItems } from "./data/MenuList/MenuRightItems";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticatedUserId, setAuthenticatedUserId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [loadingFadeOut, setLoadingFadeOut] = useState(false);
  const [welcomeScreen, setWelcomeScreen] = useState(false);
  const [welcomeScreenFadeOut, setWelcomeScreenFadeOut] = useState(false);

  const [windowOpenName, setWindowOpenName] = useState("none");

  const handleWindowClose = () => setWindowOpenName("none");

  const handleAuthSuccess = (userId: string) => {
    setAuthenticated(true);
    setAuthenticatedUserId(userId);
  };

  const handleLogout = () => {
    // Reset all states to initial values
    setAuthenticated(false);
    setAuthenticatedUserId("");
    setLoading(true);
    setLoadingFadeOut(false);
    setWelcomeScreen(false);
    setWelcomeScreenFadeOut(false);
    setWindowOpenName("none");
  };

  const handleOpenApp = (item: string) => {
    const audio = new Audio("/assets/sounds/click.mp3");
    audio.currentTime = 1;
    audio.play();
    setWindowOpenName(item);
  };

  useEffect(() => {
    if (authenticated) {
      setTimeout(() => {
        setLoading(false);
        setWelcomeScreen(true);
      }, 5000);

      setTimeout(() => {
        setLoadingFadeOut(true);
      }, 3000);

      setTimeout(() => {
        setWelcomeScreenFadeOut(true);
      }, 8000);

      setTimeout(() => {
        setWelcomeScreen(false);
      }, 9000);
    }
  }, [authenticated]);

  if (!authenticated) {
    return <LockScreen onAuthSuccess={handleAuthSuccess} />;
  }

  if (loading) {
    return <Loading fadeOut={loadingFadeOut} />;
  }

  if (!loading && welcomeScreen === true) {
    return <WelcomeScreen fadeOut={welcomeScreenFadeOut} userId={authenticatedUserId} />;
  }

  return (
    <C.Container>
      {!loading && !welcomeScreen && (
        <>
          <C.MenuTop>
            <C.MenuTopLeft>
              <C.MenuTopList>
                <li onClick={handleLogout} style={{ cursor: 'pointer' }} title="Click to logout">
                  <img src="/assets/images/apple-logo.png" />
                </li>
                {MenuLeftItems.map((item, index) => (
                  <li key={index}>{item.title}</li>
                ))}
              </C.MenuTopList>
            </C.MenuTopLeft>
            <C.MenuTopRight>
              <C.MenuTopList>
                <li style={{ fontSize: '11px', color: 'white', fontWeight: '500' }}>
                  👤 {authenticatedUserId || 'User'}
                </li>
                <li onClick={handleLogout} style={{ cursor: 'pointer', padding: '0 8px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'white', fontWeight: 'bold', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', margin: '0 4px' }} title="Logout from Face Recognition System">
                  🔓 Logout
                </li>
                <li>
                  <img src="/assets/images/icons/battery.png" />
                </li>
                <li>
                  <img src="/assets/images/icons/wifi.png" />
                </li>
                <li>
                  <img src="/assets/images/icons/search.png" />
                </li>
                <a href="https://github.com/Hiteshydv001" target="_blank" rel="noopener noreferrer">
                  <li>
                    <img src="/assets/images/icons/github.png" />
                  </li>
                </a>
                {MenuRightItems.map((item, index) => (
                  <li key={index}>{item.title}</li>
                ))}
              </C.MenuTopList>
            </C.MenuTopRight>
          </C.MenuTop>

          {windowOpenName !== "none" && (
            <Window name={windowOpenName} closeWindow={handleWindowClose} />
          )}

          <C.MenuBottom>
            <>
              {MenuIconListLeft.map((item, index) => (
                <MenuIcon
                  key={index}
                  icon={item.icon}
                  onClick={() => handleOpenApp(item.icon)}
                />
              ))}
              <C.Border></C.Border>
              {MenuIconListRight.map((item, index) => (
                <MenuIcon
                  key={index}
                  icon={item.icon}
                  onClick={() => handleOpenApp(item.icon)}
                />
              ))}
            </>
          </C.MenuBottom>
        </>
      )}
    </C.Container>
  );
};

export default App;
