resource "aws_ecr_repository" "worker_image" {
  name = "h2i-service-worker-${var.stage}"
  tags = local.common_tags
}

locals {
  worker_image_url = "${aws_ecr_repository.worker_image.repository_url}:latest"
}