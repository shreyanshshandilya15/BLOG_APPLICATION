
export default function Slider() {
   
    const data=[
        "./assets/blog.jpg",
    ]
  return (
    <div className="flex-col">
        <div className="text-center">Let's Write Something...</div>
        <div className="text-center text-8xl">BLOG</div>
        <img  className="max-h-screen w-full object-cover"src={data[0]} alt=" "/>
        <hr style={{height:"20px"}}/>
    </div>
  )
}
