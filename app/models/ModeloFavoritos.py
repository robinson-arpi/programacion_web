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
    
    #Obtener solo los favoritos de un determinado usuario
    @classmethod
    def get_favorites_idUser(self, user_id):
        try:
            servicios_favoritos = Favorito.query.filter_by(idUsuario=user_id).all()
            return [servicio.idServicio for servicio in servicios_favoritos]
        except Exception as ex:
            raise Exception(ex)
    
    # Obtener un servicio favorito
    @classmethod
    def favorites_idUser(cls, user_id, serv_id):
        try:
            return Favorito.query.filter_by(idUsuario=user_id, idServicio=serv_id).all()
        except Exception as ex:
            raise Exception(str(ex))

    #Elimianr un servicio favorito
    @classmethod
    def eliminar_favorito(cls, user_id, serv_id):
        try:

            favorito = Favorito.query.filter_by(idUsuario = user_id, idServicio = serv_id).first()
            if favorito:
                db.session.delete(favorito)
                db.session.commit()
                return True
            else:
                return False
        except Exception as ex:
            raise Exception(str(ex))
