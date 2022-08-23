CREATE TABLE "tasks" (
	"id" serial primary key,
	-- not null means this is required!
	"taskname" varchar(40) not null,
	"complete" boolean default false
);
