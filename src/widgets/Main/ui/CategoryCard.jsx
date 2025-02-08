import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../../../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { ScrollArea } from "../../../components/ui/scroll-area";

const CategoryCard = ({ category, posts, onOpenPostModal, latestPost, isReport, reportImage }) => {
  return (
    <Card className="hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle>
          <Link 
            to={`/category/${category}`} 
            className="inline-block text-gray500 hover:text-primary-blue transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-blue after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isReport ? (
          <div className="overflow-hidden relative p-4 bg-white rounded-lg shadow-md">
            <a className="standard-format-icon" title="양자 컴퓨팅으로 신약 후보 물질 발굴에 성공">
              <img
                src={reportImage}
                alt="양자 컴퓨팅으로 신약 후보 물질 발굴에 성공"
                className="w-[300px] h-[150px] tablet:w-[768px] tablet:h-[384px] desktop:w-[1000px] desktop:h-[500px] object-cover fadeover wp-post-image lazyloaded"
              />
            </a>
            <div className="bg-gray200 p-4 rounded-md">
              <h4 className="text-xl font-mont mb-2 text-gray500">
                <a>양자 컴퓨팅으로 신약 후보 물질 발굴에 성공</a>
              </h4>
              <p className="text-gray400 text-sm mb-2 font-nanum">2025년 2월 2일</p>
              <p className="text-gray400 line-clamp-3 font-nanum">
                최근 Nature Biotechnology에는 양자 컴퓨팅을 활용해서 신약 후보 물질을 발굴하는 데 성공했다는 논문이 실렸습니다. 특히, 이 연구에서는 소위 'undruggable', 즉 약을 만들기 불가능하다고 알려져 있는 극히 어려운 암 관련 타겟인 KRAS를 저해하는 후보 물질 2개를 발굴했습니다.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden relative p-4 bg-white rounded-lg shadow-md">
            {latestPost ? (
              <div className="bg-gray300 p-4 rounded-md">
                <h4 className="text-xl font-mont mb-2 text-gray500">{latestPost.title}</h4>
                <p className="text-gray400 text-sm mb-2 font-nanum">{latestPost.date}</p>
                <div className="text-gray400 line-clamp-3 font-nanum" dangerouslySetInnerHTML={{ __html: latestPost.content }} />
                {latestPost.image_url && (
                  <img 
                    src={latestPost.image_url} 
                    alt={latestPost.title} 
                    className="w-[300px] h-[150px] tablet:w-[768px] tablet:h-[384px] desktop:w-[1000px] desktop:h-[500px] object-cover"
                  />
                )}
              </div>
            ) : (
              <div className="italic text-gray-500 font-nanum">
                아직 작성된 글이 없습니다.
              </div>
            )}
          </div>
        )}

        <div className="mt-4">
          <div className="mb-2 font-bold flex justify-between items-center">
            <span>글 목록</span>
            <Button
              onClick={() => onOpenPostModal(category)}
              size="sm"
              className="font-gmarket"
            >
              글쓰기
            </Button>
          </div>
          {posts.length === 0 ? (
            <div className="italic text-gray-500">
              글이 없습니다.
            </div>
          ) : (
            <ScrollArea className="h-[300px] w-full">
              <ul className="list-none p-0 m-0 space-y-2">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="py-2 border-b border-gray-200"
                >
                  <div className="font-bold break-words group">
                    <Link 
                      to={`/article/${post.id}`}
                      className="text-gray-800 hover:text-primary-blue transition-colors duration-300 group-hover:opacity-90"
                    >
                      {post.title}
                    </Link>
                  </div>
                  <div className="text-sm text-gray-600 break-words">
                    {post.date}
                  </div>
                  {post.image_url && (
                    <img 
                      src={post.image_url} 
                      alt={post.title} 
                      className="w-[300px] h-[150px] tablet:w-[768px] tablet:h-[384px] desktop:w-[1000px] desktop:h-[500px] object-cover mt-2"
                    />
                  )}
                </li>
              ))}
              </ul>
            </ScrollArea>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
