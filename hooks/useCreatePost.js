import {useReducer, useState} from 'react';
import {doPost} from '../services/request';
import store from './../store';

export const ADD_UPDATE_POST_ATTRIBUTE = 'ADD_UPDATE_POST_ATTRIBUTE';
export const ADD_UPDATE_POST_META_ATTRIBUTE = 'ADD_UPDATE_POST_META_ATTRIBUTE';
export const ADD_UPDATE_POST_INPUT_ERROR = 'ADD_UPDATE_POST_INPUT_ERROR';
export const CLEAR_ALL_POST_INPUT_ERROR = 'CLEAR_ALL_POST_INPUT_ERROR';
export const ADD_OR_UPDATE_SENDER_NAME_AND_EMAIL =
  'ADD_OR_UPDATE_SENDER_NAME_AND_EMAIL';
export const ADD_OR_UPDATE_RECIPIENT_NAME_AND_EMAIL =
  'ADD_OR_UPDATE_RECIPIENT_NAME_AND_EMAIL';

export const ADD_OR_UPDATE_SENDER_INFO = 'ADD_OR_UPDATE_SENDER_INFO';
export const ADD_OR_UPDATE_RECIPENT_INFO = 'ADD_OR_UPDATE_RECIPENT_INFO';

export const addUpdatePostAttributeAction = (dispatch, payload = {}) => {
  dispatch({type: ADD_UPDATE_POST_ATTRIBUTE, payload});
};

export const addUpdatePostMetaAction = (dispatch, payload = {}) => {
  dispatch({type: ADD_UPDATE_POST_META_ATTRIBUTE, payload});
};

export const addUpdatePostInputErrorAction = (dispatch, payload = {}) => {
  dispatch({type: ADD_UPDATE_POST_INPUT_ERROR, payload});
};

export const clearAllPostInputErrorAction = dispatch => {
  dispatch({type: CLEAR_ALL_POST_INPUT_ERROR});
};

export const addOrUpdateSenderDetails = (dispatch, payload = {}) => {
  dispatch({type: ADD_OR_UPDATE_SENDER_INFO, payload});
};

export const addOrUpdateRecipientDetails = (dispatch, payload = {}) => {
  dispatch({type: ADD_OR_UPDATE_RECIPENT_INFO, payload});
};

const reducer = (input, action) => {
  switch (action.type) {
    case ADD_UPDATE_POST_ATTRIBUTE:
      return {...input, ...action.payload};

    case ADD_UPDATE_POST_META_ATTRIBUTE:
      const postMeta = {...input.postMeta, ...action.payload};
      return {...input, postMeta};

    case ADD_UPDATE_POST_INPUT_ERROR:
      const error = {...input.error, ...action.payload};
      return {...input, error};

    case CLEAR_ALL_POST_INPUT_ERROR:
      return {...input, error: {}};

    case ADD_OR_UPDATE_SENDER_INFO:
      let {data, index} = action.payload;
      let senderInfo = [];
      if (index || index === 0) {
        senderInfo = [...input.senderInfo];
        senderInfo[index] = data;
      } else {
        const senderInfo = [...input.senderInfo, data];
        return {...input, senderInfo};
      }

    case ADD_OR_UPDATE_RECIPENT_INFO:
      let {data: ud, index: i} = action.payload;
      let receiverInfo = [];
      if (i || i === 0) {
        receiverInfo = [...input.receiverInfo];
        receiverInfo[i] = ud;
      } else {
        const receiverInfo = [...input.receiverInfo, ud];
        return {...input, receiverInfo};
      }

    case ADD_OR_UPDATE_RECIPIENT_NAME_AND_EMAIL:
      return input;

    default:
      return input;
  }
};

const postInitial = {
  commentStatus: 'Open',
  postType: 'act',
};

const bisooInitial = {
  commentStatus: 'Closed',
  postType: 'bisoo',
};

const otherData = {
  author: '',
  content: '',
  postStatus: 'Publish',
  postName: '',
  postMeta: {
    postanonymously: 'No',
  },
  error: {},
  senderInfo: [],
  receiverInfo: [],
};

const bisooOtherData = {
  postMeta: {
    font_colour: '#000',
    card_colour: '#ffcc4c',
    bisoo_price: '$0',
    live_time_price: '$0',
    signature_price: '$0',
    custom_url_price: '$0',
    amount: '$0',
    card_live_time: '1 Month',
    customize_url: 'url',
    sendDate: new Date(),
    startDate: new Date(),
    numberofsignature: 10,
    card_viewing: 'Private',
    card_signing: 'Private',
    selectedOption: 'DATE'
  },
};

const signBisoo = {
  postMeta: {
    bisooSignin: '',
    bisooEmail: '',
    bisooName: '',
    thankYouId: '',
  },
};

const initialStateByType = {
  bisoo: {
    ...bisooInitial,
    ...otherData,
    ...bisooOtherData,
  },
  post: {
    ...postInitial,
    ...otherData,
  },
  signBisoo: {
    ...postInitial,
    ...signBisoo,
  },
};

export const useCreatePost = (type, initialData = {}) => {
  const [status, setStatus] = useState(0);
  const [state, dispatch] = useReducer(reducer, {
    ...initialStateByType[type],
    ...initialData,
  });

  const addUpdatePost = async () => {
    try {
      setStatus(1);

      const senderInfo = state.senderInfo || [];
      const receiverInfo = state.receiverInfo || [];

      const sendername = senderInfo.map(item => item.name).join();
      const sendermail = senderInfo.map(item => item.mail).join();
      const recipientname = receiverInfo.map(item => item.name).join();
      const recipientemail = receiverInfo.map(item => item.mail).join();

      const meta = {
        ...state.postMeta,
        sendername,
        sendermail,
        recipientname,
        recipientemail,
      };

      delete state.error;
      delete state.senderInfo;
      delete state.receiverInfo;

      console.log({
        ...state,
        author: store.getState().rawData.userDetails.id,
        postMeta: JSON.stringify(meta),
      });
      const response = await doPost('create-post', {
        ...state,
        author: store.getState().rawData.userDetails.id,
        postMeta: JSON.stringify(meta),
      });
      setStatus(2);

      return response
    } catch (error) {
      console.log(error);
    }
  };

  return {state, dispatch, addUpdatePost, status};
};
