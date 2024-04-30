import {useState} from 'react';
import {doPost} from '../services/request';
import {deserialize} from '../utils';
import {showToaster, serialize} from './../utils/index';

export const useLike = (post, user) => {

  const [likeList, setLikeList] = useState(
    deserialize(post?.metaData?.likeUserId || ''),
  );

  const onLikeClicked = async likeArray => {
    let newArray = [];

    console.log('likeArray');
    if (likeArray.includes(user.id)) {
      newArray = likeArray.filter(item => item !== user.id);
    } else {
      newArray = [...likeArray, user.id];
    }

    console.log('2');

    const likeSerialize = serialize(newArray);

    try {
      const response = await doPost('update-post-meta', {
        postId: post.id,
        postMeta: JSON.stringify({
          likeUserId: likeSerialize,
          likeCnt: newArray.length,
        }),
      });

      console.log(response);

      if (response.status === 200) {
        setLikeList(newArray);
      }
    } catch (error) {
      console.log(error);

      showToaster('Error while like the post.', {
        type: 'danger',
        duration: 3000,
      });
    }
  };

  return {likeList, onLikeClicked};
};
