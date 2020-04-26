module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'cute_cat',
  synchronize: true,
  entities: ['dist/**/**.entity.js'],
};
