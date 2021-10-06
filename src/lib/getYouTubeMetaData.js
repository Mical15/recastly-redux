var getYouTubeMetaData = ({id, key}, callback) => {
  $.get('https://www.googleapis.com/youtube/v3/videos', {
    part: 'statistics',
    key: key,
    id: id,
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


export default getYouTubeMetaData;