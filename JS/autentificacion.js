gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: 'AIzaSyDzCuIg5IlcXnlh05-cS_6cIqdvmavwJuw',
      clientId: '65561100666-1m0pla4f14ggohq8554jfmohtg2lh1gb.apps.googleusercontent.com',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
      scope: 'https://www.googleapis.com/auth/youtube.force-ssl'
    });
  });