const fs = require('fs');

const html = fs.readFileSync('C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\fd7a5b76-05d6-4c84-89e0-a7dda27a420d\\.system_generated\\steps\\314\\content.md', 'utf-8');

// The HTML has sections for each track like:
// <div class="...e-10451-legacy-list-row..." ... aria-label="Afterthought" data-testid="track-row">
// Inside it has <img ... src="https://i.scdn.co/image/ab67616d0000485153f6fa0d2589c6a7174f4b81"
// and <a draggable="false" class="K5oeha_Oiu4AsXVx" href="/track/6zvqq50PL7io0rprbkrYc9">
// and artist links.

const tracks = [];
const rowRegex = /data-testid="track-row"[\s\S]*?id="listrow-title-track-spotify:track:([a-zA-Z0-9]+)-\d+"[\s\S]*?<img[\s\S]*?src="([^"]+)"[\s\S]*?<p[^>]*listRowTitle[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>[\s\S]*?listRowDetails([^<]*)([\s\S]*?)<\/p>/g;

let match;
while ((match = rowRegex.exec(html)) !== null) {
  const id = match[1];
  const img = match[2];
  const title = match[3];
  const artistsHtml = match[5];
  
  // extract artists
  const artistMatches = [...artistsHtml.matchAll(/<a[^>]*>([^<]+)<\/a>/g)];
  const artists = artistMatches.map(m => m[1]).join(', ');

  tracks.push({
    id,
    title,
    artist: artists,
    img,
    previewUrl: ''
  });
}

console.log(JSON.stringify(tracks, null, 2));

// write to a file so we can read it easily
fs.writeFileSync('extracted_tracks.json', JSON.stringify(tracks, null, 2));
