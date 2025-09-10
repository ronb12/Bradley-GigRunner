# 🍔 Bradley GigRunner - Personal Food Concierge Service

A revolutionary personal food concierge service that connects customers with local workers for food ordering and delivery. Built with modern web technologies and Firebase backend, this app allows customers to hire personal food assistants, browse restaurants, and track orders in real-time.

## ✨ Features

### 🛒 Customer Features
- **Personal Food Concierge**: Hire workers to order and deliver food for you
- **Restaurant Browsing**: Browse restaurants by category with complete menus
- **Full Restaurant Menus**: Complete menus can be added for any restaurant with categories, items, and pricing
- **Shopping Cart**: Add items to cart with quantity management
- **Two-Step Payment System**: Pay restaurant directly + service fee to worker
- **Order Tracking**: Real-time order status with progress bars and ETA
- **Address Input**: Enhanced address fields with validation
- **Worker Selection**: Choose from available workers with ratings and specialties
- **Live Map Tracking**: Track worker location during delivery
- **Responsive Design**: Mobile-first design that works on all devices

### 👷 Worker Features
- **Job Management**: Accept and manage food delivery jobs
- **Service Fee Setting**: Set your own service fees and pricing
- **Real-time Location Sharing**: Share location during active jobs
- **Earnings Dashboard**: Track service fees and total earnings
- **Order Status Updates**: Update job progress (accepted, picked up, delivered)
- **Map Integration**: Leaflet maps for navigation and tracking
- **Job History**: View completed deliveries and earnings
- **Online/Offline Status**: Toggle availability for jobs

### 🍽️ Restaurant Features
- **Menu Management**: Complete restaurant menus with categories
- **Order Processing**: Handle incoming food orders
- **Status Updates**: Track order preparation status
- **Real-time Notifications**: Get notified of new orders

### 👨‍💼 Admin Features
- **User Management**: Manage customers, workers, and restaurants
- **Order Monitoring**: Track all orders across the platform
- **Analytics**: Comprehensive reporting and insights
- **System Management**: Manage delivery zones and settings

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Firebase project (for backend services)
- Local web server (for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ronb12/Bradley-GigRunner.git
   cd Bradley-GigRunner
   ```

2. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and Firestore Database
   - Copy your Firebase config to `firebase-config.js`

3. **Start the application**
   ```bash
   # Using Python (if installed)
   python -m http.server 8000
   
   # Or using Node.js
   npx serve .
   
   # Or using any other local server
   ```

4. **Open in browser**
   Navigate to `http://localhost:8000`

## 🏗️ Project Structure

```
Bradley-GigRunner/
├── index.html                 # Main landing page
├── customer.html              # Customer dashboard with food ordering
├── worker-dashboard.html      # Worker management interface
├── restaurant-dashboard.html  # Restaurant management interface
├── admin.html                 # Admin management interface
├── login.html                 # User authentication
├── signup.html                # User registration
├── role-selector.html         # Role selection after signup
├── firebase-config.js         # Firebase configuration
├── firebase.json              # Firebase hosting configuration
├── firestore.rules            # Firestore security rules
├── firestore.indexes.json     # Database indexes
├── manifest.json              # PWA manifest
├── service-worker.js          # PWA service worker
├── functions/                 # Firebase Cloud Functions
├── dataconnect/               # Firebase Data Connect
├── icons/                     # App icons
└── README.md                  # This file
```

## 🔧 Configuration

### Firebase Setup
1. Create a new Firebase project
2. Enable the following services:
   - Authentication (Email/Password)
   - Firestore Database
   - Hosting
   - Cloud Functions (optional)
3. Update `firebase-config.js` with your project credentials
4. Deploy Firestore rules: `firebase deploy --only firestore:rules`
5. Deploy indexes: `firebase deploy --only firestore:indexes`

### Database Schema
The app uses the following Firestore collections:
- `users` - User profiles and roles (customer, worker, admin)
- `workerHires` - Worker hiring records and job assignments
- `requests` - Delivery requests and order details
- `messages` - Chat messages between customers and workers
- `notifications` - User notifications
- `logs` - System logs and activity tracking

## 🎯 How It Works

### For Customers:
1. **Browse Restaurants**: View available restaurants and their menus
2. **Add to Cart**: Select food items and quantities
3. **Hire Worker**: Choose a worker to handle your order
4. **Two-Step Payment**: 
   - Pay restaurant directly on their website
   - Pay worker service fee separately
5. **Track Order**: Monitor progress with real-time updates and maps

### For Workers:
1. **Set Service Fee**: Choose your own pricing
2. **Accept Jobs**: View and accept available food orders
3. **Pick Up Food**: Go to restaurant and pick up pre-paid order
4. **Deliver Order**: Take food to customer location
5. **Earn Money**: Receive service fee payment

## 🎨 Customization

### Branding
- Update colors in CSS variables
- Replace logo and favicon
- Modify app name in `manifest.json`

### Features
- Add new restaurant categories
- Implement additional payment methods
- Add more order status types
- Customize delivery zones

## 📱 Progressive Web App (PWA)

This app is built as a PWA with:
- Offline functionality
- Installable on mobile devices
- Push notifications support
- Responsive design
- Service worker for caching

## 🔒 Security Features

- Firebase Authentication with role-based access
- Firestore security rules
- Input validation and sanitization
- XSS protection
- Secure API endpoints

## 🚀 Deployment

### Firebase Hosting (Recommended)
1. Install Firebase CLI
   ```bash
   npm install -g firebase-tools
   ```

2. Login and initialize
   ```bash
   firebase login
   firebase use --add [your-project-id]
   ```

3. Deploy
   ```bash
   firebase deploy
   ```

### Live Demo
- **Production URL**: https://bradley-gigrunner.web.app
- **GitHub Repository**: https://github.com/ronb12/Bradley-GigRunner

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact: Bradley Virtual Solutions, LLC

## 🔮 Roadmap

### Completed Features ✅
- [x] Personal food concierge service system
- [x] Worker hiring and management dashboard
- [x] Two-step payment system
- [x] Real-time order tracking with maps
- [x] Address input with validation
- [x] Worker-set service fees
- [x] Location sharing and tracking
- [x] Complete restaurant menu system
- [x] Firebase authentication and Firestore
- [x] PWA support and responsive design

### Upcoming Features
- [ ] Push notifications
- [ ] Real-time chat between users
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Worker rating system
- [ ] Restaurant reviews
- [ ] Delivery time estimation
- [ ] Advanced payment options
- [ ] Order scheduling
- [ ] Loyalty program

### Version History
- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added restaurant management
- **v1.2.0** - Enhanced worker features
- **v1.3.0** - Improved UI/UX
- **v2.0.0** - Personal food concierge service
- **v2.1.0** - Two-step payment system
- **v2.2.0** - Real-time tracking and maps
- **v2.3.0** - Worker-set service fees

## 🙏 Acknowledgments

- Firebase for backend services
- Leaflet for mapping
- PayPal for payment processing
- OpenStreetMap for map tiles
- Google Places API for address autocomplete

---

**Built with ❤️ by Bradley Virtual Solutions, LLC**

*Revolutionizing food delivery through personal concierge services*