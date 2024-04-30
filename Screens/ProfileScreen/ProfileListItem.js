import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import InputField from '../../components/Input';
import RoundButton from '../../components/RoundButton';
import {useLike} from './../../hooks/useLike';
import {useUpvote} from './../../hooks/useUpvote';

const ProfileListItem = ({
  showPostForm = false,
  post = {},
  userDetails = {},
}) => {
  const {likeList, onLikeClicked} = useLike(post, userDetails);
  const {upvoteList, onUpvoteClicked} = useUpvote(post, userDetails);

  return (
    <View style={{paddingBottom: 10}}>
      <View style={styles.row}>
        <View style={{flex: 1, marginTop: 5}}>
          <Text style={{...styles.blur}}>ErinDobson</Text>
          <Text style={styles.blur}>Vancouver, BC</Text>
        </View>
        <Text style={styles.blur}>15 mins ago</Text>
        <Icon name="dots-three-vertical" />
      </View>
      <Text style={{fontWeight: '700', marginTop: 5}}>{post.post_content}</Text>
      <View style={{flexDirection: 'row-reverse', marginTop: 5}}>
        <View style={{flexDirection: 'row', marginLeft: 20}}>
          <Icon name="chat" size={16} />
          <Text style={{fontSize: 12}}>185</Text>
        </View>
        <TouchableOpacity onPress={() => onLikeClicked(likeList)}>
          <View style={{flexDirection: 'row', marginLeft: 20}}>
            <Icon
              name={
                likeList.includes(userDetails.id) ? 'heart' : 'heart-outlined'
              }
              size={16}
            />
            <Text style={{fontSize: 12}}>{likeList?.length || 0}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onUpvoteClicked(upvoteList)}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="arrow-long-up" size={16} />
            <Text style={{fontSize: 12}}>{upvoteList?.length || 0}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {showPostForm && (
        <>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <InputField />
          </View>
          <View style={{flexDirection: 'row-reverse'}}>
            <RoundButton customStyles={{height: 30, width: 128, marginTop: 10}}>
              <Text>POST</Text>
            </RoundButton>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blur: {
    opacity: 0.6,
    color: 'black',
    fontSize: 12,
  },
});
export default ProfileListItem;
