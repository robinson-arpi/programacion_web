from flask import render_template
from flask_login import login_required
from flask import Blueprint, render_template

historial_blueprint = Blueprint('historial', __name__)

# Ruta de historial
@historial_blueprint.route('/historial')
@login_required
def historial_route():
    return render_template('historial/historial.html')

# Ruta protegida de historial
@historial_blueprint.route('/protected_historial')
@login_required
def protected_historial():
    return "<h1>Esta es una vista protegida para historial.</h1>"