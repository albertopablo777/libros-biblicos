//express
const express = require('express');
const app = express();
const PORT = 3000; //puede cambiar

//array
let librosBiblicos = [
    {id: 1 , nombre:'Genesis' , autor: 'Moises', anioPublicacion:2020},
    {id: 2 , nombre:'Exodo' , autor: 'Moises' , anioPublicacion:2024},
    {id: 3 , nombre:'Levitico' , autor: 'Moises' , anioPublicacion:1990},  
];
//manejo de JSON
app.use(express.json());
//endpoint 1 obtener todos los libros
app.get('/libros', (req, res) => {
    res.json(librosBiblicos);
});
// endpoint 2 obtener libro por ID
app.get('/libros/:id',(req, res) => {
    const idCapturado = parseInt(req.params.id);
    console.log(idCapturado);
    const libroEncontrado = librosBiblicos.find((libro) => libro.id === idCapturado);
    if (libroEncontrado) {
        res.json(libroEncontrado);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});
// endpoint 3 Agregar un libro
app.post('/agregar-libro', (req, res) => {
    const nuevoLibro = req.body;
    console.log(nuevoLibro);
    librosBiblicos.push(nuevoLibro);
    res.status(201).json('este libro fue guardado exitosamente');
})
// endpoint 4 Actualizar el libro
app.put('/actualizar-libro/:id', (req, res) => {
    const idCapturado = parseInt(req.params.id);
    const indexLibroLocalizado = librosBiblicos.findIndex((libro) => libro.id === idCapturado);
    if (indexLibroLocalizado !== -1 ){
        librosBiblicos[indexLibroLocalizado] = req.body;
        res.json(librosBiblicos[indexLibroLocalizado]);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});
// endpoint 5 Eliminar Libro
app.delete('/eliminar-libro/:id', (req, res) => {
    const id = parseInt(req.params.id);
    lBiblico = librosBiblicos.filter( libro => libro.id !== id);
    res.status(201).json({mensaje : 'se ha eliminado el libro'});
    console.log(lBiblico);
});
//endpoint 6 
app.get('/libros/publicacion/:anio', (req, res) => {
    const year =  parseInt(req.params.anio);
    const librosPublicados = librosBiblicos.filter( x => x.anioPublicacion === year);
    if (librosPublicados.length > 0) {
        res.json(librosPublicados);
    } else {
        res.status(404).json({mensaje : 'no se han encontrado libros publicados en ese anio'});
    }
});
//PRACTICA1 : bienvenida con su nombre y su profesion actual
app.get('/welcome/:name/:profession', (req, res) => {
    const name = req.params.name;
    const profession = req.params.profession;
    res.send(`Hola soy ${name}! Yo trabajo como ${profession}.`);
});
// endpoint 8: Obtener libros por autor
app.get('/libros/autor/:autor', (req, res) => {
    const autor = req.params.autor;
    const librosByAutor = librosBiblicos.filter((libro) => libro.autor === autor);
    if (librosByAutor.length > 0) {
      res.json(librosByAutor);
    } else {
       res.status(404).json({ mensaje: 'No se han encontrado libros de este autor' });
    }
});
// endpoint 9: Obtener la cantidad total de libros
app.get('/total', (req, res) => {
    const totallibros = librosBiblicos.length;
    res.json({totallibros });
});
//endpoint 10: recuperar libros por su nombre
app.get('/libros/nombre/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const librosByNombre = librosBiblicos.filter((libro) => libro.nombre === nombre);
    if (librosByNombre.length > 0) {
      res.json(librosByNombre);
    } else {
      res.status(404).json({ mensaje: 'No se han encontrado libros con este nombre' });
    }
});
//endpoint 10: ordenar libros por nombre
app.get('/sorted', (req, res) => {
    const sortedLibros = librosBiblicos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    res.json(sortedLibros);
});

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto http://localhost:" + PORT);
});