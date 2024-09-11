import Card from "./Card.jsx";

export default function Posts({posts}) {
    
  return (
    
    <div className="flex flex-wrap gap-4">
       {posts.map((p)=>{
        return <Card post={p} key={p._id}/>
       })}
  </div>
  )
}
