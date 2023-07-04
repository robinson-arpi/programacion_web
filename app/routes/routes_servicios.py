from flask import render_template
from flask_login import login_required
from flask import Blueprint, render_template, flash, request
from ..models.entities.Servicio import Servicio
from flask_login import current_user
from .. import db

servicios_blueprint = Blueprint('servicios', __name__)

# Ruta de servicios
@servicios_blueprint.route('/servicios')
def servicios_route():
    return render_template('services/servicios.html')

# Ruta de agregar servicio
@servicios_blueprint.route('/agregar_servicio', methods=['POST', 'GET'])
def agregar_usuario():
    if request.method == 'POST':
        #def __init__(self, usuario_id, titulo, descripcion, ciudad, categoria, disponibilidad, requisitos, imagen_datos)
        servicio = Servicio(
                        current_user.id,
                        request.form['titulo'],
                        request.form['descripcion'],
                        request.form['ciudad'],
                        request.form['categoria'],
                        request.form['disponibilidad'],
                        request.form['requisitos'],
                        request.form['imagen_datos']
                        )

        db.session.add(servicio)
        db.session.commit()
        flash('Servicio creado')
        sms = 'Servicio creado'
        # se enviará un json para indicar que se creo o no correctamente
        return sms
    else:
        flash('Servicio no creado')
        return render_template('services/agregar-servicio.html')

# Ruta protegida de servicios
@servicios_blueprint.route('/protected_servicios')
@login_required
def protected_servicios():
    return "<h1>Esta es una vista protegida para servicios.</h1>"
