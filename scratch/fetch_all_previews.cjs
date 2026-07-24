const fs = require('fs');
const https = require('https');

const tracks = JSON.parse(fs.readFileSync('extracted_tracks.json', 'utf-8'));

async function getPreviewUrl(track) {
  return new Promise((resolve) => {
    https.get(`https://open.spotify.com/track/${track.id}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/<meta property="og:audio" content="([^"]+)"/);
        resolve({ ...track, previewUrl: match ? match[1] : null });
      });
    }).on('error', () => resolve({ ...track, previewUrl: null }));
  });
}

async function main() {
  const results = await Promise.all(tracks.map(getPreviewUrl));
  fs.writeFileSync('extracted_tracks_with_previews.json', JSON.stringify(results, null, 2));
  console.log('Done fetching previews. Results written to extracted_tracks_with_previews.json');
}

main();
