import Bool "mo:base/Bool";
import Int "mo:base/Int";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Time "mo:base/Time";
import List "mo:base/List";
import Nat "mo:base/Nat";
import Option "mo:base/Option";

actor {
  type PostId = Nat;

  type Post = {
    id: PostId;
    title: Text;
    body: Text;
    author: Text;
    timestamp: Int;
  };

  stable var nextId : PostId = 0;
  stable var posts : List.List<Post> = List.nil();

  public func addPost(title: Text, body: Text, author: Text) : async PostId {
    let id = nextId;
    nextId += 1;
    let newPost : Post = {
      id = id;
      title = title;
      body = body;
      author = author;
      timestamp = Time.now();
    };
    posts := List.push(newPost, posts);
    id
  };

  public query func getPosts() : async [Post] {
    List.toArray(posts)
  };

  public func updatePost(id: PostId, title: Text, body: Text) : async Bool {
    posts := List.map<Post, Post>(posts, func (post) {
      if (post.id == id) {
        {
          id = post.id;
          title = title;
          body = body;
          author = post.author;
          timestamp = Time.now();
        }
      } else {
        post
      }
    });
    true
  };

  public func deletePost(id: PostId) : async Bool {
    let (deletedPosts, remainingPosts) = List.partition<Post>(posts, func(post) { post.id != id });
    if (List.isNil(deletedPosts)) {
      false
    } else {
      posts := remainingPosts;
      true
    }
  };
}
