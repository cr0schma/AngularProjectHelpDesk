-- 1.
Create Database Helpdesk
GO

USE [Helpdesk]

-- 2.
Create Table Tickets (
	Id int IDENTITY(1,1) Primary Key,
	Reporter nvarchar(50),
	Assignee nvarchar(50),
	Status nvarchar(6),
	Title nvarchar(max),
	Resolution nvarchar(max)
);

Create Table Favorites (
	Id int IDENTITY(1,1) Primary Key,
	UserId nvarchar(50),
	Ticket_Number int Foreign Key References Tickets(Id)
);

-- 3.
Insert Into Tickets
Values ('John Doe', 'Chris Schmalz', 'Closed', 'No Internet Connectivity', 'Plugged in network cable'),
('Jane Doe', 'Chris Schmalz', 'Open', 'PC will not turn on', null);

Insert Into Favorites
Values ('John Doe', 1);