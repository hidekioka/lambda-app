 CREATE SEQUENCE seq_md_note START 1;
 
 CREATE TABLE md_note (
	 id integer NOT NULL DEFAULT nextval('seq_md_note'),
	 title text,
	 description text
 );
 
ALTER SEQUENCE seq_md_note OWNED BY md_note.id;

CREATE SEQUENCE seq_note START 1;

CREATE TABLE md_note (
	 id integer NOT NULL DEFAULT nextval('seq_note'),
	 text text
);

ALTER SEQUENCE seq_note OWNED BY md_note.id;

ALTER TABLE note ADD email text;