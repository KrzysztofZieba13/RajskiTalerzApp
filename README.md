MERN Stack Application

This is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application provides functionalities for managing online and in-place orders, user accounts, and table bookings.

Features

Online order placement

Table booking system

Role-based access control

Order processing and management

Delivery tracking with map integration (Leaflet)

Admin dashboard with statistics and charts

User Roles and Responsibilities

The system defines multiple user roles, each with specific functionalities:

1. Client

Place online orders

Book a table

View order history

Receive notifications about orders and bookings

2. Waiter

Manage table bookings

Confirm that an order was issued

3. Cook

View order history (by selecting a date)

Manage orders and mark them as ready for issue

4. Delivery Guy

View all ready-to-deliver orders

Confirm delivery status

View delivery location on a map (Leaflet integration)

5. Admin

View order statistics (last 30 days) using bar and pie charts

Perform all other user role functionalities

Tech Stack

Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB

Mapping: Leaflet.js

Charts & Analytics: Chart.js (for bar chart and pie chart visualization)
