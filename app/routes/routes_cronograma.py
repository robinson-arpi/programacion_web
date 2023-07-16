from flask import render_template
from flask_login import login_required, current_user
from flask import Blueprint, render_template, flash, request, redirect, url_for

from ..models.ModeloServicios import ModeloServicio

favoritos_blueprint = Blueprint('cronograma', __name__)

favoritos_blueprint.route('/cronograma')
@login_required
def cronograma():
    print('Ingrese a cronograma')
    return render_template('services/cronograma.html', usuario = current_user)