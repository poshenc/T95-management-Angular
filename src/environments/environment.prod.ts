// for AWS S3 (build with: ng build --configuration production)
// export const environment = {
//   production: true,
//   domain: 'http://T95springbootapp-env.eba-rbpirpum.ap-southeast-1.elasticbeanstalk.com/api/',
//   socketEndpoint: "ws://T95springbootapp-env.eba-rbpirpum.ap-southeast-1.elasticbeanstalk.com/"
// };

// for Local Development
export const environment = {
  production: false,
  domain: 'http://localhost:8086/api/',
  socketEndpoint: "ws://127.0.0.1:8086/"
};
