export default function Slider() {
    const data = [
        "./assets/blog.jpg",
    ];
    return (
        <div className="relative">
            {/* Text Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black bg-opacity-40">
                <div className="text-center space-y-6">
                    <h2 className="text-3xl md:text-4xl font-light text-white tracking-wider animate-fade-in">
                        Let's Write Something...
                    </h2>
                    <h1 className="text-6xl md:text-8xl font-bold text-white tracking-wider animate-slide-up">
                        VIBELOG
                    </h1>
                </div>
            </div>

            {/* Background Image */}
            <div className="relative">
                <img 
                    className="w-full h-[70vh] object-cover" 
                    src={data[0]} 
                    alt="Blog Banner" 
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </div>
    );
}
