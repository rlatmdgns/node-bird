module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // Mysql에는 users 테이블 생성  / User 모델이름인데 모델이름이 자동으로 소문자가 되고 복수가 되어서 mysql에 저장됨 
    //id가 이번족으로 들어있음
    email:{
      type: DataTypes.STRING(30), // string, text, boolean, integer, float, datetime 
      allowNull:false, //필수
      unique:true, //고유 값
    },
    nickname:{
      type: DataTypes.STRING(30),
      allowNull:false, //필수
    },
    password:{
      type: DataTypes.STRING(100),
      allowNull:false, //필수
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글저장
  });
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' })
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
  };
  return User;
};