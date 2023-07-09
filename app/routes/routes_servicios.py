from flask import render_template, Blueprint, flash, request
from flask_login import login_required, current_user
from ..models.entities.Servicio import Servicio
from ..models.entities.Categoria import Categoria
from ..models.ModeloServicios import ModeloServicio
from .. import db
from .. import app
from random import sample
# from uuid import uuid4  # Importar la función uuid4 para generar un nombre aleatorio
import os
#Para subir archivo tipo foto al servidor
import os
from werkzeug.utils import secure_filename

servicios_blueprint = Blueprint('servicios', __name__)

# Ruta de servicios
@servicios_blueprint.route('/servicios')
def servicios_route():
    servicios = ModeloServicio.get_all_services()  # Obtener todos los servicios desde la base de datos
    return render_template('services/servicios.html', servicios = servicios, usuario = current_user)
   

@servicios_blueprint.route('/agregar_servicio', methods=['POST', 'GET'])
def agregar_servicio():

    if request.method == 'POST':        
        # Si se envía una foto a guardar
        if 'imagen' in request.files:
            file     = request.files['imagen'] #recibiendo el archivo
            imagen = recibeFoto(file) #Llamado la funcion que procesa la imagen
        else:
            imagen = ''

        # Get form data
        usuario_id = current_user.id  # Replace with actual user ID
        titulo = request.form['titulo']
        descripcion = request.form['descripcion']
        ciudad = request.form['ciudad']
        categoria = request.form['categoria']
        disponibilidad = request.form['disponibilidad']
        requisitos = request.form['requisitos']

        # Create new service
        servicio = Servicio(usuario_id, titulo, descripcion, ciudad, categoria, disponibilidad, requisitos, imagen)
        db.session.add(servicio)
        db.session.commit()     
        cat = Categoria.query.all()   
        return render_template('services/agregar-servicio.html', categorias=cat)
    else:
        cat = Categoria.query.all()  
        return render_template('services/agregar-servicio.html', categorias=cat)



# Ruta protegida de servicios
@servicios_blueprint.route('/protected_servicios')
@login_required
def protected_servicios():
    return "<h1>Esta es una vista protegida para servicios.</h1>"


# Para guardar la foto con un nombre aleatorio para que no haya nombres iguales
def recibeFoto(file):
    print(file)
    basepath = os.path.dirname (__file__) #La ruta donde se encuentra el archivo actual
    print(basepath)
    filename = secure_filename(file.filename) #Nombre original del archivo

    #capturando extensión del archivo ejemplo: (.png, .jpg, .pdf ...etc)
    extension           = os.path.splitext(filename)[1]
    nuevoNombreFile     = stringAleatorio() + extension
    #print(nuevoNombreFile)
        
    upload_path = os.path.join(basepath, '..', 'static', 'img', 'uploads', nuevoNombreFile)
    file.save(upload_path)


    return nuevoNombreFile

def stringAleatorio():
    string_aleatorio = "0123456789abcdefghijklmnopqrstuvwxyz_"
    longitud         = 20
    secuencia        = string_aleatorio.upper()
    resultado_aleatorio  = sample(secuencia, longitud)
    string_aleatorio     = "".join(resultado_aleatorio)
    return string_aleatorio
