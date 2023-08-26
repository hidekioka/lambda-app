 CREATE SEQUENCE seq_md_note START 1;
 
 CREATE TABLE md_note (
	 id integer NOT NULL DEFAULT nextval('seq_md_note'),
	 title text,
	 description text
 );
 
ALTER SEQUENCE seq_md_note
OWNED BY md_note.id;