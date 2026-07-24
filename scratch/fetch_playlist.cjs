const https = require('https');

const url = 'https://open.spotify.com/playlist/3mCOEn9od5jc3suDHqhQB4';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Find initial state JSON
    const match = data.match(/<script id="initial-state" type="text\/plain">(.*?)<\/script>/);
    if (!match) {
      console.log('Failed to find initial state');
      return;
    }
    
    try {
      // The state is base64 encoded
      const buffer = Buffer.from(match[1], 'base64');
      const jsonStr = buffer.toString('utf-8');
      const state = JSON.parse(jsonStr);
      
      // Extract tracks. The path might vary depending on Spotify's internal store structure
      // We will look for entities.items or similar in the state
      // Instead of guessing, let's just write the json to a file so we can inspect it
      require('fs').writeFileSync('playlist_state.json', jsonStr);
      console.log('Wrote playlist_state.json');
      
    } catch (e) {
      console.log('Error parsing:', e.message);
    }
  });
}).on('error', (e) => {
  console.log('Request error:', e);
});
