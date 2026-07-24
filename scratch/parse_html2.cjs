const fs = require('fs');

const html = fs.readFileSync('C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\fd7a5b76-05d6-4c84-89e0-a7dda27a420d\\.system_generated\\steps\\314\\content.md', 'utf-8');

const tracks = [];
const rows = html.split('data-testid="track-row"');
rows.shift(); // remove the part before the first track

for (const row of rows) {
  // id
  const idMatch = row.match(/id="listrow-title-track-spotify:track:([a-zA-Z0-9]+)-\d+"/);
  const id = idMatch ? idMatch[1] : null;
  
  // img
  const imgMatch = row.match(/<img[^>]*src="([^"]+)"/);
  const img = imgMatch ? imgMatch[1] : null;
  
  // title
  const titleMatch = row.match(/listRowTitle[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/);
  const title = titleMatch ? titleMatch[1].replace(/&quot;/g, '"') : null;
  
  // artists
  const detailsMatch = row.match(/listRowDetails([^<]*)([\s\S]*?)<\/p>/);
  let artist = '';
  if (detailsMatch) {
    const artistMatches = [...detailsMatch[2].matchAll(/<a[^>]*>([^<]+)<\/a>/g)];
    artist = artistMatches.map(m => m[1]).join(', ');
  }

  if (id && title) {
    tracks.push({ id, title, artist, img, previewUrl: '' });
  }
}

console.log(JSON.stringify(tracks, null, 2));
fs.writeFileSync('extracted_tracks.json', JSON.stringify(tracks, null, 2));
