--user table
create table users {
    user_id serial primary key,
    users varchar(255) unique not null,
    password varchar(255) not null,
    create_at date default current_date,
    rol varchar(30) not null,
};