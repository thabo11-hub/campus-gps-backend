CREATE TABLE public.users(
	ID serial NOT NULL, 
	name varchar(100),
	lastname varchar(100),
	email varchar(100) unique,
	password varchar(100) not null,
    campus varchar(100),
	role character varying(10) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    Primary Key(ID)
);


CREATE TABLE public.student(
	ID serial NOT NULL, 
	userID integer,
    student_no integer,
    id_no varchar(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID)
);

CREATE TABLE public.admin(
	ID serial NOT NULL, 
	userID integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID)
);

CREATE TABLE public.lecture(
    ID serial NOT NULL,
    userID integer,
    stuff_no integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID)
);

CREATE TABLE public.location(
    ID serial NOT NULL,
    name varchar(255),
    lat numeric,
    lng numeric,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID)
);

CREATE TABLE public.waypoints(
    ID serial NOT NULL,
    locationID integer,
    lat numeric,
    lng numeric,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID)
);

ALTER TABLE public.waypoints
    ADD FOREIGN KEY (locationID)
    REFERENCES public.location (ID)
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE public.student
    ADD FOREIGN KEY (userID)
    REFERENCES public.users (ID)
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE public.admin
    ADD FOREIGN KEY (userID)
    REFERENCES public.users (ID)
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE public.lecture
    ADD FOREIGN KEY (userID)
    REFERENCES public.users (ID)
    ON DELETE CASCADE
    NOT VALID;

CREATE UNIQUE INDEX users_unique_lower_email_idx
    ON public.users (lower(email));

-- Location values

INSERT INTO location (name, lat, lng)
VALUES ('Ruth First Hall', -25.541657366056807, 28.096021413803104);

-- First waypoint
INSERT INTO waypoints (locationID, lat, lng)
VALUES (1, -25.540737731295003, 28.096171617507938);

-- Second waypoint
INSERT INTO waypoints (locationID, lat, lng)
VALUES (1, -25.5408345352863, 28.096053600311283);

-- Third waypoint
INSERT INTO waypoints (locationID, lat, lng)
VALUES (1, -25.541212070105594, 28.096005320549015);

-- Fourth waypoint
INSERT INTO waypoints (locationID, lat, lng)
VALUES (1, -25.54143471828793, 28.096058964729313);

-- Second location

INSERT INTO location (name, lat, lng)
VALUES ('Building 10', -25.539885852801586, 28.095560073852543);

INSERT INTO waypoints (locationID, lat, lng)
VALUES (2, -25.540611885989474, 28.09608578681946),
       (2, -25.540486040551873, 28.096075057983402),
       (2, -25.540302112366998, 28.095828294754032),
       (2, -25.53997297701624, 28.095774650573734);


-- Third location

INSERT INTO location (name, lat, lng)
VALUES ('I-Center', -25.540079462081525, 28.095688819885257);

INSERT INTO waypoints (locationID, lat, lng)
VALUES (3, -25.540602205575894, 28.09608578681946),
       (3, -25.54050540139702, 28.096042871475223),
       (3, -25.54017626660427, 28.095817565917972);


-- One Stop Registration

INSERT INTO location (name, lat, lng)
VALUES ('One Stop Registration', -25.54050540139702, 28.095538616180423);


INSERT INTO waypoints (locationID, lat, lng)
VALUES (4, -25.540611885989474, 28.09608578681946),
       (4, -25.540640927225553, 28.095957040786747),
       (4, -25.540476360128114, 28.09586048126221);

-- Library

INSERT INTO location (name, lat, lng)
VALUES ('Library', -25.54003105979085, 28.095560073852543);

INSERT INTO waypoints (locationID, lat, lng)
VALUES (5, -25.540621566402276,  28.09608578681946),
       (5, -25.54050540139702,  28.096075057983402),
       (5, -25.540350514548276,  28.095828294754032),
       (5, -25.54019562749944,  28.095806837081913);

-- Cafeteria

INSERT INTO location (name, lat, lng)
VALUES ('Cafeteria', -25.540902298033718, 28.095281124114994);

INSERT INTO waypoints (locationID, lat, lng) VALUES 
    (6, -25.540602205575894, 28.09608578681946), 
    (6, -25.54072321068957, 28.09616625308991), 
    (6, -25.540810334295813, 28.096053600311283), 
    (6, -25.54122175046995, 28.095989227294925), 
    (6, -25.54141051741857, 28.096042871475223), 
    (6, -25.541623484901255, 28.09535622596741), 
    (6, -25.541304033535365, 28.095324039459232), 
    (6, -25.541086225297907, 28.09508264064789), 
    (6, -25.540941019586462, 28.095071911811832);
