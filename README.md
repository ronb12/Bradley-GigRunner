# 🍔 Bradley GigRunner - Food Delivery App

A DoorDash-like food delivery application built with modern web technologies. This app allows customers to order food from restaurants, drivers to deliver orders, and restaurant owners to manage their menus and orders.

## ✨ Features

### 🛒 Customer Features
- **Restaurant Browsing**: Browse restaurants by category (Pizza, Burgers, Asian, Mexican, Dessert)
- **Menu Management**: View detailed menus with prices and descriptions
- **Shopping Cart**: Add items to cart with quantity management
- **Order Tracking**: Real-time order status updates
- **Payment Integration**: Secure payment processing with PayPal
- **Location Services**: Set delivery address and track delivery
- **Responsive Design**: Mobile-first design that works on all devices

### 🚗 Driver Features
- **Order Management**: Accept and manage delivery orders
- **Real-time Tracking**: Live map with GPS tracking
- **Earnings Dashboard**: Track daily earnings, tips, and bonuses
- **Order History**: View completed deliveries
- **SOS Button**: Emergency contact feature
- **Online/Offline Status**: Toggle availability

### 🍽️ Restaurant Features
- **Order Management**: View and manage incoming orders
- **Menu Management**: Add, edit, and manage menu items
- **Analytics Dashboard**: Track sales and performance metrics
- **Order Status Updates**: Update order preparation status
- **Real-time Notifications**: Get notified of new orders

### 👨‍💼 Admin Features
- **User Management**: Manage customers, drivers, and restaurants
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
├── index.html                 # Main login/landing page
├── customer-dashboard.html    # Customer ordering interface
├── driver-dashboard.html      # Driver delivery interface
├── restaurant-dashboard.html  # Restaurant management interface
├── admin.html                 # Admin management interface
├── firebase-config.js         # Firebase configuration
├── manifest.json             # PWA manifest
├── service-worker.js         # PWA service worker
├── icons/                    # App icons
└── README.md                 # This file
```

## 🔧 Configuration

### Firebase Setup
1. Create a new Firebase project
2. Enable the following services:
   - Authentication (Email/Password)
   - Firestore Database
   - Storage (optional)
3. Update `firebase-config.js` with your project credentials

### Database Schema
The app uses the following Firestore collections:
- `users` - User profiles and roles
- `restaurants` - Restaurant information
- `menuItems` - Menu items for each restaurant
- `orders` - Order details and status
- `drivers` - Driver profiles and location
- `reviews` - Customer reviews and ratings
- `notifications` - Push notifications

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

## 🔒 Security Features

- Firebase Authentication
- Role-based access control
- Secure API endpoints
- Input validation
- XSS protection

## 🚀 Deployment

### Firebase Hosting
1. Install Firebase CLI
   ```bash
   npm install -g firebase-tools
   ```

2. Login and initialize
   ```bash
   firebase login
   firebase init hosting
   ```

3. Deploy
   ```bash
   firebase deploy
   ```

### Other Hosting Options
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

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
- Contact: [Your Contact Information]

## 🔮 Roadmap

### Upcoming Features
- [ ] Push notifications
- [ ] Real-time chat between users
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Driver rating system
- [ ] Restaurant reviews
- [ ] Delivery time estimation
- [ ] Advanced payment options
- [ ] Order scheduling
- [ ] Loyalty program

### Version History
- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added restaurant management
- **v1.2.0** - Enhanced driver features
- **v1.3.0** - Improved UI/UX

## 🙏 Acknowledgments

- Firebase for backend services
- Leaflet for mapping
- PayPal for payment processing
- OpenStreetMap for map tiles

---

**Built with ❤️ by Bradley Virtual Solutions, LLC**
