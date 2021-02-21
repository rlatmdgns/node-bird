module.exports = (sequelize, DataTypes) =>{
  const Image = sequelize.define({
    src:{
      type: DataTypes.STRING(200),
      allowNull:false,
    }
  },{
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  
  Image.associate = (db) => {};
  return Image;
}