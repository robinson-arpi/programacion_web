from .. import create_app
from .. import db

from ..models.ModeloUsuario import ModeloUsuario
from ..models.entities.Usuario import Usuario

from flask import render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL
from flask_login import LoginManager, login_user, logout_user, login_required, current_user

from config import config
from datetime import datetime

# Creacion de aplicacion
app = create_app('development')
login_manager_app = LoginManager(app)

@login_manager_app.user_loader
def cargar_usuario(id):
    return Usuario.query.get(id == id)

@app.route('/')
def index():
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        if current_user.is_authenticated:
            return redirect(url_for('home'))
        
        credenciales_usuario = [request.form['email'],request.form['password']]
        
        usuario_logueado = ModeloUsuario.login(credenciales_usuario)
        if usuario_logueado != None:
            # pass = 1 entonces tiene credenciales correctas 
            if usuario_logueado.password:
                login_user(usuario_logueado, remember=True)
                return redirect(url_for('home'))
            else:
                flash("Contraseña incorrecta")
                return render_template('auth/login.html')
        else:
            flash("Usuario no encontrado")
            return render_template('auth/login.html')
    else:
        return render_template('auth/login.html')


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('login'))


@app.route('/home')
@login_required
def home():
    return render_template('index.html',usuario = current_user)


@app.route('/ayuda')
def protected():
    return render_template('estaticas/ayuda.html')

def status_401(error):
    return redirect(url_for('login'))


def status_404(error):
    return render_template('HTML/not-found.html'), 404

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
        flash('Usuario creado')

        credenciales_usuario = [request.form['email'],request.form['password1']]
        
        usuario_logueado = ModeloUsuario.login(credenciales_usuario)
        login_user(usuario_logueado, remember=True)
        return redirect(url_for('perfil'))
    else:
        flash('Usuario no creado')
        return render_template('auth/registro.html')

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
        login_user(usuario_logueado, remember=True)
    else:
        print("como verga no va a ser metodo put")
        flash('Usuario no actualizado')
    return redirect(url_for('perfil'))

@app.route('/perfil')
@login_required
def perfil():
    return render_template('usuario/perfil-usuario.html', usuario = current_user)


@app.route('/blog.html')
@login_required
def blog():
    return render_template('navegacion/blog.html', usuario = current_user)

app.register_error_handler(401, status_401)
app.register_error_handler(404, status_404)


# ------------------------------------------------------
# Sección de Términos y condiciones
@app.route('/terminos_condiciones')
def terminos():
    return render_template('page_statics/terminos-condiciones.html')

# ------------------------------------------------------
# Sección de Comentarios
@app.route('/comentarios')
def comentarios():
    return render_template('comments/comentarios.html')

# ------------------------------------------------------
# Sección de Favoritos
@app.route('/favoritos')
def favoritos():
    return render_template('favorites/favoritos.html')

# ------------------------------------------------------
# Sección de Agendar
@app.route('/agendar')
def agendar():
    return render_template('services/agendar-servicio.html')