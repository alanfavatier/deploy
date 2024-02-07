const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('dog', {// SEQUELIZE.DEFINE SIRVE PARA CREAR EL MODELO. EL PRIMER ARGUMENT VA A SER EL NOMBRE DE MI MODELO, EL SEGUNDO VA A SER LOS ATRIBUTOS QUE YO  QUIERO QUE TENGA MI MODELO, Y EL TERCERO LAS OPCIONES QUE QUEREMOS DARLE AL MODELO(TIMESTAPE:TIEMPO DE CREACION)
    id:{
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue:DataTypes.UUIDV4, 
      allowNull:false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_min:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    height_max:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    weight_min:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    weight_max:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
   life_span:{
    type: DataTypes.INTEGER,
    allowNull:false


   }, 

   image:{
    type: DataTypes.STRING,
    allowNull:false
   } ,
   
   created:{
    type: DataTypes.BOOLEAN,
    defaultValue: true,  
   }

  });
};
