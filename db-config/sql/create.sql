create table genre(
    genre_id   serial
        primary key,
    genre_name varchar(255)
);

create table shelf
(
    shelf_id   serial
        primary key,
    shelf_code varchar(255)
);

create table language
(
    language_id   serial
        primary key,
    language_name varchar(255)
);

create table user_type
(
    user_type_id        serial
        primary key,
    type_name           varchar(255),
    max_extratime       integer,
    max_rental          integer,
    max_reservation_day integer,
    penalty_fee         integer,
    rental_time         integer
);

create table heading
(
    heading_id serial
        primary key,
    heading    varchar(255)
);



create table item_format
(
    format_id   serial
        primary key,
    format_name varchar(255)
);



create table publisher
(
    publisher_id   serial
        primary key,
    publisher_name varchar(255)
);



create table author
(
    author_id   serial
        primary key,
    first_name  varchar(255),
    last_name   varchar(255),
    nationality varchar(255)
);


create table admin
(
    admin_id     serial
        primary key,
    firstname    varchar(255),
    last_name    varchar(255),
    email        varchar(255),
    username     varchar(255),
    password     varchar(255),
    phone_number varchar(255)
);



create table serie
(
    serie_id   serial
        primary key,
    serie_name varchar(255)
);


create table branch
(
    branch_id   serial
        primary key,
    branch_code varchar(255),
    shelf_id    integer
        references shelf
);


create table item
(
    item_id           serial
        primary key,
    name              varchar(255),
    publication_date  date,
    format_id         integer
        references item_format,
    publisher_id      integer
        references publisher,
    language_id       integer
        references language,
    serie_id          integer
        references serie,
    branch_id         integer
        references branch,
    admin_id          integer
        references admin,
    status            varchar(255),
    barcode           varchar(255),
    register_date     date,
    rate              numeric(4, 2),
    rated_user_number integer,
    genre_id          integer
        references genre
);


create table item_heading
(
    heading_id integer not null
        references heading,
    item_id    integer not null
        references item,
    primary key (heading_id, item_id)
);


create table periodical_item
(
    item_id       integer not null
        primary key
        references item,
    frequency     varchar(255),
    volume_number integer,
    living        boolean
);


create table lost_item
(
    item_id     integer not null
        primary key
        references item,
    admin_id    integer
        references admin,
    report_date date
);

create table maintenance_log
(
    item_id          integer not null
        primary key
        references item,
    admin_id         integer
        references admin,
    maintenance_date date,
    description      text
);


create table maintenance_history
(
    maintenance_id       serial
        primary key,
    item_id              integer
        references item,
    admin_id             integer
        references admin,
    maintenance_date     date,
    maintenance_end_date date,
    description          text
);


create table user_account
(
    user_id        serial
        primary key,
    first_name     varchar(255),
    last_name      varchar(255),
    user_type_id   integer
        references user_type,
    email          varchar(255),
    username       varchar(255),
    password       varchar(255),
    phone_number   varchar(255),
    rental_counter integer,
    admin_id       integer
        references admin,
    id_number      varchar(255),
    banned         boolean
);

create table rental_log
(
    item_id           integer not null
        primary key
        references item,
    user_id           integer
        references user_account,
    rent_date         date,
    due_date          date,
    extratime_counter integer,
    admin_id          integer
        references admin
);


create table multimedia_item
(
    item_id integer not null
        primary key
        references item,
    size    integer
);


create table nonperiodical_item
(
    item_id     integer not null
        primary key
        references item,
    author_id   integer
        references author,
    isbn        varchar(255),
    edition     varchar(255),
    page_number integer
);


create table return_history
(
    return_id    serial
        primary key,
    user_id      integer
        references user_account,
    item_id      integer
        references item,
    due_date     date,
    return_date  date,
    is_late      boolean,
    received_fee numeric(5, 2),
    description  text,
    admin_id     integer
        references admin,
    rent_date    date
);


create table reservation
(
    user_id integer
        references user_account,
    item_id integer not null
        primary key
        references item,
    state   varchar(255)
);

create table rating
(
    user_id integer
        references user_account,
    item_id integer
        references item,
    rate    integer
);

create table list
(
    list_id   serial
        primary key,
    user_id   integer
        references user_account,
    list_name varchar(255)
);


create table item_list
(
    list_id integer
        references list,
    item_id integer
        references item
);

create table banned_user
(
    user_id  integer not null
        primary key
        references user_account,
    admin_id integer
        references admin,
    report   text
);

create procedure update_language(IN p_language_id integer, IN p_language_name character varying, OUT p_language_id_out integer)
    language plpgsql
as
$$
BEGIN
    UPDATE language
    SET language_name = p_language_name
    WHERE language_id = p_language_id
    RETURNING language_id INTO p_language_id_out;
END;
$$;

create procedure update_author(IN p_author_id integer, IN p_first_name character varying, IN p_last_name character varying, IN p_nationality character varying, OUT p_author_id_out integer)
    language plpgsql
as
$$
BEGIN
    UPDATE author
    SET first_name = p_first_name,
        last_name = p_last_name,
        nationality = p_nationality
    WHERE author_id = p_author_id
    RETURNING author_id INTO p_author_id_out;
END;
$$;


create procedure add_publisher(IN p_publisher_name character varying, OUT p_publisher_id integer)
    language plpgsql
as
$$
BEGIN
    INSERT INTO publisher(publisher_name)
    VALUES (p_publisher_name)
    RETURNING publisher_id INTO p_publisher_id;
END;

$$;


create procedure add_serie(IN p_serie_name character varying, OUT p_serie_id integer)
    language plpgsql
as
$$
BEGIN
    INSERT INTO serie(serie_name)
    VALUES (p_serie_name)
    RETURNING serie_id INTO p_serie_id;
END;

$$;


create procedure add_genre(IN p_genre_name character varying, OUT p_genre_id integer)
    language plpgsql
as
$$
BEGIN
    INSERT INTO genre(genre_name)
    VALUES (p_genre_name)
    RETURNING genre_id INTO p_genre_id;
END;
$$;


create procedure add_heading(IN p_heading character varying, OUT p_heading_id integer)
    language plpgsql
as
$$
BEGIN
    INSERT INTO heading(heading)
    VALUES (p_heading)
    RETURNING heading_id INTO p_heading_id;
END;
$$;


create procedure add_item_heading(IN p_item_id integer, IN p_heading_name character varying, OUT p_heading_id integer)
    language plpgsql
as
$$
DECLARE
    p_heading_id INTEGER;
BEGIN
    SELECT heading_id FROM heading WHERE heading = p_heading_name INTO p_heading_id;
    IF p_heading_id is null THEN
        CALL add_heading(p_heading_name, p_heading_id);
    END IF;

    INSERT INTO item_heading(heading_id ,item_id)
    VALUES (p_heading_id ,p_item_id);
END;

$$;

create procedure add_shelf(IN p_shelf_code character varying)
    language plpgsql
as
$$
BEGIN
    INSERT INTO shelf(shelf_code)
    VALUES (p_shelf_code);
END;

$$;

create function trg_update_item_on_maintenance() returns trigger
    language plpgsql
as
$$
BEGIN
    UPDATE item
    SET status = 'maintenance'
    WHERE item.item_id = NEW.item_id;

    return null;
END;
$$;



create trigger update_item_on_maintenance
    after insert
    on maintenance_log
    for each row
execute procedure trg_update_item_on_maintenance();

create function trg_update_item_user_on_rental() returns trigger
    language plpgsql
as
$$
BEGIN
    UPDATE item
    SET status = 'rented'
    WHERE item.item_id = NEW.item_id;

    UPDATE user_account
    SET rental_counter = rental_counter + 1
    WHERE user_account.user_id = NEW.user_id;

    return null;
END;
$$;



create trigger update_item_user_on_rental
    after insert
    on rental_log
    for each row
execute procedure trg_update_item_user_on_rental();

create function trg_update_item_on_lost_item() returns trigger
    language plpgsql
as
$$
DECLARE
    status_checker VARCHAR;
BEGIN
    SELECT status FROM item WHERE item_id = NEW.item_id into status_checker;

    IF status_checker = 'lost' OR  status_checker is null THEN
        RAISE NOTICE 'ITEM ALREADY LOST OR NOT EXIST.';
    ELSE
        UPDATE item
        SET status = 'lost'
        WHERE item.item_id = NEW.item_id;
    END IF;
    RETURN NULL;
END;
$$;



create trigger update_item_on_lost_item
    after insert
    on lost_item
    for each row
execute procedure trg_update_item_on_lost_item();

create function trg_update_on_maintenance_history() returns trigger
    language plpgsql
as
$$
BEGIN
    DELETE FROM maintenance_log WHERE maintenance_log.item_id = NEW.item_id;
    UPDATE item SET status = 'available' WHERE item.item_id = NEW.item_id;

    return null;
END;
$$;



create trigger trg_update_on_maintenance_history
    after insert
    on maintenance_history
    for each row
execute procedure trg_update_on_maintenance_history();

create procedure add_return_history(IN p_item_id integer, IN p_user_id integer, IN p_description text)
    language plpgsql
as
$$
    DECLARE
        p_due_date DATE;
        p_admin_id INTEGER;
        p_rent_date DATE;
        p_penalty_fee INTEGER;
        p_user_type_id INTEGER;
        p_penalty INTEGER;
        p_is_late BOOLEAN;
        p_is_exist BOOLEAN;
    BEGIN
          SELECT 1 FROM rental_log WHERE item_id = p_item_id AND user_id = p_user_id INTO p_is_exist;
          IF p_is_exist THEN
                SELECT due_date, admin_id, rent_date FROM rental_log WHERE item_id = p_item_id INTO p_due_date, p_admin_id, p_rent_date;
                SELECT user_type_id FROM user_account WHERE user_id = p_user_id INTO p_user_type_id;
                SELECT penalty_fee FROM user_type WHERE user_type_id = p_user_type_id INTO p_penalty_fee;
                p_is_late = NOW()::DATE > p_due_date;
                IF p_is_late THEN
                    p_penalty = p_penalty_fee * (NOW()::DATE - p_due_date::DATE);
                ELSE
                    p_penalty = 0;
                end if;
                INSERT INTO return_history (item_id, admin_id, user_id, description, return_date, due_date, is_late, received_fee, rent_date)
                VALUES (p_item_id, p_admin_id, p_user_id, p_description , NOW()::DATE, p_due_date, p_is_late, p_penalty, p_rent_date);
          ELSE
              RAISE NOTICE 'Record does not exist!!';
          END IF;
    END;
$$;

create function trg_update_on_return_history() returns trigger
    language plpgsql
as
$$
BEGIN
    DELETE FROM rental_log WHERE rental_log.item_id = NEW.item_id;
    UPDATE item SET status = 'available' WHERE item.item_id = NEW.item_id;
    UPDATE user_account SET rental_counter = rental_counter - 1 WHERE user_account.user_id = NEW.user_id;
    return null;
END;
$$;

create trigger trg_update_on_return_history
    after insert
    on return_history
    for each row
execute procedure trg_update_on_return_history();

create function trg_update_item_user_on_delete_reservation() returns trigger
    language plpgsql
as
$$
BEGIN
    UPDATE item
    SET status = 'available'
    WHERE item.item_id = old.item_id;

    UPDATE user_account
    SET rental_counter  = rental_counter + 1
    WHERE user_account.user_id = old.user_id;
    return null;
END;
$$;

create trigger update_item_user_on_delete_reservation
    after delete
    on reservation
    for each row
execute procedure trg_update_item_user_on_delete_reservation();

create procedure add_item_list(IN p_list_id integer, IN p_item_id integer)
    language plpgsql
as
$$
DECLARE
    p_on_conflict integer;
BEGIN
    select 1 from item_list where item_id = p_item_id and list_id = p_list_id into p_on_conflict;
    IF p_on_conflict IS NULL THEN
        INSERT INTO item_list(list_id, item_id)
        VALUES (p_list_id, p_item_id);
    ELSE
        RAISE NOTICE 'Item is already in the list!!';
    END IF;
end;
$$;

create procedure add_user_to_list(IN p_user_id integer, IN p_list_name character varying)
    language plpgsql
as
$$
    BEGIN
        INSERT INTO list(user_id, list_name)
        VALUES (p_user_id, p_list_name);
    end;
$$;


create procedure add_banned_user(IN p_user_id integer, IN p_admin_id integer, IN p_report text)
    language plpgsql
as
$$
BEGIN
    INSERT INTO banned_user(user_id, admin_id, report)
    VALUES (p_user_id, p_admin_id, p_report);
END;
$$;

create function trg_update_user_ban() returns trigger
    language plpgsql
as
$$
DECLARE
    banned_checker boolean;
BEGIN
    SELECT banned FROM user_account WHERE user_id = NEW.user_id into banned_checker;

    IF banned_checker THEN
        RAISE NOTICE 'USER ALREADY BANNED OR NOT EXIST.';
    ELSE
        UPDATE user_account
        SET banned = true
        WHERE user_id = NEW.user_id;
    END IF;

    RETURN NULL;
    END;
$$;

create trigger update_user_ban
    after insert
    on banned_user
    for each row
execute procedure trg_update_user_ban();

create function trg_update_item_on_reservation() returns trigger
    language plpgsql
as
$$
BEGIN
    UPDATE item SET status = 'reserved' WHERE item.item_id = NEW.item_id;

    UPDATE user_account SET rental_counter = rental_counter + 1 WHERE user_account.user_id = NEW.user_id;
    return null;
END;
$$;

create trigger update_item_on_reservation
    after insert
    on reservation
    for each row
execute procedure trg_update_item_on_reservation();

create function trg_update_item_list_on_delete_list() returns trigger
    language plpgsql
as
$$
BEGIN
    delete from item_list
    WHERE list_id = OLD.list_id;
    return null;
END;
$$;

create trigger update_item_list_on_delete_list
    after delete
    on list
    for each row
execute procedure trg_update_item_list_on_delete_list();

create function trg_update_reservation_rating_list_on_delete_user() returns trigger
    language plpgsql
as
$$
BEGIN
    DELETE FROM reservation
    WHERE user_id = old.user_id;
    DELETE FROM rating
    WHERE user_id = old.user_id;
    DELETE FROM list
    WHERE user_id = old.user_id;
    RETURN NULL;
END;
$$;

create trigger trg_update_reservation_rating_list_on_delete_user
    after delete
    on user_account
    for each row
execute procedure trg_update_reservation_rating_list_on_delete_user();

create procedure update_user_information(IN p_user_id integer, IN p_first_name character varying, IN p_last_name character varying, IN p_email character varying, IN p_username character varying, IN p_phone_number character varying, IN p_user_type_id smallint)
    language plpgsql
as
$$
 BEGIN
 	UPDATE user_account
 	SET first_name = p_first_name,
     	last_name = p_last_name,
     	email = p_email,
     	username = p_username,
         phone_number = p_phone_number,
     	user_type_id = p_user_type_id
 	WHERE user_account.user_id = p_user_id;

 	RAISE NOTICE 'User information updated successfully.';
 EXCEPTION
 	WHEN others THEN
     	RAISE EXCEPTION 'An error acquired: %', SQLERRM;
 END;
 $$;


create procedure update_user_password(IN p_user_id integer, IN p_password character varying)
    language plpgsql
as
$$
 BEGIN
 	UPDATE user_account
 	SET password = p_password
 	WHERE user_account.user_id = p_user_id;

 	RAISE NOTICE 'User password updated successfully.';
 EXCEPTION
 	WHEN others THEN
     	RAISE EXCEPTION 'An error acquired: %', SQLERRM;
 END;
 $$;


create procedure update_user_type(IN p_user_type_id integer, IN p_type_name character varying, IN p_max_extratime integer, IN p_max_rental integer, IN p_max_reservation_day integer, IN p_rental_time integer, IN p_penalty_fee integer)
    language plpgsql
as
$$
 BEGIN
 	UPDATE user_type
 	SET type_name = p_type_name,
     	max_extratime = p_max_extratime,
     	max_rental = p_max_rental,
     	max_reservation_day = p_max_reservation_day,
     	rental_time = p_rental_time,
     	penalty_fee = p_penalty_fee
 	WHERE user_type.user_type_id = p_user_type_id;

 	RAISE NOTICE 'User type information updated successfully.';
 EXCEPTION
 	WHEN others THEN
     	RAISE EXCEPTION 'An error acquired: %', SQLERRM;
 END;
 $$;


create procedure update_admin_password(IN p_admin_id integer, IN p_password character varying)
    language plpgsql
as
$$
 BEGIN
 	UPDATE admin
 	SET password = p_password
 	WHERE admin.admin_id = p_admin_id;

 	RAISE NOTICE 'Admin information updated successfully.';
 EXCEPTION
 	WHEN others THEN
     	RAISE EXCEPTION 'An error acquired: %', SQLERRM;
 END;
 $$;


create procedure update_due_date_on_rental(IN p_item_id integer, IN p_user_id integer)
    language plpgsql
as
$$
 	DECLARE
     	p_user_type_id SMALLINT;
     	p_rental_time SMALLINT;
     	p_extratime_counter INTEGER;
     	p_max_extratime INTEGER;
		p_is_exist BOOLEAN;
	BEGIN
		SELECT 1 FROM rental_log WHERE item_id = p_item_id AND user_id = p_user_id INTO p_is_exist;
		IF p_is_exist THEN
			SELECT user_type_id FROM user_account WHERE user_id = p_user_id INTO p_user_type_id;
			SELECT extratime_counter FROM rental_log WHERE rental_log.item_id = p_item_id INTO p_extratime_counter;
			SELECT max_extratime, rental_time FROM user_type WHERE user_type_id = p_user_type_id INTO p_max_extratime, p_rental_time;

			IF p_extratime_counter < p_max_extratime THEN
				UPDATE rental_log
				SET due_date = due_date + p_rental_time,
					extratime_counter = extratime_counter + 1
				WHERE rental_log.item_id = p_item_id;
				RAISE NOTICE 'Due date updated successfully.';
			ELSE
			    RAISE NOTICE 'Maximum extra time request has been reached.';
			END IF;
		ELSE
		    RAISE NOTICE 'Record does not exist.';
		END IF;
 	EXCEPTION
     	WHEN others THEN
         	RAISE EXCEPTION 'An error acquired: %', SQLERRM;
 	END;
 $$;


create procedure add_branch(IN p_branch_code character varying, IN p_shelf_id integer, OUT p_branch_id integer)
    language plpgsql
as
$$
 BEGIN
 	INSERT INTO branch(branch_code, shelf_id)
 	VALUES (p_branch_code, p_shelf_id)
 	RETURNING branch_id INTO p_branch_id;
 END;
 $$;


create procedure add_lost_item(IN p_item_id integer, IN p_admin_id integer)
    language plpgsql
as
$$
 BEGIN
 	INSERT INTO lost_item (item_id, admin_id, report_date)
 	VALUES (p_item_id, p_admin_id, NOW())
 	ON CONFLICT (item_id) DO NOTHING;
 END;
 $$;


create function trg_update_item_on_delete_rating() returns trigger
    language plpgsql
as
$$
DECLARE
    p_rated_user INT;
BEGIN
    SELECT rated_user_number FROM item WHERE item_id = OLD.item_id into p_rated_user;
    IF p_rated_user = 1 THEN
        UPDATE item
        SET rate = 0
        WHERE item.item_id = OLD.item_id;
        UPDATE item
        SET rated_user_number = 0
        WHERE item.item_id = OLD.item_id;
    ELSE
        UPDATE item
        SET rate = ((rate * rated_user_number) - OLD.rate) / (rated_user_number - 1)
        WHERE item.item_id = OLD.item_id;
        UPDATE item
        SET rated_user_number = rated_user_number - 1
        WHERE item.item_id = OLD.item_id;
    END IF;
    return null;
END;
$$;


create trigger update_item_on_delete_rating
    before delete
    on rating
    for each row
execute procedure trg_update_item_on_delete_rating();

create procedure add_language(IN p_language_name character varying, OUT p_language_id integer)
    language plpgsql
as
$$
BEGIN
    INSERT INTO language(language_name)
    VALUES (p_language_name)
    RETURNING language_id INTO p_language_id;
END;
$$;



create procedure add_author(IN p_first_name character varying, IN p_last_name character varying, IN p_nationality character varying, OUT p_author_id integer)
    language plpgsql
as
$$
BEGIN
    INSERT INTO author(first_name, last_name, nationality)
    VALUES (p_first_name, p_last_name, p_nationality)
    RETURNING author_id INTO p_author_id;
END;

$$;



create procedure add_admin(IN p_first_name character varying, IN p_last_name character varying, IN p_email character varying, IN p_username character varying, IN p_password character varying, IN p_phone_number character varying, OUT p_admin_id integer)
    language plpgsql
as
$$
 BEGIN
 	INSERT INTO admin(firstname, last_name, email, username, password, phone_number)
 	VALUES (p_first_name, p_last_name, p_email, p_username, p_password,p_phone_number)
 	RETURNING admin_id INTO p_admin_id;
 END;
 $$;


create procedure add_item_format(IN p_format_name character varying)
    language plpgsql
as
$$
BEGIN

    INSERT INTO item_format(format_name)
    VALUES (p_format_name);
END;
$$;


create procedure add_user_type(IN p_type_name character varying, IN p_max_extratime integer, IN p_max_rental integer, IN p_max_reservation_day integer, IN p_penalty_fee integer, IN p_rental_time integer, OUT p_user_type_id integer)
    language plpgsql
as
$$
 BEGIN
 	INSERT INTO user_type(type_name, max_extratime, max_rental, max_reservation_day, rental_time, penalty_fee)
 	VALUES (p_type_name, p_max_extratime, p_max_rental, p_max_reservation_day, p_rental_time, p_penalty_fee)
 	RETURNING user_type_id INTO p_user_type_id;
 END;
 $$;


create procedure add_reservation(IN p_item_id integer, IN p_user_id integer)
    language plpgsql
as
$$
    DECLARE
        p_rental_counter SMALLINT;
        p_user_type_id SMALLINT;
        p_max_rental SMALLINT;
        p_item_status varchar;
    BEGIN
        SELECT rental_counter, user_type_id FROM user_account WHERE user_id = p_user_id INTO p_rental_counter, p_user_type_id;
        SELECT max_rental FROM user_type WHERE user_type_id = p_user_type_id INTO p_max_rental;
        SELECT status FROM item WHERE item_id = p_item_id INTO p_item_status;

        IF p_rental_counter < p_max_rental AND p_item_status != 'available' AND p_item_status != 'reserved' AND p_item_status != 'lost' THEN
            INSERT INTO reservation(user_id, item_id, state)
            VALUES (p_user_id, p_item_id, 'valid');
        ELSE
            RAISE WARNING 'Item is available to rent or reserved or user has max item.';
        END IF;
    END;
$$;


create procedure add_nonperiodical_item(IN p_name character varying, IN p_publication_date date, IN p_publisher_name character varying, IN p_language_name character varying, IN p_branch_id integer, IN p_admin_id integer, IN p_barcode character varying, IN p_serie_name character varying, IN p_genre_id integer, IN p_status character varying, IN p_author_first_name character varying, IN p_author_last_name character varying, IN p_author_nationality character varying, IN p_isbn integer, IN p_edition integer, IN p_page_number integer, OUT p_item_id integer)
    language plpgsql
as
$$
 DECLARE
 	p_language_id INTEGER;
 	p_publisher_id INTEGER;
 	p_serie_id INTEGER;
 	p_author_id INTEGER;
 BEGIN
 	SELECT language_id FROM language WHERE language_name = p_language_name INTO p_language_id;
 	IF p_language_id is null THEN
     	CALL add_language(p_language_name, p_language_id);
 	END IF;

 	SELECT publisher_id FROM publisher WHERE publisher_name = p_publisher_name INTO p_publisher_id;
 	IF p_publisher_id is null THEN
     	CALL add_publisher(p_publisher_name, p_publisher_id);
 	END IF;

 	SELECT serie_id FROM serie WHERE serie_name = p_serie_name INTO p_serie_id;
 	IF p_serie_id is null THEN
     	CALL add_serie(p_serie_name, p_serie_id);
 	END IF;
 	SELECT author_id FROM author WHERE first_name = p_author_first_name and last_name = p_author_last_name and
                                    	nationality = p_author_nationality INTO p_author_id;
 	IF p_author_id is null THEN
     	CALL add_author(p_author_first_name, p_author_last_name, p_author_nationality, p_author_id);
 	END IF;

 	INSERT INTO item(name, publication_date, format_id, publisher_id, language_id,
         	serie_id, branch_id, admin_id, status, barcode, register_date, rate, rated_user_number, genre_id)
         	VALUES (p_name, p_publication_date, 2::integer, p_publisher_id, p_language_id,
         	p_serie_id, p_branch_id, p_admin_id, p_status, p_barcode, NOW(),
         	0, 0, p_genre_id)
 	RETURNING item_id INTO p_item_id;

 	INSERT INTO nonperiodical_item(item_id, author_id, isbn, edition, page_number )
 	VALUES (p_item_id, p_author_id, p_isbn, p_edition, p_page_number);

 	COMMIT;
 END;
 $$;


create procedure add_multimedia_item(IN p_name character varying, IN p_publication_date date, IN p_publisher_name character varying, IN p_language_name character varying, IN p_branch_id integer, IN p_admin_id integer, IN p_barcode character varying, IN p_size integer, IN p_serie_name character varying, IN p_genre_id integer, IN p_status character varying, OUT p_item_id integer)
    language plpgsql
as
$$
 DECLARE
 	p_language_id INTEGER;
 	p_publisher_id INTEGER;
 	p_serie_id INTEGER;
 BEGIN
 	SELECT language_id FROM language WHERE language_name = p_language_name INTO p_language_id;
 	IF p_language_id is null THEN
     	CALL add_language(p_language_name, p_language_id);
 	END IF;

 	SELECT publisher_id FROM publisher WHERE publisher_name = p_publisher_name INTO p_publisher_id;
 	IF p_publisher_id is null THEN
     	CALL add_publisher(p_publisher_name, p_publisher_id);
 	END IF;

 	SELECT serie_id FROM serie WHERE serie_name = p_serie_name INTO p_serie_id;
 	IF p_serie_id is null THEN
     	CALL add_serie(p_serie_name, p_serie_id);
 	END IF;


 	INSERT INTO item(name, publication_date, format_id, publisher_id, language_id,
         	serie_id, branch_id, admin_id, status, barcode, register_date, rate, rated_user_number, genre_id)
         	VALUES (p_name, p_publication_date, 1::integer, p_publisher_id, p_language_id,
         	p_serie_id, p_branch_id, p_admin_id, p_status, p_barcode, NOW(),
         	0, 0, p_genre_id)
 	RETURNING item_id INTO p_item_id;

 	INSERT INTO multimedia_item(item_id, size)
 	VALUES (p_item_id, p_size);

 	COMMIT;
 END;

 $$;


create procedure add_user_account(IN p_first_name character varying, IN p_last_name character varying, IN p_email character varying, IN p_username character varying, IN p_password character varying, IN p_phone_number character varying, IN p_admin_id integer, IN p_id_number character varying, IN p_banned boolean, IN p_user_type_id smallint, OUT p_user_id integer)
    language plpgsql
as
$$
BEGIN
INSERT INTO user_account(
    first_name, last_name, user_type_id, email, username, password,
    phone_number, rental_counter, admin_id, id_number, banned)
VALUES (
    p_first_name, p_last_name, p_user_type_id, p_email, p_username,
    p_password, p_phone_number, 0, p_admin_id, p_id_number,
    p_banned)
RETURNING user_id INTO p_user_id;
END
$$;

create procedure add_maintenance_history(IN p_item_id integer, IN p_admin_id integer)
    language plpgsql
as
$$
    DECLARE
        p_maintenance_date DATE;
        p_description text;
        p_is_exist BOOLEAN;
    BEGIN
          SELECT 1 FROM maintenance_log WHERE item_id = p_item_id INTO p_is_exist;
          IF p_is_exist THEN
                SELECT maintenance_date FROM maintenance_log WHERE item_id = p_item_id INTO p_maintenance_date;
                SELECT description FROM maintenance_log WHERE item_id = p_item_id INTO p_description;

                INSERT INTO maintenance_history (item_id, admin_id, maintenance_date, description, maintenance_end_date)
                VALUES (p_item_id, p_admin_id, p_maintenance_date::DATE, p_description::text , now());
          ELSE
              RAISE NOTICE 'Record does not exist!!';
          END IF;
    END;
$$;


create procedure add_rental(IN p_item_id integer, IN p_user_id integer, IN p_admin_id integer)
    language plpgsql
as
$$
 	DECLARE
     	p_rental_counter SMALLINT;
     	p_user_type_id SMALLINT;
     	p_max_rental SMALLINT;
     	p_rental_time SMALLINT;
     	p_item_status varchar;
 	BEGIN

     	SELECT user_account.rental_counter, user_account.user_type_id, ut.max_rental, ut.rental_time
    	FROM user_account LEFT JOIN user_type ut on user_account.user_type_id = ut.user_type_id
     	WHERE user_id = p_user_id INTO p_rental_counter, p_user_type_id, p_max_rental, p_rental_time;


     	SELECT status FROM item WHERE item_id = p_item_id INTO p_item_status;

     	IF p_rental_counter < p_max_rental  AND p_item_status = 'available' THEN
         	INSERT INTO rental_log (item_id, user_id, rent_date, due_date, admin_id, extratime_counter)
         	VALUES (p_item_id, p_user_id, NOW(), (NOW() + (p_rental_time || ' day')::interval)::DATE, p_admin_id, 0);
     	ELSE
         	RAISE WARNING 'Item is not available or user has max item.';
     	END IF;
 	END
 $$;

create procedure add_maintenance_log(IN p_item_id integer, IN p_admin_id integer, IN p_description text)
    language plpgsql
as
$$
 	DECLARE
     	p_item_status varchar;
 	BEGIN
     	SELECT status FROM item WHERE item_id = p_item_id INTO p_item_status;
     	IF p_item_status = 'available' THEN
         	INSERT INTO maintenance_log (item_id, admin_id, maintenance_date, description)
         	VALUES (p_item_id, p_admin_id, NOW(), p_description);
     	ELSE
         	RAISE WARNING 'Item is not available. Update item status first to start maintenance process.';
     	END IF;
 	END
 $$;

create procedure add_rate(IN p_item_id integer, IN p_user_id integer, IN p_rate integer)
    language plpgsql
as
$$
    DECLARE
        is_rated BOOLEAN;
        p_old_rate INTEGER;
        p_rated_user_number INTEGER;
        p_new_rate numeric(4, 2);
        is_rented_x BOOLEAN;
        is_rented_y BOOLEAN;
    BEGIN
        SELECT TRUE FROM return_history WHERE item_id = p_item_id AND user_id = p_user_id INTO is_rented_x;
        SELECT TRUE FROM rental_log WHERE item_id = p_item_id AND user_id = p_user_id INTO is_rented_y;

        IF is_rented_x or is_rented_y THEN
            SELECT 1 FROM rating WHERE user_id = p_user_id AND item_id = p_item_id INTO is_rated;
            SELECT rate, rated_user_number FROM item WHERE item.item_id = p_item_id INTO p_old_rate, p_rated_user_number;

            IF is_rated is NULL THEN
                INSERT INTO rating(user_id, item_id, rate)
                VALUES (p_user_id, p_item_id, p_rate);
                p_new_rate = ((p_rated_user_number::numeric(4, 2) * p_old_rate::numeric(4, 2) + p_rate::numeric(4, 2)) / (p_rated_user_number + 1))::numeric(4, 2);

                UPDATE item
                SET rate = p_new_rate, rated_user_number = rated_user_number + 1
                WHERE item_id = p_item_id;
            ELSE
                RAISE NOTICE 'Item was rated!!';
            END IF;
        ELSE
            RAISE NOTICE 'Item has not been rented!!';
        END IF;
    END;
$$;

create procedure update_rate(IN p_rate integer, IN p_user_id integer, IN p_item_id integer)
    language plpgsql
as
$$
 DECLARE
 	p_new_rate INTEGER;
 	p_old_rate INTEGER;
 	p_rated_user_number INTEGER;
 	p_user_old_rate INTEGER;
 BEGIN
 	SELECT rate FROM rating WHERE user_id = p_user_id INTO p_user_old_rate;
 	SELECT rate, rated_user_number FROM item WHERE item.item_id = p_item_id INTO p_old_rate, p_rated_user_number;
 	p_new_rate = p_rated_user_number * p_old_rate - p_user_old_rate + p_rate;
 	UPDATE item
 	SET rate = p_new_rate
 	WHERE item.item_id = p_item_id;

 	UPDATE rating
 	SET rate = p_rate
 	WHERE rating.user_id = p_user_id;

 	RAISE NOTICE 'Rate updated successfully.';
 EXCEPTION
 	WHEN others THEN
     	RAISE EXCEPTION 'An error acquired: %', SQLERRM;
 END;
 $$;

create procedure delete_rating(IN p_user_id integer, IN p_item_id integer)
    language plpgsql
as
$$
BEGIN
    DELETE FROM rating
    WHERE user_id = p_user_id AND item_id = p_item_id;
END;
$$;

create procedure update_admin_information(IN p_admin_id integer, IN p_firstname character varying, IN p_lastname character varying, IN p_email character varying, IN p_username character varying, IN p_phone_number character varying)
    language plpgsql
as
$$
 BEGIN
 	UPDATE admin
 	SET firstname = p_firstname,
     	last_name = p_lastname,
     	email = p_email,
     	username = p_username,
     	phone_number = p_phone_number
 	WHERE admin.admin_id = p_admin_id;

 	RAISE NOTICE 'Admin information updated successfully.';
 EXCEPTION
 	WHEN others THEN
     	RAISE EXCEPTION 'An error acquired: %', SQLERRM;
 END;
 $$;

create procedure update_nonperiodical_item_information(IN p_item_id integer, IN p_name character varying, IN p_publication_date date, IN p_publisher_name character varying, IN p_language_name character varying, IN p_branch_id integer, IN p_barcode character varying, IN p_serie_name character varying, IN p_genre_id integer, IN p_author_first_name character varying, IN p_author_last_name character varying, IN p_author_nationality character varying, IN p_isbn integer, IN p_edition integer, IN p_page_number integer)
    language plpgsql
as
$$
 DECLARE
 	p_language_id INTEGER;
 	p_publisher_id INTEGER;
 	p_serie_id INTEGER;
    p_author_id INTEGER;
 BEGIN

    SELECT language_id FROM language WHERE language_name = p_language_name INTO p_language_id;
 	IF p_language_id is null THEN
     	CALL add_language(p_language_name, p_language_id);
 	END IF;

 	SELECT publisher_id FROM publisher WHERE publisher_name = p_publisher_name INTO p_publisher_id;
 	IF p_publisher_id is null THEN
     	CALL add_publisher(p_publisher_name, p_publisher_id);
 	END IF;

 	SELECT serie_id FROM serie WHERE serie_name = p_serie_name INTO p_serie_id;
 	IF p_serie_id is null THEN
     	CALL add_serie(p_serie_name, p_serie_id);
 	END IF;

	SELECT author_id FROM author WHERE first_name = p_author_first_name and last_name = p_author_last_name and
        			nationality = p_author_nationality INTO p_author_id;
 	IF p_author_id is null THEN
     	CALL add_author(p_author_first_name, p_author_last_name, p_author_nationality, p_author_id);
 	END IF;

 	UPDATE item
 	SET name = p_name,
     	publication_date = p_publication_date,
     	publisher_id = p_publisher_id,
     	language_id = p_language_id,
     	branch_id = p_branch_id,
     	barcode = p_barcode,
     	serie_id = p_serie_id,
     	genre_id = p_genre_id
 	WHERE item.item_id = p_item_id;

 	UPDATE nonperiodical_item
 	SET item_id = p_item_id,
 	    author_id = p_author_id,
 	    isbn = p_isbn,
 	    edition = p_edition,
 	    page_number = p_page_number
 	WHERE nonperiodical_item.item_id = p_item_id;

 	RAISE NOTICE 'Item information updated successfully.';
 EXCEPTION
 	WHEN others THEN
     	RAISE EXCEPTION 'An error acquired: %', SQLERRM;
 END;
 $$;

create procedure add_periodical_item(IN p_name character varying, IN p_publication_date date, IN p_publisher_name character varying, IN p_language_name character varying, IN p_branch_id integer, IN p_admin_id integer, IN p_barcode character varying, IN p_frequency character varying, IN p_volume_number integer, IN p_serie_name character varying, IN p_genre_id integer, IN p_living boolean, IN p_status character varying, OUT p_item_id integer)
    language plpgsql
as
$$
 DECLARE
 	p_language_id INTEGER;
 	p_publisher_id INTEGER;
 	p_serie_id INTEGER;
 BEGIN
 	SELECT language_id FROM language WHERE language_name = p_language_name INTO p_language_id;
 	IF p_language_id is null THEN
     	CALL add_language(p_language_name, p_language_id);
 	END IF;

 	SELECT publisher_id FROM publisher WHERE publisher_name = p_publisher_name INTO p_publisher_id;
 	IF p_publisher_id is null THEN
     	CALL add_publisher(p_publisher_name, p_publisher_id);
 	END IF;

 	SELECT serie_id FROM serie WHERE serie_name = p_serie_name INTO p_serie_id;
 	IF p_serie_id is null THEN
     	CALL add_serie(p_serie_name, p_serie_id);
 	END IF;


 	INSERT INTO item(name, publication_date, format_id, publisher_id, language_id,
         	serie_id, branch_id, admin_id, status, barcode, register_date, rate, rated_user_number, genre_id)
         	VALUES (p_name, p_publication_date, 3::integer, p_publisher_id, p_language_id,
         	p_serie_id, p_branch_id, p_admin_id, p_status, p_barcode, NOW(),
         	0, 0, p_genre_id)
 	RETURNING item_id INTO p_item_id;

 	INSERT INTO periodical_item (item_id, frequency, volume_number, living)
 	VALUES (p_item_id, p_frequency, p_volume_number, p_living);

 	COMMIT;
 END;

 $$;

create procedure update_periodical_item_information(IN p_item_id integer, IN p_name character varying, IN p_publication_date date, IN p_publisher_name character varying, IN p_language_name character varying, IN p_branch_id integer, IN p_barcode character varying, IN p_frequency character varying, IN p_volume_number integer, IN p_serie_name character varying, IN p_genre_id integer, IN p_living boolean)
    language plpgsql
as
$$
 DECLARE
 	p_language_id INTEGER;
 	p_publisher_id INTEGER;
 	p_serie_id INTEGER;
 BEGIN
     	SELECT language_id FROM language WHERE language_name = p_language_name INTO p_language_id;
 	IF p_language_id is null THEN
     	CALL add_language(p_language_name, p_language_id);
 	END IF;

 	SELECT publisher_id FROM publisher WHERE publisher_name = p_publisher_name INTO p_publisher_id;
 	IF p_publisher_id is null THEN
     	CALL add_publisher(p_publisher_name, p_publisher_id);
 	END IF;

 	SELECT serie_id FROM serie WHERE serie_name = p_serie_name INTO p_serie_id;
 	IF p_serie_id is null THEN
     	CALL add_serie(p_serie_name, p_serie_id);
 	END IF;

 	UPDATE item
 	SET name = p_name,
     	publication_date = p_publication_date,
     	publisher_id = p_publisher_id,
     	language_id = p_language_id,
     	branch_id = p_branch_id,
     	barcode = p_barcode,
     	serie_id = p_serie_id,
     	genre_id = p_genre_id
 	WHERE item.item_id = p_item_id;

 	UPDATE periodical_item
 	SET frequency = p_frequency,
     	volume_number = p_volume_number,
     	living = p_living
 	WHERE periodical_item.item_id = p_item_id;

 	RAISE NOTICE 'Item information updated successfully.';
 EXCEPTION
 	WHEN others THEN
     	RAISE EXCEPTION 'An error acquired: %', SQLERRM;
 END;
 $$;

create procedure update_multimedia_item_information(IN p_item_id integer, IN p_name character varying, IN p_publication_date date, IN p_publisher_name character varying, IN p_language_name character varying, IN p_branch_id integer, IN p_barcode character varying, IN p_serie_name character varying, IN p_genre_id integer, IN p_size integer)
    language plpgsql
as
$$
 DECLARE
 	p_language_id INTEGER;
 	p_publisher_id INTEGER;
 	p_serie_id INTEGER;
 BEGIN
     	SELECT language_id FROM language WHERE language_name = p_language_name INTO p_language_id;
 	IF p_language_id is null THEN
     	CALL add_language(p_language_name, p_language_id);
 	END IF;

 	SELECT publisher_id FROM publisher WHERE publisher_name = p_publisher_name INTO p_publisher_id;
 	IF p_publisher_id is null THEN
     	CALL add_publisher(p_publisher_name, p_publisher_id);
 	END IF;

 	SELECT serie_id FROM serie WHERE serie_name = p_serie_name INTO p_serie_id;
 	IF p_serie_id is null THEN
     	CALL add_serie(p_serie_name, p_serie_id);
 	END IF;

 	UPDATE item
 	SET name = p_name,
     	publication_date = p_publication_date,
     	publisher_id = p_publisher_id,
     	language_id = p_language_id,
     	branch_id = p_branch_id,
     	barcode = p_barcode,
     	serie_id = p_serie_id,
     	genre_id = p_genre_id
 	WHERE item.item_id = p_item_id;

 	UPDATE multimedia_item
 	SET size = p_size
 	WHERE multimedia_item.item_id = p_item_id;

 	RAISE NOTICE 'Item information updated successfully.';
 EXCEPTION
 	WHEN others THEN
     	RAISE EXCEPTION 'An error acquired: %', SQLERRM;
 END;
 $$;


create procedure delete_user_type(IN p_user_type_id integer)
    language plpgsql
as
$$
DECLARE
    p_user_type INTEGER;
BEGIN
    select 1 from user_account where user_type_id = p_user_type_id into p_user_type;
    IF p_user_type THEN
        RAISE NOTICE 'Cannot delete user_type!!!';
    ELSE
        DELETE FROM user_type
        WHERE user_type_id = p_user_type_id;
    END IF;
END;
$$;

create procedure delete_shelf(IN p_shelf_id integer)
    language plpgsql
as
$$
DECLARE
    p_shelf_counter INTEGER := 0;
BEGIN

    select count(item_id)
    from item left join branch b on item.branch_id = b.branch_id
    where b.shelf_id = p_shelf_id into p_shelf_counter;

    IF p_shelf_counter = 0 THEN
        DELETE FROM branch
        WHERE shelf_id = p_shelf_id;

        DELETE FROM shelf
        WHERE shelf_id = p_shelf_id;
    else
        raise notice 'Cannot delete shelf!!!';
    end if;
END;
$$;


create procedure delete_branch(IN p_branch_id integer)
    language plpgsql
as
$$
DECLARE
    p_branch_counter INTEGER := 0;
BEGIN
    select count(item_id) from item where branch_id = p_branch_id into p_branch_counter;
    IF p_branch_counter = 0 THEN
        DELETE FROM branch
        WHERE branch_id = p_branch_id;
    ELSE
        RAISE NOTICE 'Cannot delete branch, branch already has item!!';
    end if;
END;
$$;

create procedure delete_item(IN p_item_id integer)
    language plpgsql
as
$$
DECLARE
    p_item_status varchar;
    p_item_format varchar;
    p_item_counter INTEGER := 0;
BEGIN
    /*maintenance/lost/rented/reserved
      multimedia_item/nonperiodical_item/periodical_item
      İtem_heading Rating İtem_list Return history ve maintenance history
      */
    select status from item where item_id = p_item_id into p_item_status;

    SELECT item_format.format_name
    FROM item JOIN item_format ON item.format_id = item_format.format_id
    WHERE item.item_id = p_item_id
    into p_item_format;

    select count(item_id) from item where item_id = p_item_id into p_item_counter;
    CASE
        WHEN p_item_status = 'maintenance' AND p_item_counter <> 0 THEN
            DELETE FROM item WHERE item_id = p_item_id;
            DELETE FROM maintenance_log WHERE item_id = p_item_id;
        WHEN p_item_status = 'lost' AND p_item_counter <> 0 THEN
            DELETE FROM item WHERE item_id = p_item_id;
            DELETE FROM lost_item WHERE item_id = p_item_id;
        WHEN p_item_status = 'rented' AND p_item_counter <> 0 THEN
            DELETE FROM item WHERE item_id = p_item_id;
            DELETE FROM rental_log WHERE item_id = p_item_id;
        WHEN p_item_status = 'reserved' AND p_item_counter <> 0 THEN
            DELETE FROM item WHERE item_id = p_item_id;
            DELETE FROM reservation WHERE item_id = p_item_id;
        WHEN p_item_counter <> 0 THEN
            DELETE FROM item WHERE item_id = p_item_id;
        WHEN p_item_format = 'multimedia_item' THEN
            DELETE FROM multimedia_item WHERE item_id = p_item_id;

        WHEN p_item_format = 'nonperiodical_item' THEN
            DELETE FROM nonperiodical_item WHERE item_id = p_item_id;

        WHEN p_item_format = 'periodical_item' THEN
            DELETE FROM periodical_item WHERE item_id = p_item_id;

        WHEN p_item_counter <> 0 THEN
            DELETE FROM item_heading WHERE item_id = p_item_id;
            DELETE FROM rating WHERE item_id = p_item_id;
            DELETE FROM item_list WHERE item_id = p_item_id;
            DELETE FROM return_history WHERE item_id = p_item_id;
            DELETE FROM maintenance_history WHERE item_id = p_item_id;

    END CASE;


END;
$$;

create procedure delete_user_account(IN p_user_id integer)
    language plpgsql
as
$$
DECLARE
    p_is_rental INTEGER;
BEGIN
    select 1 from rental_log where user_id = p_user_id into p_is_rental;
    IF p_is_rental IS NULL THEN
        DELETE FROM reservation
        WHERE user_id = p_user_id;

        DELETE FROM item_list
        WHERE list_id IN (select list_id
                         from list where user_id = p_user_id);

        DELETE FROM rating
        WHERE user_id = p_user_id;
        DELETE FROM list
        WHERE user_id = p_user_id;
        DELETE FROM banned_user
        WHERE user_id = p_user_id;
        DELETE FROM return_history
        WHERE user_id = p_user_id;
        DELETE FROM user_account
        WHERE user_id = p_user_id;
    ELSE
        RAISE NOTICE 'User has book to return. Can not deleter user!!!';
    END IF;
END;
END;
$$;

create procedure delete_item_list(IN p_list_id integer, IN p_item_id integer)
    language plpgsql
as
$$
DECLARE
    p_item_list_counter INTEGER := 0;
BEGIN
    select count(*) from item_list where list_id = p_list_id and item_id = p_item_id into p_item_list_counter;


    IF p_item_list_counter <> 0 THEN
        DELETE FROM item_list
        WHERE list_id = p_list_id and item_id = p_item_id;
    end if;
END;
$$;

create procedure delete_list(IN p_list_id integer)
    language plpgsql
as
$$
DECLARE
    p_list_id_counter INTEGER := 0;
BEGIN
    select list_id from list where list_id = p_list_id into p_list_id_counter;

    IF p_list_id_counter = 0 THEN
        DELETE FROM list
        WHERE list_id = p_list_id;
    end if;
END;
$$;

create procedure delete_reservation(IN p_item_id integer, IN p_user_id integer)
    language plpgsql
as
$$
DECLARE
    p_reservation_counter INTEGER := 0;
BEGIN
    select count(item_id) from reservation where item_id = p_item_id and user_id = p_user_id  into p_reservation_counter;
    IF p_reservation_counter = 0 THEN
        DELETE FROM reservation
        WHERE item_id = p_item_id and user_id = p_user_id;
    end if;
END;
$$;

