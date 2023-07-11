from flask import render_template
from flask_login import login_required, current_user
from flask import Blueprint, render_template, flash, request, redirect, url_for

from ..models.ModeloServicios import ModeloServicio
from ..models.ModeloFavoritos import ModeloFavorito

favoritos_blueprint = Blueprint('favoritos', __name__)

# Ruta de favoritos servicio
@favoritos_blueprint.route('/favoritos')
@login_required
def favoritos_route():
    lista_ids = ModeloFavorito.get_favorites_idUser(current_user.id)
    l_service = ModeloServicio.get_by_listFavoritos(lista_ids)
    if len(l_service) == 0:
        flash("Usted no tiene servicios favoritos.")
        return render_template('favorites/favoritos.html', usuario = current_user, lista_servicios = l_service)
    else:
        return render_template('favorites/favoritos.html', usuario = current_user, lista_servicios = l_service)
    
#Eliminar un servicio Favorito
@favoritos_blueprint.route('/eliminar_favorito', methods=['POST'])
@login_required
def eliminar_favorito():
    servicio_id = request.form.get('servicio_id')
    eliminado = ModeloFavorito.eliminar_favorito(current_user.id, servicio_id)
    if eliminado:
        flash("Favorito eliminado exitosamente.")
    else:
        flash("Error al eliminar el favorito.")
    return redirect(url_for('favoritos.favoritos_route'))

# Ruta protegida de historial
@favoritos_blueprint.route('/protected_favoritos')
@login_required
def protected_favoritos():
    return "<h1>Esta es una vista protegida para favoritos de un usuario.</h1>"