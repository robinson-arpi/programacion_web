from flask import Flask
from flask_mail import Mail, Message

app = Flask(__name__)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Configura el servidor de correo saliente
app.config['MAIL_PORT'] = 587  # Configura el puerto del servidor de correo saliente
app.config['MAIL_USE_TLS'] = True  # Habilita el uso de TLS
app.config['MAIL_USE_SSL'] = False  # Habilita el uso de TLS
app.config['MAIL_USERNAME'] = 'rolando.mizquiri@gmail.com'  # Tu dirección de correo electrónico
app.config['MAIL_PASSWORD'] = 'jinxkeecdeokgtva'  # Tu contraseña de correo electrónico
mail = Mail(app)
class Correo:
    def __init__(self):
        self.mail = mail

    def enviar_correo(self, destinatario, asunto, cuerpo):
        with app.app_context():
            msg = Message(asunto,sender='SabiduríaEnLínea', recipients=[destinatario])
            msg.body = cuerpo
            self.mail.send(msg)

    def getMessageAdmins(self, usuario, correo, mensaje):
        return "Has recibido un mensaje de un usuario en la sección de 'Contáctenos' de la página web Sabiduría en Línea. A continuación, se muestra el contenido del mensaje:\n\n\nDe: " + str(usuario) + "\nCorreo electrónico: " + str(correo) + "\n\nMensaje: " + str(mensaje) + "\n\n\nSaludos, " + str(usuario)
    
    def getMessageScheduling(self, nombre, titulo, propietario, correo):
        return "Estimado " + nombre +",\n\n\
Se le informa que ha realizado un agendamiento de un servicio en nuestro sitio web de Sabuduría en Línea.\n\
A continuación, se detallan los datos de contacto del propietario del servicio para que pueda contactarlo en caso de requerir detalles específicos.\n\n\
Servicio: "+titulo+"\nPropietario: "+propietario+"\nCorreo: "+correo+"\n\nSaludos cordiales, Sabíduria en Línea"
    
    def getMessageUsers(self, nombre, asunto, mensaje):
        return "Estimado "+nombre+", \nGracias por contactarnos. Hemos recibido tu consulta y estamos trabajando en brindarte una respuesta lo antes posible.\n\n\
Detalles de tu consulta \nAsunto: "+asunto+" \nMensaje: "+mensaje+"\n\nNuestro equipo de soporte revisará tu consulta y te proporcionará una respuesta detallada en breve. \
Si tienes alguna otra pregunta o necesitas más información, no dudes en contactarnos nuevamente. \n\nApreciamos tu interés en nuestros productos/servicios y estamos aquí \
para ayudarte en todo lo que necesites. \n\nSaludos cordiales, Sabíduria en Línea"

