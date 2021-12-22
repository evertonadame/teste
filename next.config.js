/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const withSvgr = require('next-svgr');

module.exports = withPlugins([
  {
    reactStrictMode: true,
    images: {
      domains: [
        'platform-lookaside.fbsbx.com',
        'nextlevelimagesprofile.s3-sa-east-1.amazonaws.com',
        'plantoes-files.s3-sa-east-1.amazonaws.com',
        'plantoes-files.s3.sa-east-1.amazonaws.com',
        'avatars.githubusercontent.com',
      ],
    },
  },
  withSvgr,
]);
