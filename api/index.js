//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js'); // requiero mi servidor que esta en app.js
const { conn } = require('./src/db.js');//REQUIERO MI INSTANCIA DE SEQUELICE QUE ME VA A PERMITIR HACER LA CONEXION DE MI SERVIDOR CON LA BASE DE DATOS.
require("dotenv").config();
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {// (CONN.SYNC) QUE HACE ? => EN CUANTO LEVANTO MI SERVIDOR SE HACE LA CONEXION DE MI SERVIDOR CON LA BASE DE DATOS(EN REALIDAD NO SE CONECTAN SINO QUE SE COMUNICAN)
  //EL FORCE TRUE PERMITE BORRAR TODO LO DE LA BASE DE DATOS Y VOLVER A CREAR LA TABLA CON LAS MODIFICACION.
  server.listen(process.env.PORT, () => {// levanto mi servidor en el puerto 3001
    console.log('%s listening at ', process.env.PORT); // eslint-disable-line no-console
  });
});
