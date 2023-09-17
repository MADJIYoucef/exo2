**Example: Setting Up a GitLab CI/CD Pipeline for a Web Application**

**Objective:** Create a GitLab CI/CD pipeline for a web application that consists of a frontend built with React and a backend API built with Node.js.

**Prerequisites:**

1. Access to a GitLab account or instance.
2. A GitLab project.
3. Basic knowledge of Git and GitLab CI/CD.
3. install nodejs

**Instructions:**

1. **Create a GitLab Repository:**

   If you haven't already, create a GitLab repository for your web application.

2. **Set Up the Web Application Structure:**

   Organize your project with the following directory structure:

   ```
   exo-2/
   ├── frontend/
   │   ├── src/
   │   │   ├── ... (React frontend source files)
   │   ├── package.json
   │   ├── ...
   ├── backend/
   │   ├── src/
   │   │   ├── ... (Node.js backend source files)
   │   ├── package.json
   │   ├── ...
   ├── .gitlab-ci.yml
   ```

   In this structure, the `frontend` directory contains the React frontend, and the `backend` directory contains the Node.js backend.

3. Generate frontend and backend apps

**Frontend (`frontend` directory):**

- In the `frontend` directory, create a new React application:

```bash
npx create-react-app my-frontend
```

- Replace the content of `src/App.js` with the following:

   ```jsx
   import React from 'react';
   import './App.css';

   function App() {
     return (
       <div className="App">
         <header className="App-header">
           <h1>Hello, Frontend!</h1>
         </header>
       </div>
     );
   }

   export default App;
   ```

- In the `frontend` directory, create a `.gitlab-ci.yml` file with the following content:

   ```yaml
   image: node:14

   stages:
     - build
     - test

   frontend_build:
     stage: build
     script:
       - cd my-frontend
       - npm install
       - npm run build

   frontend_test:
     stage: test
     script:
       - cd my-frontend
       - npm test
   ```

**Backend (`backend` directory):**

- In the `backend` directory, create a Node.js application and install Express:

   ```bash
   mkdir my-backend
   cd my-backend
   npm init -y
   npm install express
   ```

- Create a file named `server.js` in the `backend` directory with the following content:

   ```javascript
   const express = require('express');
   const app = express();
   const port = process.env.PORT || 3001;

   app.get('/', (req, res) => {
     res.json({ message: 'Hello, Backend!' });
   });

   app.listen(port, () => {
     console.log(`Server is running on port ${port}`);
   });
   ```

- In the `backend` directory, create a `.gitlab-ci.yml` file with the following content:

   ```yaml
   image: node:14

   stages:
     - build
     - test

   backend_build:
     stage: build
     script:
       - npm install

   backend_test:
     stage: test
     script:
       - npm test
   ```

**Root Directory (`.gitlab-ci.yml` for full application):**

In the root directory of your project, create a `.gitlab-ci.yml` file with the following content:

```yaml
image: node:14

stages:
  - frontend_build
  - frontend_test
  - backend_build
  - backend_test

include:
  - local: frontend/.gitlab-ci.yml
  - local: backend/.gitlab-ci.yml
```

4. **Commit and Push the `.gitlab-ci.yml` File:**

   Add the `.gitlab-ci.yml` file to your Git repository, commit it, and push the changes:

   ```bash
   git add .gitlab-ci.yml
   git commit -m "Add .gitlab-ci.yml"
   git push origin master  # Or your branch name
   ```

6. **Monitor the Pipeline:**

   Check the GitLab project's "CI/CD" > "Pipelines" section to monitor the pipeline's progress. You can see the stages and jobs being executed.

10. **Explore Advanced Features:**

    As you become more comfortable with GitLab CI/CD, explore advanced features such as deploying to different environments (e.g., staging and production), using environment variables, and integrating with external services like databases.

