# Shop Project

This project is a Vue.js application that utilizes Tailwind CSS for styling and Element Plus for UI components. It is designed to provide a seamless shopping experience, allowing users to browse products, view product details, manage their shopping cart, and place orders.

## Project Structure

The project is organized into several directories, each serving a specific purpose:

- **assets/css**: Contains global styles, including Tailwind CSS imports and custom styles.
- **components**: Contains reusable Vue components, including common components (Header, Footer) and product-related components (ProductDetails, ProductGallery, etc.).
- **composables**: Contains reusable logic for handling API requests related to products.
- **layouts**: Defines the default layout for the application.
- **pages**: Contains the application's pages, including the homepage, product pages, cart, and orders.
- **plugins**: Contains configuration files for third-party libraries, such as Element Plus.
- **stores**: Manages the state for products and the shopping cart using Vuex.
- **types**: Defines TypeScript interfaces for products and orders.
- **utils**: Contains utility functions for data formatting.
- **app.vue**: The root component of the application.
- **nuxt.config.ts**: Configuration file for Nuxt.js.
- **tailwind.config.js**: Configuration file for Tailwind CSS.
- **package.json**: Lists project dependencies and scripts.

## Features

- **Product Browsing**: Users can browse a variety of products with detailed information.
- **Shopping Cart**: Users can add products to their cart, view the cart, and proceed to checkout.
- **Order Management**: Users can view their order history and details.
- **Responsive Design**: The application is designed to be responsive and user-friendly on all devices.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd shop
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.