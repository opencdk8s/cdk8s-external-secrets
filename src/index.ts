import { ApiObject, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';

import * as k8s from './imports/k8s';
export * as k8s from './imports/k8s';

export interface SecretStoreRef {
  readonly name: string;
  readonly kind?: string;
}

export interface ExternalSecretTemplateMetadata {
  readonly annotations?: { [key: string]: string};
  readonly labels?: { [key: string]: string};
}

export interface ExternalSecretTemplate {
  readonly type?: string;
  readonly engineVersion?: string;
  readonly metadata?: ExternalSecretTemplateMetadata;
  readonly data?: { [key: string]: string};
  readonly templateFrom?: TemplateFrom[];
}

export interface TemplateFrom {
  readonly configMap?: TemplateRef;
  readonly secret?: TemplateRef;
}

export interface TemplateRef {
  readonly name: string;
  readonly items: TemplateRefItem[];
}

export interface TemplateRefItem {
  readonly key: string;
}

export interface ExternalSecretTarget {
  readonly name?: string;
  readonly creationPolicy?: string;
  readonly deletionPolicy?: string;
  readonly template?: ExternalSecretTemplate;
  readonly immutable?: boolean;
}

export interface ExternalSecretData {
  readonly secretKey: string;
  readonly remoteRef: ExternalSecretDataRemoteRef;
}

export interface ExternalSecretDataRemoteRef {
  readonly key: string;
  readonly metadataPolicy?: string;
  readonly property?: string;
  readonly version?: string;
  readonly conversionStrategy?: string;
  readonly decodingStrategy?: string;
}

export interface ExternalSecretDataFromRemoteRef {
  readonly extract?: ExternalSecretDataRemoteRef;
  readonly find?: ExternalSecretFind;
  readonly rewrite?: ExternalSecretRewrite[];
}

export interface ExternalSecretRewrite {
  readonly regexp?: ExternalSecretRewriteRegexp;
}

export interface ExternalSecretRewriteRegexp {
  readonly source: string;
  readonly target: string;
}

export interface ExternalSecretFind {
  readonly path?: string;
  readonly name?: FindName;
  readonly tags?: { [key: string]: string};
  readonly conversionStrategy?: string;
  readonly decodingStrategy?: string;
}

export interface FindName {
  readonly regexp?: string;
}

export interface ExternalSecretSpec {
  readonly secretStoreRef: SecretStoreRef;
  readonly target?: ExternalSecretTarget;
  readonly refreshInterval?: string;
  readonly data?: ExternalSecretData[];
  readonly dataFrom?: ExternalSecretDataFromRemoteRef[];
}

export interface ExternalSecretProps {
  readonly metadata: k8s.ObjectMeta;
  readonly spec: ExternalSecretSpec;
}

export class ExternalSecretV1Beta1 extends ApiObject {
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'external-secrets.io/v1beta1',
    kind: 'ExternalSecret',
  };
  /**
   * @param props initialization props
   */
  public static manifest(props: ExternalSecretProps): any {
    return {
      ...ExternalSecretV1Beta1.GVK,
      ...props,
    };
  }

  /**
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: ExternalSecretProps) {
    super(scope, id, ExternalSecretV1Beta1.manifest(props));
  }
}
