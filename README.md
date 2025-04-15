# Wise
# Campus_Connect — An all-purpose app for Students, Professors, and Admins 🎓

A robust and modern student portal designed for **Professors**, **Students**, and **Administrators**.  
Campus_Connect is a feature-rich platform designed to simplify academic workflows for students, professors, and administrators. The system offers a secure role-based login system where users are authenticated using JSON Web Tokens (JWT) and assigned specific roles — ensuring each user accesses only the features intended for them. Professors can manage courses, create assignments, track student attendance, and assign grades from an intuitive and organized dashboard, and admin can create users, create departmnents, create courses and so on while students can easily view, submit, and monitor their assignments, attendance records, and grades from their dedicated portal.

The platform also includes a real-time announcement module, enabling professors and admins to broadcast important updates directly to students. One of the standout capabilities is the offline-first support, powered by IndexedDB and Service Workers, which allows users to continue interacting with the application even without an active internet connection. Any actions taken offline, such as assignment submissions or attendance updates, are automatically synced with the server once connectivity is restored, ensuring no data is lost.


---

##  Features

-  Role-Based Login (Admin, Professor, Student)
-  JWT Authentication & Secure Token Storage
-  Course & Assignment Management
-  Attendance and Grade Tracking
-  Offline Support using IndexedDB & Service Workers
-  Automatic Background Sync when Reconnected
-  Announcements for Students & Professors

---

##  Technologies Used

- `Node.js` & `Express` (Backend)
- `MongoDB` (Database)
- `Next.js` (Frontend Framework)
- `JWT` for Authentication
- `IndexedDB` for Local Storage
- `Service Workers` for Offline Sync

---

##  How to Run Locally

1. **Clone this repository:**
```bash
git clone https://github.com/your-username/student-portal.git
cd Wise-CampusConnect
```
2. **Open the frontend:**
```bash
cd campusconnect-frontend
npm i
npm run dev
```
3. **Open the backend:**
   Add necessary credentials in .env
```bash
cd campusconnect-backend
npm i
npm run dev
```
4. **Open the announcement:**
   Add necessary credentials in .env
```bash
cd campusconnect-announcement
npm i
npm run dev
```
