CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(32) NOT NULL UNIQUE,
	"password" varchar(32) NOT NULL,
	"email" varchar(255) NOT NULL,
	"access_level" int NOT NULL DEFAULT '1'
);



CREATE TABLE "fish_list" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" TEXT NOT NULL,
	"image_url" TEXT NOT NULL
);



CREATE TABLE "lure_list" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" serial NOT NULL,
	"image_url" serial NOT NULL
);



CREATE TABLE "journal" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" int NOT NULL REFERENCES "users" ON DELETE CASCADE,
	"fish_id" int NOT NULL REFERENCES "fish_list" ON DELETE CASCADE,
	"lure_id" int NOT NULL REFERENCES "lure_list" ON DELETE CASCADE,
	"date" DATE NOT NULL,
	"fish_image_url" TEXT,
	"weight" numeric NOT NULL,
	"length" numeric NOT NULL,
	"comments" TEXT
);








