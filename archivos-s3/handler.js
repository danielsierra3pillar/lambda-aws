'use strict';

const serverless = require('serverless-http')
const express = require('express')

const app = express()
const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const multer = require('multer')
const multerS3 = require('multer-s3')

const upload = multer({
  storage: multerS3({
    s3,
    // acl: 'public-read', // access control list its a way to protect our bucket
    bucket: process.env.bucket,
    key: (req, file, callback) => {
      const fileExtension = file.originalname.split('.')[1]
      callback(null, `${Date.now(), toString()}.${fileExtension}`)
    } // name that its stored in bucket
  })
}).single('photo')

app.post('/upload', (req, res) => {

  upload(req, res, (error) => {
    if (error) {
      res.send('Error', error).status(500)
    } else {
      res.send('Archivo subido correctamente').status(200)
    }
  })

})

module.exports.app = serverless(app)