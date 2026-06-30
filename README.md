# Simple CI/CD Pipeline with Jenkins, Docker & AWS EC2

A basic Node.js application demonstrating a full CI/CD pipeline using Jenkins, Docker, and DockerHub, deployed on an AWS EC2 instance.

## Project Overview

This project automates the build, test, and deployment process for a simple Express.js app. On every push to the `main` branch, Jenkins:

1. Pulls the latest code
2. Installs dependencies
3. Runs tests
4. Builds a Docker image
5. Pushes the image to DockerHub
6. Deploys the container

## Tech Stack

- **App:** Node.js, Express
- **Testing:** Jest
- **CI/CD:** Jenkins
- **Containerization:** Docker
- **Registry:** DockerHub
- **Hosting:** AWS EC2 (Ubuntu)

## Project Structure

```
simple-cicd-app/
├── index.js          # Express app entry point
├── app.test.js       # Basic test suite
├── package.json
├── Dockerfile         # Container build instructions
├── .dockerignore
├── Jenkinsfile         # Pipeline definition
└── README.md
```

## Prerequisites

- AWS account with an EC2 instance (Ubuntu 22.04 LTS recommended)
- DockerHub account
- GitHub account
- Docker installed locally (optional, for local testing)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/simple-cicd-app.git
cd simple-cicd-app
```

### 2. Launch an EC2 instance

- AMI: Ubuntu Server 22.04 LTS
- Instance type: t3.small (minimum recommended for Jenkins)
- Security Group inbound rules:
  - SSH (22) — My IP
  - Custom TCP (8080) — Anywhere (Jenkins dashboard)
  - Custom TCP (50000) — Anywhere (Jenkins agents)
  - Custom TCP (3000) — Anywhere (deployed app, optional)
- Storage: 20 GB minimum

### 3. Install Docker on EC2

```bash
ssh -i your-key.pem ubuntu@<EC2-PUBLIC-IP>
sudo apt update
sudo apt install -y docker.io
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker ubuntu
```
Log out and back in for group changes to apply.

### 4. Run Jenkins as a container

```bash
docker volume create jenkins_home

docker run -d -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock --name jenkins jenkins/jenkins:lts
```

Get the initial admin password:
```bash
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

Access Jenkins at `http://<EC2-PUBLIC-IP>:8080`, complete setup, and install suggested plugins.

### 5. Fix Docker socket permissions inside the Jenkins container

```bash
sudo docker exec -u root jenkins chmod 666 /var/run/docker.sock
sudo docker exec -u root jenkins sh -c "apt-get update && apt-get install -y docker.io"
```

### 6. Install the Docker Pipeline plugin

Manage Jenkins → Plugins → Available plugins → search "Docker Pipeline" → install → restart Jenkins.

### 7. Add credentials in Jenkins

**DockerHub credentials** (Manage Jenkins → Credentials → Add Credentials):
- Kind: Username with password
- Username/Password: DockerHub login (access token recommended over real password)
- ID: `dockerhub-credentials`

**GitHub credentials** (if repo is private):
- Kind: Username with password (use a Personal Access Token as password)
- ID: `github-credentials`

### 8. Create the Jenkins pipeline job

- New Item → Pipeline → name it
- Build Triggers: check "GitHub hook trigger for GITScm polling"
- Pipeline → Definition: "Pipeline script from SCM"
- SCM: Git → repository URL → credentials if private
- Branch: `*/main`
- Script Path: `Jenkinsfile`

### 9. Configure the GitHub webhook

GitHub repo → Settings → Webhooks → Add webhook:
- Payload URL: `http://<EC2-PUBLIC-IP>:8080/github-webhook/`
- Content type: `application/json`
- Trigger: Just the push event

### 10. Update Jenkinsfile values

In the Jenkinsfile, replace:
```groovy
IMAGE_NAME = "yourdockerhubusername/your-app"
```
with your actual DockerHub username and chosen repo name.

## Running the App Locally

```bash
npm install
npm start
```
App runs on `http://localhost:3000`.

## Running Tests

```bash
npm test
```

## Triggering the Pipeline

Push any change to the `main` branch:
```bash
git add .
git commit -m "trigger pipeline"
git push
```

Jenkins will automatically detect the push (via webhook) and run the full pipeline. Progress can be monitored on the Jenkins dashboard under the job's Stage View.

## Verifying Deployment

On the EC2 instance:
```bash
docker ps
curl localhost:3000
```

From a browser (if port 3000 is open in the Security Group):
```
http://<EC2-PUBLIC-IP>:3000
```

## Pipeline Stages

| Stage | Description |
|---|---|
| Checkout | Pulls latest code from GitHub |
| Install Dependencies | Runs `npm install` |
| Run Tests | Runs `npm test` (Jest) |
| Build Docker Image | Builds image tagged with build number and `latest` |
| Push to DockerHub | Pushes both tags to DockerHub |
| Deploy | Stops old container, runs new one |

## Notes & Production Considerations

- Jenkins dashboard is exposed on port 8080 with no HTTPS/auth restrictions beyond the built-in login — fine for learning, not recommended for production without a reverse proxy and TLS.
- Mounting the Docker socket into the Jenkins container grants it root-equivalent access to the host; acceptable for a personal/learning setup, but should be handled more carefully in shared environments.
- Stop the EC2 instance when not in use to avoid unnecessary costs.
