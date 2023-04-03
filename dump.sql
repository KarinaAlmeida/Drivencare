--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: appointments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.appointments (
    id integer NOT NULL,
    doctor_id integer NOT NULL,
    patient_id integer,
    day date NOT NULL,
    "time" time without time zone NOT NULL,
    confirmed boolean
);


--
-- Name: appointments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.appointments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: appointments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.appointments_id_seq OWNED BY public.appointments.id;


--
-- Name: doctors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.doctors (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password character varying(60) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT '2023-03-31 14:13:25.408578'::timestamp without time zone NOT NULL,
    specialty text NOT NULL,
    address text NOT NULL,
    checkin time without time zone NOT NULL,
    checkout time without time zone NOT NULL
);


--
-- Name: doctors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.doctors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: doctors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.doctors_id_seq OWNED BY public.doctors.id;


--
-- Name: patients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.patients (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password character varying(60) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT '2023-03-31 14:13:25.408578'::timestamp without time zone NOT NULL
);


--
-- Name: patients_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.patients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: patients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.patients_id_seq OWNED BY public.patients.id;


--
-- Name: appointments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments ALTER COLUMN id SET DEFAULT nextval('public.appointments_id_seq'::regclass);


--
-- Name: doctors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctors ALTER COLUMN id SET DEFAULT nextval('public.doctors_id_seq'::regclass);


--
-- Name: patients id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients ALTER COLUMN id SET DEFAULT nextval('public.patients_id_seq'::regclass);


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.appointments VALUES (2, 1, 3, '2023-02-03', '15:00:00', NULL);


--
-- Data for Name: doctors; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.doctors VALUES (1, 'karina', 'karina@email.com', '1234', '2023-03-31 14:13:25.408578', 'dermatologista', 'tatuapé', '09:00:00', '16:00:00');
INSERT INTO public.doctors VALUES (2, 'helena', 'helena@email.com', '$2b$10$TC0csx2eGzPLznpo0WC02OaYM.LouDINtKC4YtZlfg0W7H7EH3KnC', '2023-03-31 14:13:25.408578', 'oftalmologista', 'jardins', '09:00:00', '18:00:00');
INSERT INTO public.doctors VALUES (3, 'tomas', 'tomas@email.com', '$2b$10$91Nb2ds4T1kosJKyKsPevuzf91Paymsnma1xEBUjDRMVt7WowH6jO', '2023-03-31 14:13:25.408578', 'infectologista', 'tatuapé', '09:00:00', '16:00:00');
INSERT INTO public.doctors VALUES (4, 'mateus', 'mateus@email.com', '$2b$10$jtcjzHM7tijN7ihEwgaAbOY06YN.tdR9QLMj0VlANHb22Xooyy./6', '2023-03-31 14:13:25.408578', 'dermatologista', 'tatuapé', '08:30:00', '16:00:00');
INSERT INTO public.doctors VALUES (5, 'matilda', 'matilda@email.com', '$2b$10$AY1a0QE2AyEifUzF3Q8KBOPgArrjDmFGDCMfjEqrBPF7fhRk2Gdv6', '2023-03-31 14:13:25.408578', 'otorrino', 'tatuapé', '09:00:00', '16:00:00');


--
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.patients VALUES (1, 'karina', 'karina@email.com', '1234', '2023-03-31 14:13:25.408578');
INSERT INTO public.patients VALUES (2, 'mari', 'mari@email.com', '$2b$10$.XPH5U01AkiUyAMrl7snT./QudNdy1BOA.a6ccSI1/XnW.ZPBz8Py', '2023-03-31 14:13:25.408578');
INSERT INTO public.patients VALUES (3, 'teste', 'teste@email.com', '$2b$10$RYBSm2d0Bjq9.iVf5tZLLOp4FdNSgVsejQuB/Zh2CmanmmNwInXzu', '2023-03-31 14:13:25.408578');


--
-- Name: appointments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.appointments_id_seq', 3, true);


--
-- Name: doctors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.doctors_id_seq', 5, true);


--
-- Name: patients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.patients_id_seq', 3, true);


--
-- Name: appointments appointments_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pk PRIMARY KEY (id);


--
-- Name: doctors doctors_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_email_key UNIQUE (email);


--
-- Name: doctors doctors_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pk PRIMARY KEY (id);


--
-- Name: patients patients_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_email_key UNIQUE (email);


--
-- Name: patients patients_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pk PRIMARY KEY (id);


--
-- Name: appointments appointments_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_fk0 FOREIGN KEY (doctor_id) REFERENCES public.doctors(id);


--
-- Name: appointments appointments_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_fk1 FOREIGN KEY (patient_id) REFERENCES public.patients(id);


--
-- PostgreSQL database dump complete
--

