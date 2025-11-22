-- CREATE DATABASE ejercicio_productos;

CREATE TABLE Categorias (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  icono VARCHAR(50) NOT NULL,
  color VARCHAR(50) NOT NULL,
  descripcion TEXT,
  creado TIMESTAMP NOT NULL,
  actualizado TIMESTAMP 
);

CREATE TABLE Productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  precio DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT(0),
  descripcion TEXT,
  creado TIMESTAMP NOT NULL,
  actualizado TIMESTAMP,
  idCategoria INT REFERENCES Categorias(id) NOT NULL
);

CREATE TABLE Usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(20) NOT NULL UNIQUE,
  contrasena TEXT NOT NULL,
  correo VARCHAR(50) NOT NULL,
  rol VARCHAR(20) NOT NULL,
  creado TIMESTAMP NOT NULL,
  actualizado TIMESTAMP
);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE VIEW ProductosView AS
SELECT P.id, P.nombre, P.precio, P.stock, P.descripcion, C.id categoria_id, C.nombre categoria, C.icono, C.color,
  TO_CHAR(P.creado, 'DD/MM/YYYY') AS creado_fecha,
  TO_CHAR(P.creado, 'HH24:MI:SS') AS creado_hora,
  TO_CHAR(P.actualizado, 'DD/MM/YYYY') AS actualizado_fecha,
  TO_CHAR(P.actualizado, 'HH24:MI:SS') AS actualizado_hora
FROM Productos P, Categorias C WHERE C.id = P.idCategoria;

CREATE VIEW CategoriasView AS
SELECT id, nombre, descripcion, icono, color,
  TO_CHAR(creado, 'DD/MM/YYYY') AS creado_fecha,
  TO_CHAR(creado, 'HH24:MI:SS') AS creado_hora,
  TO_CHAR(actualizado, 'DD/MM/YYYY') AS actualizado_fecha,
  TO_CHAR(actualizado, 'HH24:MI:SS') AS actualizado_hora
FROM Categorias;

CREATE VIEW UsuariosView AS
SELECT id, nombre, correo, rol,
  TO_CHAR(creado, 'DD/MM/YYYY') AS creado_fecha,
  TO_CHAR(creado, 'HH24:MI:SS') AS creado_hora,
  TO_CHAR(actualizado, 'DD/MM/YYYY') AS actualizado_fecha,
  TO_CHAR(actualizado, 'HH24:MI:SS') AS actualizado_hora
FROM Usuarios;

INSERT INTO Categorias (nombre, icono, color, descripcion, creado) VALUES
('Computadores', 'Computador', 'Índigo', 'Computadoras de diversas marcas y especificaciones.', CURRENT_DATE),
('Celulares', 'Celular', 'Azul Cielo', 'Teléfonos inteligentes con las últimas tecnologías.', CURRENT_DATE),
('Accesorios', 'Paleta', 'Verde', 'Complementos y periféricos para tus dispositivos.', CURRENT_DATE),
('Periféricos', 'Mouse', 'Morado', 'Dispositivos externos como teclados, ratones y monitores.', CURRENT_DATE);

INSERT INTO Productos (nombre, idCategoria, precio, stock, descripcion, creado) VALUES
('Consolador Femenino', 3, 10.00, 100, 'Para el placer femenino', CURRENT_DATE),
('iPhone 14 Pro', 2, 999.99, 50, 'Teléfono inteligente de alta gama con pantalla OLED y cámara triple.', CURRENT_DATE),
('Samsung Galaxy S23', 2, 899.99, 45, 'Smartphone con tecnología 5G y batería de larga duración.', CURRENT_DATE),
('MacBook Air M2', 1, 1299.99, 30, 'Laptop ultraligera con chip Apple M2 y pantalla Retina.', CURRENT_DATE),
('HP Pavilion 15', 1, 799.99, 25, 'Computadora portátil ideal para trabajo y estudio.', CURRENT_DATE),
('Cargador USB-C', 3, 19.99, 100, 'Cargador rápido compatible con dispositivos USB-C.', CURRENT_DATE),
('Mouse Logitech MX Master', 4, 79.99, 60, 'Mouse inalámbrico ergonómico con múltiples botones.', CURRENT_DATE),
('Xiaomi Redmi Note 12', 2, 299.99, 75, 'Teléfono económico con excelente rendimiento.', CURRENT_DATE),
('Asus ROG Zephyrus', 1, 1599.99, 15, 'Laptop gaming de alto rendimiento con tarjeta gráfica dedicada.', CURRENT_DATE),
('Audífonos Sony WH-1000XM5', 3, 349.99, 40, 'Audífonos inalámbricos con cancelación de ruido.', CURRENT_DATE),
('Teclado Razer BlackWidow', 4, 129.99, 50, 'Teclado mecánico RGB para gamers.', CURRENT_DATE),
('Google Pixel 7', 2, 699.99, 35, 'Smartphone con cámara avanzada y software optimizado por Google.', CURRENT_DATE),
('Lenovo ThinkPad X1 Carbon', 1, 1399.99, 20, 'Laptop empresarial ligera y resistente.', CURRENT_DATE),
('Cable HDMI 2m', 3, 9.99, 200, 'Cable HDMI de alta velocidad para video y audio.', CURRENT_DATE),
('Monitor Dell UltraSharp', 4, 399.99, 10, 'Monitor de 27 pulgadas con resolución 4K.', CURRENT_DATE),
('OnePlus 10T', 2, 599.99, 40, 'Teléfono con carga rápida y diseño moderno.', CURRENT_DATE),
('MSI Modern 14', 1, 899.99, 25, 'Laptop versátil para uso diario y productividad.', CURRENT_DATE),
('Funda para iPhone', 3, 14.99, 150, 'Protector de silicona para iPhone 14.', CURRENT_DATE),
('Kit Teclado y Mouse Inalámbrico', 4, 49.99, 80, 'Combo de teclado y mouse inalámbricos básicos.', CURRENT_DATE),
('SSD Externo Samsung T7', 3, 119.99, 90, 'Unidad de almacenamiento externa rápida y compacta.', CURRENT_DATE);

INSERT INTO Usuarios (nombre, contrasena, correo, rol, creado, actualizado)
VALUES ('admin01', crypt('Admin01*', gen_salt('bf')), 'admin@email.com', 'Administrador', CURRENT_TIMESTAMP, NULL);