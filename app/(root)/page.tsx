interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function getData(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "force-cache",
  });
  return res.json();
}

export default async function Home() {
  const posts = await getData();
  return (
    <div className="p-5">
      <h1 className="mb-5">home page</h1>
      <div className="flex w-full gap-3 text-white bg-black">
        <h1>userId</h1>
        <h1>id</h1>
        <h1>title</h1>
        <h1>body</h1>
      </div>
      {posts.map((post) => {
        return (
          <div key={post.id} className="grid grid-cols-4 w-auto">
            <h1 className="col-start-1">{post.userId}</h1>
            <h1>{post.id}</h1>
            <h1>{post.title}</h1>
            <h1 className="line-clamp-2 w-[30vw]">{post.body}</h1>
          </div>
        );
      })}
    </div>
  );
}
