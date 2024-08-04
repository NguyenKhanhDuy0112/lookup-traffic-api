-- Insert data into users table
INSERT INTO users (id, username, email, full_name, phone_number, gender, address, dob, cccd, avatar, created_at, updated_at)
VALUES
(uuid_generate_v4(), 'minhnguyen', 'minh.nguyen@gmail.com', 'Nguyen Van Minh', '0901234567', 'male', '123 Le Loi, Hanoi', '1990-01-01', '012345678901', 'http://example.com/avatar1.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'anhtuan', 'anh.tuan@gmail.com', 'Le Anh Tuan', '0902345678', 'male', '456 Tran Hung Dao, Ho Chi Minh', '1992-02-02', '012345678902', 'http://example.com/avatar2.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'hoanglinh', 'hoang.linh@gmail.com', 'Tran Hoang Linh', '0903456789', 'female', '789 Nguyen Trai, Da Nang', '1995-03-03', '012345678903', 'http://example.com/avatar3.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'team5', 'team5@example.com', 'Team 5', '0904567890', 'male', '789 Le Duan, Hanoi', '1985-05-05', '012345678904', 'http://example.com/avatar4.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert data into vehicles table
INSERT INTO vehicles (id, user_id, image_url, vehicle_number, vehicle_type, brand, model, color, year_of_manufacture, created_at, updated_at)
VALUES
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'minhnguyen'), 'http://example.com/vehicle1.jpg', '30A-12345', 'Car', 'Toyota', 'Camry', 'Black', 2015, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'anhtuan'), 'http://example.com/vehicle2.jpg', '59B-67890', 'Motorbike', 'Honda', 'SH', 'White', 2018, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'hoanglinh'), 'http://example.com/vehicle3.jpg', '43C-98765', 'Car', 'Mazda', 'CX-5', 'Red', 2020, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'team5'), 'http://example.com/vehicle4.jpg', '29A-54321', 'Car', 'BMW', 'X5', 'Blue', 2021, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert data into traffic_violations table
INSERT INTO traffic_violations (id, user_id, vehicle_id, violation_date, violation_type, location, fine_amount, points_deducted, status, created_at, updated_at)
VALUES
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'minhnguyen'), (SELECT id FROM vehicles WHERE vehicle_number = '30A-12345'), '2023-01-15', 'Speeding', 'Le Loi, Hanoi', 500000, 3, 'Unpaid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'anhtuan'), (SELECT id FROM vehicles WHERE vehicle_number = '59B-67890'), '2023-02-20', 'Running red light', 'Tran Hung Dao, Ho Chi Minh', 700000, 4, 'Paid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'hoanglinh'), (SELECT id FROM vehicles WHERE vehicle_number = '43C-98765'), '2023-03-25', 'Illegal parking', 'Nguyen Trai, Da Nang', 300000, 2, 'Unpaid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'team5'), (SELECT id FROM vehicles WHERE vehicle_number = '29A-54321'), '2023-04-10', 'Reckless driving', 'Le Duan, Hanoi', 800000, 5, 'Unpaid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert data into driver_licenses table
INSERT INTO driver_licenses (id, user_id, license_number, license_type, issued_date, expiration_date, issuing_authority, created_at, updated_at)
VALUES
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'minhnguyen'), '0123456789', 'B2', '2015-01-01', '2025-01-01', 'Hanoi Department of Transport', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'anhtuan'), '0987654321', 'A1', '2018-02-02', '2028-02-02', 'Ho Chi Minh Department of Transport', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'hoanglinh'), '1234567890', 'B2', '2020-03-03', '2030-03-03', 'Da Nang Department of Transport', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'team5'), '9876543210', 'B1', '2017-05-05', '2027-05-05', 'Hanoi Department of Transport', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert data into insurance_policies table
INSERT INTO insurance_policies (id, vehicle_id, policy_number, company, coverage_type, start_date, end_date, created_at, updated_at)
VALUES
(uuid_generate_v4(), (SELECT id FROM vehicles WHERE vehicle_number = '30A-12345'), 'INS123456', 'Bao Viet Insurance', 'Comprehensive', '2023-01-01', '2024-01-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM vehicles WHERE vehicle_number = '59B-67890'), 'INS654321', 'PVI Insurance', 'Third-party liability', '2023-02-01', '2024-02-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM vehicles WHERE vehicle_number = '43C-98765'), 'INS789012', 'PTI Insurance', 'Comprehensive', '2023-03-01', '2024-03-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM vehicles WHERE vehicle_number = '29A-54321'), 'INS456789', 'Liberty Insurance', 'Third-party liability', '2023-04-01', '2024-04-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
