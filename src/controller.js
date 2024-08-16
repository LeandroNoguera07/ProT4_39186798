import {pool} from './database.js';

class LibroController{
    
    async getAll(req, res){
        
        const [result] = await pool.query('SELECT * FROM Libros'); 
        res.json(result);
    }

    
    async add(req, res){
        const libro = req.body;
        
	    try{
            const [result] = await pool.query(`INSERT INTO Libros(nombre, autor, categoria, año_publicacion	, isbn) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.isbn]);
		
		    res.json({"libro con el id insertado":result.insertId});

		 
	    }catch (e){

	        console.log( e);
		    const Error = e.message;
		    res.status(400).json({Error });	
	    }
    }

    async delete(req, res){
        const libro = req.body;
        
	    try{
            const[result] = await pool.query(`DELETE FROM Libros WHERE isbn=(?)`, [libro.isbn]);
		    res.json({"libros Eliminados ":result.affectedRows});

	    }catch (e){
	        console.log( e);
		    const Error = e.message;
		    res.status(400).json({Error });	

	    }
    }

    
    async update(req, res){
        const libro = req.body;
        
	    try{
            const [result] = await pool.query(`UPDATE Libros SET nombre=(?), autor=(?), categoria=(?), año_publicacion=(?), isbn=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.isbn, libro.id]);
		    res.json({"libros actualizados ":result.changedRows});
		
		
	    }catch (e){
		
	        console.log( e);
		    const Error = e.message;
		    res.status(400).json({Error });	
	
	    }
    }
    
    async getOne(req, res){
        
        try {
            const libro = req.body;
            const id_libro = parseInt(libro.id);
            const [result] = await pool.query(`SELECT * FROM Libros WHERE id=(?)`, [id_libro]);
            
            if (result[0]!=undefined){
                res.json(result);
            }else{
                res.json({"Error": "No se ha encontrado un Libro con el id especificado"});
            }
        } catch(error){
            
            console.log('There was an error', error);
        }
        
        
    }
}

export const libro = new LibroController();