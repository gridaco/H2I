resource "aws_sns_topic" "response_topic" {
  name = "h2i-service-response-${var.stage}"
  tags = local.common_tags
}

output "sns_topic_arn" {
  value = aws_sns_topic.response_topic.arn
}
