export {
  type AiMetadata,
  type BaseCommentEntity,
  CommentStatus,
  AiAnalysisStatus,
  uuid,
  DEFAULT_AI_METADATA,
} from './commentFactory';

export {
  type InstagramCommentEntity,
  buildComment as buildInstagramComment,
  buildComments as buildInstagramComments,
} from './instagramCommentFactory';
