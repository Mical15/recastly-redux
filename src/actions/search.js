import searchYouTube from '../lib/searchYouTube.js';
import changeVideoList from './videoList.js';
import changeVideo from './currentVideo.js';
import YOUTUBE_API_KEY from '../config/youtube.js';


var handleVideoSearch = (query) => {
  // on event
  //  fetch API
  //  dispatch other actions depending on fetch status
  // searchYouTube(query, () => Store.dispatch(changeVideoList));
  let options = {
    key: YOUTUBE_API_KEY,
    query: query
  };

  return (dispatch) => {
    console.log('searching');
    searchYouTube(options, (items) => {
      dispatch(changeVideoList(items));
      dispatch(changeVideo(items[0]));
    });
  //TODO:  Write an asynchronous action to handle a video search!
  };
};

export default handleVideoSearch;
