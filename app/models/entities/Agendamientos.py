from flask_login import UserMixin
from sqlalchemy import Column, Integer, String, ForeignKey, Date, Time
from app import db
from sqlalchemy.orm import relationship


class Agendamiento(db.Model, UserMixin):
    __tablename__ = 'agendamientos'
    id = Column(Integer, primary_key=True)
    idUsuario = Column(Integer, ForeignKey('usuarios.id'))
    idDuenio = Column(Integer, nullable=False)
    idServicio = Column(Integer, ForeignKey('servicios.id'))
    fecha = Column(Date, nullable=False)
    hora = Column(Time, nullable=False)
    direccion = Column(String(200), nullable=False)

    usuario = relationship("Usuario", back_populates="agendamientos")
    servicio = relationship("Servicio", back_populates="agendamientos")
    

    def __init__(self, idUser, idDue, idService, date, hour, direction):
        self.idUsuario = idUser
        self.idDuenio = idDue
        self.idServicio = idService
        self.fecha = date
        self.hora = hour
        self.direccion = direction


# Modelo hacer una búsqueda para validar el servicio si está disponible
# Modelo hacer una búsqueda para validar si el usuario ya tiene un servicio agendado en esta fecha y hora