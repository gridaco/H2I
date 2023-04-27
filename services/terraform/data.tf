data "aws_caller_identity" "current" {
}

data "aws_subnet_ids" "default" {
  vpc_id = aws_vpc.new_vpc.id
}