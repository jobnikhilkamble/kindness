import {Dimensions} from 'react-native';

export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const SCREEN_WIDTH = Dimensions.get('window').width;

export const MENU_ITEMS = [
  {name: 'MISSION & VISION', route: 'OurMissionScreen'},
  {name: 'LEARN MORE', route: 'LearnMoreScreen'},
  {name: 'TEAM & SPONSORS', route: 'TeamScreen'},
  {name: 'MAGAZINE', route: 'MagzineScreen'},
  {name: 'NOTIFICATIONS'},
  {name: 'PROFILE', route: 'ProfileScreen'},
  {name: 'HELP CENTER'},
];

export const DONATION_TYPES={MONTHLY:'Monthly Donation',ONE_TIME:'One Time Donation'}

export const END_POINT= 'http://api.seekindness.org:5000/'
// 'http://seekindness.org:5000/'

export const STRIPE_KEY='pk_test_51J9xKuSIDB7z7pvSNoQLrDzASYm0SNfqLtDnJn45r2kWJgwkEd4K7YHDUG6kziIgqkAfphAX8ptzG9TG3RVAaJQG00cJgwfdV9'