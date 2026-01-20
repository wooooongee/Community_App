interface User {
  id: number;
  nickname: string;
  imageUri?: string;
  avatarConfig?: LoreleiAvatarConfig;
}

// DiceBear Lorelei 아바타 설정
interface LoreleiAvatarConfig {
  seed: string;
  flip?: boolean;
  backgroundColor?: string[];
  // Lorelei 스타일 옵션
  beard?: string[];
  beardProbability?: number;
  earrings?: string[];
  earringsProbability?: number;
  eyebrows?: string[];
  eyes?: string[];
  freckles?: string[];
  frecklesProbability?: number;
  glasses?: string[];
  glassesProbability?: number;
  hair?: string[];
  head?: string[];
  mouth?: string[];
  nose?: string[];
}

interface Profile extends User {
  email: string;
  introduce?: string;
  avatarConfig: LoreleiAvatarConfig;
}

interface ImageUri {
  id?: number;
  uri: string;
}
interface VoteOption {
  id?: number;
  displayPriority: number;
  content: string;
}

interface CreatePostDto {
  title: string;
  description: string;
  imageUris: ImageUri[];
  voteTitle?: string;
  voteOptions?: VoteOption[];
  deleteVote?: boolean;
}

interface CreateCommentDto {
  content: string;
  postId: number;
  parentCommentId?: number;
}

interface CreateVoteDto {
  postId: number;
  voteOptionId: number;
}

type PostVoteOption = VoteOption & { userVotes: { userId: number }[] };

interface PostVote {
  id: number;
  title: string;
  options: PostVoteOption[];
}
interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user: User;
  isDeleted: boolean;
}

interface PostComment extends Comment {
  replies: Comment[];
}

interface Post {
  id: number;
  userId: number;
  title: string;
  description: string;
  createdAt: string;
  author: User;
  imageUris: ImageUri[];
  likes: { userId: number }[];
  hasVote: boolean;
  voteCount: number;
  commentCount: number;
  viewCount: number;
  votes?: PostVote[];
  comments?: PostComment[];
}

export type {
  Comment,
  CreateCommentDto,
  CreatePostDto,
  CreateVoteDto,
  ImageUri,
  LoreleiAvatarConfig,
  Post,
  PostVote,
  PostVoteOption,
  Profile,
  VoteOption,
};
