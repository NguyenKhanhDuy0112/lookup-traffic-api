-- Enable uuid-ossp extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define enum type for status in English
CREATE TYPE violation_status AS ENUM ('Unpaid', 'Paid');

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    full_name VARCHAR(100),
    gender VARCHAR(10),
    phone_number VARCHAR(20),
    address TEXT,
    dob DATE,
    cccd VARCHAR(50),
    avatar TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create vehicles table
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    image_url TEXT NOT NULL,
    vehicle_number VARCHAR(50) NOT NULL,
    vehicle_type VARCHAR(50),
    brand VARCHAR(50),
    model VARCHAR(50),
    color VARCHAR(50),
    year_of_manufacture INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create traffic_violations table
CREATE TABLE traffic_violations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    vehicle_id UUID REFERENCES vehicles(id),
    violation_date DATE,
    violation_type VARCHAR(100),
    location VARCHAR(200),
    fine_amount DECIMAL(10, 2),
    points_deducted INT,
    status violation_status,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create driver_licenses table
CREATE TABLE driver_licenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    license_number VARCHAR(50),
    license_type VARCHAR(50),
    issued_date DATE,
    expiration_date DATE,
    issuing_authority VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create insurance_policies table
CREATE TABLE insurance_policies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID REFERENCES vehicles(id),
    policy_number VARCHAR(50),
    company VARCHAR(100),
    coverage_type VARCHAR(100),
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);