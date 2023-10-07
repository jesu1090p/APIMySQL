import {pool} from '../db.js';

export const getVentas = async (req, res) => {
    try {
        const [rows]= await pool.query('SELECT * FROM ventas');
        res.send(rows)
    } catch (error) {
        return res.status(500).json({message: 'Ha ocurrido un error'});
    }
}

//Obtener Ventas
export const getVenta = async(req,res) => {
    const codigo = req.params.codigo;
    try {
        const [rows] = await pool.query('SELECT * FROM ventas WHERE codigo=?', [codigo]);
        if (rows.length <=0) {
           return res.status(400).json({message: 'Producto no registrado'});
        }
        res.send(rows[0]);
    } catch (error) {
        return res.status(500).json({message: 'Ha ocurrido un error'});
    }
    console.log(req.params);
}

//Crear Ventas
export const createVentas = async (req, res) => {
        console.log(req.body);
        const { codigo_producto, nombre_cliente, telefono_cliente, fecha_venta, cantidad_vendida, total_venta } = req.body; 
        
        try {
            const [rows] = await pool.query('INSERT INTO sales (codigo_producto, nombre_cliente, telefono_cliente, fecha_venta, cantidad_vendida, total_venta) VALUES (?,?,?,?,?,?)', [codigo_producto, nombre_cliente, telefono_cliente, fecha_venta, cantidad_vendida, total_venta]); 
            
            console.log(rows);
            
            res.send({
                codigo_producto, nombre_cliente, telefono_cliente, fecha_venta, cantidad_vendida, total_venta 
            });
        } catch (error) {
            return res.status(500).json({ message: 'Ha ocurrido un error' + error  });
        }
    }
    
//Actualizar Ventas
export const updateVentas = async (req,res)=>{
    const {codigo} = req.params
    const {codigo_producto,nombre_cliente,telefono_cliente,fecha_venta,cantidad_vendida,total_venta} = req.body;
    try {
        const [result] = await pool.query('UPDATE ventas SET codigo_producto=?, nombre_cliente=?, telefono_cliente=IFNULL(?, telefono_cliente), fecha_venta=IFNULL(?, fecha_venta), cantidad_vendida=?, total_venta=? WHERE codigo = ?', [codigo_producto, nombre_cliente, telefono_cliente, fecha_venta, cantidad_vendida, total_venta, codigo]);

        if (result.affectedRows<=0) {
            return res.status(404).json({message:'Venta no registrado'})
        }
        const [rows] = await pool.query('SELECT * FROM ventas WHERE codigo=?',[codigo])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: 'Ha ocurrido un error'+ error});
    }
}

//Eliminar Ventas
export const deleteVentas = async (req,res)=>{
    const {codigo} = req.params
    try {
        const [result] = await pool.query('DELETE FROM ventas WHERE codigo = ?',[codigo])
        console.log(result)
        if (result.affectedRows<=0) {
            res.status(404).json({message:'Venta no registrado'})
        }
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: 'Ha ocurrido un error'});
    }
}
