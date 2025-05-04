# UniPortal

1. Admin Dashboard

User Management

Create/modify/deactivate accounts for all user types
Assign roles and permissions
Bulk user import via CSV/Excel

Department Management

Create/modify departments and courses
Assign faculty to departments
Set department heads

Academic Management

Create academic years/semesters
Manage course offerings and schedules
Classroom allocation and management

System Configuration

Global system settings and parameters
Notification settings and templates
Data backup and restoration

Reports & Analytics

Overall student performance metrics
Faculty performance and attendance reports
Financial reports and projections
Custom report generation

2. Faculty Dashboard

Course Management

View assigned courses and class schedules
Upload course materials and resources
Create and manage assignments
Set grading criteria

Student Assessment

Create/manage tests and quizzes
Record and manage grades
Track student attendance
Generate performance reports

Communication

Send announcements to specific classes
One-to-one messaging with students
Schedule and manage office hours

Research & Publications

Track research projects
Document publications
Manage research grants

Personal Profile

Update personal information
View attendance and leave records
Submit leave applications

3. Student Dashboard

Academic Information

View enrolled courses and schedule
Access course materials
Submit assignments online
View grades and attendance

Financial Management

View fee structure and due dates
Make online payments
Download receipts and fee statements
Scholarship application and status

Registration

Course registration for upcoming semesters
Add/drop courses within deadlines
Exam registration

Communication

Submit queries to faculty/admin
Access announcements
Forum for discussions

Personal Profile

Update personal information
Track academic progress
Download academic transcripts

4. Library Dashboard

Catalog Management

Add/update books and resources
Manage e-resources and journals
Generate QR codes for physical items

Circulation Management

Issue/return books
Manage reservations
Track overdue books
Calculate and manage fines

User Management

View borrower history
Set borrowing limits by user type
Handle special access requests

Inventory Management

Track stock of books
Generate purchase orders
Manage donations
Periodic inventory audits

Reports

Most borrowed books
User activity statistics
Fine collection reports

5. Training & Placement (TNP) Dashboard

Company Management

Add/update company profiles
Schedule campus visits
Track recruitment history

Job/Internship Management

Post new opportunities
Track application statuses
Schedule interviews and tests

Student Management

Maintain student placement records
Manage resume database
Track placement statistics

Event Management

Schedule placement drives
Organize career workshops
Manage pre-placement talks

Reports & Analytics

Department-wise placement statistics
Salary trends and comparisons
Company-wise recruitment metrics

6. Finance Dashboard

Fee Management

Configure fee structures
Generate fee collection reports
Track defaulters
Manage payment plans

Payroll Management

Process salary for faculty/staff
Calculate deductions and allowances
Generate pay slips
Tax calculations

Budget Management

Prepare annual/quarterly budgets
Track expenses against budgets
Generate variance reports

Accounts Payable/Receivable

Manage vendor payments
Track income from various sources
Reconcile transactions

Financial Reporting

Generate balance sheets
Profit and loss statements
Cash flow analysis
Audit reports

Common Features Across All Dashboards

Personalized Dashboard

Role-specific widgets and quick links
Notifications and alerts
Task lists and reminders

Profile Management

Update personal information
Change password
Two-factor authentication

Messaging System

Inter-departmental communication
Direct messaging
Group discussions

Document Management

Upload and store important documents
Document versioning
Access control

Help & Support

Access to user manuals
Raise support tickets
FAQs section

//Schemaaaa

User Management:

Created a base User schema with common fields
Used Mongoose discriminators to extend the base schema for different user types (Admin, Faculty, Student, etc.)
Implemented role-based access control

Academic Structure:

Established relationships between Departments, Courses, and Academic Sessions
Created CourseOffering schema to handle course instances in specific sessions

Assessment System:

Separate schemas for Assessments and StudentAssessments to track submissions and grades
Detailed Attendance tracking system

Library Management:

Book schema with inventory tracking
BookTransaction schema for borrowing/returning

Training & Placement:

Company and Job schemas for recruitment
JobApplication schema to track student applications and status

Finance Management:

Fee structure and student fee payment tracking
Salary management for employees

Communication:

Notification system for announcements
Direct messaging system between users
