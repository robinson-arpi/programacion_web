from .. import create_app
from .. import db
from datetime import datetime, time
from ..models.ModeloUsuario import ModeloUsuario
from ..models.ModeloServicios import ModeloServicio
from ..models.ModeloFavoritos import ModeloFavorito
from ..models.ModeloAgenda import ModeloAgendamiento
from ..models.entities.Usuario import Usuario
from ..models.entities.Servicio import Servicio
from ..models.entities.Contactenos import Contactenos
from ..models.entities.Cronograma import Cronograma
from ..models.entities.Categoria import Categoria
from ..models.entities.Correo import Correo
from ..models.entities.Comentarios import Comentario
from ..models.entities.Cronograma import Cronograma
from flask import render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from .routes_servicios import servicios_blueprint
from .routes_historial import historial_blueprint
from .routes_agendar import agendar_blueprint
from .routes_favoritos import favoritos_blueprint
from .routes_comentarios import comentarios_blueprint
from .routes_terminos import terminos_blueprint


from config import config
from datetime import datetime

# Creacion de aplicacion
app = create_app('development')
login_manager_app = LoginManager(app)

# Registra el blueprints
app.register_blueprint(servicios_blueprint)
app.register_blueprint(historial_blueprint)
app.register_blueprint(agendar_blueprint)
app.register_blueprint(favoritos_blueprint)
app.register_blueprint(comentarios_blueprint)
app.register_blueprint(terminos_blueprint)

# Manejo de logueo
@login_manager_app.user_loader
def load_user(id):
    return Usuario.query.get(int(id))

# Incio de app para amndar a login
@app.route('/')
def index():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    return redirect(url_for('login'))

# Ruta loguin para ingreso de credenciales
@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))    
    if request.method == 'POST':
        #Captura de credenciales
        credenciales_usuario = [request.form['email'],request.form['password']]
        
        # Captura el valor del campo 'recuerdame'
        recuerdame = request.form.get('recuerdame')
        usuario_logueado = ModeloUsuario.login(credenciales_usuario)

        # Si usuario existe
        if usuario_logueado != None:
            # pass = 1 entonces tiene credenciales correctas 
            if usuario_logueado.password: 
                login_user(usuario_logueado, remember=recuerdame)
                return redirect(url_for('home'))
            else:
                flash("Contraseña incorrecta")
                return render_template('auth/login.html', usuario = current_user)
        else:
            flash("Usuario no encontrado")
            return render_template('auth/login.html', usuario = current_user)
    else:
        return render_template('auth/login.html', usuario = current_user)


# Ruta la cerrar sesión
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

# Ruta para vista home
@app.route('/home')
def home():
    cat = Categoria.query.all()
    com = Comentario.query.order_by(Comentario.id.desc()).limit(4).all()
    return render_template('index.html', categorias = cat , usuario = current_user, comentarios = com)

# Registro y logeo de usuarios
@app.route('/registro', methods=['POST', 'GET'])
def agregar_usuario():
    if request.method == 'POST':
        usuario = Usuario(0, 
                        request.form['email'],
                        Usuario.generar(request.form['password1']),
                        request.form['nombre'],
                        request.form['apellido'],
                        request.form['username'],
                        datetime.strptime(request.form['fecha'],"%Y-%m-%d").date()
                        )
        db.session.add(usuario)
        db.session.commit()
        credenciales_usuario = [request.form['email'],request.form['password1']]
        usuario_logueado = ModeloUsuario.login(credenciales_usuario)
        login_user(usuario_logueado, remember=False)
        return redirect(url_for('perfil'))
    else:
        return render_template('auth/registro.html', usuario = current_user)

@app.route('/actualizar_usuario/<int:id>', methods=['PUT', 'GET'])
def actualizar_usuario(id):
    print("viene post")
    if request.method == 'PUT':
        # Accede a los datos enviados en el cuerpo de la solicitud
        usuario = Usuario.query.get(id)
        
        usuario.email = request.form['email']
        usuario.password = Usuario.generar(request.form['password1'])
        usuario.nombre = request.form['nombre']
        usuario.apellido = request.form['apellido']
        usuario.username = request.form['username']
        usuario.fecha_nacimiento = datetime.strptime(request.form['fecha'],"%Y-%m-%d").date()
        db.session.add(usuario)
        db.session.commit()
        flash('Usuario actualizado')

        credenciales_usuario = [request.form['email'], request.form['password1']]
        usuario_logueado = ModeloUsuario.login(credenciales_usuario)
        login_user(usuario_logueado, remember=False)
    else:
        print("como verga no va a ser metodo put")
        flash('Usuario no actualizado')
    return redirect(url_for('perfil'))

@app.route('/perfil')
@login_required
def perfil():
    lista_agen = ModeloAgendamiento.get_agendamientos_usuario_json(current_user.id)
    # Accede a los servicios del usuario
    #servicios = usuario.servicios
    return render_template('usuario/perfil-usuario.html', usuario = current_user, servicios = current_user.servicios, agendamientos = lista_agen)

@app.route('/ayuda')
def ayuda():
    return render_template('page_statics/ayuda.html', usuario = current_user)    

#------------------------------------------------------------------
# Sección de blog
@app.route('/blog')
def blog():
    return render_template('page_statics/blog.html', usuario = current_user)

#-----------------------------------------------------------------
# Sección de contactenos
@app.route('/contactenos')
def contactenos():
    return render_template('footer/contacto.html', usuario = current_user)

# para el método de contactenos

@app.route('/contactenos', methods=['GET', 'POST'])
def contacto():
    if request.method == 'POST':
        nombre = request.form['nombre']
        email = request.form['correo']
        mensaje = request.form['mensaje']

        contactenos = Contactenos(0, nombre, email, mensaje)
        db.session.add(contactenos)
        db.session.commit()
        flash('Mensaje enviado correctamente')
        correo = Correo()
        correo.enviar_correo("rolando.mizhquiri@ucuenca.edu.ec","Consulta de servicios de la página",correo.getMessageAdmins(nombre,email,mensaje))
        correo.enviar_correo("robinson.arpi@ucuenca.edu.ec","Consulta de servicios de la página",correo.getMessageAdmins(nombre,email,mensaje))
        correo.enviar_correo("kevin.juelac@ucuenca.edu.ec","Consulta de servicios de la página",correo.getMessageAdmins(nombre,email,mensaje))
        correo.enviar_correo("hernan.coronelr@ucuenca.edu.ec","Consulta de servicios de la página",correo.getMessageAdmins(nombre,email,mensaje))
        correo.enviar_correo(email,'Respuesta a solicitud',correo.getMessageUsers(nombre,'Respuesta a solicitud', mensaje))
        return redirect(url_for('contactenos'))
    else:
        flash('Mensaje no enviado')
        return render_template('footer/contacto.html', usuario = current_user)


#----------------------------------------------------------------------------------------------
#Sección de descripción de servicios

@app.route('/descripcion_servicios')
@login_required
def descripcion_servicios():
    servicio_id = request.args.get('id') 
    servicio = Servicio.query.get(servicio_id)
    favorito = ModeloFavorito.favorites_idUser(current_user.id, servicio_id)
    return render_template('services/descripcion_servicios.html', servicio = servicio, favorito=favorito, usuario = current_user)

@app.route('/agregar_a_favoritos', methods=['POST'])
def agregar_a_favoritos():
    id = request.form['id']
    texto_valor = request.form.get('texto_valor')
    favorito = ModeloFavorito.favorites_idUser(current_user.id, id)
    if texto_valor == "Agregar a favoritos":
        if not favorito:
            ModeloFavorito.crear_favorito(current_user.id, id)
    else:
        ModeloFavorito.eliminar_favorito(current_user.id,id)
    return '', 204  #sin contenido

#----------------------------------------------------------------------------------------------------------
#seccion de cronograma
@app.route('/cronograma')
@login_required
def cronograma():
    Agendado = ModeloAgendamiento.get_agendamientos_usuario(current_user.id)
    Agendado = ModeloAgendamiento.get_all()
    elementos = []
    for ag in Agendado:
        type(ag.fecha)
        if ag.idDuenio == current_user.id:
            cronograma = Cronograma(ag.fecha,ModeloServicio.get_by_id(ag.idServicio).titulo, ModeloUsuario.get_by_id(ag.idUsuario).nombre+" "+ModeloUsuario.get_by_id(ag.idUsuario).apellido, ag.direccion, ag.hora)
            elementos.append(cronograma)
    events_arr = separarInformacionCronograma(elementos)
    return render_template('services/cronograma.html', usuario = current_user, lista=events_arr)

def time_to_string(obj):
    if isinstance(obj, time):
        return obj.strftime('%H:%M:%S')
    return obj

def separarInformacionCronograma(lista):
    servicios = []
    for item in lista:
        fecha_str = item.fecha
        nombre = item.nombre
        cliente = item.cliente
        direccion = item.direccion
        hora = item.hora
        fecha = datetime.strptime(str(fecha_str), '%Y-%m-%d')
        day = fecha.day
        month = fecha.month
        year = fecha.year
        # Crear el evento
        event = {
            'title': nombre,
            'client': cliente,
            'direction': direccion,
            'time': str(hora)
        }
        # Buscar si ya existe un evento en servicios para la misma fecha
        existing_event = next((e for e in servicios if e['day'] == day and e['month'] == month and e['year'] == year), None)
        if existing_event:
            existing_event['events'].append(event)
        else:
            new_event = {
                'day': day,
                'month': month,
                'year': year,
                'events': [event]
            }
            servicios.append(new_event)
    return servicios

# ------------------------------------------------------
# Sección de acerca de nosotros
@app.route('/acerca_de_nosotros')
def acerca_de_nosotros():
    return render_template('page_statics/acerca-de-nosotros.html', usuario = current_user)
