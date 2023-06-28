from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import UserMixin
from sqlalchemy import Column, Integer, String, Boolean
from app import db

class Usuario(db.Model, UserMixin):
    __tablename__ = 'usuarios'
    id = Column(Integer, primary_key=True)
    email = Column(String(100), nullable=False, unique = True)
    username = Column(String(150), nullable=False, unique=True)
    nombre = Column(String(150), nullable=False)
    apellido = Column(String(150), nullable=False)
    password = Column(String(200), nullable=False)
    esAdmin = Column(Boolean, nullable=False)

    def __init__(self, id, email, password, nombre, apellido, username, es_admin = False):
        self.id = id
        self.email = email
        self.password = generate_password_hash(password)
        self.nombre = nombre
        self.apellido = apellido
        self.username = username
        self.es_admin = es_admin
    
    def set_password(self, password):
        self.password = generate_password_hash(password)

    
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def __repr__(self):
        return '<Usuario {}>'.format(self.email)