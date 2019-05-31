const {
    MP3_CODEC,
    M4A_CODEC,
    FILE_LIMIT,
  } = require('../config.js');

  const express = require('express');

  const router = express.Router();
  const fs = require('fs');
  const ffmpeg = require('fluent-ffmpeg');
  
  /* ffmpeg encoder module */
  const encoder = require('../encoder.js');

  /* speech to text converter module */
  const converter = require('../speechToTextConverter.js');
  
  /* Media Files will be uploaded as Binary Blobs of Bytes */
  const bodyParser = require('body-parser');
  const rawBodyParser = bodyParser.raw({ type: '*/*', limit: FILE_LIMIT });
  
  /* Winston Logger - Configured in app.js */
  const winston = require('winston');
  
  /* MP3 Route */
  router.post('/mp3', rawBodyParser, function(req, res) {
    winston.info('Request Recieved - MP3');
    encodeAndDownload(MP3_CODEC, req.body, res);
  });
  
  /* M4A Route */
  router.post('/m4a', rawBodyParser, function(req, res) {
    winston.info('Request Recieved - M4A');
    encodeAndDownload(M4A_CODEC, req.body, res);
  });

  /* Video Route */
  router.post('/giant', rawBodyParser, async function(req, res) {
    winston.info('Request Recieved - from browser');
    fs.writeFileSync("./uploads/giant.odd", req.body, 'binary');
    await new Promise(r => {
        ffmpeg('./uploads/giant.odd')
        .on('end', function() {
            console.log('file has been converted succesfully');

            r(converter('./uploads/giant.wav'));
        })
        .on('error', function(err) {
            console.log('an error happened: ' + err.message);
        })
        // save to file
        .save('./uploads/giant.wav');
    }).then(response => res.body = response);
    
    
  });
  
  const generateId = () => parseInt(Math.random() * 1000000000)
  
  /** Encodes a file, sending a file download response to the clietn
   * @param {string} codec - Audio Codec Enum value (from constants.js)
   * @param {file} file - Unencoded audio file
   * @param {res} res - express response for download or error
   */
  function encodeAndDownload(codec, file, res) {
    winston.info(`Launching ${codec} Encoding Job`);
    encoder.encode(file, codec, generateId(), (err, output) => {
      if (err) {
        winston.error(`Encoder Error ${err}`);
        res.status(500).send();
      } else {
        winston.info(`Downloading Encoded ${codec} File ${output}`);
        res.download(output, 'output', (err, res) => {
          if (err) {
            winston.error(`Download Error ${err}`);
            res.status(500).send();
          } else {
            fs.unlink(output, (err, res) => {
              if (err) {
                winston.error(`File Deletion Error${err}`);
                res.status(500).send();
              }
              winston.info(`Deleting encoded file ${output}`);
            });
          }
        });
      }
    });
  }
  
  module.exports = router;