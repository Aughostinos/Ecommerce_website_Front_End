# E-Commerce Frontend

Welcome to the **E-Commerce Frontend** repository! This is the client-side application of our e-commerce platform, built using React. It provides a seamless and interactive user experience, allowing users to browse products, manage their cart and wishlist, and handle user authentication.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication**
  - Login and Signup functionality.
  - Password reset and forgot password features.
- **Product Management**
  - Browse products by categories.
  - View detailed product information.
  - Add or remove products from the wishlist.
  - Add products to the cart with quantity controls.
- **Cart and Checkout**
  - View and manage cart items.
  - Proceed to checkout and place orders.
  - Order confirmation with order details.
- **Order History**
  - View past orders with detailed information.
- **Admin Dashboard**
  - Manage users, products, orders, and categories (accessible to admin users).
- **Responsive Design**
  - Optimized for various screen sizes and devices.
- **User Profile**
  - View and update user profile information.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **React Router DOM**: For client-side routing.
- **Axios**: For making HTTP requests to the backend.
- **Font Awesome**: For iconography.
- **CSS**: Styling components and pages.
- **JWT Authentication**: Handling user authentication via JSON Web Tokens.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Installed on your machine. You can download it [here](https://nodejs.org/).
- **npm**: Comes bundled with Node.js. Alternatively, you can use **yarn** as a package manager.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/e-commerce-frontend.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd e-commerce-frontend
   ```

3. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

## Configuration

1. **Backend API URL**

   Ensure that the frontend knows where to send API requests. Update the `BACKEND_URL` in your configuration file.

   - **Locate the Configuration File**

     Typically found at `src/config.js`.

   - **Update `BACKEND_URL`**

     ```javascript
     // src/config.js
     const BACKEND_URL = 'http://localhost:5000'; // Replace with your backend URL
     
     export default BACKEND_URL;
     ```

2. **Environment Variables**

   If you have any environment-specific variables, create a `.env` file in the root directory and add them accordingly.

   ```env
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```

   **Note:** Prefix your environment variables with `REACT_APP_` to make them accessible in the React application.

## Running the Application

Start the development server to run the application locally.

Using npm:

```bash
npm start
```

Or using yarn:

```bash
yarn start
```

The application will run on [http://localhost:3000](http://localhost:3000) by default.

## Project Structure

```plaintext
e-commerce-frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── SearchResults.js
│   │   └── ...
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── CategoryPage.js
│   │   ├── ProductDetailsPage.js
│   │   ├── WishlistPage.js
│   │   ├── CartPage.js
│   │   ├── CheckoutPage.js
│   │   ├── OrderConfirmationPage.js
│   │   ├── OrderHistory.js
│   │   ├── Profile.js
│   │   ├── AboutUs.js
│   │   ├── ContactUs.js
│   │   └── adminPages/
│   │       ├── AdminDashboard.js
│   │       ├── ManageUsers.js
│   │       ├── ManageProducts.js
│   │       ├── ManageOrders.js
│   │       └── ManageCategories.js
│   ├── config.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── ...
```

## Available Scripts

In the project directory, you can run:

### `npm start` or `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm test` or `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run eject` or `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. **Fork the Project**

2. **Create your Feature Branch**

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit your Changes**

   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**

## License

Distributed under the [MIT License](LICENSE).

## Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) - your.email@example.com

Project Link: [https://github.com/your-username/e-commerce-frontend](https://github.com/your-username/e-commerce-frontend)
```

---

## **Backend README**

```markdown
# E-Commerce Backend

Welcome to the **E-Commerce Backend** repository! This is the server-side application of our e-commerce platform, built using Node.js, Express, and MongoDB. It handles all business logic, data storage, and API endpoints to support the frontend application.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Management**
  - User registration and authentication using JWT.
  - Profile management (view and update).
  - Wishlist and cart management.
- **Product Management**
  - CRUD operations for products.
  - Manage product categories.
  - Handle product stock levels.
- **Order Management**
  - Create and manage orders.
  - Track order status (e.g., Pending, Paid, Shipped).
  - Order history for users.
- **Admin Dashboard**
  - Manage users, products, orders, and categories.
- **Security**
  - Protect routes using authentication middleware.
  - Input validation and error handling.
- **Scalability**
  - Structured with modular routes and controllers.
  - Ready for integration with frontend applications.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT (JSON Web Tokens)**: For user authentication.
- **bcrypt**: For hashing user passwords.
- **dotenv**: For managing environment variables.
- **Cors**: To handle Cross-Origin Resource Sharing.
- **Nodemon**: For automatic server restarts during development.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Installed on your machine. You can download it [here](https://nodejs.org/).
- **npm**: Comes bundled with Node.js.
- **MongoDB**: Installed and running on your machine or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/e-commerce-backend.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd e-commerce-backend
   ```

3. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

## Configuration

1. **Environment Variables**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key
   CLIENT_URL=http://localhost:3000
   ```

   **Descriptions:**

   - `PORT`: Port number for the server to listen on.
   - `MONGO_URI`: MongoDB connection string.
   - `JWT_SECRET`: Secret key for JWT signing and verification.
   - `CLIENT_URL`: URL of the frontend application for CORS configuration.

2. **Database Setup**

   - Ensure MongoDB is installed and running.
   - If using MongoDB Atlas, replace the `MONGO_URI` with your cluster's connection string.

## Running the Application

### **Development Mode**

Start the server with hot-reloading using Nodemon.

Using npm:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

### **Production Mode**

Start the server without hot-reloading.

Using npm:

```bash
npm start
```

Or using yarn:

```bash
yarn start
```

The server will run on [http://localhost:5000](http://localhost:5000) by default.

## Project Structure

```plaintext
e-commerce-backend/
├── controllers/
│   ├── orderController.js
│   ├── productController.js
│   └── userController.js
├── models/
│   ├── Order.js
│   ├── Product.js
│   └── User.js
├── routes/
│   ├── orderRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── utils/
│   └── generateToken.js
├── config/
│   └── db.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## API Documentation

### **Authentication**

- **POST `/auth/login`**
  - **Description:** Authenticate user and return a JWT.
  - **Body Parameters:**
    - `email`: User's email.
    - `password`: User's password.
  - **Responses:**
    - `200 OK`: Successfully authenticated.
    - `400 Bad Request`: Missing or incorrect credentials.

- **POST `/auth/signup`**
  - **Description:** Register a new user.
  - **Body Parameters:**
    - `name`: User's name.
    - `email`: User's email.
    - `password`: User's password.
  - **Responses:**
    - `201 Created`: User successfully registered.
    - `400 Bad Request`: Validation errors.

- **POST `/auth/forgot-password`**
  - **Description:** Initiate password reset process.
  - **Body Parameters:**
    - `email`: User's email.
  - **Responses:**
    - `200 OK`: Password reset email sent.
    - `404 Not Found`: Email not found.

- **POST `/auth/reset-password`**
  - **Description:** Reset user's password.
  - **Body Parameters:**
    - `token`: Password reset token.
    - `password`: New password.
  - **Responses:**
    - `200 OK`: Password successfully reset.
    - `400 Bad Request`: Invalid or expired token.

### **User Routes**

- **GET `/user/profile`**
  - **Description:** Get authenticated user's profile.
  - **Headers:**
    - `Authorization`: `Bearer <token>`
  - **Responses:**
    - `200 OK`: User profile data.
    - `401 Unauthorized`: Invalid or missing token.

- **PUT `/user/update-profile`**
  - **Description:** Update authenticated user's profile.
  - **Headers:**
    - `Authorization`: `Bearer <token>`
  - **Body Parameters:** Any user fields to update (e.g., `name`, `email`).
  - **Responses:**
    - `200 OK`: Profile updated successfully.
    - `400 Bad Request`: Validation errors.
    - `401 Unauthorized`: Invalid or missing token.

- **POST `/user/add-to-wishlist`**
  - **Description:** Add a product to the user's wishlist.
  - **Headers:**
    - `Authorization`: `Bearer <token>`
  - **Body Parameters:**
    - `productId`: ID of the product to add.
  - **Responses:**
    - `200 OK`: Product added to wishlist.
    - `400 Bad Request`: Validation errors or product already in wishlist.
    - `401 Unauthorized`: Invalid or missing token.

- **POST `/user/remove-from-wishlist`**
  - **Description:** Remove a product from the user's wishlist.
  - **Headers:**
    - `Authorization`: `Bearer <token>`
  - **Body Parameters:**
    - `productId`: ID of the product to remove.
  - **Responses:**
    - `200 OK`: Product removed from wishlist.
    - `400 Bad Request`: Validation errors or product not in wishlist.
    - `401 Unauthorized`: Invalid or missing token.

- **POST `/user/add-to-cart`**
  - **Description:** Add a product to the user's cart.
  - **Headers:**
    - `Authorization`: `Bearer <token>`
  - **Body Parameters:**
    - `productId`: ID of the product to add.
    - `quantity`: Quantity to add (optional, defaults to 1).
  - **Responses:**
    - `200 OK`: Product added to cart.
    - `400 Bad Request`: Validation errors.
    - `401 Unauthorized`: Invalid or missing token.

- **DELETE `/user/remove-from-cart`**
  - **Description:** Remove a product from the user's cart.
  - **Headers:**
    - `Authorization`: `Bearer <token>`
  - **Body Parameters:**
    - `productId`: ID of the product to remove.
  - **Responses:**
    - `200 OK`: Product removed from cart.
    - `400 Bad Request`: Validation errors.
    - `401 Unauthorized`: Invalid or missing token.

- **PUT `/user/update-cart-item`**
  - **Description:** Update the quantity of a product in the user's cart.
  - **Headers:**
    - `Authorization`: `Bearer <token>`
  - **Body Parameters:**
    - `productId`: ID of the product.
    - `quantity`: New quantity.
  - **Responses:**
    - `200 OK`: Cart updated successfully.
    - `400 Bad Request`: Validation errors.
    - `401 Unauthorized`: Invalid or missing token.

- **GET `/user/get-cart-wishlist`**
  - **Description:** Get the user's cart and wishlist.
  - **Headers:**
    - `Authorization`: `Bearer <token>`
  - **Responses:**
    - `200 OK`: Cart and wishlist data.
    - `401 Unauthorized`: Invalid or missing token.

### **Order Routes**

- **GET `/orders`**
  - **Description:** Get all orders (Admin only).
  - **Headers:**
    - `Authorization`: `Bearer <admin_token>`
  - **Responses:**
    - `200 OK`: List of all orders.
    - `401 Unauthorized`: Invalid or missing token.
    - `403 Forbidden`: User is not an admin.

- **POST `/orders`**
  - **Description:** Create a new order.
  - **Headers:**
    - `Authorization`: `Bearer <token>`
  - **Body Parameters:**
    - `orderItems`: Array of order items.
    - `shippingAddress`: Shipping address details.
    - `paymentMethod`: Payment method selected.
  - **Responses:**
    - `201 Created`: Order placed successfully.
    - `400 Bad Request`: Validation errors.
    - `401 Unauthorized`: Invalid or missing token.

- **GET `/orders/:id`**
  - **Description:** Get order details by ID (User can access their own orders; Admin can access all).
  - **Headers:**
    - `Authorization`: `Bearer <token>`
  - **Parameters:**
    - `id`: Order ID.
  - **Responses:**
    - `200 OK`: Order details.
    - `404 Not Found`: Order not found or unauthorized access.
    - `401 Unauthorized`: Invalid or missing token.

- **PUT `/orders/:id/pay`**
  - **Description:** Mark an order as paid.
  - **Headers:**
    - `Authorization`: `Bearer <token>`
  - **Parameters:**
    - `id`: Order ID.
  - **Responses:**
    - `200 OK`: Order marked as paid.
    - `404 Not Found`: Order not found.
    - `401 Unauthorized`: Invalid or missing token.

- **DELETE `/orders/:id`**
  - **Description:** Delete an order (Admin only).
  - **Headers:**
    - `Authorization`: `Bearer <admin_token>`
  - **Parameters:**
    - `id`: Order ID.
  - **Responses:**
    - `200 OK`: Order deleted successfully.
    - `404 Not Found`: Order not found.
    - `401 Unauthorized`: Invalid or missing token.
    - `403 Forbidden`: User is not an admin.

- **GET `/orders/user/:userId`**
  - **Description:** Get all orders for a specific user (Admin only).
  - **Headers:**
    - `Authorization`: `Bearer <admin_token>`
  - **Parameters:**
    - `userId`: User ID.
  - **Responses:**
    - `200 OK`: List of orders for the user.
    - `404 Not Found`: User not found.
    - `401 Unauthorized`: Invalid or missing token.
    - `403 Forbidden`: User is not an admin.

### **Product Routes**

- **GET `/products/get-products-by-category/:categoryId`**
  - **Description:** Get all products under a specific category.
  - **Parameters:**
    - `categoryId`: Category ID.
  - **Responses:**
    - `200 OK`: List of products.
    - `404 Not Found`: Category not found.
    - `400 Bad Request`: Invalid category ID.

- **CRUD operations for products (Admin only)**

  - **POST `/products`**: Create a new product.
  - **PUT `/products/:id`**: Update an existing product.
  - **DELETE `/products/:id`**: Delete a product.
  - **GET `/products/:id`**: Get product details by ID.

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `yarn dev`

Runs the app in the development mode with hot-reloading using **Nodemon**.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### `npm start` or `yarn start`

Runs the app in the production mode.<br>
The server will start without hot-reloading.

### `npm test` or `yarn test`

Launches the test runner in the interactive watch mode.<br>
> **Note:** Ensure you have tests written and configured.

### `npm run lint` or `yarn lint`

Runs ESLint to analyze code for potential errors and enforce coding standards.

## Project Structure

```plaintext
e-commerce-backend/
├── controllers/
│   ├── orderController.js
│   ├── productController.js
│   └── userController.js
├── models/
│   ├── Order.js
│   ├── Product.js
│   └── User.js
├── routes/
│   ├── orderRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── utils/
│   └── generateToken.js
├── config/
│   └── db.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. **Fork the Project**

2. **Create your Feature Branch**

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit your Changes**

   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**

## Contact

Augustinos Abusaif -  augustinos.nabil@gmail.com

Project Link: \[https://github.com/Aughostinos/Ecommerce_website_Front_End\](https://github.com/Aughostinos/ecommerce_website)

\---