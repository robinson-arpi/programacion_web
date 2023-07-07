from flask_login import UserMixin
from sqlalchemy import Column, Integer, ForeignKey
from app import db
from sqlalchemy.orm import relationship


class Favorito(db.Model, UserMixin):
    __tablename__ = 'favoritos'
    idUsuario = Column(Integer, ForeignKey('usuarios.id'), primary_key=True)
    idServicio = Column(Integer, ForeignKey('servicios.id'), primary_key=True)

    # Relaciones de Foreign Key
    usuario = relationship("Usuario", back_populates="favoritos")
    servicios = relationship("Servicio", back_populates="favoritos")

    def __init__(self, idUser, idService):
        self.idUsuario = idUser
        self.idServicio = idService