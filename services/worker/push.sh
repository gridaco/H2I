#!/bin/bash

set -e

# Ensure the AWS CLI is installed
if ! command -v aws &> /dev/null; then
  echo "Error: AWS CLI is not installed. Please install it first."
  exit 1
fi

# Ensure Docker is installed
if ! command -v docker &> /dev/null; then
  echo "Error: Docker is not installed. Please install it first."
  exit 1
fi

# Build the package
npm install
npm run build

# Retrieve ECR repository URL
REPOSITORY_URL=$(terraform output -state=../terraform/terraform.tfstate worker_repository_url)

# Remove '"' characters from the URL
REPOSITORY_URL=$(echo "${REPOSITORY_URL}" | tr -d '"')

echo $REPOSITORY_URL

# Build the Docker image
docker build -t "${REPOSITORY_URL}" .

# Log in to ECR
aws ecr get-login-password --region us-west-1 | docker login --username AWS --password-stdin "$(echo ${REPOSITORY_URL} | cut -d/ -f1)"

# Push the Docker image to ECR
docker push "${REPOSITORY_URL}"