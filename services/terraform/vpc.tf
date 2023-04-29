resource "aws_internet_gateway" "ecs_gateway" {
  vpc_id = aws_vpc.new_vpc.id

  tags = local.common_tags
}


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