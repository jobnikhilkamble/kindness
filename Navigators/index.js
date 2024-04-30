import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';

import HomeScreen from '../Screens/HomeScreen';
import PostScreen from '../Screens/PostScreen';

import PostLocationScreen from '../Screens/PostLocationScreen';
import OurMissionScreen from '../Screens/OurMissionScreen';
import LearnMoreScreen from '../Screens/LearnMore';
import TeamScreen from '../Screens/TeamScreen';
import MagzineScreen from '../Screens/MagzineScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import BisooScreen from '../Screens/BisooScreen';
import PurchaseBisooScreen from '../Screens/PurchaseBisooScreen';
import SubscribeScreen from '../Screens/Subscribe';
import ColorChooser from '../Screens/ColorChooser';
import DonationScreen from '../Screens/Donation';
import CheckoutScreen from '../Screens/CheckoutScreen';
import PurchaseDetailsScreen from '../Screens/PurchaseDetailsScreen';
import SignScreen from '../Screens/SignScreen';
import {Login} from './../Screens/Auth/Login';
import {useSelector} from 'react-redux';
import SignABisoo from '../Screens/HomeScreen/SignABisoo';

const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({current, next, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },

          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                })
              : 1,
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
};

const nameComponentMap = {
  PostKindness: PostScreen,
  PurchaseDetailsScreen: PurchaseDetailsScreen,
  ProfileScreen: ProfileScreen,
  BisooScreen: BisooScreen,
  PurchaseBisooScreen: PurchaseBisooScreen,
};

const Stack = createStackNavigator();
function Navigator() {
  const {authToken = ''} = useSelector(state => state.rawData);
  const auth=useSelector(state=>state.auth)
  const isLoggedIn = authToken && auth?.authUser && auth?.isLoggedIn;
   const AuthRouth = props => {
    const Component = nameComponentMap[props.route.name];
    return isLoggedIn ? <Component {...props} /> : <Login {...props} />;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{headerShown: false, ...MyTransition}}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{headerShown: false, ...MyTransition}}
          name="PostKindness"
          component={AuthRouth}
        />

        <Stack.Screen
          options={{headerShown: false, ...MyTransition}}
          name="Login"
          component={isLoggedIn ? HomeScreen : Login }
        />

        <Stack.Screen
          options={{headerShown: false, ...MyTransition}}
          name="PostLocationScreen"
          component={PostLocationScreen}
        />
        <Stack.Screen
          options={{headerShown: false, ...MyTransition}}
          name="OurMissionScreen"
          component={OurMissionScreen}
        />
        <Stack.Screen
          options={{headerShown: false, ...MyTransition}}
          name="LearnMoreScreen"
          component={LearnMoreScreen}
        />
        <Stack.Screen
          options={{headerShown: false, ...MyTransition}}
          name="TeamScreen"
          component={TeamScreen}
        />
        <Stack.Screen
          options={{headerShown: false, ...MyTransition}}
          name="MagzineScreen"
          component={MagzineScreen}
        />
        <Stack.Screen
          options={{headerShown: false, ...MyTransition}}
          name="ProfileScreen"
          component={isLoggedIn ? ProfileScreen : Login}
        />

        <Stack.Screen
          options={{headerShown: false, ...MyTransition}}
          name="SubscribeScreen"
          component={SubscribeScreen}
        />
        <Stack.Screen
          options={{headerShown: false, ...MyTransition}}
          name="BisooScreen"
          component={isLoggedIn ? BisooScreen : Login}
        />

        <Stack.Screen
          options={{headerShown: false, ...MyTransition}}
          name="PurchaseBisooScreen"
          component={isLoggedIn ? PurchaseBisooScreen : Login}
        />
        <Stack.Screen
          options={{headerShown: false, ...MyTransition}}
          name="ColorChooser"
          component={ColorChooser}
        />
        <Stack.Screen
          options={{headerShown: false, ...MyTransition}}
          name="DonationScreen"
          component={DonationScreen}
        />
        <Stack.Screen
          options={{headerShown: false, ...MyTransition}}
          name="CheckoutScreen"
          component={CheckoutScreen}
        />

        <Stack.Screen
          options={{headerShown: false, ...MyTransition}}
          name="PurchaseDetailsScreen"
          component={isLoggedIn ? PurchaseDetailsScreen : Login}
        />

        <Stack.Screen
          options={{headerShown: false, ...MyTransition}}
          name="SignScreen"
          component={isLoggedIn ? HomeScreen : SignScreen }
        />
        <Stack.Screen
          options={{headerShown: false, ...MyTransition}}
          name="SignABisoo"
          component={isLoggedIn ? SignABisoo : Login }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
