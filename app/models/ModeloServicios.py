from .entities.Servicio import Servicio

class ModeloServicio():

    @classmethod
    def get_by_id(self, u):
        try:
            return Servicio.query.filter_by(id =u).first()
        except Exception as ex:
            raise Exception(ex)

    #Obtener una lista de servicios que son favoritos solo id, title, description
    @classmethod
    def get_by_listFavoritos(self, lista):
        lista_servicios = []
        try:
            for x in lista:
                respuesta = Servicio.query(Servicio.id, Servicio.titulo, Servicio.descripcion).filter_by(id = x).first()
                lista_servicios.append(respuesta)
            return lista_servicios
        except Exception as ex:
            raise Exception(ex)   
    

    