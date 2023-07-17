from flask_login import login_required, current_user
from flask import Blueprint, render_template, flash, request, jsonify
from ..models.modeloBusqueda import ModeloBusqueda
from datetime import date, timedelta
import locale

historial_blueprint = Blueprint('historial', __name__)

# Ruta de historial
@historial_blueprint.route('/historial')
@login_required
def historial_route():

    busquedas = ModeloBusqueda.get_by_user_id(current_user.id)

    # Configurar la localización en español
    locale.setlocale(locale.LC_ALL, 'es_ES.UTF-8')
    
    # Obtener la fecha actual
    fecha_actual = date.today()

    # Crear las variables para almacenar las búsquedas por categoría
    busquedas_hoy = []
    busquedas_ayer = []
    busquedas_antiguas = {}

    # Iterar sobre las búsquedas y clasificarlas por categoría
    for busqueda in busquedas:
        if busqueda.fecha == fecha_actual:
            busquedas_hoy.append(busqueda)
        elif busqueda.fecha == fecha_actual - timedelta(days=1):
            busquedas_ayer.append(busqueda)
        else:
            fecha_str = busqueda.fecha.strftime("%A, %d de %B de %Y")
            if fecha_str not in busquedas_antiguas:
                busquedas_antiguas[fecha_str] = []
            busquedas_antiguas[fecha_str].append(busqueda)

    busquedas_hoy = list(reversed(busquedas_hoy))

    return render_template('historial/historial.html', usuario=current_user, busquedas_hoy=busquedas_hoy, busquedas_ayer=busquedas_ayer, busquedas_antiguas=busquedas_antiguas, fecha_actual=fecha_actual.strftime("%A, %d de %B de %Y"), fecha_ayer=(fecha_actual - timedelta(days=1)).strftime("%A, %d de %B de %Y"))

# Ruta de historial
@historial_blueprint.route('/historial/eliminar', methods=['POST'])
@login_required
def eliminar_busqueda():

    # Obtener el término de búsqueda ingresado por el usuario
    busqueda_id = request.form.get('busqueda_id', '')
    eliminado = ModeloBusqueda.eliminar_busqueda(current_user.id, busqueda_id)

    if eliminado:
        return jsonify({'mensaje': 'Búsqueda eliminada exitosamente'})
    else:
        return jsonify({'mensaje': 'Error al eliminar la búsqueda'})  

# Ruta protegida de historial
@historial_blueprint.route('/protected_historial')
@login_required
def protected_historial():
    return "<h1>Esta es una vista protegida para historial.</h1>"