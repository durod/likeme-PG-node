// La clase Pool nos permite soportar multiconexiones y un mejor rendimiento en las consultas desde paquete pg
import pkg from "pg";
const { Pool } = pkg;

// definimos el objeto de conexion pool
const pool = new Pool({
  host: "localhost", //servidor local de maquina
  user: "postgres",
  password: "1234", // el password de cada no
  database: "likeme", // DB debe existir

  allowExitOnIdle: true, // cerrar sesion de conexion despues de cada consulta
});

// funcion para insertar un posts en la tabla en forma de parametros
const agregarPost = async ({ titulo, img, descripcion, likes }) => {
  console.log("Entro agregarPost: ", titulo, img, descripcion, likes);
  const consulta =
    "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *";
  const values = [titulo, img, descripcion, likes];
  const result = await pool.query(consulta, values);
  console.log(
    "---------------------------------------------------------------"
  );
  console.log("Post agregado");
  console.log("Objeto devuelto de la consulta: ", result);
  console.log("Filas procesadas: ", result.rowCount);
  console.log("Informacion ingresada: ", result.rows[0]);
  console.log(
    "----------------------------------------------------------------"
  );
};

// funcion listar el contenido de la tabla
const getPosts = async () => {
  const { rows, command, rowCount, fields } = await pool.query(
    "SELECT * FROM posts"
  ); //destructuring
  console.log("----------------------------------------------");
  console.log("post registrados en la tabla");
  console.log("Instruccion procesada: ", command);
  console.log("Filas procesadas: ", rowCount);
  console.log("Contenido procesado: ", rows);
  console.log("Campos procesados: ", fields);
  console.log("----------------------------------------------");

  return rows; // aqui si la funcion esta retornando algo
};

export { agregarPost, getPosts }; // exportacion nombrada de las funciones de consulta a la bd
