variable "region" {
  default = "us-west-1"
}

variable "aws_profile" {
  default = "default"
}

variable "stage" {
  default = "dev"
}

locals {
  common_tags = {
    Service = "h2i-service"
    Stage   = var.stage
  }
}