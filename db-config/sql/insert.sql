/*
----------------Ex libris-------------------

Database Management Systems Laboratory Experiments Phase 2
Murat Can BAŞTUĞ - Fevzi KILAS
21986180 - 2200356822
*/



CALL add_admin('IBRAHIM'::VARCHAR, 'KILAS'::VARCHAR, 'iklas@weebly.com'::VARCHAR, 'ibolino03'::VARCHAR, '1346798520'::VARCHAR, '(555, 0) 333333'::VARCHAR, 0);
CALL add_admin('Barbie'::VARCHAR, 'Fine'::VARCHAR, 'bfine0@weebly.com'::VARCHAR, 'bfine0'::VARCHAR, 'H2sJnaM'::VARCHAR, '(559, 0) 1727066'::VARCHAR, 0);
CALL add_admin('Kipp'::VARCHAR, 'Cecchetelli'::VARCHAR, 'kcecchetelli1@amazon.com'::VARCHAR, 'kcecchetelli1'::VARCHAR, 'azMF8p6RbfOO'::VARCHAR, '(508, 0) 4499368'::VARCHAR, 0);
CALL add_admin('Clemmy'::VARCHAR, 'Accombe'::VARCHAR, 'caccombe2@jimdo.com'::VARCHAR, 'caccombe2'::VARCHAR, 'wQ1D6W5phZWZ'::VARCHAR, '(971, 0) 4978248'::VARCHAR, 0);
CALL add_admin('Tedra'::VARCHAR, 'Hovey'::VARCHAR, 'thovey3@ow.ly'::VARCHAR, 'thovey3'::VARCHAR, 'sccLUfGd'::VARCHAR, '(138, 0) 3650435'::VARCHAR, 0);
CALL add_admin('Gertrud'::VARCHAR, 'O''Bradden'::VARCHAR, 'gobradden4@census.gov'::VARCHAR, 'gobradden4'::VARCHAR, '08K5YZu4kV'::VARCHAR, '(797, 0) 9060623'::VARCHAR, 0);
CALL add_admin('Billi'::VARCHAR, 'Straughan'::VARCHAR, 'bstraughan5@tumblr.com'::VARCHAR, 'bstraughan5'::VARCHAR, 'Isg3M4cR2YP'::VARCHAR, '(754, 0) 4296650'::VARCHAR, 0);
CALL add_admin('Kingston'::VARCHAR, 'Newcome'::VARCHAR, 'knewcome6@tinyurl.com'::VARCHAR, 'knewcome6'::VARCHAR, 'JMrWDLT'::VARCHAR, '(283, 0) 9350414'::VARCHAR, 0);
CALL add_admin('Shell'::VARCHAR, 'Muzzullo'::VARCHAR, 'smuzzullo7@wikia.com'::VARCHAR, 'smuzzullo7'::VARCHAR, 'GfVsFY9ZBN'::VARCHAR, '(243, 0) 8176441'::VARCHAR, 0);
CALL add_admin('Erastus'::VARCHAR, 'Climer'::VARCHAR, 'eclimer8@discovery.com'::VARCHAR, 'eclimer8'::VARCHAR, 'D3nXsGt'::VARCHAR, '(100, 0) 4739586'::VARCHAR, 0);

-----------------------------------

CALL add_item_format('multimedia_item'::varchar);
CALL add_item_format('nonperiodical_item'::varchar);
CALL add_item_format('periodical_item'::varchar);

-----------------------------------

CALL add_shelf('A1');
CALL add_branch('001', 1, 0);
CALL add_branch('002', 1, 0);
CALL add_branch('003', 1, 0);
CALL add_shelf('B2');
CALL add_branch('001', 2, 0);
CALL add_branch('002', 2, 0);
CALL add_branch('003', 2, 0);
CALL add_shelf('C3');
CALL add_branch('001', 3, 0);
CALL add_branch('002', 3, 0);
CALL add_branch('003', 3, 0);
CALL add_shelf('D4');
CALL add_branch('001', 4, 0);
CALL add_branch('002', 4, 0);
CALL add_branch('004', 4, 0);
CALL add_shelf('E5');
CALL add_branch('001', 5, 0);
CALL add_branch('002', 5, 0);
CALL add_branch('003', 5, 0);
CALL add_shelf('F6');
CALL add_branch('001', 6, 0);
CALL add_branch('002', 6, 0);
CALL add_branch('003', 6, 0);
CALL add_shelf('G7');
CALL add_branch('001', 7, 0);
CALL add_branch('002', 7, 0);
CALL add_branch('004', 7, 0);
CALL add_shelf('H8');
CALL add_branch('001', 8, 0);
CALL add_branch('002', 8, 0);
CALL add_branch('003', 8, 0);
CALL add_shelf('I9');
CALL add_branch('001', 9, 0);
CALL add_branch('002', 9, 0);
CALL add_branch('003', 9, 0);
CALL add_shelf('J10');
CALL add_branch('001', 10, 0);
CALL add_branch('002', 10, 0);
CALL add_branch('004', 10, 0);

-----------------------------------

CALL add_genre('Action|Adventure|Comedy', 0);
CALL add_genre('Documentary', 0);
CALL add_genre('Comedy|Drama|Fantasy', 0);
CALL add_genre('Drama|Thriller', 0);
CALL add_genre('Comedy|Musical', 0);
CALL add_genre('Comedy|Crime|Mystery', 0);
CALL add_genre('Comedy', 0);
CALL add_genre('Comedy|Drama', 0);
CALL add_genre('Western', 0);
CALL add_genre('Horror|Thriller', 0);
CALL add_genre('Adventure', 0);
CALL add_genre('Drama', 0);
CALL add_genre('Horror', 0);
CALL add_genre('Action|Adventure|Crime|Drama|Thriller', 0);
CALL add_genre('Comedy|Drama', 0);
CALL add_genre('Action|Adventure|Fantasy', 0);
CALL add_genre('Horror', 0);
CALL add_genre('Comedy|Drama|Romance', 0);
CALL add_genre('Drama', 0);
CALL add_genre('Documentary', 0);
CALL add_genre('Western', 0);
CALL add_genre('Crime|Drama|Thriller', 0);
CALL add_genre('Drama', 0);
CALL add_genre('Animation|Children|Comedy|Drama', 0);
CALL add_genre('Drama|Fantasy|Romance', 0);
CALL add_genre('Adventure|Fantasy|Romance|Sci-Fi|Thriller', 0);
CALL add_genre('Adventure|Comedy', 0);
CALL add_genre('Comedy', 0);

-----------------------------------

CALL add_multimedia_item('To Kill a Mockingbird'::VARCHAR, '1960-07-11'::DATE, 'HarperCollins'::VARCHAR, 'English'::VARCHAR, 5::integer, 10::integer, '9780061120084'::VARCHAR, 2.73::integer, ''::VARCHAR, 1::integer, 'available'::VARCHAR, 1::integer);
CALL add_multimedia_item('The Great Gatsby'::VARCHAR, CAST('1925-04-10' AS DATE),  'Scribner'::VARCHAR, 'English'::VARCHAR, 2, 1, '9780743273565'::VARCHAR, 1.96::integer, ''::VARCHAR, 2, 'available'::VARCHAR, 0);
CALL add_multimedia_item('1984'::VARCHAR, CAST('1949-06-08' AS DATE),  'Secker & Warburg'::VARCHAR, 'English'::VARCHAR, 15, 2, '9780451524935'::VARCHAR, 3.21::integer, ''::VARCHAR, 3, 'available'::VARCHAR, 0);
CALL add_multimedia_item('The Lord of the Rings'::VARCHAR, CAST('1954-07-29' AS DATE),  'George Allen & Unwin'::VARCHAR, 'English'::VARCHAR, 10, 5, '9780547928210'::VARCHAR, 10.1::integer, 'The Lord of the Rings'::VARCHAR, 4, 'available'::VARCHAR, 0);
CALL add_multimedia_item('Pride and Prejudice'::VARCHAR, CAST('1813-01-28' AS DATE),  'T. Egerton'::VARCHAR, 'English'::VARCHAR, 3, 1, '9781983611178'::VARCHAR, 1.58::integer, ''::VARCHAR, 5, 'available'::VARCHAR, 0);
CALL add_multimedia_item('Harry Potter and the Philosopher''s Stone'::VARCHAR, CAST('1997-06-26' AS DATE),  'Bloomsbury Publishing'::VARCHAR, 'English'::VARCHAR, 1, 8, '9780747532743'::VARCHAR, 4.4::integer, 'Harry Potter'::VARCHAR, 6, 'available'::VARCHAR, 0);
CALL add_multimedia_item('The Catcher in the Rye'::VARCHAR, CAST('1951-07-16' AS DATE),  'Little, Brown'::VARCHAR, 'English'::VARCHAR, 6, 7, '9780316769174'::VARCHAR, 1.96::integer, ''::VARCHAR, 7, 'available'::VARCHAR, 0);
CALL add_multimedia_item('The Hobbit'::VARCHAR, CAST('1937-09-21' AS DATE),  'George Allen & Unwin'::VARCHAR, 'English'::VARCHAR, 25, 3, '9780547928227'::VARCHAR, 2.03::integer, 'The Lord of the Rings'::VARCHAR, 4, 'available'::VARCHAR, 0);
CALL add_multimedia_item('Crime and Punishment'::VARCHAR, CAST('1866-12-22' AS DATE), 'The Russian Messenger'::VARCHAR, 'Russian'::VARCHAR, 7, 1, '9781840224306'::VARCHAR, 2.61::integer, ''::VARCHAR, 8, 'available'::VARCHAR, 0);
CALL add_multimedia_item('The Da Vinci Code'::VARCHAR, CAST('2003-03-18' AS DATE),  'Doubleday'::VARCHAR, 'English'::VARCHAR, 20, 2, '9780385504201'::VARCHAR, 4.8::integer, 'Robert Langdon'::VARCHAR, 9, 'available'::VARCHAR, 0);
CALL add_multimedia_item('To the Lighthouse'::VARCHAR, CAST('1927-05-05' AS DATE),  'Hogarth Press'::VARCHAR, 'English'::VARCHAR, 8, 1, '9780156907392'::VARCHAR, 2.85::integer, ''::VARCHAR, 11, 'available'::VARCHAR, 0);
CALL add_multimedia_item('One Hundred Years of Solitude'::VARCHAR, CAST('1967-05-30' AS DATE),  'Harper & Row'::VARCHAR, 'Spanish'::VARCHAR, 1, 8, '9780060883287'::VARCHAR, 3.96::integer, ''::VARCHAR, 12, 'available'::VARCHAR, 0);
CALL add_multimedia_item('Moby-Dick'::VARCHAR, CAST('1851-10-18' AS DATE),  'Harper & Brothers'::VARCHAR, 'English'::VARCHAR, 10, 4, '9780393972832'::VARCHAR, 6.23::integer, ''::VARCHAR, 13, 'available'::VARCHAR, 0);
CALL add_multimedia_item('The Color Purple'::VARCHAR, CAST('1982-06-29' AS DATE),  'Harcourt Brace Jovanovich'::VARCHAR, 'English'::VARCHAR, 5, 5, '9780156031820'::VARCHAR, 2.01::integer, ''::VARCHAR, 14, 'available'::VARCHAR, 0);
CALL add_multimedia_item('The Sun Also Rises'::VARCHAR, CAST('1926-10-22' AS DATE), 'Scribner'::VARCHAR, 'English'::VARCHAR, 7, 9, '9780684800714'::VARCHAR, 1.85::integer, ''::VARCHAR, 15, 'available'::VARCHAR, 0);
CALL add_multimedia_item('The Sound and the Fury'::VARCHAR, CAST('1929-10-07' AS DATE),  'Jonathan Cape & Harrison Smith'::VARCHAR, 'English'::VARCHAR, 6, 3, '9780679732242'::VARCHAR, 2.37::integer, ''::VARCHAR, 16, 'available'::VARCHAR, 0);
CALL add_multimedia_item('The Picture of Dorian Gray'::VARCHAR, CAST('1890-06-20' AS DATE),  'Lippincott''s Monthly Magazine'::VARCHAR, 'English'::VARCHAR, 3, 2, '9781503290259'::VARCHAR, 1.32::integer, ''::VARCHAR, 17, 'available'::VARCHAR, 0);
CALL add_multimedia_item('The Old Man and the Sea'::VARCHAR, CAST('1952-09-01' AS DATE),  'Charles Scribner''s Sons'::VARCHAR, 'English'::VARCHAR, 12, 6, '9780684801223'::VARCHAR, 1.59::integer, ''::VARCHAR, 18, 'available'::VARCHAR, 0);
CALL add_multimedia_item('Heart of Darkness'::VARCHAR, CAST('1899-02-01' AS DATE),  'Blackwood''s Magazine'::VARCHAR, 'English'::VARCHAR, 4, 1, '9781503290273'::VARCHAR, 1.75::integer, ''::VARCHAR, 19, 'available'::VARCHAR, 0);
CALL add_multimedia_item('Beloved'::VARCHAR, CAST('1987-09-02' AS DATE), 'Alfred A. Knopf'::VARCHAR, 'English'::VARCHAR, 5, 8, '9781400033416'::VARCHAR, 2.16::integer, ''::VARCHAR, 20, 'available'::VARCHAR, 0);
CALL add_multimedia_item('The Adventures of Huckleberry Finn'::VARCHAR, CAST('1884-12-10' AS DATE), 'Chatto & Windus'::VARCHAR, 'English'::VARCHAR, 9, 1, '9780143107323'::VARCHAR, 1.96::integer, ''::VARCHAR, 11, 'available'::VARCHAR, 0);
CALL add_multimedia_item('The Brothers Karamazov'::VARCHAR, CAST('1880-11-01' AS DATE),  'The Russian Messenger'::VARCHAR, 'Russian'::VARCHAR, 7, 1, '9780140449242'::VARCHAR, 3.21::integer, ''::VARCHAR, 12, 'available'::VARCHAR, 0);
CALL add_multimedia_item('The Adventures of Huckleberry Finn'::VARCHAR, CAST('1884-12-10' AS DATE), 'Chatto & Windus'::VARCHAR, 'English'::VARCHAR, 5, 1, '9780486280615'::VARCHAR, 2.35::integer, ''::VARCHAR, 12, 'available'::VARCHAR, 0);
CALL add_multimedia_item('The Picture of Dorian Gray'::VARCHAR, CAST('1890-07-01' AS DATE), 'Lippincott''s Monthly Magazine'::VARCHAR, 'English'::VARCHAR, 2, 7, '9781976153676'::VARCHAR, 1.84::integer, ''::VARCHAR, 13, 'available'::VARCHAR, 0);
CALL add_multimedia_item('Anna Karenina'::VARCHAR, CAST('1877-01-01' AS DATE),  'The Russian Messenger'::VARCHAR, 'Russian'::VARCHAR, 8, 1, '9780393275869'::VARCHAR, 3.57::integer, ''::VARCHAR, 24, 'available'::VARCHAR, 0);
CALL add_multimedia_item('The Adventures of Sherlock Holmes'::VARCHAR, CAST('1892-10-14' AS DATE),  'George Newnes Ltd'::VARCHAR, 'English'::VARCHAR, 5, 1, '9780143039198'::VARCHAR, 2.91::integer, 'Sherlock Holmes'::VARCHAR, 13, 'available'::VARCHAR, 0);
CALL add_multimedia_item('Heart of Darkness'::VARCHAR, CAST('1899-02-01' AS DATE), 'Blackwood''s Magazine'::VARCHAR, 'English'::VARCHAR, 3, 6, '9780486264646'::VARCHAR, 1.49::integer, ''::VARCHAR, 26, 'available'::VARCHAR, 0);
CALL add_multimedia_item('The War of the Worlds'::VARCHAR, CAST('1898-01-01' AS DATE),  'William Heinemann'::VARCHAR, 'English'::VARCHAR, 4, 1, '9781503275866'::VARCHAR, 2.23::integer, ''::VARCHAR, 27, 'available'::VARCHAR, 0);
CALL add_multimedia_item('To the Lighthouse'::VARCHAR, CAST('1927-05-05' AS DATE),  'Hogarth Press'::VARCHAR, 'English'::VARCHAR, 2, 9, '9780156907392'::VARCHAR, 1.99::integer, ''::VARCHAR, 28, 'available'::VARCHAR, 0);
CALL add_multimedia_item('Brave New World'::VARCHAR, CAST('1932-01-01' AS DATE),  'Chatto & Windus'::VARCHAR, 'English'::VARCHAR, 10, 1, '9780060850524'::VARCHAR, 3.65::integer, ''::VARCHAR, 19, 'available'::VARCHAR, 0);
CALL add_multimedia_item('One Hundred Years of Solitude'::VARCHAR, CAST('1967-05-30' AS DATE),'Editorial Sudamericana'::VARCHAR, 'Spanish'::VARCHAR, 6, 3, '9780060883287'::VARCHAR, 2.76::integer, ''::VARCHAR, 20, 'available'::VARCHAR, 0);

-----------------------------------

CALL add_nonperiodical_item('The Great Gatsby'::VARCHAR,'1925-04-10'::DATE,'Scribner'::VARCHAR,'English'::VARCHAR,1::SMALLINT,1::SMALLINT,'1234567890'::VARCHAR,''::VARCHAR,1::SMALLINT,'available'::VARCHAR,'F. Scott'::VARCHAR,'Fitzgerald'::VARCHAR,'American'::VARCHAR,'9780743'::INTEGER,1::SMALLINT,3::SMALLINT,0::SMALLINT);
CALL add_nonperiodical_item('1984'::VARCHAR,'1949-06-08'::DATE,'Harvill Secker'::VARCHAR,'English'::VARCHAR,2::SMALLINT,2::SMALLINT,'2345678901'::VARCHAR,''::VARCHAR,21::SMALLINT,'available'::VARCHAR,'George'::VARCHAR,'Orwell'::VARCHAR,'British'::VARCHAR,9780451::INTEGER,3::SMALLINT,200::SMALLINT,0::SMALLINT);
CALL add_nonperiodical_item('The Catcher in the Rye'::VARCHAR,'1951-07-16'::DATE,'Little, Brown'::VARCHAR,'English'::VARCHAR,3::SMALLINT,3::SMALLINT,'3456789012'::VARCHAR,''::VARCHAR,15::SMALLINT,'available'::VARCHAR,'J.D.'::VARCHAR,'Salinger'::VARCHAR,'American'::VARCHAR,97874::INTEGER,1::SMALLINT,250::SMALLINT,0::SMALLINT);
CALL add_nonperiodical_item('Pride and Prejudice'::VARCHAR,'1813-01-28'::DATE,'T. Egerton'::VARCHAR,'English'::VARCHAR,4::SMALLINT,4::SMALLINT,'4567890123'::VARCHAR,''::VARCHAR,14::SMALLINT,'available'::VARCHAR,'Jane'::VARCHAR,'Austen'::VARCHAR,'British'::VARCHAR,9780148::INTEGER,1::SMALLINT,1000::SMALLINT,0::SMALLINT);
CALL add_nonperiodical_item('To Kill a Mockingbird'::VARCHAR,'1960-07-11'::DATE,'J. B. Lippincott'::VARCHAR,'English'::VARCHAR,5::SMALLINT,5::SMALLINT,'5678901234'::VARCHAR,''::VARCHAR,25::SMALLINT,'available'::VARCHAR,'Harper'::VARCHAR,'Lee'::VARCHAR,'American'::VARCHAR,9783547::INTEGER,1::SMALLINT,920::SMALLINT,0::SMALLINT);
CALL add_nonperiodical_item('One Hundred Years of Solitude'::VARCHAR,'1967-05-30'::DATE,'Harper & Row'::VARCHAR,'Spanish'::VARCHAR,6::SMALLINT,6::SMALLINT,'6789012345'::VARCHAR,''::VARCHAR,14::SMALLINT,'available'::VARCHAR,'Gabriel'::VARCHAR,'Garcia Marquez'::VARCHAR,'Colombian'::VARCHAR,9783287::INTEGER,1::SMALLINT,810::SMALLINT,0::SMALLINT);
CALL add_nonperiodical_item('Les Misérables'::VARCHAR,'1862-03-16'::DATE,'A. Lacroix, Verboeckhoven & Cie'::VARCHAR,'French'::VARCHAR,7::SMALLINT,7::SMALLINT,'7890123456'::VARCHAR,''::VARCHAR,17::SMALLINT,'available'::VARCHAR,'Victor'::VARCHAR,'Hugo'::VARCHAR,'French'::VARCHAR,978599::INTEGER,2::SMALLINT,315::SMALLINT,0::SMALLINT);
CALL add_nonperiodical_item('The Lord of the Rings'::VARCHAR,'1954-07-29'::DATE,'George Allen & Unwin'::VARCHAR,'English'::VARCHAR,8::SMALLINT,8::SMALLINT,'8901234567'::VARCHAR,''::VARCHAR,2::SMALLINT,'available'::VARCHAR,'J.R.R.'::VARCHAR,'Tolkien'::VARCHAR,'British'::VARCHAR,9780657::INTEGER,2::SMALLINT,1500::SMALLINT,0::SMALLINT);
CALL add_nonperiodical_item('Crime and Punishment'::VARCHAR,'1866-01-01'::DATE,'The Russian Messenger'::VARCHAR,'Russian'::VARCHAR,9::SMALLINT,9::SMALLINT,'9012345678'::VARCHAR,''::VARCHAR,7::SMALLINT,'available'::VARCHAR,'Fyodor'::VARCHAR,'Dostoevsky'::VARCHAR,'Russian'::VARCHAR,97873::INTEGER,1,1000::SMALLINT,0::SMALLINT);

-----------------------------------

CALL add_periodical_item('National Geographic'::VARCHAR, '2022-01-15'::date,  'National Geographic Partners'::VARCHAR, 'English'::VARCHAR, 5, 10, '12345678901234'::VARCHAR, 'monthly'::VARCHAR, 135, 'National Geographic Magazine'::VARCHAR, 10, true, 'available'::VARCHAR, 0);
CALL add_periodical_item('Scientific American'::VARCHAR, '2022-02-01'::date,  'Springer Nature'::VARCHAR, 'English'::VARCHAR, 2, 1, '23456789012345'::VARCHAR, 'monthly'::VARCHAR, 308, 'Scientific American'::VARCHAR, 12, true, 'available'::VARCHAR, 1);
CALL add_periodical_item('The New Yorker'::VARCHAR, '2022-02-14'::date,  'Condé Nast'::VARCHAR, 'English'::VARCHAR, 9, 1, '34567890123456'::VARCHAR, 'weekly'::VARCHAR, 56, 'The New Yorker'::VARCHAR, 6, false, 'available'::VARCHAR, 0);
CALL add_periodical_item('Wired'::VARCHAR, '2022-03-01'::date,  'Condé Nast'::VARCHAR, 'English'::VARCHAR, 1, 3, '45678901234567'::VARCHAR, 'monthly'::VARCHAR, 92, 'Wired'::VARCHAR, 8, true, 'available'::VARCHAR, 1);
CALL add_periodical_item('Time'::VARCHAR, '2022-04-18'::date,  'Time USA, LLC'::VARCHAR, 'English'::VARCHAR, 14, 1, '56789012345678'::VARCHAR, 'weekly'::VARCHAR, 210, 'Time Magazine'::VARCHAR, 11, true, 'available'::VARCHAR, 0);
CALL add_periodical_item('Popular Mechanics'::VARCHAR, '2022-05-02'::date,  'Hearst Communications, Inc.'::VARCHAR, 'English'::VARCHAR, 4, 1, '67890123456789'::VARCHAR, 'monthly'::VARCHAR, 96, 'Popular Mechanics'::VARCHAR, 9, true, 'available'::VARCHAR, 1);
CALL add_periodical_item('Vogue'::VARCHAR, '2022-06-15'::date,  'Condé Nast'::VARCHAR, 'English'::VARCHAR, 6, 2, '78901234567890'::VARCHAR, 'monthly'::VARCHAR, 128, 'Vogue'::VARCHAR, 7, true, 'available'::VARCHAR, 0);
CALL add_periodical_item('The Economist'::VARCHAR, '2022-07-01'::date,  'The Economist Group'::VARCHAR, 'English'::VARCHAR, 13, 2, '89012345678901'::VARCHAR, 'weekly'::VARCHAR, 672, 'The Economist'::VARCHAR, 13, true, 'available'::VARCHAR, 1);
CALL add_periodical_item('Nature'::VARCHAR, '2022-08-15'::date,  'Springer Nature'::VARCHAR, 'English'::VARCHAR, 8, 5, '90123456789012'::VARCHAR, 'weekly'::VARCHAR, 732, 'Nature'::VARCHAR, 5, true, 'available'::VARCHAR, 0);
CALL add_periodical_item('Harvard Business Review'::VARCHAR, '2022-09-01'::date,  'Harvard Business Publishing'::VARCHAR, 'English'::VARCHAR, 11, 6, '01234567890123'::VARCHAR, 'monthly'::VARCHAR, 68, 'Harvard Business Review'::VARCHAR, 14, true, 'available'::VARCHAR, 1);
CALL add_periodical_item('Rolling Stone'::VARCHAR, '2022-10-17'::date,  'Penske Media Corporation'::VARCHAR, 'English'::VARCHAR, 10, 1, '12345678901235'::VARCHAR, 'monthly'::VARCHAR, 272, 'Rolling Stone'::VARCHAR, 15, true, 'available'::VARCHAR, 0);
CALL add_periodical_item('The Guardian'::VARCHAR, '2022-03-14'::date,  'Guardian Media Group'::VARCHAR, 'English'::VARCHAR, 7, 1, '23456789012346'::VARCHAR, 'daily'::VARCHAR, 62, 'The Guardian'::VARCHAR, 6, true, 'available'::VARCHAR, 1);
CALL add_periodical_item('The Times'::VARCHAR, '2022-04-01'::date,  'News UK'::VARCHAR, 'English'::VARCHAR, 12, 2, '34567890123457'::VARCHAR, 'daily'::VARCHAR, 75, 'The Times'::VARCHAR, 11, true, 'available'::VARCHAR, 0);
CALL add_periodical_item('The Wall Street Journal'::VARCHAR, '2022-05-15'::date,  'Dow Jones & Company'::VARCHAR, 'English'::VARCHAR, 3, 9, '45678901234568'::VARCHAR, 'daily'::VARCHAR, 150, 'The Wall Street Journal'::VARCHAR, 14, true, 'available'::VARCHAR, 1);
CALL add_periodical_item('El País'::VARCHAR, '2022-06-01'::date,  'Grupo Prisa'::VARCHAR, 'Spanish'::VARCHAR, 1, 1, '56789012345679'::VARCHAR, 'daily'::VARCHAR, 90, 'El País'::VARCHAR, 7, true, 'available'::VARCHAR, 0);
CALL add_periodical_item('Le Monde'::VARCHAR, '2022-07-15'::date,  'Groupe Le Monde'::VARCHAR, 'French'::VARCHAR, 5, 5, '67890123456780'::VARCHAR, 'daily'::VARCHAR, 45, 'Le Monde'::VARCHAR, 10, true, 'available'::VARCHAR, 1);
CALL add_periodical_item('Die Zeit'::VARCHAR, '2022-08-01'::date,  'Die Zeit Verlagsgruppe'::VARCHAR, 'German'::VARCHAR, 10, 3, '78901234567891'::VARCHAR, 'weekly'::VARCHAR, 32, 'Die Zeit'::VARCHAR, 13, true, 'available'::VARCHAR, 0);
CALL add_periodical_item('Veja'::VARCHAR, '2022-09-15'::date,  'Editora Abril'::VARCHAR, 'Portuguese'::VARCHAR, 4, 1, '89012345678902'::VARCHAR, 'weekly'::VARCHAR, 80, 'Veja'::VARCHAR, 9, true, 'available'::VARCHAR, 1);
CALL add_periodical_item('Al-Ahram'::VARCHAR, '2022-10-01'::date,  'Al-Ahram Foundation'::VARCHAR, 'Arabic'::VARCHAR, 2, 1, '90123456789013'::VARCHAR, 'daily'::VARCHAR, 120, 'Al-Ahram'::VARCHAR, 12, true, 'available'::VARCHAR, 0);
CALL add_periodical_item('Yomiuri Shimbun'::VARCHAR, '2022-11-15'::date,  'The Yomiuri Shimbun Holdings'::VARCHAR, 'Japanese'::VARCHAR, 8, 2, '01234567890124'::VARCHAR, 'daily'::VARCHAR, 250, 'Yomiuri Shimbun'::VARCHAR, 15, true, 'available'::VARCHAR, 1);
CALL add_periodical_item('South China Morning Post'::VARCHAR, '2022-12-01'::date,  'Alibaba Group'::VARCHAR, 'English'::VARCHAR, 14, 1, '12345678901236'::VARCHAR, 'daily'::VARCHAR, 80, 'South China Morning Post'::VARCHAR, 11, true, 'available'::VARCHAR, 0);

-----------------------------------

CALL add_user_type('STUDENT'::VARCHAR, 3, 3, 2, 1, 15, 1);
CALL add_user_type('GRADUATED'::VARCHAR, 3, 3, 2, 5, 15, 1);
CALL add_user_type('INSTRUCTOR'::VARCHAR, 5, 5, 2, 3, 30, 1);
CALL add_user_type('PERSONAL'::VARCHAR, 5, 5, 2, 3, 15, 1);
CALL add_user_type('TECHNICAL ASSISTANT'::VARCHAR, 5, 2, 2, 2, 30, 1);

-----------------------------------

CALL add_user_account('Emma'::VARCHAR, 'Johnson'::VARCHAR, 'emma.johnson@example.com'::VARCHAR, 'emmaj'::VARCHAR, 'password123'::VARCHAR, '555-1234'::VARCHAR, 5, '123456789'::VARCHAR,  false, 1::smallint, 1);
CALL add_user_account('William'::VARCHAR, 'Brown'::VARCHAR, 'william.brown@example.com'::VARCHAR, 'willb'::VARCHAR, 'password456'::VARCHAR, '555-5678'::VARCHAR, 2, '987654321'::VARCHAR,  false, 1::smallint, 2);
CALL add_user_account('Sophia'::VARCHAR, 'Garcia'::VARCHAR, 'sophia.garcia@example.com'::VARCHAR, 'sophiag'::VARCHAR, 'password789'::VARCHAR, '555-9012'::VARCHAR, 10, '234567890'::VARCHAR,  false, 2::smallint, 3);
CALL add_user_account('Daniel'::VARCHAR, 'Davis'::VARCHAR, 'daniel.davis@example.com'::VARCHAR, 'danield'::VARCHAR, 'passwordabc'::VARCHAR, '555-3456'::VARCHAR, 7, '890123456'::VARCHAR,  true, 1::smallint, 4);
CALL add_user_account('Olivia'::VARCHAR, 'Wilson'::VARCHAR, 'olivia.wilson@example.com'::VARCHAR, 'oliviaw'::VARCHAR, 'passworddef'::VARCHAR, '555-7890'::VARCHAR, 1, '345678901'::VARCHAR,  false, 1::smallint, 5);
CALL add_user_account('James'::VARCHAR, 'Martinez'::VARCHAR, 'james.martinez@example.com'::VARCHAR, 'jamesm'::VARCHAR, 'passwordghi'::VARCHAR, '555-2345'::VARCHAR, 3, '678901234'::VARCHAR,  false, 1::smallint, 6);
CALL add_user_account('Ava'::VARCHAR, 'Anderson'::VARCHAR, 'ava.anderson@example.com'::VARCHAR, 'avaa'::VARCHAR, 'passwordjkl'::VARCHAR, '555-6789'::VARCHAR, 1, '012345678'::VARCHAR,  false, 1::smallint, 7);
CALL add_user_account('Ethan'::VARCHAR, 'Taylor'::VARCHAR, 'ethan.taylor@example.com'::VARCHAR, 'ethant'::VARCHAR, 'passwordmno'::VARCHAR, '555-1234'::VARCHAR, 8, '345678901'::VARCHAR,  false, 2::smallint, 8);
CALL add_user_account('Mia'::VARCHAR, 'Thomas'::VARCHAR, 'mia.thomas@example.com'::VARCHAR, 'miat'::VARCHAR, 'passwordpqr'::VARCHAR, '555-5678'::VARCHAR, 1, '789012345'::VARCHAR,  false, 1::smallint, 9);
CALL add_user_account('Alexander'::VARCHAR, 'Hernandez'::VARCHAR, 'alexander.hernandez@example.com'::VARCHAR, 'alexanderh'::VARCHAR, 'passwordstu'::VARCHAR, '555-9012'::VARCHAR, 1, '234567890'::VARCHAR,  false, 2::smallint, 10);
CALL add_user_account('Charlotte'::VARCHAR, 'Moore'::VARCHAR, 'charlotte.moore@example.com'::VARCHAR, 'charlottem'::VARCHAR, 'passwordvwx'::VARCHAR, '555-3456'::VARCHAR, 5, '678901234'::VARCHAR,  false, 1::smallint, 11);
CALL add_user_account('Michael'::VARCHAR, 'Jackson'::VARCHAR, 'michael.jackson@example.com'::VARCHAR, 'michaelj'::VARCHAR, 'passwordyz1'::VARCHAR, '555-7890'::VARCHAR, 2, '012345678'::VARCHAR,  false, 1::smallint, 12);
CALL add_user_account('Emily'::VARCHAR, 'Lee'::VARCHAR, 'emily.lee@example.com'::VARCHAR, 'emilyl'::VARCHAR, 'password234'::VARCHAR, '555-2345'::VARCHAR, 6, '345678901'::VARCHAR,  false, 3::smallint, 13);
CALL add_user_account('Benjamin'::VARCHAR, 'Franklin'::VARCHAR, 'besn.gonzalez@example.com'::VARCHAR, 'benming'::VARCHAR, 'passwo67'::VARCHAR, '545-6789'::VARCHAR, 1, '789245'::VARCHAR,  false, 5::smallint, 14);
CALL add_user_account('Peter'::VARCHAR, 'Parker'::VARCHAR, 'peterail.parker@example.com'::VARCHAR, 'petergailp'::VARCHAR, 'passwo890'::VARCHAR, '535-1234'::VARCHAR, 2, '2342267890'::VARCHAR,  false, 4::smallint, 15);

-----------------------------------

CALL add_item_heading(floor(random() * 30 + 1)::integer, 'medicine'::VARCHAR, 1);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'European History'::VARCHAR, 2);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Mystery'::VARCHAR, 3);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Detective'::VARCHAR, 4);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Suspense'::VARCHAR, 5);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Science Fiction'::VARCHAR, 6);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Biography'::VARCHAR, 7);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Romance'::VARCHAR, 8);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Thriller'::VARCHAR, 9);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Fantasy'::VARCHAR, 10);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Epic Fantasy'::VARCHAR, 11);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Self-Help'::VARCHAR, 12);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Cooking'::VARCHAR, 13);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'International Cooking'::VARCHAR, 14);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Travel'::VARCHAR, 15);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Art'::VARCHAR, 16);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'History'::VARCHAR, 17);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Ancient History'::VARCHAR, 18);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Business'::VARCHAR, 19);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Finance'::VARCHAR, 20);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Children'::VARCHAR, 21);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Picture Books'::VARCHAR, 22);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Religion'::VARCHAR, 23);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Music'::VARCHAR, 24);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Politics'::VARCHAR, 25);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Sports'::VARCHAR, 26);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Science'::VARCHAR, 27);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Technology'::VARCHAR, 28);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Internet'::VARCHAR, 29);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Health'::VARCHAR, 30);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Philosophy'::VARCHAR, 31);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Reference'::VARCHAR, 32);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'True Crime'::VARCHAR, 33);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Horror'::VARCHAR, 34);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Poetry'::VARCHAR, 35);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Drama'::VARCHAR, 36);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Comics'::VARCHAR, 37);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Graphic Novels'::VARCHAR, 38);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Memoir'::VARCHAR, 39);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'History'::VARCHAR, 42);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Humor'::VARCHAR, 43);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Essays'::VARCHAR, 40);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Short Stories'::VARCHAR, 41);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Fiction'::VARCHAR, 44);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Nonfiction'::VARCHAR, 45);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Autobiography'::VARCHAR, 46);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Anthology'::VARCHAR, 47);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Educational'::VARCHAR, 48);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Classic Literature'::VARCHAR, 49);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Crime Fiction'::VARCHAR, 50);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Historical Fiction'::VARCHAR, 51);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Political Thriller'::VARCHAR, 52);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Psychological Thriller'::VARCHAR, 53);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Contemporary Fiction'::VARCHAR, 54);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Young Adult Fiction'::VARCHAR, 55);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Children''s Fiction'::VARCHAR, 56);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Children''s Nonfiction'::VARCHAR, 57);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Biographical Fiction'::VARCHAR, 58);
CALL add_item_heading(floor(random() * 30 + 1)::integer, 'Urban Fiction'::VARCHAR, 59);

-----------------------------------

CALL add_banned_user(13, 1, 'Rule violation.'::VARCHAR);
CALL add_banned_user(14, 4, 'Damaged library books.'::VARCHAR);
CALL add_banned_user(15, 2, 'He did not deliver his books on time.'::VARCHAR);

-----------------------------------

CALL add_user_to_list(7, 'My Favorite Books'::VARCHAR);
CALL add_user_to_list(12, 'My Reading List'::VARCHAR);
CALL add_user_to_list(15, 'Exam Books'::VARCHAR);
CALL add_user_to_list(8, 'Library Books'::VARCHAR);
CALL add_user_to_list(5, 'Recently Read Books'::VARCHAR);
CALL add_user_to_list(11, 'Holiday Books'::VARCHAR);
CALL add_user_to_list(10, 'Books for School Projects'::VARCHAR);
CALL add_user_to_list(9, 'Books for Research'::VARCHAR);
CALL add_user_to_list(13, 'New Releases'::VARCHAR);
CALL add_user_to_list(7, 'Movie Adaptations'::VARCHAR);
CALL add_user_to_list(9, 'Popular Books'::VARCHAR);
CALL add_user_to_list(8, 'Classics'::VARCHAR);
CALL add_user_to_list(6, 'History Books'::VARCHAR);
CALL add_user_to_list(14, 'Personal development books'::VARCHAR);
CALL add_user_to_list(10, 'Science Fiction Books'::VARCHAR);
CALL add_user_to_list(7, 'Music Books'::VARCHAR);

-----------------------------------

CALL add_item_list(4, 3);
CALL add_item_list(13, 25);
CALL add_item_list(13, 14);
CALL add_item_list(11, 14);
CALL add_item_list(10, 14);
CALL add_item_list(6, 54);
CALL add_item_list(14, 40);
CALL add_item_list(1, 43);
CALL add_item_list(12, 41);
CALL add_item_list(15, 14);
CALL add_item_list(3, 13);
CALL add_item_list(14, 31);
CALL add_item_list(7, 50);
CALL add_item_list(16, 43);
CALL add_item_list(15, 42);
CALL add_item_list(2, 12);
CALL add_item_list(2, 12);/*IT raises ERROR MASSAGE!!!*/

-----------------------------------

CALL add_lost_item(57, 5);
CALL add_lost_item(58, 3);
CALL add_lost_item(59, 3);
CALL add_lost_item(60, 8);
CALL add_lost_item(61, 3);

-----------------------------------

CALL add_maintenance_log(46, 9, 'Multiple pages are missing.'::VARCHAR);
CALL add_maintenance_log(47, 1, 'Ink stains on cover page.'::VARCHAR);
CALL add_maintenance_log(48, 1, 'Pages are crumpled.'::VARCHAR);
CALL add_maintenance_log(49, 6, 'Torn cover page.'::VARCHAR);
CALL add_maintenance_log(50, 1, 'Multiple pages are creased.'::VARCHAR);
CALL add_maintenance_log(51, 4, 'Loose binding.'::VARCHAR);
CALL add_maintenance_log(52, 4, 'Water damage on cover page.'::VARCHAR);
CALL add_maintenance_log(53, 7, 'Missing pages.'::VARCHAR);
CALL add_maintenance_log(54, 3, 'Pages are smudged.'::VARCHAR);
CALL add_maintenance_log(55, 8, 'Torn pages.'::VARCHAR);
CALL add_maintenance_log(56, 2, 'Pages are stained with coffee.'::VARCHAR);
CALL add_maintenance_log(56, 2, 'Pages are stained with coffee.'::VARCHAR);--Error message!!

-----------------------------------

CALL add_maintenance_history(46, 1);
CALL add_maintenance_history(47, 1);
CALL add_maintenance_history(48, 2);
CALL add_maintenance_history(49, 3);
CALL add_maintenance_history(50, 9);

-----------------------------------

CALL add_rental(40, 7, 3);
CALL add_rental(41, 12, 8);
CALL add_rental(42, 15, 6);
CALL add_rental(43, 8, 1);
CALL add_rental(44, 5, 8);
CALL add_rental(45, 2, 5);
CALL add_rental(46, 9, 2);
CALL add_rental(46, 10, 2);
CALL add_rental(47, 14, 9);
CALL add_rental(48, 14, 1);
CALL add_rental(49, 14, 5);
CALL add_rental(50, 11, 5);

-----------------------------------

CALL add_rental(20, 1, 5);
CALL add_rental(21, 1, 2);
CALL add_rental(22, 12, 4);
CALL add_rental(23, 11, 9);
CALL add_rental(24, 10, 1);
CALL add_rental(25, 9, 1);
CALL add_rental(26, 11, 5);

-----------------------------------

CALL add_return_history(40,7, 'no damage');
CALL add_return_history(41,12, 'no damage');
CALL add_return_history(42,15, 'no damage');
CALL add_return_history(43,8, 'missing cover');
CALL add_return_history(44,3, 'no damage');--Record does not exist!! error
CALL add_return_history(49,3, 'no damage');--Record does not exist!! error


-----------------------------------

CALL add_reservation(20,9);
CALL add_reservation(21,10);
CALL add_reservation(22,11);
CALL add_reservation(23,12);
CALL add_reservation(58,13);

-----------------------------------

CALL add_rental(1, 15, 1);
CALL add_return_history(1,15, 'no damage');
CALL add_rental(1, 8, 5);
CALL add_rate(1, 15, 5 );
CALL add_rate(1, 8, 10 );
CALL add_rate(1, 2, 10 );
