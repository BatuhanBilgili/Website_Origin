import React, { useEffect, useState } from 'react'

// Medium RSS en son yazılan 10 yazıyı getiriyor
// Eğer daha fazla yazı isterseniz RSS bunun için uygun değil
const MEDIUM_RSS = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@batubilgili1907.bb';

const Medium = ({isDarkMode}) => {
  const [posts, setPosts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(MEDIUM_RSS)
      .then(res => res.json())
      .then(data => {
        if (data.items) setPosts(data.items);
      });
  }, []);

  // Açıklamadaki img etiketlerini temizliyoruz çift olarak gözükmemesi için
  const cleanDescription = (desc) =>
    desc.replace(/<img[^>]*>/g, '');

  const visiblePosts = showAll ? posts : posts.slice(0, 6);

  // Show Less'e tıklandığında smooth scroll ile yukarı kaydırma işlemi yapıyoruz bunu eklemezsek direkt olarak olduğu yerde kalıyor
  const handleShowAll = () => {
    if (showAll) {
      setShowAll(false);
      setTimeout(() => {
        document.getElementById('medium')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setShowAll(true);
    }
  };

  return (
    <div id='medium' className="max-w-5xl mx-auto py-16 px-4 scroll-mt-30">
      <h2 className="text-center text-5xl font-Ovo mb-4">Medium Posts</h2>
      <h4 className='text-center mb-2 text-lg font-Ovo'>
        Here you can find my latest articles on data science, technology, and topics I am passionate about.
      </h4>
      <div className="grid grid-cols- sm:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
        {visiblePosts.map((post) => (
          <a
            key={post.guid}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              block 
              rounded-2xl 
              overflow-hidden 
              shadow-lg 
              transition 
              duration-500 
              ease-in-out 
              group 
              transform 
              hover:-translate-y-1 
              ${isDarkMode ? 'border border-white' : 'border border-gray-200'}
            `}
            style={{
              transition: 'all 0.4s ease-in-out',
              boxShadow: isDarkMode ? '0 0 0 0.5px white' : '0 0 0 0.5px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = isDarkMode
                ? '4px 4px 8px rgba(255,255,255,0.08)'
                : '4px 4px 12px rgba(0,0,0,0.12)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = isDarkMode
                ? '0 0 0 0.5px white'
                : '0 0 0 0.5px rgba(0,0,0,0.1)'
            }}
            
          >
            <div className="aspect-video bg-gray-100">
              <img
                src={post.thumbnail || (post.content.match(/<img[^>]+src="([^">]+)"/)?.[1])}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h3 className={`font-semibold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {post.title}
              </h3>
              <p
                className={`${isDarkMode ? 'text-white/80' : 'text-gray-600'} text-sm line-clamp-3`}
                dangerouslySetInnerHTML={{ __html: cleanDescription(post.description) }}
              />
            </div>
          </a>
        ))}
      </div>
      {posts.length > 6 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleShowAll}
            className={`px-6 py-2 rounded-full transition duration-300 
              ${isDarkMode 
                ? 'bg-[#18181b] text-white border border-white hover:bg-[#2a2a2e]' 
                : 'bg-black text-white hover:bg-gray-800'
              }`}
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Medium