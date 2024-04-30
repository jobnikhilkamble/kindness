import React from 'react';
import {View, Text} from 'react-native';
import {Textarea} from 'native-base';
import RoundButton from '../../components/RoundButton';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import TextAreaField from '../../components/TextAreaField';
import InputField from '../../components/Input';

const PostView = props => {
  const {onPost, showPostForm = true, postViewProps = {}} = props;
  const {user, setUser, email, setEmail, post, setPost} = postViewProps;

  return (
    <LinearGradient colors={['#FF9898', '#FF5579']} style={styles.postView}>
      {showPostForm ? (
        <View>
          <Text style={styles.text}>Share an act of kindness</Text>
          <View style={styles.postTextView}>
            <TextAreaField
              id="post"
              values={{post}}
              onChange={e => setPost(e)}
              placeholder="When is a time you experienced an act of kindness…"
            />
            <RoundButton
              onPress={onPost}
              text={'POST'}
              customStyles={{width: 60}}
            />
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.text}>Sign your thank you card</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{marginRight: 10, color: 'white', fontWeight: 'bold'}}>
              Name
            </Text>
            <InputField
              value={user}
              customStyles={{height: 40}}
              onChangeText={setUser}
            />
          </View>

          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Text style={{marginRight: 10, color: 'white', fontWeight: 'bold'}}>
              Email
            </Text>
            <InputField
              customStyles={{height: 40}}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={{marginTop: 20, ...styles.postTextView}}>
            <TextAreaField
              id="post"
              values={{post}}
              onChange={e => setPost(e)}
              placeholder="When is a time you experienced an act of kindness…"
            />
            <RoundButton
              onPress={onPost}
              text={'POST'}
              customStyles={{width: 60}}
            />
          </View>
        </View>
      )}
    </LinearGradient>
  );
};

export default PostView;
