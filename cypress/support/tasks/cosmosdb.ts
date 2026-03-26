import { CosmosClient, type SqlParameter } from '@azure/cosmos';
import { DefaultAzureCredential } from '@azure/identity';

let client: CosmosClient | null = null;

function getClient(endpoint: string): CosmosClient {
  if (!client) {
    const credential = new DefaultAzureCredential();
    client = new CosmosClient({ endpoint, aadCredentials: credential });
  }
  return client;
}

function getContainer(
  endpoint: string,
  databaseName: string,
  containerName: string,
) {
  return getClient(endpoint).database(databaseName).container(containerName);
}

export interface CosmosDbConfig {
  endpoint: string;
  databaseName: string;
  containerName: string;
}

export interface SeedOptions extends CosmosDbConfig {
  items: Record<string, unknown>[];
}

export interface ClearOptions extends CosmosDbConfig {
  ids: { id: string; partitionKey: string }[];
}

export interface QueryOptions extends CosmosDbConfig {
  query: string;
  parameters?: SqlParameter[];
}

export async function seedItems(options: SeedOptions): Promise<null> {
  const container = getContainer(
    options.endpoint,
    options.databaseName,
    options.containerName,
  );

  for (const item of options.items) {
    await container.items.upsert(item);
  }

  return null;
}

export async function clearItems(options: ClearOptions): Promise<null> {
  const container = getContainer(
    options.endpoint,
    options.databaseName,
    options.containerName,
  );

  for (const entry of options.ids) {
    try {
      await container.item(entry.id, entry.partitionKey).delete();
    } catch (error: unknown) {
      const statusCode = (error as { code?: number }).code;
      if (statusCode !== 404) throw error;
    }
  }

  return null;
}

export async function queryItems(
  options: QueryOptions,
): Promise<Record<string, unknown>[]> {
  const container = getContainer(
    options.endpoint,
    options.databaseName,
    options.containerName,
  );

  const { resources } = await container.items
    .query({
      query: options.query,
      parameters: options.parameters ?? [],
    })
    .fetchAll();

  return resources;
}
