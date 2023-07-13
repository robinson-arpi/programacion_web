from .entities.Agendamientos import Agendamiento
from .. import db

class ModeloAgendamiento():

    # Obtener todos los agendamientos del usuario logueado
    @classmethod
    def get_agendamiento_usuario(self, idUser):
        try:
            return Agendamiento.query.filter_by(id = idUser).first()
        except Exception as ex:
            raise Exception(ex)
    @classmethod
    def get_all(self):
        try:
            return Agendamiento.query.all()
        except Exception as ex:
            raise Exception(ex)
    
    # Crear un nuevo agendamiento a la base de datos
    @classmethod
    def crear_agendamiento(self, id_usuario,id_duenio, id_servicio, fecha, hora, direccion):
        try: 
            nuevo_agendamiento = Agendamiento(idUser=id_usuario,idDue=id_duenio, idService=id_servicio,
                                             date=fecha, hour=hora, direction=direccion)
            db.session.add(nuevo_agendamiento)
            db.session.commit()
            if nuevo_agendamiento:
                return True
            else: 
                return False
        except Exception as ex:
            raise Exception(ex)
        
    # Consulta para validar si el usuario ya tiene un agendamiento en la misma hora y fecha
    @classmethod
    def agendamiento_existente(self, idUser, fech, hor):
        try:
            aux = Agendamiento.query.filter_by(idUsuario = idUser, fecha = fech, hora = hor).first()
            if (aux):
                return True
            else: return False
            
        except Exception as ex:
            raise Exception(ex)