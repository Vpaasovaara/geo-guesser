/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    mongooseURL: "mongodb+srv://codecamp:saniainen987@cluster0.qixnm.mongodb.net/score-App?retryWrites=true&w=majority"
  },
  images: {
    domains: ['https://restcountries.com', 'localhost', 'flagcdn.com', 'upload.wikimedia.org']
  }
}

module.exports = nextConfig
