import PaginationControls from "@/components/shared/PaginationControls";

// interface Post {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// } : Promise<Post[]> 

async function getData(){
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    cache: "force-cache",
  });
  if(!res.ok){
    throw new Error('Failed to fetch data')
  }
  return res.json();
}

// const data = [
//   'entry 1',
//   'entry 2',
//   'entry 3',
//   'entry 4',
//   'entry 5',
//   'entry 6',
//   'entry 7',
//   'entry 8',
//   'entry 9',
//   'entry 10',
// ]

export default async function Home(
    { searchParams} : 
    { searchParams: {[key: string]: string | string[] | undefined}
  }) {
  const posts = await getData();
  const page = searchParams['page'] ?? '1'
  const per_page = searchParams['per_page'] ?? '10'
  
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const entries = posts.slice(start, end);
  
  // ======================================================= //
  
  
  return (
    <div className="p-5">
      <h1 className="mb-5">home page</h1>
      {entries.map((post: any)=>(
        <div key={post.id} className="flex gap-3">
          <p>{post.id}</p>
          <p >{post.title}</p>
        </div>
        
      ))}
      
      {/* <div className="flex w-full gap-3 text-white bg-black">
        <h1>userId</h1>
        <h1>id</h1>
        <h1>title</h1>
        <h1>body</h1>
      </div> */}
      <PaginationControls 
        hasNextPage = {end < posts.length}
        hasPrevPage = {start > 0}
      />
    </div>
  );
}
