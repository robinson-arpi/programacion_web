from .entities.Usuario import Usuario

class ModeloUsuario():
    @classmethod
    def login(self, credenciales):
        try:
            entrada_usuario = credenciales[0]
            passw = credenciales[1]
            # Verifica si entro un correo
            u = Usuario.query.filter_by(email = entrada_usuario).first()
            # if "@" in entrada_usuario:
            #     u = Usuario.query.filter_by(email = entrada_usuario).first()
            # else:
            #     u = Usuario.query.filter_by(username = entrada_usuario).first()
            
            # Verifica existencia de usuario
            if u == None:
                return None
            else:
                return Usuario(u.id, u.email, u.check_password(passw), u.nombre, u.apellido, u.username, u.fecha_nacimiento)

        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def login_google(self, correo):
        try:
            # Verifica si entro un correo
            u = Usuario.query.filter_by(email = correo).first()
            # if "@" in entrada_usuario:
            #     u = Usuario.query.filter_by(email = entrada_usuario).first()
            # else:
            #     u = Usuario.query.filter_by(username = entrada_usuario).first()
            
            # Verifica existencia de usuario
            if u == None:
                return None
            else:
                return Usuario(u.id, u.email, True, u.nombre, u.apellido, u.username, u.fecha_nacimiento)

        except Exception as ex:
            raise Exception(ex)


    @classmethod
    def get_by_id(self, u):
        try:
            return Usuario.query.filter_by(id =u).first()
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