-- DROP DATABASE IF EXISTS
DROP DATABASE IF EXISTS gamefindme_db;

-- CREATE DATABASE
CREATE DATABASE gamefindme_db;

-- Connect to the database
\c gamefindme_db;

-- Create the users table with UUIDs
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,  
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships (
    userId UUID REFERENCES users(id) ON DELETE CASCADE,  
    friendId UUID REFERENCES users(id) ON DELETE CASCADE, 
    PRIMARY KEY (userId, friendId)
);
