import {useEffect, useState} from 'react';
import {doGet} from '../services/request';
import {useSelector} from 'react-redux';
import { updateRawData } from '../Reducers/actions';

export const usePost = userId => {
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [error, setError] = useState('');
  const {authToken = ''} = useSelector(state => state.rawData);

  const getPostData = async () => {
    try {
      setLoading(true);
      if (!authToken) {
        const {token} = await doGet('start-app');
        console.log(token);
        updateRawData({authToken: token});
      }
      let data = await doGet(userId ? `post/${userId}` : 'post');
      const groupMetaData = flatPostMeta(data.allPostMeta);
      const postWithMeta = data.allPost.map(ins => ({
        ...ins,
        metaData: groupMetaData[ins.id] || {},
      }));
      setPostList(postWithMeta);
    } catch (error) {
      setError('unable to get post details.');
      console.warn(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  return {loading, postList, error, getPostData};
};

export const flatPostMeta = meta => {
  return meta.reduce((data, {post_id, meta_key, meta_value}) => {
    if (!meta_key) return data;

    if (data[post_id]) {
      data[post_id] = {...data[post_id], [meta_key]: meta_value};
    } else {
      data[post_id] = {[meta_key]: meta_value};
    }
    return data;
  }, {});
};
