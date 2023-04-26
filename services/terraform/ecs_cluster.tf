resource "aws_ecs_cluster" "worker_cluster" {
  name = "h2i-service-worker-${var.stage}-cluster"
  tags = local.common_tags
}