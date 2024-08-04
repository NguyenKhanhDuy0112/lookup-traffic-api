-- Insert data into users table
INSERT INTO users (id, username, email, full_name, phone_number, gender, address, dob, cccd, avatar, created_at, updated_at)
VALUES
(uuid_generate_v4(), 'minhnguyen', 'minh.nguyen@gmail.com', 'Nguyen Van Minh', '0901234567', 'male', '123 Le Loi, Hanoi', '1990-01-01', '012345678901', 'http://example.com/avatar1.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'anhtuan', 'anh.tuan@gmail.com', 'Le Anh Tuan', '0902345678', 'male', '456 Tran Hung Dao, Ho Chi Minh', '1992-02-02', '012345678902', 'http://example.com/avatar2.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'hoanglinh', 'hoang.linh@gmail.com', 'Tran Hoang Linh', '0903456789', 'female', '789 Nguyen Trai, Da Nang', '1995-03-03', '012345678903', 'http://example.com/avatar3.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'team12', 'team12@example.com', 'Team 12', '0904567890', 'male', '789 Le Duan, Hanoi', '1985-05-05', '012345678904', 'http://example.com/avatar4.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert data into vehicles table
INSERT INTO vehicles (id, user_id, image_url, vehicle_number, vehicle_type, brand, model, color, year_of_manufacture, created_at, updated_at)
VALUES
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'minhnguyen'), 'https://www.kbb.com/wp-content/uploads/2022/10/2023-toyota-rav4-prime-frt-3qtr.jpg?w=918', '30A-12345', 'Car', 'Toyota', 'Camry', 'Black', 2015, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'anhtuan'), 'https://cdn.honda.com.vn/motorbike-versions/August2023/dRxlGKvDbVFbdEyfzYVc.png', '59B-67890', 'Motorbike', 'Honda', 'SH', 'White', 2018, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'hoanglinh'), 'https://i1-vnexpress.vnecdn.net/2023/07/08/Hinh1jpg-1688811842.jpg?w=750&h=450&q=100&dpr=1&fit=crop&s=HXnA4hurdRK0aAqtmjDOvg', '43C-98765', 'Car', 'Mazda', 'CX-5', 'Red', 2020, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'team12'), 'https://www.bmw.vn/content/dam/bmw/common/all-models/x-series/x5/2023/highlights/bmw-X-series-x5-cp-exterior-desktop.jpg', '29A-54321', 'Car', 'BMW', 'X5', 'Blue', 2021, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'team12'), 'https://i1-vnexpress.vnecdn.net/2021/11/26/MBC27207jpg-1637901851.jpg?w=750&h=450&q=100&dpr=1&fit=crop&s=ROr5Pyl_xjG7kxaNvdB7zQ', '29A-54322', 'Car', 'Mercedes', 'S-Class', 'Black', 2022, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'team12'), 'https://upload.wikimedia.org/wikipedia/commons/b/b5/R8_Coupe_V10_performance-1.jpg', '29A-54323', 'Car', 'Audi', 'R8', 'Red', 2020, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert data into traffic_violations table
INSERT INTO traffic_violations (id, user_id, vehicle_id, violation_date, violation_type, location, fine_amount, points_deducted, status, created_at, updated_at)
VALUES
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'minhnguyen'), (SELECT id FROM vehicles WHERE vehicle_number = '30A-12345'), '2023-01-15', 'Speeding', 'Le Loi, Hanoi', 500000, 3, 'Unpaid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'anhtuan'), (SELECT id FROM vehicles WHERE vehicle_number = '59B-67890'), '2023-02-20', 'Running red light', 'Tran Hung Dao, Ho Chi Minh', 700000, 4, 'Paid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'hoanglinh'), (SELECT id FROM vehicles WHERE vehicle_number = '43C-98765'), '2023-03-25', 'Illegal parking', 'Nguyen Trai, Da Nang', 300000, 2, 'Unpaid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'team12'), (SELECT id FROM vehicles WHERE vehicle_number = '29A-54321'), '2023-04-10', 'Reckless driving', 'Le Duan, Hanoi', 800000, 5, 'Unpaid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'team12'), (SELECT id FROM vehicles WHERE vehicle_number = '29A-54322'), '2023-05-15', 'Speeding', 'Tran Phu, Hanoi', 600000, 3, 'Paid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'team12'), (SELECT id FROM vehicles WHERE vehicle_number = '29A-54323'), '2023-06-20', 'Illegal parking', 'Nguyen Trai, Hanoi', 400000, 2, 'Unpaid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert data into driver_licenses table
INSERT INTO driver_licenses (id, user_id, license_number, license_type, issued_date, expiration_date, issuing_authority, created_at, updated_at)
VALUES
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'minhnguyen'), '0123456789', 'B2', '2015-01-01', '2025-01-01', 'Hanoi Department of Transport', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'anhtuan'), '0987654321', 'A1', '2018-02-02', '2028-02-02', 'Ho Chi Minh Department of Transport', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'hoanglinh'), '1234567890', 'B2', '2020-03-03', '2030-03-03', 'Da Nang Department of Transport', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'team12'), '9876543210', 'B1', '2017-05-05', '2027-05-05', 'Hanoi Department of Transport', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'team12'), '5432167890', 'A2', '2018-06-10', '2028-06-10', 'Hanoi Department of Transport', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM users WHERE username = 'team12'), '6789054321', 'C', '2019-07-15', '2029-07-15', 'Hanoi Department of Transport', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert data into insurance_policies table
INSERT INTO insurance_policies (id, vehicle_id, policy_number, company, coverage_type, start_date, end_date, created_at, updated_at)
VALUES
(uuid_generate_v4(), (SELECT id FROM vehicles WHERE vehicle_number = '30A-12345'), 'INS123456', 'Bao Viet Insurance', 'Comprehensive', '2023-01-01', '2024-01-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM vehicles WHERE vehicle_number = '59B-67890'), 'INS654321', 'PVI Insurance', 'Third-party liability', '2023-02-01', '2024-02-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM vehicles WHERE vehicle_number = '43C-98765'), 'INS789012', 'PTI Insurance', 'Comprehensive', '2023-03-01', '2024-03-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM vehicles WHERE vehicle_number = '29A-54321'), 'INS456789', 'Liberty Insurance', 'Third-party liability', '2023-04-01', '2024-04-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
