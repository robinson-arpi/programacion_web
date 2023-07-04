from sqlalchemy import Column, Integer, String, Boolean, Date
from app import db

class Contactenos(db.Model):
    __tablename__ = 'contactenos'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(150), nullable=False)
    email = Column(String(100), nullable=False)
    mensaje = Column(String(800), nullable=False)

    def __init__(self, id, nombre, email, mensaje):
        self.id = id
        self.nombre = nombre
        self.email = email
        self.mensaje = mensaje
    


