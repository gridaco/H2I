variable "region" {
  default = "us-west-1"
}

variable "aws_profile" {
  default = "default"
}

variable "stage" {
  default = "staging"
}

variable "instance_type" {
  description = "EC2 instance type"
  default     = "t2.micro"
}

locals {
  common_tags = {
    Service = "h2i-service"
    Stage   = var.stage
  }
}