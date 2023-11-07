import PaginationControls from "@/components/shared/PaginationControls";

// interface Post {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// } : Promise<Post[]>

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getData();
  const page = searchParams["page"] ?? "1";
  // must always have the same default with PaginationControls
  const per_page = searchParams["per_page"] ?? "10";

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const entries = data.slice(start, end);
  const totalData = Math.ceil(data.length / Number(per_page));

  // ======================================================= //

  return (
    <div className="p-5">
      <div className="flex justify-between mb-2">
        <h1 className="mb-5">home page</h1>
        <PaginationControls
          hasNextPage={end < data.length}
          hasPrevPage={start > 0}
          totalPages={totalData}
        />
      </div>

      <table className="border-2 border-black">
        <thead>
          <tr className="bg-black text-white text-left">
            <th className="w-[10vw]  p-3">User Id</th>
            <th className="w-[10vw]  p-3">id</th>
            <th className="w-[20vw]  p-3">title</th>
            <th className="w-[35vw]  p-3">body</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((post: any) => (
            <tr key={post.id} className="">
              <td className="p-3 ">{post.userId}</td>
              <td className="p-3 ">{post.id}</td>
              <td className="p-3 ">{post.title}</td>
              <td className="p-3 line-clamp-3">{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
