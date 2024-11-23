import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import SplashScreen from './screens/SplashScreen';
import OnBoarding from './screens/OnBoarding/OnBoarding'
import Login from './screens/Login/Login'
import ForgotPassword from './screens/ForgotPassword/ForgotPassword';
import Code from './screens/Code/Code';
import NewPassword from './screens/NewPassword/NewPassword';
import Welcome from './screens/Welcome/Welcome';
import Register from './screens/Register/Register';
import WelcomeRegister from './screens/WelcomeRegister/WelcomeRegister';
import Home from './screens/Home/Home';
import Quiz from './screens/Quiz/Quiz';
import Success from './screens/SuccessLessons/SuccessLessons';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Splash');

  useEffect(() => {
    if (currentScreen === 'Splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('Quiz');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const navigate = (screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Splash':
        return <SplashScreen />;
      case 'OnBoarding':
        return <OnBoarding navigate={navigate} />;
      case 'Login':
        return <Login navigate={navigate} />;
      case 'ForgotPassword':
        return <ForgotPassword navigate={navigate} />;
      case 'Code':
        return <Code navigate={navigate} />;
      case 'NewPassword':
        return <NewPassword navigate={navigate} />;
      case 'Welcome':
        return <Welcome navigate={navigate} />;
      case 'Register':
        return <Register navigate={navigate} />;
      case 'WelcomeRegister':
        return <WelcomeRegister navigate={navigate} />;
      case 'Home':
        return <Home navigate={navigate} />;
      case 'Quiz':
        return <Quiz navigate={navigate} />;
      case 'Success':
        return <Success navigate={navigate} />;
      default:
        return <SplashScreen />;
    }
  };

  return <View style={{ flex: 1 }}>{renderScreen()}</View>;
}
