resource "aws_sqs_queue" "request_queue" {
  name                      = "h2i-service-request-${var.stage}"
  delay_seconds             = 0
  message_retention_seconds = 345600
  receive_wait_time_seconds = 20
  visibility_timeout_seconds = 3600
  tags                      = local.common_tags
}

output "sqs_queue_url" {
  value = aws_sqs_queue.request_queue.url
}

output "sqs_queue_arn" {
  value = aws_sqs_queue.request_queue.arn
}
