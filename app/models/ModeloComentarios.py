from .entities.Comentarios import Comentario
from .. import db

class ModeloComentario():

    # Obtener todos los comentarios almacenados en la base de datos
    @classmethod
    def get_all(self):
        try:
            return Comentario.query.all()
        except Exception as ex:
            raise Exception(ex)
    
    # Crear un nuevo usuario a la base de datos
    @classmethod
    def crear_comentario(self, nombre, calificacion, categoria, mensaje):
        try:
            nuevo_comentario = Comentario(nombre=nombre, calificacion=calificacion, categoria=categoria, mensaje=mensaje)
            db.session.add(nuevo_comentario)
            db.session.commit()
            return nuevo_comentario
        except Exception as ex:
            raise Exception(ex)
