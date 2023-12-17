// importando modulos personalizados
import { agregarPost, getPosts } from "./consulta.js";

// importando express
import express from "express";
const app = express();

//importando cors
import cors from "cors";

// middleware para parsear body enviado al servidor
app.use(express.json());
// Middleware para habilitar CORS
app.use(cors());

// levantando servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server en puerto: http://localhost:${PORT}`);
});

//rutas del enrutador/ Api Rest, enlazar ruta con funcion BD

//1. GET para ver todos los post registrados en la tabla likeme
app.get("/posts", async (req, res) => {
  const posts = await getPosts();
  res.json(posts); //respuesta del servidor que es la respuesta que dio la funcion de consulta a BD
});

//2. POST para ingresar un post en la tabla likeme
app.post("/posts", async (req, res) => {
  const { titulo, imgSrc, descripcion, likes } = req.body;
  console.log("valor req.body en la ruta /posts: ", req.body);
  await agregarPost({ titulo, img: imgSrc, descripcion, likes }); // llamado a la funcion de agregarPosts
  res.send("posts agregado con éxito"); // respuesta del servidor
});
