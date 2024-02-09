
CREATE TABLE IF NOT EXISTS clinic.employees (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    specialist VARCHAR(50) NOT NULL,
    dni INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    created_at DATE DEFAULT CURRENT_TIMESTAMP,
    updated_at DATE DEFAULT NULL,
    personal_id VARCHAR(50) NOT NULL,
    start_time VARCHAR(255) NULL DEFAULT NULL,
    end_time VARCHAR(255) NULL DEFAULT NULL,
    days_off VARCHAR(255) NULL DEFAULT NULL,
    sex VARCHAR(50) NULL DEFAULT NULL,
    birthday DATE NULL DEFAULT NULL,
    phone BIGINT NULL DEFAULT null 
);

CREATE TABLE IF NOT EXISTS clinic.patients (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    dni INT NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATE DEFAULT CURRENT_TIMESTAMP,
    updated_at DATE DEFAULT NULL,
    blood_group VARCHAR(10) NOT NULL,
    birthday DATE NOT NULL,
    address VARCHAR(250) NULL DEFAULT NULL,
    temporalToken VARCHAR(700) NULL DEFAULT NULL,
    sex VARCHAR(50) NULL DEFAULT NULL,
    phone BIGINT NULL DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS clinic.agenda (
    id SERIAL PRIMARY KEY,
    date VARCHAR(2) NOT NULL,
    month VARCHAR(2) NOT NULL,
    year VARCHAR(4) NOT NULL,
    day VARCHAR(1) NOT NULL,
    time VARCHAR(5) NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    state VARCHAR(20) DEFAULT NULL,
    medical_id INT REFERENCES clinic.employees(id),
    patient_id INT REFERENCES clinic.patients(id),
    created_at DATE DEFAULT CURRENT_TIMESTAMP,
    updated_at DATE DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS clinic.treatment (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES clinic.patients(id),
    resume VARCHAR(1000) DEFAULT '0',
    initial_date DATE DEFAULT NULL,
    exp_date DATE DEFAULT NULL,
    patologies VARCHAR(250) DEFAULT '',
    surgey VARCHAR(500) DEFAULT '',
    medical_id INT REFERENCES clinic.employees(id),
    finish_treatment BOOLEAN DEFAULT FALSE,
    updated_at DATE DEFAULT NULL,
    medicine_data VARCHAR(1000) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS clinic.history (
    id SERIAL PRIMARY KEY,
    medical_id INT REFERENCES clinic.employees(id),
    patient_id INT REFERENCES clinic.patients(id),
    description TEXT NOT NULL,
    date DATE NOT NULL,
    treatment_id INT REFERENCES clinic.treatment(id),
    agenda_id INT REFERENCES clinic.agenda(id),
    created_at DATE DEFAULT CURRENT_TIMESTAMP,
    updated_at DATE DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS clinic.notifications (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES clinic.patients(id),
    medical_id INT REFERENCES clinic.employees(id),
    treatment_message VARCHAR(500) DEFAULT NULL,
    created_at DATE DEFAULT CURRENT_TIMESTAMP,
    "state" VARCHAR(8) DEFAULT 'no leído' CHECK ("state" IN ('leído', 'no leído')),
    appointment_message_patient VARCHAR(500) DEFAULT NULL,
    treatment_id INT REFERENCES clinic.treatment(id),
    agenda_id INT REFERENCES clinic.agenda(id),
    appointment_message_employee VARCHAR(500) DEFAULT NULL
)