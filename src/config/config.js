const config = {
  production: {
    secret: process.env.secret,
    MONGO_URI: process.env.MONGO_URI,
    port: process.env.PORT,
  },
  development: {
    secret: "KJ@tga4A#$yata3QT",
    MONGO_URI: "mongodb://localhost/mern_api",
    port: 3000,
  },
};

export const getConfig = (env) => config[env] || config.development;
