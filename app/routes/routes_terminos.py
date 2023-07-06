from flask import render_template
from flask import Blueprint, render_template

terminos_blueprint = Blueprint('terminos', __name__)

# Ruta de terminos servicio
@terminos_blueprint.route('/terminos_condiciones')
def terminos_route():
    return render_template('page_statics/terminos-condiciones.html')
