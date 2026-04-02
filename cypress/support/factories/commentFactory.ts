export interface AiMetadata {
  readonly tags: string[];
  readonly similarityHash: string;
  readonly aiCoreSimilarityHash: string;
  readonly safetyScore: number;
  readonly isUnsafe: boolean;
}

export enum CommentStatus {
  Accepted = 0,
  Pending = 1,
  Rejected = 2,
  Hidden = 3,
  Deleted = 10,
  WillBeDeleted = 11,
  WillBeAccepted = 12,
  DeleteError = 13,
  HiddenByParent = 14,
  WillBeHidden = 15,
  WillBeUnhidden = 16,
  HideError = 17,
  UnhideError = 18,
}

export enum AiAnalysisStatus {
  NotAnalyzed = 0,
  Analyzed = 1,
}

export interface BaseCommentEntity {
  readonly id: string;
  readonly tenantId: string;
  readonly text: string;
  readonly timestamp: string;
  readonly username: string;
  readonly status: CommentStatus;
  readonly aiAnalysisStatus: AiAnalysisStatus;
  readonly isReply: boolean;
  readonly aiMetadata: AiMetadata;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly createdBy: string;
  readonly modifiedBy: string;
}

export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const DEFAULT_AI_METADATA: AiMetadata = {
  tags: [],
  similarityHash: '',
  aiCoreSimilarityHash: '',
  safetyScore: -1,
  isUnsafe: false,
};
