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
def load_user(email):
    return ModeloUsuario.get_by_email(email)

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
    return render_template('index.html')


@app.route('/protected')
@login_required
def protected():
    return "<h1>Esta es una vista protegida, solo para usuarios autenticados.</h1>"

def status_401(error):
    return redirect(url_for('login'))


def status_404(error):
    return "<h1>Página no encontrada</h1>", 404

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

@app.route('/perfil')
@login_required
def perfil():
    return render_template('usuario/perfil-usuario.html', usuario = current_user)

app.register_error_handler(401, status_401)
app.register_error_handler(404, status_404)

