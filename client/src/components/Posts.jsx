import Card from "./Card.jsx";

export default function Posts({posts}) {
    
  return (
    
    <div className="flex w-4/5 flex-wrap">
       {posts.map((p)=>{
        return <Card post={p} key={p._id}/>
       })}
  </div>
  )
}
