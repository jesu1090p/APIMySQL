import {pool} from '../db.js';

export const getProductos = async (req, res) => {
    try {
        const [rows]= await pool.query('SELECT * FROM productos');
        res.send(rows)
    } catch (error) {
        return res.status(500).json({message: 'Ha ocurrido un error'});
    }
}

//Obtener productos
export const getProducto = async(req,res) => {
    const id = req.params.id;
    try {
        const [rows] = await pool.query('SELECT * FROM productos WHERE id=?', [id]);
        if (rows.length <=0) {
           return res.status(400).json({message: 'Producto no registrado'});
        }
        res.send(rows[0]);
    } catch (error) {
        return res.status(500).json({message: 'Ha ocurrido un error'});
    }
    console.log(req.params);
}

//Crear productos
export const createProductos = async (req,res)=>{
    console.log(req.body);
    const {nombre, descripcion, precio, inventario} = req.body
    try {
        const [rows]= await pool.query('INSERT INTO productos (nombre, descripcion, precio, inventario) VALUES (?,?,?,?)',[nombre, descripcion, precio, inventario]);
        console.log(rows)
        res.send({
            id:rows.insertId, nombre, descripcion, precio, inventario
        });
    } catch (error) {
        return res.status(500).json({message: 'Ha ocurrido un error'});
    }
}
//Actualizar productos
export const updateProductos = async (req,res)=>{
    const {id} = req.params
    const {nombre, apellido, direccion} = req.body;
    try {
        const [result] = await pool.query('UPDATE productos SET nombre=IFNULL(?,nombre),descripcion=IFNULL(?,descripcion),precio=IFNULL(?,precio),inventario=IFNULL(?,inventario) WHERE id = ?',[nombre,descripcion,precio,inventario,id])
        if (result.affectedRows<=0) {
            return res.status(404).json({message:'Prodcuto no registrado'})
        }
        const [rows] = await pool.query('SELECT * FROM productos WHERE id=?',[id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: 'Ha ocurrido un error'});
    }
}

//Eliminar productos
export const deleteProductos = async (req,res)=>{
    const {id} = req.params
    try {
        const [result] = await pool.query('DELETE FROM productos WHERE id = ?',[id])
        console.log(result)
        if (result.affectedRows<=0) {
            res.status(404).json({message:'Producto no registrado'})
        }
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: 'Ha ocurrido un error'});
    }
}
