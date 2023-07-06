from flask import render_template
from flask import Blueprint, render_template, request, flash
from flask_login import login_required, current_user

from ..models.ModeloComentarios import ModeloComentario
from ..models.entities.Categoria import Categoria

comentarios_blueprint = Blueprint('comentarios', __name__)

# Ruta de comentarios servicio
# Registro
@comentarios_blueprint.route('/comentarios', methods=['POST', 'GET'])
@login_required
def comentarios_route():
    if request.method == 'POST':
        resultado = ModeloComentario.crear_comentario(
            request.form['nombre'],
            request.form['calificacion'],
            request.form['categoria'],
            request.form['comentario']
        )
        if (resultado != None):
            flash("Comentario Agregado")
            cat = Categoria.query.all()
            com = ModeloComentario.get_all()
            return render_template('comments/comentarios.html', categorias = cat, comentarios = com, usuario = current_user)
        else:
            flash("Ocurrió un error al crear un comentario")
            cat = Categoria.query.all()
            com = ModeloComentario.get_all()
            return render_template('comments/comentarios.html', categorias = cat, comentarios = com, usuario = current_user)
    else:
        cat = Categoria.query.all()
        com = ModeloComentario.get_all()
        return render_template('comments/comentarios.html', categorias = cat, comentarios = com, usuario = current_user)
  
# Ruta protegida de comentarios
@comentarios_blueprint.route('/protected_comentarios')
def protected_comentarios():
    return " <h1> Esta es una vista protegida para comentarios. </h1>"