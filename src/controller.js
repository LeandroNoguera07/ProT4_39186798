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
    const Libros = req.body;
    const [result] = await pool.query(`DELETE FROM Libros WHERE id(?)`,[Libros.id]);
    res.json({"Libro eliminado": result.affectedRows});
  }

  async update(req, res){
    const Libros = req.body;
    const [result] = await pool.query(`UPDATE Libros SET nombre=(?), autor=(?), categoria(?), año-publicacion(?), ISBN(?) WHERE id=(?)`, [Libros.nombre, Libros.autor, Libros.categoria, Libros.año-publicacion, Libros.ISBN, Libros.id]);
    res.json({"Libros actualizados": result.changedRows});
  }
}

export const Libros = new LibrosController();