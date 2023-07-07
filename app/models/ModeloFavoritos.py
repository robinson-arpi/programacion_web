from .entities.Favoritos import Favorito
from .. import db

class ModeloFavorito():

    # Obtener todos los favoritos almacenados en la base de datos
    @classmethod
    def get_all(self):
        try:
            return Favorito.query.all()
        except Exception as ex:
            raise Exception(ex)
    
    # Crear un nuevo usuario a la base de datos
    @classmethod
    def crear_favorito(self, user_id, serv_id):
        try:
            nuevo_favorito = Favorito(idUser=user_id, idService=serv_id)
            db.session.add(nuevo_favorito)
            db.session.commit()
            if nuevo_favorito:
                return True
            else:
                return False
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def favorites_idUser(self, user_id):
        try:
            return Favorito.query.filter_by(idUsuario=user_id).all()
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def eliminar_favorito(self, user_id, service_id):
        try:
            favorito = self.query.filter_by(idUsuario=user_id, idServicio=service_id).first()
            if favorito:
                db.session.delete(favorito)
                db.session.commit()
                return True
            else:
                return False
        except Exception as ex:
            raise Exception(ex)