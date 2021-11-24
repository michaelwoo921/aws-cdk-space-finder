import { Stack, StackProps, aws_apigateway } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/lib/aws-lambda-nodejs';
import { join } from 'path';

import { Construct } from 'constructs';
import { ApiGateway } from 'aws-cdk-lib/lib/aws-events-targets';
import { LambdaIntegration } from 'aws-cdk-lib/lib/aws-apigateway';

export class SpaceStack extends Stack {
  private api = new aws_apigateway.RestApi(this, 'zSpaceApi');
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const helloLambdaNodejs = new NodejsFunction(this, 'zHelloLambdaNodejs', {
      entry: join(__dirname, '..', 'services', 'node-lambda', 'hello.ts'),
      handler: 'handler',
    });

    const helloLambdaIntegration = new LambdaIntegration(helloLambdaNodejs);

    const spaceResource = this.api.root.addResource('spaces');
    spaceResource.addMethod('GET', helloLambdaIntegration);
  }
}
