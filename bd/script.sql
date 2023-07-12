USE sabiduria_en_linea;

INSERT INTO categorias (id, nombre, descripcion, icono)
VALUES
  (1, 'Computación', 'Servicios relacionados con la tecnología y la informática', 'fas fa-laptop'),
  (2, 'Educación', 'Servicios de tutoría y enseñanza en diferentes áreas', 'fas fa-graduation-cap'),
  (3, 'Cocina', 'Servicios de preparación de alimentos y cocina gourmet', 'fas fa-utensils'),
  (4, 'Artesanía', 'Servicios de creación y venta de productos artesanales', 'fas fa-paint-brush'),
  (5, 'Jardinería', 'Servicios de jardinería y diseño de paisajes', 'fas fa-leaf'),
  (6, 'Fotografía', 'Servicios de fotografía profesional para eventos y sesiones', 'fas fa-camera'),
  (7, 'Chill', 'Servicio de charlas y conversaciones relajadas', 'fas fa-coffee'),
  (8, 'Música', 'Servicios de enseñanza musical y entretenimiento en eventos', 'fas fa-music');


INSERT INTO comentarios (nombre, calificacion, categoria, mensaje) VALUES
('Servicio1', '4.5', 'Computación', 'Buen producto, fácil de usar.'),
('Servicio2', '3.0', 'Cocina', 'El sabor podría mejorar.'),
('Servicio3', '2.5', 'Jardinería', 'No funcionó como esperaba.'),
('Servicio4', '4.2', 'Artesanía', 'Muy bien elaborado, gran detalle.'),
('Servicio5', '3.8', 'Computación', 'Buena relación calidad-precio.'),
('Servicio6', '2.0', 'Cocina', 'Difícil de limpiar.'),
('Servicio7', '4.7', 'Jardinería', 'Excelente calidad, resistente.'),
('Servicio8', '3.5', 'Artesanía', 'Un regalo perfecto.'),
('Servicio9', '2.3', 'Computación', 'Falla ocasionalmente.'),
('Servicio10', '4.0', 'Cocina', 'Versátil y práctico.');
