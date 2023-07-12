from .entities.Servicio import Servicio
from sqlalchemy import or_
from .. import db

class ModeloServicio():

    @classmethod
    def get_by_id(self, u):
        try:
            return Servicio.query.filter_by(id =u).first()
        except Exception as ex:
            raise Exception(ex)
        
    @classmethod
    def get_all_services(self):
        try:
            return Servicio.query.all()
        except Exception as ex:
            raise Exception(ex)

    #Obtener una lista de servicios que son favoritos solo id, title, description
    @classmethod
    def get_by_listFavoritos(self, lista):
        lista_servicios = []
        try:
            for x in lista:
                respuesta = Servicio.query.filter_by(id =x).first()
                lista_servicios.append(respuesta)
            return lista_servicios
        except Exception as ex:
            raise Exception(ex)  

    @classmethod
    def buscar_servicios(cls, termino_busqueda):
        try:
            # Realizar la consulta a la base de datos para buscar servicios según el término de búsqueda
            servicios = Servicio.query.filter(
                or_(
                    Servicio.titulo.ilike(f'%{termino_busqueda}%'),
                    Servicio.descripcion.ilike(f'%{termino_busqueda}%')
                )
            ).all()

            return servicios
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def eliminar_servicio(cls, user_id, serv_id):
        try:

            servicio = Servicio.query.filter_by(usuario_id = user_id, id = serv_id).first()
            if servicio:
                db.session.delete(servicio)
                db.session.commit()
                return True
            else:
                return False
        except Exception as ex:
            raise Exception(str(ex)) 

    