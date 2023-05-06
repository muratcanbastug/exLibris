create view multimedia_item_counter(count) as
    SELECT count(item.item_id) AS count
    FROM item
             LEFT JOIN item_format i ON item.format_id = i.format_id
    WHERE i.format_name::text = 'multimedia_item'::text;


create view periodical_item_counter(count) as
    SELECT count(item.item_id) AS count
    FROM item
             LEFT JOIN item_format i ON item.format_id = i.format_id
    WHERE i.format_name::text = 'periodical_item'::text;


create view nonperiodical_counter(count) as
    SELECT count(item.item_id) AS count
    FROM item
             LEFT JOIN item_format i ON item.format_id = i.format_id
    WHERE i.format_name::text = 'nonperiodical_item'::text;


create view avaliable_items(item_id, name) as
    SELECT item.item_id,
           item.name
    FROM item
    WHERE item.status::text = 'available'::text;


create view all_item_counter(count) as
    SELECT count(item.item_id) AS count
    FROM item;


create view nonperiodical_item_author
            (item_id, author_id, isbn, edition, page_number, first_name, last_name, nationality) as
    SELECT np.item_id,
           np.author_id,
           np.isbn,
           np.edition,
           np.page_number,
           a.first_name,
           a.last_name,
           a.nationality
    FROM nonperiodical_item np
             JOIN author a ON np.author_id = a.author_id;


create view branch_shelf(branch_id, branch_code, shelf_code) as
    SELECT branch.branch_id,
           branch.branch_code,
           s.shelf_code
    FROM branch
             LEFT JOIN shelf s ON branch.shelf_id = s.shelf_id;



create view item_search
            (item_id, name, publication_date, status, barcode, register_date, rate, rated_user_number, genre_name,
             branch_code, shelf_code, format_name, publisher_name, language_name, serie_name, admin_id)
    as
    SELECT item.item_id,
           item.name,
           item.publication_date,
           item.status,
           item.barcode,
           item.register_date,
           item.rate,
           item.rated_user_number,
           g.genre_name,
           bs.branch_code,
           bs.shelf_code,
           if.format_name,
           p.publisher_name,
           l.language_name,
           s.serie_name,
           item.admin_id
    FROM item
             LEFT JOIN publisher p ON item.publisher_id = p.publisher_id
             LEFT JOIN language l ON item.language_id = l.language_id
             LEFT JOIN serie s ON item.serie_id = s.serie_id
             LEFT JOIN genre g ON item.genre_id = g.genre_id
             LEFT JOIN branch_shelf bs ON item.branch_id = bs.branch_id
             LEFT JOIN item_format if ON item.format_id = if.format_id
             LEFT JOIN nonperiodical_item_author npia ON item.item_id = npia.item_id;


create view all_rating_with_names(user_id, item_id, rate, first_name, last_name, name) as
    SELECT r.user_id,
           r.item_id,
           r.rate,
           ua.first_name,
           ua.last_name,
           i.name
    FROM rating r
             JOIN user_account ua ON ua.user_id = r.user_id
             JOIN item i ON r.item_id = i.item_id;



create view user_to_see_list (user_id, first_name, last_name, list_id, list_name, name, rate, publication_date) as
    SELECT l.user_id,
           user_account.first_name,
           user_account.last_name,
           l.list_id,
           l.list_name,
           i.name,
           i.rate,
           i.publication_date
    FROM user_account
             JOIN list l ON user_account.user_id = l.user_id
             JOIN item_list il ON l.list_id = il.list_id
             JOIN item i ON il.item_id = i.item_id
    ORDER BY l.user_id, l.list_id;


create view user_all_information
            (user_id, first_name, last_name, user_type_id, email, username, password, phone_number, rental_counter,
             admin_id, id_number, banned, report)
    as
    SELECT user_account.user_id,
           user_account.first_name,
           user_account.last_name,
           user_account.user_type_id,
           user_account.email,
           user_account.username,
           user_account.password,
           user_account.phone_number,
           user_account.rental_counter,
           user_account.admin_id,
           user_account.id_number,
           user_account.banned,
           bu.report
    FROM user_account
             LEFT JOIN banned_user bu ON user_account.user_id = bu.user_id;
