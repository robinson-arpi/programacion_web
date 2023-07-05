from flask_login import UserMixin
from sqlalchemy import Column, Integer, String
from app import db


class Comentario(db.Model, UserMixin):
    __tablename__ = 'comentarios'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(100), nullable=False)
    calificacion = Column(String(6), nullable=False)
    categoria = Column(String(150), nullable=False)
    mensaje = Column(String(350), nullable=False)

    def __init__(self, nombre, calificacion, categoria, mensaje):
        self.nombre = nombre
        self.calificacion = calificacion
        self.categoria = categoria
        self.mensaje = mensaje