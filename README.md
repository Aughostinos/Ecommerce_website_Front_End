# E-Commerce Frontend

Welcome to the **E-Commerce Frontend** repository! This is the client-side application of our e-commerce platform, built using React. It provides a seamless and interactive user experience, allowing users to browse products, manage their cart and wishlist, and handle user authentication.

## Table of Contents

- [E-Commerce Frontend](#e-commerce-frontend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
  - [Project Structure](#project-structure)
  - [Available Scripts](#available-scripts)
    - [`npm start` or `yarn start`](#npm-start-or-yarn-start)
    - [`npm run build` or `yarn build`](#npm-run-build-or-yarn-build)
    - [`npm test` or `yarn test`](#npm-test-or-yarn-test)
    - [`npm run eject` or `yarn eject`](#npm-run-eject-or-yarn-eject)
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
     const BACKEND_URL = 'http://localhost:5000';
     
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

Augustinos Abusaif -  augustinos.nabil@gmail.com

Project Link: [https://github.com/Aughostinos/Ecommerce_website_Front_End](https://github.com/Aughostinos/Ecommerce_website_Front_End)

