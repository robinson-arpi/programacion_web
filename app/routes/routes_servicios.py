from flask import render_template
from flask_login import login_required
from flask import Blueprint, render_template

servicios_blueprint = Blueprint('servicios', __name__)

# Ruta de servicios
@servicios_blueprint.route('/servicios')
def servicios_route():
    return render_template('services/servicios.html')

# Ruta de agregar servicio
@servicios_blueprint.route('/agregar_servicio')
def agregar_servicio():
    return render_template('services/agregar-servicio.html')

# Ruta protegida de servicios
@servicios_blueprint.route('/protected_servicios')
@login_required
def protected_servicios():
    return "<h1>Esta es una vista protegida para servicios.</h1>"
