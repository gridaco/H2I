
resource "aws_iam_role" "worker_exec" {
  name = "H2I-service-worker-exec-${var.stage}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })

  tags = local.common_tags
}

resource "aws_iam_role" "worker_task" {
  name = "H2I-service-worker-task-${var.stage}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })

  tags = local.common_tags
}

resource "aws_iam_role_policy" "worker_exec_policy" {
  name = "H2I-service-worker-exec-policy-${var.stage}"
  role = aws_iam_role.worker_exec.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Effect   = "Allow"
        Resource = "arn:aws:logs:${var.region}:${data.aws_caller_identity.current.account_id}:log-group:/aws/ecs/${aws_ecs_cluster.worker_cluster.name}:*"
      }
    ]
  })
}

resource "aws_iam_role_policy" "worker_task_policy" {
  name = "H2I-service-worker-task-policy-${var.stage}"
  role = aws_iam_role.worker_task.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "sqs:ReceiveMessage",
          "sqs:DeleteMessage",
          "sqs:GetQueueAttributes"
        ]
        Effect   = "Allow"
        Resource = "arn:aws:sqs:${var.region}:${data.aws_caller_identity.current.account_id}:H2I-service-request-${var.stage}"
      },
      {
        Action = [
          "sns:Publish"
        ]
        Effect   = "Allow"
        Resource = "arn:aws:sns:${var.region}:${data.aws_caller_identity.current.account_id}:H2I-service-response-${var.stage}"
      }
    ]
  })
}



resource "aws_cloudwatch_log_group" "worker" {
  name = "/aws/ecs/${aws_ecs_cluster.worker_cluster.name}"
  tags = local.common_tags
}