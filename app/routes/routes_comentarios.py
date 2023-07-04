from flask import render_template
from flask import Blueprint, render_template

comentarios_blueprint = Blueprint('comentarios', __name__)

# Ruta de comentarios servicio
@comentarios_blueprint.route('/comentarios')
def comentarios_route():
    return render_template('comments/comentarios.html')
