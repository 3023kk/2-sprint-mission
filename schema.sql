CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  nickname VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW(),
  is_deleted BOOLEAN DEFAULT false
);

CREATE TABLE products (
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id),
name TEXT NOT NULL,
description TEXT,
price INTEGER NOT NULL,
tags TEXT[],
images TEXT[],
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW(),
is_deleted BOOLEAN DEFAULT false
);

CREATE TABLE comments (
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id),
product_id INT REFERENCES products(id),
article_id INT REFERENCES articles(id),
content TEXT NOT NULL,
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW(),
is_deleted BOOLEAN DEFAULT false
);

CREATE TABLE articles (
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id),
title TEXT NOT NULL,
content TEXT,
image TEXT,
tags TEXT[],
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW(),
is_deleted BOOLEAN DEFAULT false
);

CREATE TABLE likes (
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id),
product_id INT REFERENCES products(id),
article_id INT REFERENCES articles(id),
created_at TIMESTAMP DEFAULT NOW()
);