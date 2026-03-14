import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.cloudname, 
  api_key: process.env.cloudapikey, 
  api_secret: process.env.cloudsecret
})

export default cloudinary;