# Clase padre para configuraciones estardar
class Config:
    # Deshabilitar el sistema de seguimiento de modificaciones
    # Evitar sobrecarga al rastrear cambios de flask-sqlalchemy a la biblioteca sqlalchemy
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'admin'

    # Inicializamos las configuraciones de la aplicacion
    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    # Depuracion
    DEBUG = True
    # Enlace a la base de datos
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost:3306/sabiduria_en_linea'

config = {
    "development": DevelopmentConfig,
    "default": DevelopmentConfig
}