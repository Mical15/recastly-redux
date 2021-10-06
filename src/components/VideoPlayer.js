import React from 'react';
import PropTypes from 'prop-types';
import getYouTubeInfo from '../lib/getYouTubeDescription.js';
import YOUTUBE_API_KEY from '../config/youtube.js';
import getYouTubeMetaData from '../lib/getYouTubeMetaData.js';


class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channelTitle: null,
      channelDes: null,
      viewCount: 0,
      likeCount: 0,
      dislikeCount: 0,
    };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.video.snippet.channelId !== this.props.video.snippet.channelId) {
      getYouTubeInfo({id: this.props.video.snippet.channelId, key: YOUTUBE_API_KEY, max: 1}, (items) => {
        this.setState({
          channelTitle: items[0].snippet.title,
          channelDes: items[0].snippet.description
        });
      });
      getYouTubeMetaData({id: this.props.video.id.videoId, key: YOUTUBE_API_KEY}, (items) => {
        this.setState({
          viewCount: items[0].statistics.viewCount,
          likeCount: items[0].statistics.likeCount,
          dislikeCount: items[0].statistics.dislikeCount
        });
      });
    }
  }

  componentDidMount() {
    getYouTubeInfo({id: this.props.video.snippet.channelId, key: YOUTUBE_API_KEY, max: 1}, (items) => {
      this.setState({
        channelTitle: items[0].snippet.title,
        channelDes: items[0].snippet.description
      });
    });
    getYouTubeMetaData({id: this.props.video.id.videoId, key: YOUTUBE_API_KEY}, (items) => {
      this.setState({
        viewCount: items[0].statistics.viewCount,
        likeCount: items[0].statistics.likeCount,
        dislikeCount: items[0].statistics.dislikeCount
      });
    });
  }

  render() {
    return (
      !this.props.video
        ? <div className="video-player">Please wait...</div>
        : <div className="video-player">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${this.props.video.id.videoId}`} allowFullScreen></iframe>
          </div>
          <div className="video-player-details">
            <div className='ratingBar'>
              <span><img className='icon' src=' https://image.flaticon.com/icons/png/512/65/65000.png'/>{Number(this.state.viewCount).toLocaleString()} Views</span>
              <span><img className='icon' src="https://p7.hiclipart.com/preview/602/279/755/computer-icons-facebook-like-button-thumb-signal-button.jpg"/>{Number(this.state.likeCount).toLocaleString()}</span>
              <span><img className='icon' src='https://p7.hiclipart.com/preview/242/383/831/5bbf5a5daabc5.jpg'/>{Number(this.state.dislikeCount).toLocaleString()}</span>
            </div>
            <h3>{this.props.video.snippet.title}</h3>
            <h4 className='channel'>{this.state.channelTitle}</h4>
            <h5 className='channel'>{this.state.channelDes}</h5>
            <div>{this.props.video.snippet.description}</div>
          </div>
        </div>
    );
  }
}



// var VideoPlayer = ({video}) => (
//   !video
//     ? <div className="video-player">Please wait...</div>
//     : <div className="video-player">
//       <div className="embed-responsive embed-responsive-16by9">
//         <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${video.id.videoId}`} allowFullScreen></iframe>
//       </div>
//       <div className="video-player-details">
//         <h3>{video.snippet.title}</h3>
//         <h5>video.snippet</h5>
//         <div>{video.snippet.description}</div>
//       </div>
//     </div>
// );

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
VideoPlayer.propTypes = {
  video: PropTypes.object.isRequired
};

export default VideoPlayer;
