export const idlFactory = ({ IDL }) => {
  const PostId = IDL.Nat;
  const Post = IDL.Record({
    'id' : PostId,
    'title' : IDL.Text,
    'body' : IDL.Text,
    'author' : IDL.Text,
    'timestamp' : IDL.Int,
  });
  return IDL.Service({
    'addPost' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [PostId], []),
    'deletePost' : IDL.Func([PostId], [IDL.Bool], []),
    'getPosts' : IDL.Func([], [IDL.Vec(Post)], ['query']),
    'updatePost' : IDL.Func([PostId, IDL.Text, IDL.Text], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
