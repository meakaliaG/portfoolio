const fs = require('fs');
const path = require('path');

// const loadFile = (request, response, endPath, type) => {
//   const file = path.resolve(__dirname, endPath);

//   fs.stat(file, (err, stats) => {
//     if (err) {
//       if (err.code === 'ENOENT') {
//         response.writeHead(404);
//       }
//       return response.end(err);
//     }

//     let { range } = request.headers;

//     if (!range) {
//       range = 'bytes=0-';
//     }

//     const positions = range.replace(/bytes=/, '').split('-');

//     let start = parseInt(positions[0], 10);

//     const total = stats.size;
//     const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

//     if (start > end) {
//       start = end - 1;
//     }

//     const chunksize = (end - start) + 1;

//     response.writeHead(206, {
//       'Content-Range': `bytes ${start}-${end}/${total}`,
//       'Accept-Ranges': 'bytes',
//       'Content-Length': chunksize,
//       'Content-Type': type,
//     });

//     const stream = fs.createReadStream(file, { start, end });

//     stream.on('open', () => {
//       stream.pipe(response);
//     });

//     stream.on('error', (streamErr) => {
//       response.end(streamErr);
//     });

//     return stream;
//   });
// };

// loadFile example use:
// const getParty = (request, response) => {
//   loadFile(request, response, '../client/party.mp4', 'video/mp4');
// };

// const index = fs.readFile(`${__dirname}`);

// const getIndex = (request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/html' });
//   response.write(index);
//   response.end();
// };

const loadPage = (req, res) => {
    return res.render('app');
};


module.exports = {
    loadPage,
};