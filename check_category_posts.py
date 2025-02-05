import asyncio
from src.shared.api.posts_service import postsService  # postsService import 경로 수정

async def check_category_posts(category):
    try:
        posts = await postsService.getPostsByCategory(category)
        if posts:
            print(f"카테고리 '{category}': 게시글 있음 ({len(posts)}개)")
            # 게시글 제목 출력 (최대 3개)
            for post in posts[:3]:
                print(f"  - {post['title']}")
        else:
            print(f"카테고리 '{category}': 게시글 없음")
    except Exception as e:
        print(f"카테고리 '{category}' 확인 중 오류 발생: {e}")

async def main():
    categories = [
        "report", "economy", "industry", "company", "policy", "press", "people", "media", "schedule",
        "industry/medical", "industry/pharma", "industry/devices", "industry/cosmetics", "industry/health-food", "industry/digital-health",
        "company/medical", "company/pharma", "company/devices", "company/cosmetics", "company/health-food", "company/digital-health",
        "policy/medical", "policy/pharma", "policy/devices", "policy/cosmetics", "policy/health-food", "policy/digital-health",
        "press/medical", "press/pharma", "press/devices", "press/cosmetics", "press/health-food", "press/digital-health",
        "media/news", "media/magazine", "media/books",
        "schedule/yearly", "schedule/monthly"
    ]
    for category in categories:
        await check_category_posts(category)

if __name__ == "__main__":
    asyncio.run(main())
