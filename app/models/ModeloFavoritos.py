from .entities.Favoritos import Favorito
from .. import db

class ModeloFavorito():

    # Obtener todos los favoritos almacenados en la base de datos
    @classmethod
    def get_all(self):
        return Favorito.query.all()
    
    # Crear un nuevo usuario a la base de datos
    @classmethod
    def crear_favorito(self, user_id, serv_id):
        nuevo_favorito = Favorito(idUser=user_id, idService=serv_id)
        db.session.add(nuevo_favorito)
        db.session.commit()
        return nuevo_favorito
    
    @classmethod
    def favorites_idUser(self, user_id):
        return Favorito.query.filter_by(idUsuario=user_id).all()
    
    @classmethod
    def eliminar_favorito(self, user_id, service_id):
        favorito = self.query.filter_by(idUsuario=user_id, idServicio=service_id).first()
        if favorito:
            db.session.delete(favorito)
            db.session.commit()
            return True
        else:
            return False