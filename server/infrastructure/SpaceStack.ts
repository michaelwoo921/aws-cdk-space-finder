import { Stack, StackProps, aws_apigateway } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/lib/aws-lambda-nodejs';
import { join } from 'path';

import { Construct } from 'constructs';

export class SpaceStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const helloLambdaNodejs = new NodejsFunction(this, 'zHelloLambdaNodejs', {
      entry: join(__dirname, '..', 'services', 'node-lambda', 'hello.ts'),
      handler: 'handler',
    });
  }
}
