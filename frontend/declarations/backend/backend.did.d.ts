import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Post {
  'id' : PostId,
  'title' : string,
  'body' : string,
  'author' : string,
  'timestamp' : bigint,
}
export type PostId = bigint;
export interface _SERVICE {
  'addPost' : ActorMethod<[string, string, string], PostId>,
  'deletePost' : ActorMethod<[PostId], boolean>,
  'getPosts' : ActorMethod<[], Array<Post>>,
  'updatePost' : ActorMethod<[PostId, string, string], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
