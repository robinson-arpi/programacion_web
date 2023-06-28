from .entities.Usuario import Usuario

class ModeloUsuario():
    @classmethod
    def login(self, credenciales):
        try:
            entrada_usuario = credenciales[0]
            passw = credenciales[1]
            # Verifica si entro un correo
            if "@" in entrada_usuario:
                u = Usuario.query.filter_by(emaiL = entrada_usuario).first()
            else:
                u = Usuario.query.filter_by(nombre_usuario = entrada_usuario).first()
            
            # Verifica existencia de usuario
            if u == None:
                return None
            else:
                return Usuario(u.id, u.email, Usuario.check_password(u.password, passw), u.nombre, u.apellido, u.username)

        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_by_id(self, id):
        try:
            return Usuario.query.filter_by(id = id).first()
        except Exception as ex:
            raise Exception(ex)
        
    @classmethod
    def get_by_email(self, email):
        try:
            return Usuario.query.filter_by(email = email).first()
        except Exception as ex:
            raise Exception(ex)    

    @classmethod
    def get_by_username(self, username):
        try:
            return Usuario.query.filter_by(username = username).first()
        except Exception as ex:
            raise Exception(ex)        