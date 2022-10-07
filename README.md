# Clicker game

## Frontend

React app with typescript

### Commands

- yarn start - start dev server
- yarn build - build output into '/dist' folder
- yarn lint - statical code analysis
- yarn prettier - format code

### Deploy

Upload to S3 bucket using aws-cli:

```
aws2 s3 sync ./dist s3://bucket-name
```
