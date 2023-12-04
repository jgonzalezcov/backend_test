-- Crear la base de datos
CREATE DATABASE topic_test;

-- Usar la base de datos creada
\c topic_test

-- Crear la tabla 'topic' con una columna 'id' como clave primaria y una columna 'topic'
CREATE TABLE topic (
    id SERIAL PRIMARY KEY,
    topic VARCHAR(50),
    user_id INT NOT NULL
);

-- Insertar varios registros en la tabla 'topic' sin especificar un valor para 'id'
INSERT INTO topic (topic, user_id) 
VALUES
('Matemáticas',1),
('Ciencias Naturales', 1),
('Historia', 1),
('Geografía', 1),
('Dragon Ball',1 );


-- Crear la tabla 'user'
CREATE TABLE client (      
      id SERIAL PRIMARY KEY,
      name VARCHAR (255) NOT NULL,
      last_name VARCHAR (255) NOT NULL,
      email VARCHAR (255) NOT NULL,
      password VARCHAR (255) NOT NULL,
      condition VARCHAR (15) NOT NULL DEFAULT 'active',
      is_teacher BOOLEAN DEFAULT false,
      is_student BOOLEAN  DEFAULT false,
      total_starts INT NOT NULL DEFAULT 0,
      num_qualification INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      deleted_at BOOLEAN NOT NULL DEFAULT false
);

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


-- Crear la tabla 'question' con una columna 'id' como clave primaria y una columna 'question'
CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    id_topic INT REFERENCES topic(id),
    questionText VARCHAR(255),
);

-- Iserta datos tabla question
INSERT INTO question (id_topic, questionText ) 
VALUES
(1, 'Cuanto es 1 + 1' );




-- Crear la tabla 'alternative' con una columna 'id' como clave primaria y una columna 'alternative'
CREATE TABLE alternative (
    id SERIAL PRIMARY KEY,
    id_question INT REFERENCES question(id),
    alternativeText VARCHAR(255),
    isCorrect BOOLEAN
);
-- Iserta datos tabla alternative
INSERT INTO question (id_question, alternativeText, isCorrect ) 
VALUES
(1, 'Cuanto es 1 + 1' ), ;
