Task 3: Infrastructure as Code (IaC) with Terraform 🏗️
Terraform Docker

Provision and manage a Docker container using Terraform as Infrastructure as Code.

📦 Resources Managed
Resource	Type	Description
docker_image.nodejs_app	Docker Image	Pulls image from DockerHub
docker_container.nodejs_container	Docker Container	Runs app on port 3000
🔧 Terraform Commands
terraform init      # Download Docker provider
terraform validate  # Validate config syntax
terraform plan      # Preview what will be created
terraform apply     # Provision container
terraform state list # Inspect managed resources
terraform destroy   # Tear down everything
📄 State Management
# List all resources terraform is tracking
terraform state list

# Inspect a specific resource
terraform state show docker_container.nodejs_container
DockerHub → henilkorat/cicd-demo Author → @henilKorat
## Notes & Production Considerations

