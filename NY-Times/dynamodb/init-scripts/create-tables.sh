#!/bin/sh

# Wait for LocalStack to be ready
until aws --endpoint-url=http://localhost:4566 dynamodb list-tables --region us-east-1 &> /dev/null
do
  echo "LocalStack is not ready yet. Retrying..."
  sleep 2
done

# Create DynamoDB table
aws --endpoint-url=http://localhost:4566 dynamodb create-table \
  --table-name YourTableName \
  --attribute-definitions AttributeName=Id,AttributeType=S \
  --key-schema AttributeName=Id,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
  --region us-east-1

echo "DynamoDB table created successfully!"
