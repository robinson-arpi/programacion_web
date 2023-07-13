class Cronograma():
    def __init__(self, fecha, nombre, cliente, direccion, hora):
        self.fecha = fecha
        self.nombre = nombre
        self.cliente = cliente
        self.direccion = direccion
        self.hora = hora

    def __str__(self):
        return f"Fecha: {self.fecha}, Nombre: {self.nombre}, Cliente: {self.cliente}, Dirección: {self.direccion}, Hora: {self.hora}"