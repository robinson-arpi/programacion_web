from sqlalchemy import Column, Integer, String, Boolean, Text, ForeignKey
from sqlalchemy.orm import relationship
from app import db

class Servicio(db.Model):
    __tablename__ = 'servicios'
    id = Column(Integer, primary_key=True)
    usuario_id = Column(Integer, ForeignKey('usuarios.id'))
    imagen_datos = Column(db.LargeBinary)
    titulo = Column(String(100), nullable=False)
    descripcion = Column(Text, nullable=False)
    ciudad = Column(String(100), nullable=False)
    categoria = Column(String(100), nullable=False)
    disponibilidad = Column(Boolean, default=True)
    requisitos = Column(String(255))

    # Relación con el usuario propietario
    usuario = relationship("Usuario", back_populates="servicios")

    def __init__(self, usuario_id, titulo, descripcion, ciudad, categoria, disponibilidad, requisitos, imagen_datos):
        self.usuario_id = usuario_id
        self.titulo = titulo
        self.descripcion = descripcion
        self.ciudad = ciudad
        self.categoria = categoria
        self.disponibilidad = disponibilidad
        self.requisitos = requisitos
        self.imagen_datos = imagen_datos
