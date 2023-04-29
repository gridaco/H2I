data "aws_ssm_parameter" "ecs_ami_id" {
  name = "/aws/service/ecs/optimized-ami/amazon-linux-2/recommended/image_id"
}

locals {
  ecs_optimized_ami_id = data.aws_ssm_parameter.ecs_ami_id.value
}

resource "aws_security_group" "ecs_instance_sg" {
  name        = "h2i-service-worker-ecs-instance-sg"
  description = "Security group for ECS instances"
  vpc_id      = aws_vpc.new_vpc.id

  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8"]
  }

  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "udp"
    cidr_blocks = ["10.0.0.0/8"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = local.common_tags

}

resource "aws_launch_template" "ecs_instance" {
  name_prefix   = "h2i-service-worker-ecs-instance"
  # image_id      = local.ecs_optimized_ami_id
  image_id = "ami-094d4d00fd7462815"
  instance_type = var.instance_type

  key_name = aws_key_pair.ecs_instance_key.key_name

  iam_instance_profile {
    name = aws_iam_instance_profile.ecs_instance_profile.name
  }


  vpc_security_group_ids = [aws_security_group.ecs_instance_sg.id]

  user_data = base64encode(
    <<-EOF
    #!/bin/bash
    echo "ECS_CLUSTER=${aws_ecs_cluster.worker_cluster.name}" >> /etc/ecs/ecs.config
    systemctl enable --now ecs
    EOF
  )

  tags = merge(
    local.common_tags,
    {
      Name = "h2i-service-worker-ecs-instance"
    }
  )
}

resource "aws_autoscaling_group" "ecs_instance_group" {
  name_prefix          = "h2i-service-worker-ecs-instance-group"

  min_size = 1
  max_size = 3
  desired_capacity = 1

  vpc_zone_identifier  = [aws_subnet.new_subnet.id]
  launch_template {
    id      = aws_launch_template.ecs_instance.id
    version = "$Latest"
  }

  tags = concat(
    local.common_tags_as_list,
    [
      {
        key                 = "Name"
        value               = "h2i-service-worker-ecs-instance-group"
        propagate_at_launch = true
      }
    ]
  )
}

locals {
  common_tags_as_list = [
    for k, v in local.common_tags : {
      key                 = k
      value               = v
      propagate_at_launch = true
    }
  ]
}
