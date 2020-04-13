
CREATE DATABASE QueVeoHoy;
USE QueVeoHoy;
/*SE CREA TABLA PELICULA*/
CREATE TABLE `pelicula`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(100),
  `anio` INT(5),
  `duracion` INT(5),
  `director` VARCHAR(400),
  `fecha_lanzamiento` DATE,
  `puntuacion` INT(2),
  `poster` VARCHAR(300),
  `trama` VARCHAR(700),
  PRIMARY KEY(`id`)
);

/*Hacer el insert de tabla de pelicula*/

/*Se crea tabla genero*/

CREATE TABLE `genero`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(30),
  PRIMARY KEY(`id`)
);
/*Se crea generoid a pelicula*/
ALTER TABLE pelicula ADD genero_id INT,
ADD FOREIGN KEY(genero_id) REFERENCES genero(id);

/*Hacer el insert de tabla de genero*/

/*Se crea tabla actor*/
CREATE TABLE actor(
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(70),
  PRIMARY KEY(`id`)
);
/*Se crea tabla actor_pelicula*/
CREATE TABLE actor_pelicula(
  `id` INT NOT NULL AUTO_INCREMENT,
  `actor_id` INT,
  `pelicula_id` INT,
  FOREIGN KEY(actor_id) REFERENCES actor(id),
  FOREIGN KEY(pelicula_id) REFERENCES pelicula(id),
  PRIMARY KEY (`id`)
);
/*Hacer el insert de tabla actores y peliculas*/
