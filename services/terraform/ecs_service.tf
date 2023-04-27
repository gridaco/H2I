resource "aws_vpc" "new_vpc" {
  cidr_block = "10.0.0.0/16"

  tags = merge(
    local.common_tags,
    {
      Name = "h2i-vpc"
    }
  )
}


resource "aws_subnet" "new_subnet" {
  vpc_id                  = aws_vpc.new_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${var.region}b"

  tags = merge(
    local.common_tags,
    {
      Name = "h2i-subnet"
    }
  )
}


resource "aws_internet_gateway" "ecs_gateway" {
  vpc_id = aws_vpc.new_vpc.id

  tags = local.common_tags
}


resource "aws_route_table" "ecs_route_table" {
  vpc_id = aws_vpc.new_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.ecs_gateway.id
  }

  tags = local.common_tags
}

resource "aws_route_table_association" "ecs_route_table_association" {
  count          = length(data.aws_subnet_ids.default.ids)
  subnet_id      = tolist(data.aws_subnet_ids.default.ids)[count.index]
  route_table_id = aws_route_table.ecs_route_table.id
}

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

  network_configuration {
    subnets = data.aws_subnet_ids.default.ids
  }

  ordered_placement_strategy {
    field = "memory"
    type  = "binpack"
  }

  tags = local.common_tags
}
