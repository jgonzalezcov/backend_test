-- Crear la base de datos
CREATE DATABASE topic_test;

-- Usar la base de datos creada
\c topic_test

-- Crear la tabla 'topic' con una columna 'id' como clave primaria y una columna 'topic'
CREATE TABLE topic (
    id SERIAL PRIMARY KEY,
    topic VARCHAR(50),
    description VARCHAR(255),
    category VARCHAR(50),
    public BOOLEAN DEFAULT true,
    likes int DEFAULT 0,
    dislikes int DEFAULT 0,
    user_id INT NOT NULL
);

-- Insertar varios registros en la tabla 'topic' sin especificar un valor para 'id'
INSERT INTO topic (topic, category, likes, dislikes, user_id) 
VALUES
('Matemáticas','Matemáticas Basicas','Sumas y restas',  DEFAULT,DEFAULT,DEFAULT,1),
('Biología','Genética','Tema para la prueba 1 del primer trimestre' , DEFAULT,DEFAULT,DEFAULT,1),
('Historia' , 'Egipto', 'Examen de Historia Octavo Basico',  DEFAULT,DEFAULT,DEFAULT,1),
('Geografía', 'Geografía Política' , 'Estudio Geografia Cuarto medio', DEFAULT,DEFAULT,DEFAULT,1);



-- Crear la tabla 'question' con una columna 'id' como clave primaria y una columna 'question'
CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    topic_id INT REFERENCES topic(id),
    question VARCHAR(255)
);

-- inserta las preguntas de matematicas'
INSERT INTO question (topic_id, question) 
VALUES
(1, '¿Cuál es el resultado de 2 + 3 × 4?'),
(1, 'Si x - 8 = 15, ¿cuál es el valor de x?'),
(1, '¿Cuál es la raíz cuadrada de 81?'),
(1, 'Si un cuadrado tiene un lado de longitud 6 cm, ¿cuál es su área?'),
(1, '¿Cuánto es el doble de la mitad de 40?'),
(1, '¿Cuánto es 3/4 de 48?'),
(1, 'Si 2x + 5 = 17, ¿cuál es el valor de x?'),
(1, '¿Cuál es el resultado de 5² - 3²?'),
(1, 'Si un triángulo tiene un ángulo recto y otro de 60 grados, ¿cuánto mide el tercer ángulo?'),
(1, 'Si un círculo tiene un radio de 10 cm, ¿cuál es su área?');


-- inserta las preguntas de ciencias naturales'
INSERT INTO question (topic_id, question) 
VALUES
(2, '¿Cuál es el proceso de fotosíntesis en las plantas?'),
(2, 'Explique el ciclo del agua en la naturaleza.'),
(2, '¿Cuáles son los diferentes tipos de ecosistemas?'),
(2, 'Describe la estructura básica de una célula animal.'),
(2, '¿Qué es la cadena alimentaria y cómo funciona?'),
(2, 'Menciona y explica tres tipos diferentes de energía.'),
(2, '¿Cómo afecta la deforestación al medio ambiente?'),
(2, 'Habla sobre la teoría de la evolución de Charles Darwin.'),
(2, '¿Cuáles son los efectos del cambio climático en la Tierra?'),
(2, 'Explique el ciclo de vida de una mariposa.');

-- inserta las preguntas de historia'
INSERT INTO question (topic_id, question) 
VALUES
(3, '¿En qué año comenzó la Revolución Francesa?'),
(3, 'Explique la importancia de la Declaración de Independencia de los Estados Unidos.'),
(3, '¿Cuándo y dónde se celebró la Revolución Rusa?'),
(3, 'Hable sobre la Guerra Fría y sus implicaciones globales.'),
(3, '¿Cuál fue el imperio más grande de la historia antigua?'),
(3, 'Describa la expansión del Imperio Romano.'),
(3, '¿Cuándo y dónde tuvo lugar la Revolución Industrial?'),
(3, 'Explique las causas y consecuencias de la Primera Guerra Mundial.'),
(3, 'Hable sobre la Revolución China liderada por Mao Zedong.'),
(3, '¿En qué año cayó el Muro de Berlín?');

-- inserta las preguntas de Geografia'
INSERT INTO question (topic_id, question) 
VALUES
(4, '¿Cuál es el río más largo del mundo?'),
(4, 'Hable sobre la formación y características de los montes Himalaya.'),
(4, '¿Dónde se encuentra el Gran Cañón?'),
(4, 'Describa el fenómeno de El Niño y sus efectos.'),
(4, '¿Cuál es la capital de Australia?'),
(4, 'Explique la importancia del Canal de Panamá en el comercio mundial.'),
(4, 'Hable sobre la Gran Barrera de Coral y su ubicación.'),
(4, '¿Dónde se encuentra el desierto del Sahara?'),
(4, '¿Cuál es el punto más alto de América del Sur?'),
(4, 'Explique el concepto de continentalidad en la geografía.');

-- Crear la tabla 'alternative' con una columna 'id' como clave primaria y una columna 'alternative'
CREATE TABLE alternative (
    id SERIAL PRIMARY KEY,
    question_id INT REFERENCES question(id),
    alternative VARCHAR(255),
    isCorrect BOOLEAN
);
-- Iserta datos tabla alternative
-- Insertar alternativas corregidas en la tabla 'alternative'
INSERT INTO alternative (question_id, alternative, isCorrect) 
VALUES
(1, '14', false),
(1, '20', false),
(1, '24', true),
(1, '32', false),
(2, '7', false),
(2, '15', true),
(2, '23', false),
(2, '30', false),
(3, '7', false),
(3, '9', false),
(3, '27', true),
(3, '81', false),
(4, '12', false),
(4, '18', false),
(4, '24', false),
(4, '36', true),
(5, '10', false),
(5, '20', true),
(5, '30', false),
(5, '40', false),
(6, '24', true),
(6, '36', false),
(6, '45', false),
(6, '54', false),
(7, '6', false),
(7, '7', true),
(7, '8', false),
(7, '9', false),
(8, '16', false),
(8, '22', true),
(8, '25', false),
(8, '32', false),
(9, '30', true),
(9, '45', false),
(9, '60', false),
(9, '90', false),
(10, '100π', false),
(10, '200π', false),
(10, '300π', false),
(10, '400π', true);


-- Insertar alternativas para las preguntas de Ciencias Naturales
INSERT INTO alternative (question_id, alternative, isCorrect) 
VALUES
(11, 'Absorción de luz solar para producir alimentos y liberación de oxígeno.', true),
(11, 'Descomposición de materia orgánica para liberar energía.', false),
(11, 'Desplazamiento de nutrientes en el suelo.', false),
(11, 'Generación de electricidad en las células.', false),
(12, 'Evaporación, condensación, precipitación e infiltración.', true),
(12, 'Fotosíntesis, transpiración, evaporación y condensación.', false),
(12, 'Formación de nubes, lluvia, nieve y granizo.', false),
(12, 'Absorción de agua por las raíces y liberación por las hojas.', false),
(13, 'Terrestres, acuáticos y aéreos.', true),
(13, 'Tropicales, subtropicales y polares.', false),
(13, 'Desérticos, lluviosos y templados.', false),
(13, 'Bosques, praderas y tundras.', false),
(14, 'Núcleo, membrana celular y citoplasma.', true),
(14, 'Pared celular, cloroplastos y mitocondrias.', false),
(14, 'Centriolos, retículo endoplasmático y aparato de Golgi.', false),
(14, 'Núcleo, ribosomas y vacuolas.', false),
(15, 'Serie de organismos que se alimentan unos de otros.', true),
(15, 'Proceso de transformación de energía en las plantas.', false),
(15, 'Relación simbiótica entre especies.', false),
(15, 'Mecanismo de adaptación de los animales al entorno.', false),
(16, 'Solar, eólica y hidroeléctrica.', true),
(16, 'Nuclear, térmica y geotérmica.', false),
(16, 'Química, cinética y potencial.', false),
(16, 'Fósil, biomasa y mareomotriz.', false),
(17, 'Pérdida de diversidad biológica y alteración del clima.', true),
(17, 'Aumento de la productividad agrícola y forestal.', false),
(17, 'Reducción de la contaminación del aire y agua.', false),
(17, 'Incremento de la captura de carbono.', false),
(18, 'Propuesta científica sobre el origen de las especies por selección natural.', true),
(18, 'Teoría de la creación divina del universo.', false),
(18, 'Hipótesis de la generación espontánea.', false),
(18, 'Explicación mitológica sobre la diversidad de la vida.', false),
(19, 'Aumento de las temperaturas globales y eventos climáticos extremos.', true),
(19, 'Mejora en la calidad del aire y aumento de la biodiversidad.', false),
(19, 'Reducción de los niveles de dióxido de carbono en la atmósfera.', false),
(19, 'Disminución de la acidez de los océanos.', false),
(20, 'Huevo, larva, pupa y adulto.', true),
(20, 'Embrión, juvenil, adulto y anciano.', false),
(20, 'Germinación, plántula, planta adulta y floración.', false),
(20, 'Proceso de fotosíntesis, crecimiento, reproducción y muerte.', false);


-- Insertar alternativas para las preguntas de Historia
INSERT INTO alternative (question_id, alternative, isCorrect) 
VALUES
(21, '1789', true),
(21, '1815', false),
(21, '1905', false),
(21, '1929', false),
(22, 'Establecimiento de los derechos individuales y la separación de poderes.', true),
(22, 'Independencia económica de las colonias.', false),
(22, 'Creación de un sistema parlamentario.', false),
(22, 'Establecimiento de la monarquía absoluta.', false),
(23, '1917 en Rusia.', true),
(23, '1789 en Francia.', false),
(23, '1861 en Italia.', false),
(23, '1945 en Alemania.', false),
(24, 'Confrontación política y militar entre Estados Unidos y la Unión Soviética.', true),
(24, 'Conflicto armado entre China y Japón.', false),
(24, 'Disputa territorial en América Latina.', false),
(24, 'Guerra de independencia en África.', false),
(25, 'Imperio Mongol', true),
(25, 'Imperio Romano', false),
(25, 'Imperio Otomano', false),
(25, 'Imperio Persa', false),
(26, 'Desde el siglo VIII a.C. hasta el siglo V d.C.', true),
(26, 'Durante la Edad Media.', false),
(26, 'En el siglo XVIII.', false),
(26, 'En un período histórico posterior.', false),
(27, 'A finales del siglo XVIII en Inglaterra.', true),
(27, 'En la antigua Grecia.', false),
(27, 'Durante el Renacimiento italiano.', false),
(27, 'En la Edad Media europea.', false),
(28, '1914-1918', true),
(28, '1939-1945', false),
(28, '1871-1914', false),
(28, '1945-1991', false),
(29, 'Lucha comunista liderada por Mao Zedong en China.', true),
(29, 'Revolución industrial en Inglaterra.', false),
(29, 'Independencia de la India liderada por Mahatma Gandhi.', false),
(29, 'Movimiento de derechos civiles en Estados Unidos.', false),
(30, '1989', true),
(30, '1969', false),
(30, '1975', false),
(30, '1991', false);

-- Insertar alternativas para las preguntas de Geografía

INSERT INTO alternative (question_id, alternative, isCorrect) 
VALUES
(31, 'Amazonas', true),
(31, 'Nilo', false),
(31, 'Misisipi', false),
(31, 'Yangtsé', false),
(32, 'Formados por el choque de las placas tectónicas Indoaustraliana y Euroasiática.', true),
(32, 'Situados en América del Norte.', false),
(32, 'Principales montañas de África occidental.', false),
(32, 'Ubicados en América del Sur.', false),
(33, 'Estados Unidos', true),
(33, 'Australia', false),
(33, 'Brasil', false),
(33, 'China', false),
(34, 'Pacífico', true),
(34, 'Atlántico', false),
(34, 'Índico', false),
(34, 'Ártico', false),
(35, 'Canberra', true),
(35, 'Sídney', false),
(35, 'Melbourne', false),
(35, 'Brisbane', false),
(36, 'Facilita el paso de barcos entre el océano Atlántico y el océano Pacífico.', true),
(36, 'Conecta el mar Mediterráneo con el océano Atlántico.', false),
(36, 'Permite la navegación entre el mar Rojo y el mar Caspio.', false),
(36, 'Facilita el transporte en el río Amazonas.', false),
(37, 'Nordeste de Australia', true),
(37, 'Costa este de África', false),
(37, 'Mar Caribe', false),
(37, 'Mar de China Meridional', false),
(38, 'África', true),
(38, 'Asia', false),
(38, 'América del Norte', false),
(38, 'Europa', false),
(39, 'Aconcagua', true),
(39, 'Monte Everest', false),
(39, 'K2', false),
(39, 'Denali', false),
(40, 'Diferencia en las temperaturas entre el interior de los continentes y las costas.', true),
(40, 'Influencia de los océanos en el clima de una región.', false),
(40, 'Efecto del cambio climático en la geografía.', false),
(40, 'Distribución de las precipitaciones en una zona montañosa.', false);



-- Crear la tabla 'account'
CREATE TABLE account(      
      id SERIAL PRIMARY KEY,
      name VARCHAR (255) NOT NULL,
      email VARCHAR (255) NOT NULL,
      password VARCHAR (255) NOT NULL,
      condition VARCHAR (15) NOT NULL DEFAULT 'active',
      type_account   VARCHAR(15) NOT NULL DEFAULT 'basic',
      expiration DATE NOT NULL DEFAULT '01/01/3000'
);
-- Insertar varios registros en la tabla 'account' sin especificar un valor para 'id'
INSERT INTO account (name, email, password) 
VALUES
('Juan González','jgonzalezcov@gmail.com', '123');

--/Creacion de trigger para colocar fecha de actualizacion de client/
BEGIN;
CREATE OR REPLACE FUNCTION update_timestamp_client()
RETURNS TRIGGER AS $$
BEGIN
      NEW.updated_at= now();
      RETURN NEW;
END;
$$ language 'plpgsql';
COMMIT;
CREATE TRIGGER client_timestamp BEFORE INSERT OR UPDATE ON client
FOR EACH ROW EXECUTE PROCEDURE update_timestamp_client();
COMMIT;


-- Iserta datos tabla client
INSERT INTO client (name, last_name, email, password ) 
VALUES
('Juan', 'González', 'jgonzalezcov@gmail.com', '123' );