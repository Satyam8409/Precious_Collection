import { type CommunityPost } from "../../hooks/useCommunity";
import { CommunityCard } from "./CommunityCard";

type CommunityGridProps = {
  posts: CommunityPost[];
  fallbackImage: string;
};

export const CommunityGrid = ({ posts, fallbackImage }: CommunityGridProps) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => {
        const imageSource = post.image || fallbackImage;
        return <CommunityCard key={post.id} post={post} imageSource={imageSource} />;
      })}
    </div>
  );
};