resource "aws_ecs_task_definition" "worker_task" {
  family                   = "h2i-service-worker-${var.stage}"
  network_mode             = "awsvpc"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.worker_exec.arn
  task_role_arn            = aws_iam_role.worker_task.arn

  container_definitions = jsonencode([
    {
      name  = "worker"
      image = local.worker_image_url

      essential = true

      environment = [
        {
          name  = "SNS_TOPIC_ARN"
          value = aws_sns_topic.response_topic.arn
        },
        {
          name  = "SQS_QUEUE_URL"
          value = aws_sqs_queue.request_queue.url
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.worker.name
          awslogs-region        = var.region
          awslogs-stream-prefix = "worker"
        }
      }
    }
  ])

  tags = local.common_tags
}

resource "aws_ecs_service" "worker_service" {
  name            = "h2i-service-worker-${var.stage}-ecs-service"
  cluster         = aws_ecs_cluster.worker_cluster.id
  task_definition = aws_ecs_task_definition.worker_task.arn
  desired_count   = 1

  launch_type = "EC2"

  force_new_deployment = true


  network_configuration {
    subnets = data.aws_subnet_ids.default.ids
  }

  ordered_placement_strategy {
    field = "memory"
    type  = "binpack"
  }

  tags = local.common_tags
}
