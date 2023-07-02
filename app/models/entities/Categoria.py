from sqlalchemy import Column, Integer, String
from app import db


class Categoria(db.Model):
    __tablename__ = 'categorias'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(String(100), nullable=False)
    icono = Column(String(100), nullable=False)

    def __init__(self, id, nombre, descripcion, icono):
        self.id = id
        self.nombre = nombre
        self.descripcion = descripcion
        self.icono = icono