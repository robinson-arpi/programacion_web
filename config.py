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
    # SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost:3306/sabiduria_en_linea'
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:sfq8YzH1yCuC22bu0qEg@containers-us-west-195.railway.app:6733/railway'

config = {
    "development": DevelopmentConfig,
    "default": DevelopmentConfig
}