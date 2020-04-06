var con = require('../lib/conexionbd')
function devolverTodasLasPeliculas(req,res){


    var sql = 'select * from pelicula';
    con.query(sql,function(error,resultado,fields){

            if(error){
                console.log('Hubo un error en la consulta', error.message);
                return res.status(404).send('hubo un error en la consulta');
            }
            var respuesta = {

                    'peliculas': resultado,
            }
            res.send(JSON.stringify(respuesta));
    })

}
module.exports = {

    mostrarTodasLasPeliculas: devolverTodasLasPeliculas,
}