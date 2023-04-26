resource "aws_sns_topic" "response_topic" {
  name = "H2I-service-response-${var.stage}"
  tags = local.common_tags
}

output "sns_topic_arn" {
  value = aws_sns_topic.response_topic.arn
}
