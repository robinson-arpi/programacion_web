from .entities.Servicio import Servicio

class ModeloServicio():

    @classmethod
    def get_by_id(self, u):
        try:
            return Servicio.query.filter_by(id =u).first()
        except Exception as ex:
            raise Exception(ex)
        
       