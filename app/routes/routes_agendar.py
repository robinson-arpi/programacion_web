from flask import render_template, request
from flask_login import login_required, current_user
from flask import Blueprint, flash, redirect, url_for
from datetime import datetime, time

from ..models.entities.Servicio import Servicio
from ..models.ModeloUsuario import ModeloUsuario
from ..models.ModeloAgenda import ModeloAgendamiento


agendar_blueprint = Blueprint('agendar', __name__)

# Ruta de agendar servicio
@agendar_blueprint.route('/agendar', methods=['POST'])
@login_required
def agendar_route():
    operador_id = request.form.get('idOperador')
    service_id = request.form.get('id')
    service = Servicio.query.get(service_id)
    operator = ModeloUsuario.get_by_id(operador_id)
    return render_template('services/agendar-servicio.html', usuario = current_user, servicio = service, operador = operator)

@agendar_blueprint.route('/crear_agendamiento', methods=['POST'])
@login_required
def crear_agendamiento():
    disponibilidad = request.form.get('disponibilidad')
    idServicio = request.form.get('idServicio')
    fecha = request.form.get('fecha')
    hora = request.form.get('hora')
    direccion = request.form.get('direccion')

    hora_entregada = datetime.strptime(hora, '%H:%M').time()

    aux1 = ModeloAgendamiento.agendamiento_existente(current_user.id, fecha, hora)
    if (aux1):
        flash("Usted ya tiene agendado este servicio para esta fecha.", 'error')
        return redirect(url_for('descripcion_servicios', id = idServicio))
    else:
        if ((disponibilidad == 'Todo el día') or (disponibilidad == 'Virtual')):
            aux2 = ModeloAgendamiento.crear_agendamiento(id_usuario = current_user.id, id_servicio = idServicio, fecha = fecha, hora=hora, direccion=direccion)
            if aux2:
                flash("Su agendamiento ha sido creado.")
            else:
                flash("Error al crear su agendamiento.", "error")
        elif ((disponibilidad == 'Por la mañana')):
            if (hora_entregada > time(6,0) and hora_entregada < time(12,0)):
                aux2 = ModeloAgendamiento.crear_agendamiento(id_usuario = current_user.id, id_servicio = idServicio, fecha = fecha, hora=hora, direccion=direccion)
                if aux2:
                    flash("Su agendamiento ha sido creado.")
                else:
                    flash("Error al crear su agendamiento." , "error")
            else: 
                flash("El servicio no está disponible en este horario." , "error")

        elif ((disponibilidad == 'Por la tarde')):
            if (hora_entregada > time(13,0) and hora_entregada < time(17,0)):
                aux2 = ModeloAgendamiento.crear_agendamiento(id_usuario = current_user.id, id_servicio = idServicio, fecha = fecha, hora=hora, direccion=direccion)
                if aux2:
                    flash("Su agendamiento ha sido creado.")
                else:
                    flash("Error al crear su agendamiento.", "error")
            else: 
                flash("El servicio no está disponible en este horario.")

        elif ((disponibilidad == 'Por la noche')):
            if (hora_entregada > time(18,0) and hora_entregada < time(23,0)):
                aux2 = ModeloAgendamiento.crear_agendamiento(id_usuario = current_user.id, id_servicio = idServicio, fecha = fecha, hora=hora, direccion=direccion)
                if aux2:
                    flash("Su agendamiento ha sido creado.")
                else:
                    flash("Error al crear su agendamiento.", "error")
            else: 
                flash("El servicio no está disponible en este horario.", "error")
        return redirect(url_for('descripcion_servicios', id = idServicio))
# Ruta protegida de agendar
@agendar_blueprint.route('/protected_agendar')
@login_required
def protected_agendar():
    return "<h1>Esta es una vista protegida para agendar un servicio.</h1>"