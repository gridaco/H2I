#!/bin/sh

# Exit on error
set -e

# Initialize Terraform
terraform init

# Apply the Terraform configuration to create the VPC and subnet
terraform apply -target=aws_vpc.new_vpc -target=aws_subnet.new_subnet -auto-approve

# Apply the Terraform configuration
terraform apply -auto-approve

# Change to the worker directory and build & push the Docker image
cd ../worker
./push.sh

# Apply the Terraform configuration again to update the ECS task definition
cd ../terraform
terraform apply -auto-approve
