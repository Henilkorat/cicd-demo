# CI/CD Pipeline for Express.js Application

A production-ready Express.js application demonstrating Continuous Integration and Continuous Deployment (CI/CD) using GitHub Actions, Docker, and Docker Hub.

## Project Overview

This project showcases how to automate the software delivery process using GitHub Actions. Whenever code is pushed to the `main` branch, the pipeline automatically:

- Installs project dependencies
- Executes unit/API tests using Supertest
- Builds a Docker image
- Pushes the image to Docker Hub

This workflow ensures that every code change is tested and packaged consistently before deployment.

---

## Technologies Used

- Node.js
- Express.js
- Jest
- Supertest
- Docker
- Docker Hub
- GitHub Actions

---

## Project Structure

```
.
├── .github
│   └── workflows
│       └── main.yml
├── tests
│   └── app.test.js
├── app.js
├── server.js
├── Dockerfile
├── package.json
├── .dockerignore
├── .gitignore
└── README.md
```

---

## Features

- REST API built with Express.js
- Automated API testing using Supertest
- Dockerized application
- GitHub Actions CI/CD pipeline
- Docker image publishing to Docker Hub
- Automatic workflow execution on every push to `main`

---

# Installation

Clone the repository

```bash
git clone https://github.com/your-username/your-repository.git

cd your-repository
```

Install dependencies

```bash
npm install
```

Start the application

```bash
npm start
```

Development mode

```bash
npm run dev
```

---

# Running Tests

Execute all test cases

```bash
npm test
```

Supertest sends HTTP requests directly to the Express application without starting an actual server, making tests fast and reliable.

Example output

```
PASS tests/app.test.js

✓ GET / returns status 200
✓ GET / returns expected response
```

---

# Docker

## Build Image

```bash
docker build -t express-cicd .
```

## Run Container

```bash
docker run -p 5000:5000 express-cicd
```

Visit

```
http://localhost:5000
```

---

# CI/CD Workflow

The workflow file is located at

```
.github/workflows/main.yml
```

The pipeline performs the following stages:

### 1. Checkout Repository

Downloads the latest source code from GitHub.

---

### 2. Setup Node.js

Installs the required Node.js version.

---

### 3. Install Dependencies

Runs

```bash
npm install
```

---

### 4. Run Tests

Executes all Jest + Supertest test cases.

Pipeline stops immediately if any test fails.

---

### 5. Build Docker Image

Creates a Docker image using the Dockerfile.

```bash
docker build
```

---

### 6. Login to Docker Hub

Uses GitHub Secrets for secure authentication.

Required secrets

- DOCKER_USERNAME
- DOCKER_PASSWORD

---

### 7. Push Docker Image

Publishes the latest Docker image to Docker Hub.

Example

```
docker.io/username/express-cicd:latest
```

---

# GitHub Actions Workflow

The workflow is triggered automatically when code is pushed to the main branch.

```yaml
on:
  push:
    branches:
      - main
```

Pipeline flow

```
Push Code
     │
     ▼
Checkout Repository
     │
     ▼
Install Dependencies
     │
     ▼
Run Supertest Tests
     │
     ▼
Build Docker Image
     │
     ▼
Login Docker Hub
     │
     ▼
Push Docker Image
```

---

# Environment Variables

If required, create a `.env` file.

Example

```
PORT=5000
```

---

# Sample API

## GET /

Response

```json
{
    "message":"Hello World"
}
```

---

# Internship Task Explanation

## Objective

The objective of this task is to automate the application's build, testing, and deployment process using a CI/CD pipeline.

Instead of manually running tests, building Docker images, and uploading them, GitHub Actions performs these tasks automatically whenever code is pushed to the repository.

---

## Why CI/CD?

Continuous Integration ensures that every code change is tested before being merged.

Continuous Deployment automates packaging and deployment so applications can be delivered quickly and consistently.

Benefits include:

- Faster development
- Reduced manual work
- Early bug detection
- Consistent deployments
- Improved software quality

---

## How This Project Meets the Task Requirements

| Requirement | Implementation |
|-------------|----------------|
| Express Application | ✅ |
| GitHub Repository | ✅ |
| GitHub Actions Workflow | ✅ |
| Dockerized Application | ✅ |
| Supertest API Testing | ✅ |
| Docker Hub Image Push | ✅ |
| Trigger on Push to Main | ✅ |

---

# Workflow Summary

```
Developer
     │
Push Code
     │
     ▼
GitHub Repository
     │
     ▼
GitHub Actions
     │
     ├── Install Dependencies
     ├── Run Tests
     ├── Build Docker Image
     ├── Login Docker Hub
     └── Push Image
               │
               ▼
          Docker Hub
```

---

# Future Improvements

- Deploy to Render
- Deploy to AWS EC2
- Deploy to Kubernetes
- Add code coverage reports
- Security vulnerability scanning
- Multi-stage Docker builds
- Automated version tagging

---

# Author

**Henil Korat**

IT Engineering Student

Learning DevOps, Backend Development, Docker, CI/CD, and Cloud Technologies.
