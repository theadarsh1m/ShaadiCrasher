# ShaadiCrasher

**ShaadiCrasher** is a fun, web application designed to help people *(specially bachelor)* discover nearby weddings and have free food. Upload Wedding Cards you have got.
Users can upload invitations and locate venues on a map.

> ScreenShot

---

## 🚀 Live Demo

👉 **Live URL:** *[\[ShaadiCrasher\]](https://shaadicrasher.netlify.app/)*

---

## ✨ Features

### 🔐 Authentication
- Secure Google Sign-In via **Firebase Authentication**.

### 📰 Dynamic Feed
- Real time feed of wedding invites.
- Automatically sorted by **Nearest To Me** OR **Upcoming First**

### 📍 Location Services
- **Venue Search:** Integrated with **OpenStreetMap and Ola Maps** for autocomplete venue searching & geocoding.  
- **Nearest to Me:** Sort invites by proximity using browser geolocation.  

### 🧹 Auto-Cleanup
- Automatically deletes expired invites (past wedding dates) from Firestore.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS v4  
- **UI Components:** shadcn/ui, Lucide React  
- **Backend:** Firebase (Firestore + Authentication)  
- **Storage:** Cloudinary  
- **Maps:** OpenStreetMap, OLA Maps
- **State Management:** React Context API  

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/theadarsh1m/ShaadiCrasher.git
cd ShaadiCrasher
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a .env file in the project root:

```bash
## Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

## Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset

## OLA Maps
VITE_OLA_MAPS_API_KEY=your_ola_maps_API_key
```

### Start Development Server
```bash
npm run dev
```

### Contributing
Contributions are welcome!

## 1. Fork the project
Create your feature branch

```bash
git checkout -b feature/AmazingFeature
```

### Commit your changes
```bash
git commit -m "Add AmazingFeature"
```

### Push the branch
```bash
git push origin feature/YourFeature
```

### Open a Pull Request

