from flask import render_template
from flask_login import login_required
from flask import Blueprint, render_template

agendar_blueprint = Blueprint('agendar', __name__)

# Ruta de agendar servicio
@agendar_blueprint.route('/agendar')
def agendar_route():
    return render_template('services/agendar-servicio.html')

# Ruta protegida de historial
@agendar_blueprint.route('/protected_agendar')
@login_required
def protected_agendar():
    return "<h1>Esta es una vista protegida para agendar un servicio.</h1>"