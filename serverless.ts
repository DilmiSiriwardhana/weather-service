import type { AWS } from '@serverless/typescript';
import functions from '@functions/weather';

const serverlessConfiguration: AWS = {
  service: 'weather-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    profile: 'sls',
    stage:'dev',
    stackName: '${self:service}-stack-${sls:stage}',
    apiName: '${self:service}-${sls:stage}',
    region: 'us-west-2',
    timeout:30,
    memorySize:1024,
    endpointType: 'regional',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: ['${self:provider.apiName}-${sls:stage}-apikey'],
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: {functions} ,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    allowedHttpHeaders:
    'Accept,Authorization,Content-Type,Content-Length,x-api-key',
},
};

module.exports = serverlessConfiguration;
