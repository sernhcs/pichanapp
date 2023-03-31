require('dotenv').config();

module.exports={
  //conexiòn
  username: process.env.DB_USERNAME||"root",
  password: process.env.DB_PASSWORD||"root",
  database: process.env.DB_DATABASE||"db_jwtand",
  host: process.env.DB_HOST||"localhost",
  dialect: process.env.DB_DIALECT||"mysql",
  port: process.env.DB_PORT||"3306",
  //configurar seeds
  seederStorage:"sequelize",
  //seederStoragePath:"sequelizeSeeds.json",
  seederStorageTableName:"Seeds",


  //configurar migraciones
  migrationStorage: "sequelize",
  migrationStorageTableName: "migrations",

  define:{
    timestamps:false,

    // crea claves foranes user_id en vez de userId
    underscored:false
  }
}


















