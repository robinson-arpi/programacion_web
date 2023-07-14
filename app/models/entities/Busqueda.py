from sqlalchemy import Column, Integer, Text, ForeignKey, Date
from sqlalchemy.orm import relationship
from app import db
from datetime import datetime

class Busqueda(db.Model):
    __tablename__ = 'busquedas'
    id = Column(Integer, primary_key=True)
    usuario_id = Column(Integer, ForeignKey('usuarios.id'))
    texto = Column(Text, nullable=False)
    fecha = Column(Date, nullable=False)

    # Relación con el usuario propietario
    usuario = relationship("Usuario", back_populates="busquedas")

    def __init__(self, usuario_id, texto):
        self.usuario_id = usuario_id
        self.texto = texto
        self.fecha = datetime.now().date()
