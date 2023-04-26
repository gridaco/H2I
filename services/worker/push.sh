#!/bin/sh

# Exit on error
set -e

# Set your AWS region
REGION="us-west-1"

# Get the ECR repository URL from the Terraform output
REPOSITORY_URL=$(terraform output -state=../terraform/terraform.tfstate worker_repository_url)

# Log in to ECR
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $REPOSITORY_URL

# Build the Docker image
docker build -t worker .

# Tag the Docker image with the ECR repository URL
docker tag worker:latest $REPOSITORY_URL:latest

# Push the Docker image to the ECR repository
docker push $REPOSITORY_URL:latest

echo "Docker image pushed to ECR repository: $REPOSITORY_URL"
