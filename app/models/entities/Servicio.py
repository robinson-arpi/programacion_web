from sqlalchemy import Column, Integer, String, Boolean, Text
from app import db

class Servicio(db.Model):
    id = Column(Integer, primary_key=True)
    imagen_datos = Column(db.LargeBinary)
    titulo = Column(String(100), nullable=False)
    descripcion = Column(Text, nullable=False)
    ciudad = Column(String(100), nullable=False)
    categoria = Column(String(100), nullable=False)
    disponibilidad = Column(Boolean, default=True)
    requisitos = Column(String(255))

    def __init__(self, titulo, descripcion, ciudad, categoria, disponibilidad, requisitos, imagen_datos):
        self.titulo = titulo
        self.descripcion = descripcion
        self.ciudad = ciudad
        self.categoria = categoria
        self.disponibilidad = disponibilidad
        self.requisitos = requisitos
        self.imagen_datos = imagen_datos
