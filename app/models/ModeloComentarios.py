from .entities.Comentarios import Comentario
from .. import db

class ModeloComentario():

    # Obtener todos los comentarios almacenados en la base de datos
    @classmethod
    def get_all(self):
        return Comentario.query.all()
    
    # Crear un nuevo usuario a la base de datos
    @classmethod
    def crear_comentario(self, nombre, calificacion, categoria, mensaje):
        nuevo_comentario = Comentario(nombre=nombre, calificacion=calificacion, categoria=categoria, mensaje=mensaje)
        db.session.add(nuevo_comentario)
        db.session.commit()
        return nuevo_comentario
