from flask import render_template
from flask_login import login_required, current_user
from flask import Blueprint, render_template

favoritos_blueprint = Blueprint('favoritos', __name__)

# Ruta de favoritos servicio
@favoritos_blueprint.route('/favoritos')
def favoritos_route():
    return render_template('favorites/favoritos.html', usuario = current_user)

# Ruta protegida de historial
@favoritos_blueprint.route('/protected_favoritos')
@login_required
def protected_favoritos():
    return "<h1>Esta es una vista protegida para favoritos de un usuario.</h1>"