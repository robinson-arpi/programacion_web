from .entities.Busqueda import Busqueda
from sqlalchemy import or_

class ModeloServicio():
    @classmethod
    def get_by_id(self, u):
        try:
            return Busqueda.query.filter_by(id=u).first()
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def get_by_user_id(self, u):
        try:
            return Busqueda.query.filter_by(usuario_id=u)
        except Exception as ex:
            raise Exception(ex)
        
