**Example: Setting Up a GitLab CI/CD Pipeline for a Web Application**

**Objective:** Create a GitLab CI/CD pipeline for a web application that consists of a frontend built with React and a backend API built with Node.js.

**Prerequisites:**

1. Access to a GitLab account or instance.
2. A GitLab project.
3. Basic knowledge of Git and GitLab CI/CD.
3. Install nodejs

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
   │   ├── .gitlab-ci.yml
   │   ├── ...
   ├── backend/
   │   ├── src/
   │   │   ├── ... (Node.js backend source files)
   │   ├── package.json
   │   ├── .gitlab-ci.yml
   │   ├── ...
   ├── .gitlab-ci.yml
   ```

   In this structure, the `frontend` directory contains the React frontend, and the `backend` directory contains the Node.js backend.

3. Generate frontend and backend apps

**Frontend (`frontend` directory):**

- In the `frontend` directory, create a new React application:

```bash
npx create-react-app frontend
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
         - cd frontend
         - npm install
         - npm run build
      artifacts:
         paths:
            - frontend/build

   frontend_test:
      stage: test
      script:
         - cd frontend
         - CI=true npm test
      artifacts:
         when: always
         reports:
            junit:
               - junit.xml
   ```

**Backend (`backend` directory):**

- In the `backend` directory, create a Node.js application and install Express:

   ```bash
   mkdir backend
   cd backend
   npm init -y
   npm install express
   ```

- Create a file named `app.js` in the `backend` directory with the following content:

   ```javascript
    const express = require('express');
    const app = express();
    const port = process.env.PORT || 3000;

    app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
    });

    const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
    module.exports = { app, server };
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
         - cd backend
         - npm install --save-dev jest supertest
         - npm install

   backend_test:
      stage: test
       script:
           - cd backend
           - npm test
      artifacts:
         when: always
         reports:
            junit:
               - junit.xml
   ```

**Root Directory (`.gitlab-ci.yml` for full application):**

In the root directory of your project, create a `.gitlab-ci.yml` file with the following content:

```yaml
image: node:14

stages:
  - build
  - test

include:
  - local: frontend/.gitlab-ci.yml
  - local: backend/.gitlab-ci.yml
```

4. **Commit and Push the `.gitlab-ci.yml` File:**

   Add the `.gitlab-ci.yml` file to your Git repository, commit it, and push the changes:

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin master  # Or your branch name
   ```

6. **Monitor the Pipeline:**

   Check the GitLab project's "CI/CD" > "Pipelines" section to monitor the pipeline's progress. You can see the stages and jobs being executed.

10. **Explore Advanced Features:**

    As you become more comfortable with GitLab CI/CD, explore advanced features such as deploying to different environments (e.g., staging and production), using environment variables, and integrating with external services like databases.

11. Resolve tests errors:

To resolve this error, make sure you're importing the Express app correctly in your test file (`app.test.js`). Ensure that you're exporting the app correctly from your `app.js` file and importing it properly in the test file.

Here are some steps to help you troubleshoot and resolve this issue:

**1. Verify Export in `app.js`:**

In your `app.js` file, ensure that you are exporting your Express app correctly. It should look something like this:

```javascript
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { app, server };
```

**2. Check Import in `app.test.js`:**

In your `app.test.js` file, ensure that you are importing the Express app correctly. The import path should be relative to the location of your test file:

```javascript
const request = require('supertest');
const { app, server } = require('../app');

describe('Express App Tests', () => {
  beforeAll((done) => {
    server.on('listening', () => {
      done();
    });
  });

  afterAll((done) => {
    server.close(() => {
      done();
    });
  });

  it('should respond with a JSON message containing "Hello, World!"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello, World!');
  });
});
```

Ensure that the path to your `app.js` file is correct relative to your test file's location.

**3. Verify Application Structure:**

Double-check the directory structure of your project to ensure that the `app.js` file and the `app.test.js` file are in the correct locations and that there are no typos in the filenames.

**4. Run Tests:**

After making sure the imports are correct, try running your tests again using `npm test`. The error should be resolved, and your tests should execute without issues.
