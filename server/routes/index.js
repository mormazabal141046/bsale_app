const express = require('express');
const router = express.Router();
const mysql = require(process.cwd()+'/server/db/conection.js');

// Consultas a Productos 

// Todos los productos
router.get('/products',(req,res)=>{
    const sql = 'SELECT p.*, c.id AS id_category, c.name AS category FROM category c INNER JOIN product p ON c.id = p.category';
    mysql.query(sql, (error, results)=>{
        if(error) throw error
        if(results.length > 0){
            res.json(results);
        }else{
            res.json([])
        }
    })
})
// Buscar productos por categoria
router.get('/products/categories/:id',(req,res)=>{
    const {id} = req.params;
    let add_query="";
    if(id && id > 0){
        add_query =  `WHERE c.id = ${id}`;
    }
    const sql = `SELECT p.*, c.id AS id_category, c.name AS category FROM category c INNER JOIN product p ON (c.id = p.category) ${add_query}`;
    mysql.query(sql, (error, results)=>{
        if(error) throw error
        if(results.length > 0){
            res.json(results);
        }else{
            res.json([])
        }
    })
})

// Buscar Productos por atributo o nombre
router.get('/products/:search',(req,res)=>{
    const {search} = req.params;
    let add_query="";
    if(search){
        add_query =  `WHERE c.name LIKE '%${search}%' OR p.name LIKE '%${search}%'`;
    }
    const sql = `SELECT p.*, c.id AS id_category, c.name AS category FROM category c INNER JOIN product p ON (c.id = p.category) ${add_query}`;
    mysql.query(sql, (error, results)=>{
        if(error) throw error
        if(results.length > 0){
            res.json(results);
        }
        else{
            res.json([])
        }
    })
})


// CONSULTAS A CATEGORIAS

// Obtener todas las categorias
router.get('/categories',(req,res)=>{
    const sql = 'SELECT * FROM category';
    mysql.query(sql, (error, results)=>{
        if(error) throw error
        if(results.length > 0){
            res.json(results);
        }else{
            res.json([])
        }
    })
})


module.exports = router;