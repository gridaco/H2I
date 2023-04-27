resource "tls_private_key" "ecs_instance_key" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

resource "aws_key_pair" "ecs_instance_key" {
  key_name   = "h2i-service-worker-ecs-instance-key"
  public_key = tls_private_key.ecs_instance_key.public_key_openssh
}

output "ecs_instance_private_key_pem" {
  value     = tls_private_key.ecs_instance_key.private_key_pem
  sensitive = true
}

output "ecs_instance_public_key" {
  value     = tls_private_key.ecs_instance_key.public_key_openssh
  sensitive = true
}
