create table "user"
(
    id       serial
        constraint "PK_cace4a159ff9f2512dd42373760"
            primary key,
    email    varchar not null
        constraint user_pk
            unique,
    password varchar not null
);

alter table "user"
    owner to postgres;

create table project
(
    id      serial
        constraint project_pk
            primary key,
    name    varchar,
    user_id integer
        constraint project_user__fk
            references "user"
);

alter table project
    owner to postgres;


create table task
(
    id          serial
        constraint task_pk
            primary key,
    title       varchar,
    status      varchar not null,
    description varchar,
    due_date    date,
    project_id  integer
        constraint task_project__fk
            references project
);

alter table task
    owner to postgres;

INSERT INTO public."user" (email, password) VALUES ( 'lo.yukina@gmail.com', '123');