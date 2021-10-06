var getYouTubeInfo = ({id, key, max}, callback) => {
  $.get('https://www.googleapis.com/youtube/v3/channels', {
    part: 'snippet',
    key: key,
    id: id,
    maxResults: max
  })
    .done(({items}) => {
      if (callback) {
        callback(items);
      }
    })
    .fail(({responseJSON}) => {
      responseJSON.error.errors.forEach((err) =>
        console.error(err)
      );
    });
};


export default getYouTubeInfo;