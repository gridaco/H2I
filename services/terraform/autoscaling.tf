resource "aws_cloudwatch_metric_alarm" "queue_depth_alarm" {
  alarm_name          = "h2i-service-queue-depth-alarm-${var.stage}"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "ApproximateNumberOfMessagesVisible"
  namespace           = "AWS/SQS"
  period              = "60"
  statistic           = "SampleCount"
  threshold           = "50" # Adjust this value based on your requirements
  alarm_description   = "This metric checks for the depth of the SQS queue"
  alarm_actions       = [aws_appautoscaling_policy.worker_scale_up_policy.arn]
  dimensions = {
    QueueName = "h2i-service-request-${var.stage}"
  }
}

resource "aws_appautoscaling_target" "worker_target" {
  max_capacity       = 10 # Adjust this value based on your requirements
  min_capacity       = 1
  resource_id        = "service/${aws_ecs_cluster.worker_cluster.name}/${aws_ecs_service.worker_service.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "worker_scale_up_policy" {
  name               = "h2i-service-worker-scale-up-policy-${var.stage}"
  policy_type        = "StepScaling"
  resource_id        = aws_appautoscaling_target.worker_target.resource_id
  scalable_dimension = aws_appautoscaling_target.worker_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.worker_target.service_namespace

  step_scaling_policy_configuration {
    adjustment_type         = "ChangeInCapacity"
    cooldown                = 300
    metric_aggregation_type = "Average"

    step_adjustment {
      scaling_adjustment          = 1
      metric_interval_lower_bound = 0
    }
  }
}