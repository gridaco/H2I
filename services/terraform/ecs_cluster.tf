resource "aws_ecs_cluster" "worker_cluster" {
  name = "H2I-service-worker-${var.stage}-cluster"
  tags = local.common_tags
}