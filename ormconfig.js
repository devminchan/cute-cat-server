module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'cute_cat',
  synchronize: true,
  entities: ['dist/**/**.entity.js'],
};
