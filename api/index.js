//  ---___--_-_-__       _oo0oo_
//  .   °°---___-´'´´  o).8.8.8.(o
//   .                  88" 0 "88
//    .             *   (| *_* |)
//     .          *     0\ ... /0
//      .       *  O))__/: ___ :\__((O
//       .    *    ).' \\| .*. |// '.(
//        . *     '/ \||||; : ;||||/ \'
//        *.      / -|\|// -:- \\|/|- \
//       ***.    | . |/\\\  -  ///\| . |
//      * ***.   | \_|  ''\---/''  |_/ |
//     * **  *.  \  .-\_<>_'-'_<>_/-. /
//    * * *   *.__'. .'  /--.--\  '. .'___
//   *   **  ."" '< `.___\_<|>_/___.' >' "".
//  * *   *| | :```-.\`.;`\ _ /´;.´/.-´´´: | |
// *   *  *\  \ `_.   \_ __\ /__ _/   .-´ /  /
//  *  =====`-.____`.___ \_____/___.-´___.-´=====
//   *                   `=---=´
//    *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/server.js');
const { db } = require('./src/db.js');
const path = "api/index.js"
const user = require('./src/controllers/Users/Users');
const { bitHash } = require('./src/db');
const {getCountries} = require('./src/controllers/country')

async function admin(){
  try {
    const passEncrypt = bitHash.encrypt("admin");
    return await user.create("sebas", "admin", passEncrypt.toString(), "peru", "sebas.goyas@gmail.com", 0, true, true, "Pro-Admin", "")
    .then(result => console.log("Administrador creado"))
    .catch(error => console.log(`Error: ${error}\nRuta: ${path}\nFunción: admin`));
  } catch (error) {
    return console.log(`Error: ${error}\nRuta: ${path}\nFunción: admin`);
  }
}

db.sync({ force: true }).then(() => {
  getCountries()
  server.listen(process.env.PORT, () => {
    admin();
    console.log('escuchando');
  });
});