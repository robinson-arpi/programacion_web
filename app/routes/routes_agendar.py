from flask import render_template, request
from flask_login import login_required, current_user
from flask import Blueprint, flash, redirect, url_for
from datetime import datetime, time, date

from ..models.ModeloUsuario import ModeloUsuario
from ..models.ModeloAgenda import ModeloAgendamiento
from ..models.ModeloServicios import ModeloServicio
from ..models.entities.Correo import Correo

agendar_blueprint = Blueprint('agendar', __name__)

# Ruta de agendar servicio
@agendar_blueprint.route('/agendar', methods=['POST'])
@login_required
def agendar_route():
    operador_id = request.form.get('idOperador')
    service_id = request.form.get('id')
    service = ModeloServicio.get_by_id(service_id)
    operator = ModeloUsuario.get_by_id(operador_id)
    return render_template('services/agendar-servicio.html', usuario = current_user, servicio = service, operador = operator)

@agendar_blueprint.route('/crear_agendamiento', methods=['POST'])
@login_required
def crear_agendamiento():
    disponibilidad = request.form.get('disponibilidad')
    idServicio = request.form.get('idServicio')
    idDuenio = request.form.get('idDuenio')
    
    fecha = request.form.get('fecha')
    hora = request.form.get('hora')
    direccion = request.form.get('direccion')    

    # comprobar si no eres el mismo dueño del servicio
    if (str(current_user.id) == str(idDuenio)):
        flash("No puede agendar su propio servicio. Agendamiento no creado.")
        return redirect(url_for('descripcion_servicios', id = idServicio))
    
    duenio = ModeloUsuario.get_by_id(idDuenio)
    service = ModeloServicio.get_by_id(idServicio)

    correo = Correo() 

    hora_entregada = datetime.strptime(hora, '%H:%M').time()
    fecha_seleccionada = datetime.strptime(fecha, '%Y-%m-%d').date()

    # comprobar que la fecha sea mayor a la actual
    if (fecha_seleccionada < date.today()):
        flash("La fecha selecionada es anterior a la actual. Agendamiento no creado.")
        return redirect(url_for('descripcion_servicios', id = idServicio))
    
    aux1 = ModeloAgendamiento.agendamiento_existente(current_user.id, fecha, hora)
    if (aux1):
        flash("Usted ya tiene agendado este servicio para esta fecha. Agendamiento no creado.")
        return redirect(url_for('descripcion_servicios', id = idServicio))
    else:
        if ((disponibilidad == 'Todo el día') or (disponibilidad == 'Virtual')):
            aux2 = ModeloAgendamiento.crear_agendamiento(id_usuario = current_user.id, id_duenio= idDuenio, id_servicio = idServicio, fecha = fecha, hora=hora, direccion=direccion)
            if aux2:
                flash("Su agendamiento ha sido creado.")
                correo.enviar_correo(current_user.email,"Agendamiento de un servicio en el sitio Sabiduría en Línea", correo.getMessageScheduling(current_user.nombre +" "+current_user.apellido, service.titulo, duenio.nombre + " "+duenio.apellido, duenio.email))
            else:
                flash("Error al crear su agendamiento.")

        elif ((disponibilidad == 'Por la mañana')):
            if (hora_entregada > time(6,0) and hora_entregada < time(12,0)):
                aux2 = ModeloAgendamiento.crear_agendamiento(id_usuario = current_user.id, id_duenio= idDuenio, id_servicio = idServicio, fecha = fecha, hora=hora, direccion=direccion)
                if aux2:
                    flash("Su agendamiento ha sido creado.")
                    correo.enviar_correo(current_user.email,"Agendamiento de un servicio en el sitio Sabiduría en Línea", correo.getMessageScheduling(current_user.nombre +" "+current_user.apellido, service.titulo, duenio.nombre + " "+duenio.apellido, duenio.email))
                else:
                    flash("Error al crear su agendamiento.")
            else: 
                flash("El servicio no está disponible en este horario.")

        elif ((disponibilidad == 'Por la tarde')):
            if (hora_entregada > time(13,0) and hora_entregada < time(17,0)):
                aux2 = ModeloAgendamiento.crear_agendamiento(id_usuario = current_user.id, id_duenio= idDuenio, id_servicio = idServicio, fecha = fecha, hora=hora, direccion=direccion)
                if aux2:
                    flash("Su agendamiento ha sido creado.")
                    correo.enviar_correo(current_user.email,"Agendamiento de un servicio en el sitio Sabiduría en Línea", correo.getMessageScheduling(current_user.nombre +" "+current_user.apellido, service.titulo, duenio.nombre + " "+duenio.apellido, duenio.email))
                else:
                    flash("Error al crear su agendamiento.")
            else: 
                flash("El servicio no está disponible en este horario.")

        elif ((disponibilidad == 'Por la noche')):
            if (hora_entregada > time(18,0) and hora_entregada < time(23,0)):
                aux2 = ModeloAgendamiento.crear_agendamiento(id_usuario = current_user.id, id_duenio= idDuenio, id_servicio = idServicio, fecha = fecha, hora=hora, direccion=direccion)
                if aux2:
                    flash("Su agendamiento ha sido creado.")
                    correo.enviar_correo(current_user.email,"Agendamiento de un servicio en el sitio Sabiduría en Línea", correo.getMessageScheduling(current_user.nombre +" "+current_user.apellido, service.titulo, duenio.nombre + " "+duenio.apellido, duenio.email))
                else:
                    flash("Error al crear su agendamiento.")
            else: 
                flash("El servicio no está disponible en este horario.")

        return redirect(url_for('descripcion_servicios', id = idServicio))

#Eliminar un servicio Favorito
@agendar_blueprint.route('/eliminar_agendamiento', methods=['POST'])
@login_required
def eliminar_agendamiento():
    agendamiento_id = request.form.get('agendamiento_id')
    eliminado = ModeloAgendamiento.eliminar_agendamiento(idAgendamiento=agendamiento_id)
    if eliminado:
        flash("Agendamiento eliminado exitosamente.")
    else:
        flash("Error al eliminar el agendamiento.")
    return redirect(url_for('perfil'))

# Ruta protegida de agendar
@agendar_blueprint.route('/protected_agendar')
@login_required
def protected_agendar():
    return "<h1>Esta es una vista protegida para agendar un servicio.</h1>"