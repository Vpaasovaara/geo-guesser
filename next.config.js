/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    mongooseURL: "mongodb+srv://codecamp:saniainen987@cluster0.qixnm.mongodb.net/tietokanta?retryWrites=true&w=majority"
  },
  images: {
    domains: ['https://restcountries.com', 'localhost', 'flagcdn.com']
  }
}

module.exports = nextConfig
