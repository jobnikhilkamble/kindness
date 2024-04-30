import React, {useState} from 'react';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {Text, Image, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Logo from '../../assets/images/logo.png';
import Bee from '../../assets/images/bee.png';

import {MENU_ITEMS} from '../../constants';
import Notifications from './Notifications';
import {useNavigation} from '@react-navigation/native';

const AppHeader = props => {
  const navigation = useNavigation();
  const {onMenuItemSelected} = props;
  let _menu = null;
  let notificationMenuRef = null;
  const [toggleMenu, setToggleMenu] = useState(false);

  const setNotificationRef = ref => {
    notificationMenuRef = ref;
  };

  const showNotifications = () => {
    notificationMenuRef.show();
  };

  const hideNotifications = () => {
    notificationMenuRef.hide();
  };

  const setMenuRef = ref => {
    _menu = ref;
  };

  const hideMenu = () => {
    _menu.hide();
  };

  const showMenu = () => {
    _menu.show();
  };

  const onMeuItemSelectHandler = i => {
    if (i.name === 'NOTIFICATIONS') {
      showNotifications();
    }
    if (i.route) onMenuItemSelected(i.route);
    hideMenu();
  };
  return (
    <View style={styles.headerRow}>
      <View style={{flex: 1}} onTouchStart={e => navigation.navigate('Home')}>
        <Image source={Logo} style={styles.img} resizeMode="contain" />
      </View>
      <View style={{alignItems: 'flex-end', marginRight: 20}}>
        <Menu
          style={styles.menuList}
          ref={setMenuRef}
          button={
            <Icon name="menu" size={40} color="#ffcb4c" onPress={showMenu} />
          }>
          <MenuItem
            onPress={() => {
              onMeuItemSelectHandler({name: 'Bisoo', route: 'BisooScreen'});
            }}>
            <Text>Send a</Text>
            <Text style={{fontWeight: 'bold', flex: 1}}> BisOO</Text>
          </MenuItem>
          <MenuDivider />

          {MENU_ITEMS.map(i => (
            <View key={i.name}>
              <MenuItem
                onPress={() => {
                  onMeuItemSelectHandler(i);
                }}>
                {i.name}
              </MenuItem>
              <MenuDivider />
            </View>
          ))}
        </Menu>

        <Menu ref={setNotificationRef}>
          <Notifications />
        </Menu>

        <View
          style={{flexDirection: 'row', marginRight: 2, alignItems: 'center'}}>
          <Text style={{color: '#B4224F'}}>Send a </Text>
          <View>
            <Image
              source={Bee}
              style={{
                width: 6,
                height: 6,
                position: 'absolute',
                marginLeft: 18,
              }}
            />
            <Text style={{color: '#B4224F', fontWeight: 'bold', fontSize: 16}}>
              Bisoo
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuList: {
    marginTop: 35,
  },
  menuItem: {
    padding: 5,
    paddingLeft: 15,
    paddingTop: 10,
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
    flexDirection: 'row',
    backgroundColor: 'white',
    width: 150,
  },
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: 50,
    width: 100,
  },
  menu: {
    marginRight: 20,
  },
  square: {
    backgroundColor: '#f8f9f8',
    height: 120,
    shadowColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default AppHeader;
