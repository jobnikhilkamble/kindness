import React from 'react'
import { View, Text } from 'react-native'
import { MenuDivider, MenuItem } from 'react-native-material-menu'

const Notifications = () => {
    return (
        <>
        <MenuItem>
            <Text>KAZ MENTIONED YOU IN A POST</Text>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <Text>KAZ MENTIONED YOU IN A POST</Text>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <Text>KAZ MENTIONED YOU IN A POST</Text>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <Text>KAZ MENTIONED YOU IN A POST</Text>
          </MenuItem>
          <MenuDivider />
          </>
    )
}

export default Notifications
