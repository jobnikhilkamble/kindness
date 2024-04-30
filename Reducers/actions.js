import store from '../store';

export const UPDATE_RAW_DATA = 'UPDATE_RAW_DATA';

export const updateRawData = data => {
  store.dispatch({type: UPDATE_RAW_DATA, data: {...data}});
};

export const loginUser=(token)=>{
  store.dispatch({type:'LOGIN',token})
}