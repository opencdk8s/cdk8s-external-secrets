import { Testing, Chart } from 'cdk8s';
import * as t from '../src/index';
test('hello', () => {
  const app = Testing.app();
  const chart = new Chart(app, 'test');
  new t.ExternalSecretV1Beta1(chart, 'test', {
    metadata: {
      name: 'test',
    },
    spec: {
      refreshInterval: '1h',
      secretStoreRef: {
        kind: 'SecretStore',
        name: 'example',
      },
      target: {
        name: 'secret-to-be-created',
        creationPolicy: 'Owner',
      },
      dataFrom: [
        {
          extract: {
            key: 'all-keys-example-secret',
          },
        },
      ],
    },
  });


  expect(Testing.synth(chart)).toMatchSnapshot();
});
