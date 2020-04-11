var con = require('../lib/conexionbd')
function devolverTodasLasPeliculas(req,res){
    var sql;
    var total;
    var cantidad = req.query.cantidad;
	var pagina = (req.query.pagina - 1) * cantidad;
    var anio = req.query.anio;
    var titulo = req.query.titulo;
    var genero = req.query.genero;
    var orden = req.query.columna_orden; // TITULO PUNTUACION O MAS NUEVA
    var tipoOrden = req.query.tipo_orden; // ASC DESC
    if(anio === undefined && titulo === undefined && genero === undefined){
             sql = 'select * from pelicula' +' order by '+orden+' '+ tipoOrden+  " limit "+ pagina +","+ cantidad;
             total = 'select count(*) as total from pelicula';
    }
    if(anio != undefined && titulo != undefined){

            sql = 'select * from pelicula where anio = '+anio+' and titulo like "'+titulo+'%'+'" order by '+ orden + ' ' + tipoOrden + " limit "+ pagina +","+ cantidad;
            total = 'select count(*) as total from pelicula where anio = '+anio+' and titulo like "'+titulo+'%'+'" order by '+ orden + ' ' + tipoOrden;
    }
    if(anio != undefined && genero != undefined){

            sql = 'select * from pelicula where anio = '+anio+' and genero_id = '+genero + ' order by '+ orden + ' ' + tipoOrden + " limit "+ pagina +","+ cantidad;
            total = 'select count(*) as total from pelicula where anio = '+anio+' and genero_id = '+genero + ' order by '+ orden + ' ' + tipoOrden;
    }
    if(genero != undefined && titulo != undefined){

            sql = 'select * from pelicula where genero_id = '+genero+' and titulo like "'+titulo+'%'+'"' + ' order by '+ orden + ' ' + tipoOrden + " limit "+ pagina +","+ cantidad;
            total = 'select count(*) as total from pelicula where genero_id = '+genero+' and titulo like "'+titulo+'%'+'"' + ' order by '+ orden + ' ' + tipoOrden;

    }
    if(genero === undefined && titulo === undefined && anio != undefined){
            sql = 'select * from pelicula where anio = '+anio + ' order by '+ orden + ' ' + tipoOrden + " limit "+ pagina +","+ cantidad;
            total = 'select count(*) as total from pelicula where anio = '+anio + ' order by '+ orden + ' ' + tipoOrden;

    }
    if(genero != undefined && titulo === undefined && anio === undefined){
            sql = 'select * from pelicula where genero_id = '+genero + ' order by '+ orden + ' ' + tipoOrden + " limit "+ pagina +","+ cantidad;
            total = 'select count(*) as total from pelicula where genero_id = '+genero + ' order by '+ orden + ' ' + tipoOrden;
    }
    if(genero === undefined && titulo != undefined && anio === undefined){
            sql = 'select * from pelicula where titulo like "'+titulo+'%'+'"' + ' order by '+ orden + ' ' + tipoOrden + " limit "+ pagina +","+ cantidad;
            total = 'select count(*) as total from pelicula where titulo like "'+titulo+'%'+'"' + ' order by '+ orden + ' ' + tipoOrden;
    }    
    con.query(sql,function(error,resultado,fields){
            if(error){
                console.log('Hubo un error en la consulta', error.message);
                return res.status(404).send('hubo un error en la consulta');
            }
            if(resultado.length === 0){
                console.log('No se encontro ninguna pelicula');
                return res.status(404).send('No se encontro ninguna pelicula');
            }
            con.query(total,function(error,resultadoTotal){

            var respuesta = {
                    'peliculas': resultado,
                    'total': resultadoTotal[0].total,
            }
            res.send(JSON.stringify(respuesta));
    })
});

}

function devolverGeneros(req,res){

    var sql = 'select * from genero';
    con.query(sql,function(error,resultado,fields){

        if(error){
            console.log('Hubo un error en la consulta', error.message);
            return res.status(404).send('hubo une error en la consulta');
        }
        var respuesta = {

            'generos': resultado,
        }
        res.send(JSON.stringify(respuesta));
    })
}

function devolverInfoPelicula(req,res){
var id = req.params.id;
var actores = 'select actor.nombre from pelicula inner join actor_pelicula on pelicula.id = actor_pelicula.pelicula_id join actor on actor.id = actor_pelicula.actor_id where pelicula.id = '+ id;
var pelicula = 'select titulo,trama,puntuacion,duracion,fecha_lanzamiento,director,anio,genero.nombre,poster from pelicula join genero on pelicula.genero_id = genero.id where pelicula.id = '+id;
con.query(pelicula,function(error,resultado,fields){
    if(error){
        console.log('Ha ocurrido un error, el id es invalido');
        return res.status(404).send('hubo un error en la consulta');
    }

    con.query(actores,function(error,actores){

            var respuesta = {

                    'pelicula': resultado[0],
                    'actores': actores,
                    'genero': resultado[0],

            }
            res.send(JSON.stringify(respuesta));
        })


    });
}

function Recomendador(req,res){
    var sql;
    var duracion = req.query.duracion;
    var anioInicio = req.query.anio_inicio;
    var anioFin = req.query.anio_fin;
    var puntuacion = req.query.puntuacion;
    var genero = req.query.genero;
    var pedido = 'select titulo,trama,genero.nombre,poster,pelicula.id from pelicula join genero on pelicula.genero_id = genero.id';
        if(anioInicio,anioFin,genero != undefined){

            sql = pedido + ' where anio > '+anioInicio+ ' and anio < '+anioFin + ' and genero.nombre = '+'"'+genero+'"';
        }else if(genero === undefined){
            sql = pedido + ' where anio > '+anioInicio+ ' and anio < '+anioFin;
        }
        if(puntuacion,genero != undefined){
            sql = pedido + ' where puntuacion  >= '+puntuacion + ' and genero.nombre = '+'"'+genero+'"';
        }else if (puntuacion != undefined){
            sql = pedido + ' where puntuacion  >= '+puntuacion;
        }
        console.log(duracion);
        console.log(anioFin);
        if(anioInicio === undefined && anioFin === undefined && puntuacion === undefined && genero === undefined){
            console.log('entra aca che');
            sql = pedido;
        }else if(genero != undefined){

            sql = pedido + ' and genero.nombre = '+'"'+genero+'"';
        }

        if(duracion != undefined && genero === undefined){
            
;            sql = pedido + ' where duracion <= '+ duracion;
        }else if(genero,duracion != undefined){
            sql = pedido + ' where duracion <= '+ duracion + ' and genero.nombre = '+'"'+genero+'"'; ;
        }

        console.log(sql);
        con.query(sql,function(error,resultado,fields){

            if(error){

                console.log('hubo un error en la consulta');
                return res.status(404).send('hubo un error en la consulta de recomendaciones');
            }
            var respuesta = {

                'peliculas': resultado,
            }

            res.send(JSON.stringify(respuesta));
        })


};
module.exports = {

    mostrarTodasLasPeliculas: devolverTodasLasPeliculas,
    mostrarTodosLosGeneros: devolverGeneros,
    mostrarPeliculaporid: devolverInfoPelicula,
    recomendarPelicula: Recomendador,
}