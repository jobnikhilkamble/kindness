import Axios, {AxiosResponse, AxiosError} from 'axios';
import {Platform} from 'react-native';
import {END_POINT} from '../constants';
import {updateRawData} from '../Reducers/actions';
import {getServerURL, getRequestedHeader} from '../utils';

export const doGet = async url => {
  try {
    updateRawData({showLoader: true});
    const {data} = await Axios.get(`${END_POINT}${url}`, getRequestedHeader());
    updateRawData({showLoader: false});

    return data;
  } catch (error) {
    updateRawData({showLoader: false});

    console.warn(error);
  }
};

export const doPost = (url, data) => {
  updateRawData({showLoader: true});

  return Axios.post(`${END_POINT}${url}`, data, getRequestedHeader())
    .then(response => {
      updateRawData({showLoader: false});

      return response.data;
    })
    .catch(error => {
      updateRawData({showLoader: false});

      throw error;
    });
};

export const uploadImage = async (photo, id) => {
  try {
    updateRawData({showLoader: true});

    const data = new FormData();
    data.append('file', {
      name: photo.fileName,
      type: photo.type,
      uri: photo.uri,
    });

    const options = {
      method: 'POST',
      headers: {'content-type': 'multipart/form-data'},
      data,
      url: `${END_POINT}upload`,
    };

    const response = await Axios.post(`${END_POINT}upload/${id}`, data, {
      'content-type': 'multipart/form-data',
    }); // wrap in async function

    updateRawData({showLoader: false});
    return response.data;
  } catch (err) {
    updateRawData({showLoader: false});
  }
};
