import {pool} from './database.js';

class LibrosController{
  async getAll(req, res) {
    const [result] = await pool.query('SELECT * FROM Libros')
    res.json(result);
    }

  async add(req, res){
    const Libros = req.body;
    const [result] = await pool.query(`INSERT INTO Libros(nombre, autor, categoria, año-publicacion, ISBN) VALUES (?, ?, ?)`, [Libros.nombre, Libros.autor, Libros.categoria, Libros.publicado, Libros.ISBN]);
    res.json({"Libro insertado": result.insertId});
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