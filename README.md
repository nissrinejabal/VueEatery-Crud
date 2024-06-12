**Restaurant Management System with Vue.js**

This repository contains a CRUD (Create, Read, Update, Delete) application built with Vue.js for managing a restaurant's information. The application allows restaurant owners to sign in or sign up to access their account. Once authenticated, owners can view their restaurants along with their respective products, categories, and items.

**Key Features:**
- User Authentication: Secure sign in and sign up functionality for restaurant owners.
- Restaurant Management: View, add, update, and delete restaurants.
- Product Management: Manage products within each restaurant, including categories and individual items.
- JSON Server Backend: Utilizes `json-server` to provide a lightweight JSON-based backend for storing restaurant data.
- Axios for HTTP Requests: Integration with Axios for handling API requests to the server.
- Vue Router: Utilizes Vue Router for client-side routing, enabling seamless navigation between pages.
- Vue Storage: Utilizes Vue Storage for local storage management, ensuring persistent user sessions.

**Technologies Used:**
- Vue.js
- JSON Server
- Axios
- Vue Router
- Vuex Storage
- Vue Validate

**Getting Started:**
1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the JSON server by running `npx json-server --watch db.json`.
5. Start the Vue.js application using `npm run serve`.
6. Access the application in your browser at `http://localhost:8080`.

**Contributing:**
Contributions are welcome! If you have any suggestions or improvements, feel free to open an issue or submit a pull request.


**Acknowledgments:**
This project was inspired by the need for a simple yet effective restaurant management system. Special thanks to the Vue.js community for their fantastic tools and resources.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
