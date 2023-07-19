from flask import render_template, Blueprint, flash, request, get_flashed_messages, redirect, url_for
from flask_login import login_required, current_user
from ..models.entities.Servicio import Servicio
from ..models.entities.Categoria import Categoria
from ..models.entities.Busqueda import Busqueda
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
   

@servicios_blueprint.route('/servicios/busqueda', methods=['GET'])
def buscar_servicios():
    # Obtener el término de búsqueda ingresado por el usuario
    termino_busqueda = request.args.get('busqueda', '')
    # print(termino_busqueda)

    busqueda = Busqueda(current_user.id, termino_busqueda)
    db.session.add(busqueda)
    db.session.commit()

    # Realizar la búsqueda en la base de datos y obtener los servicios correspondientes
    servicios = ModeloServicio.buscar_servicios(termino_busqueda)

    # Renderizar el template con los resultados de la búsqueda
    return render_template('services/servicios.html', servicios=servicios, usuario = current_user, busqueda = termino_busqueda)

@servicios_blueprint.route('/servicios/busqueda_categoria', methods=['GET'])
def buscar_servicios_categoria():
    # Obtener el término de búsqueda ingresado por el usuario
    termino_busqueda = request.args.get('busqueda_categoria', '')
    try:
        # Realizar la búsqueda en la base de datos y obtener los servicios correspondientes
        servicios_cat =  Servicio.query.filter(Servicio.categoria.ilike(f'%{termino_busqueda}%')).all()
    except:
        print("aaaaah")

    # Renderizar el template con los resultados de la búsqueda
    return render_template('services/servicios.html', servicios=servicios_cat, usuario = current_user, busqueda = termino_busqueda)


@servicios_blueprint.route('/agregar_servicio', methods=['POST', 'GET'])
def agregar_servicio():

    if request.method == 'POST':  

        try:
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

            # Si el servicio se agregó correctamente
            flash('Se ha agregado un nuevo servicio con éxito! Puede verlo en el perfil', 'success')

            cat = Categoria.query.all()  
            return render_template('services/agregar-servicio.html', categorias=cat, usuario = current_user)    
            
        except:
            # Si hubo un error al agregar el servicio
            flash('Hubo un error al agregar el servicio', 'error')
            cat = Categoria.query.all()   
            return render_template('services/agregar-servicio.html', categorias=cat, usuario = current_user)
    else:
        cat = Categoria.query.all()  
        return render_template('services/agregar-servicio.html', categorias=cat, usuario = current_user)



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

#Implementacion extra
#Eliminar un servicio
@servicios_blueprint.route('/eliminar_servicio', methods=['POST'])
@login_required
def eliminar_servicio():
    try:
        servicio_id = request.form.get('servicio_id')
        eliminado = ModeloServicio.eliminar_servicio(current_user.id, servicio_id)
        if eliminado:
            flash('Servicio eliminado exitosamente', 'success')
        else:
            flash('El servicio no ha sido eliminado', 'error')
        return redirect(url_for('perfil'))
    except:
        # Si hubo un error al agregar el servicio
        flash('El servicio esta vinculado a agendamientos', 'error')
        return redirect(url_for('perfil'))