const https = require('https');

const tracks = [
  '6zvqq50PL7io0rprbkrYc9', // Afterthought
  '0up9rhm9qt2LW7cnoDFCMk', // Jiyein Kyun
  '5PvwPy5eRO8BPwpRzCHK3D', // Sunn Raha Hai
  '2qgXrzJsry4KgYoJCpuaul', // Choo Lo
  '3beYHVCFKzbdNjJqjKeYpM', // Iktara
  '4mBmsPcPa1Eu4LDTHq55Ab', // Tum Mile
  '7fpWJr5shT90KiCHXKHxch', // O Saathi
  '05REArTDZQd59A9Y4XC0Aq'  // Phir Se Ud Chala
];

async function getPreviewUrl(id) {
  return new Promise((resolve) => {
    https.get(`https://open.spotify.com/track/${id}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/<meta property="og:audio" content="([^"]+)"/);
        resolve({ id, previewUrl: match ? match[1] : null });
      });
    }).on('error', () => resolve({ id, previewUrl: null }));
  });
}

async function main() {
  const results = await Promise.all(tracks.map(getPreviewUrl));
  console.log(JSON.stringify(results, null, 2));
}

main();
