from .entities.Agendamientos import Agendamiento
from ..models.ModeloServicios import ModeloServicio
from .. import db

class ModeloAgendamiento():

    # Obtener todos los agendamientos del usuario logueado
    @classmethod
    def get_agendamientos_usuario(self, idUser):
        try:
            return Agendamiento.query.filter_by(idUsuario = idUser).first()
        except Exception as ex:
            raise Exception(ex)
    
    # Lista de Json conformados por un servicio: service y un agendamiento
    @classmethod
    def get_agendamientos_usuario_json(self, idU):
        try:
            aux_agen = Agendamiento.query.filter_by(idUsuario = idU).all()
            lista_aux = [agenda.idServicio for agenda in aux_agen]

            aux_ser = ModeloServicio.get_by_listFavoritos(lista_aux)

            lista_resultante = []

            for x in range(len(lista_aux)):
                json = {'agendamiento': aux_agen[x], 'servicio': aux_ser[x]}
                lista_resultante.append(json)
            
            return lista_resultante
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
        
    @classmethod
    def eliminar_agendamiento(self,idAgendamiento):
        try:
            agen = Agendamiento.query.filter_by(id = idAgendamiento).first()
            if agen:
                db.session.delete(agen)
                db.session.commit()
                return True
            else:
                return False
        except Exception as ex:
            raise Exception(str(ex))
        
    

