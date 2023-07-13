from .entities.Busqueda import Busqueda
from sqlalchemy import desc
from .. import db

class ModeloBusqueda():
    @classmethod
    def get_by_id(self, u):
        try:
            return Busqueda.query.filter_by(id=u).first()
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def get_by_user_id(self, u):
        try:
            return Busqueda.query.filter_by(usuario_id=u).order_by(desc(Busqueda.fecha)).all()
        except Exception as ex:
            raise Exception(ex)
        
    @classmethod
    def eliminar_busqueda(cls, user_id, busc_id):
        try:
            busqueda = Busqueda.query.filter_by(usuario_id = user_id, id = busc_id).first()
            if busqueda:
                db.session.delete(busqueda)
                db.session.commit()
                return True
            else:
                return False
        except Exception as ex:
            raise Exception(str(ex))
        
