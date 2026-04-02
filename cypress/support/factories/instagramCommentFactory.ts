import {
  type BaseCommentEntity,
  type AiMetadata,
  CommentStatus,
  AiAnalysisStatus,
  uuid,
  DEFAULT_AI_METADATA,
} from './commentFactory';

export interface InstagramCommentEntity extends BaseCommentEntity {
  readonly pageId: string;
  readonly postId: string;
  readonly instagramPostId: string;
  readonly instagramCommentId: string;
  readonly instagramBusinessAccountId: string;
  readonly fromUserId: string;
}

const FIXED_FIELDS = {
  pageId: '866087219920815',
  postId: '26af3d15-40fc-488c-aa08-ef2d43e3133c',
  instagramPostId: '17942501837730266',
  instagramBusinessAccountId: '17841478140478481',
  tenantId: '834e3ba5-e8ed-42ab-b158-147e15e8e836',
} as const;

export function buildComment(
  overrides: Partial<InstagramCommentEntity> = {},
): InstagramCommentEntity {
  const now = new Date().toISOString();
  const id = uuid();

  return {
    id,
    ...FIXED_FIELDS,
    instagramCommentId: uuid(),
    text: `Mock comment ${id.slice(0, 8)}`,
    timestamp: now,
    username: 'mock-user',
    fromUserId: '1638421534064224',
    status: CommentStatus.Pending,
    aiAnalysisStatus: AiAnalysisStatus.Analyzed,
    isReply: false,
    aiMetadata: { ...DEFAULT_AI_METADATA },
    createdAt: now,
    updatedAt: now,
    createdBy: 'SYSTEM',
    modifiedBy: 'SYSTEM',
    ...overrides,
  };
}

export function buildComments(
  count: number,
  overrides: Partial<InstagramCommentEntity> = {},
): InstagramCommentEntity[] {
  return Array.from({ length: count }, () => buildComment(overrides));
}
