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
    Service = "H2I-service"
    Stage   = var.stage
  }
}