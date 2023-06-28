from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect
from config import config

# instancia de base de datos
db = SQLAlchemy()

# instacia basada en el entorno
def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    csrf = CSRFProtect(app)
    db.init_app(app)
    with app.app_context():
        db.create_all()
    return app

app = create_app('development')
