import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Post from "../components/Post";
import {sortByDate} from "../utils";

export default function Home({posts}) {
  return (
    <div>
      <Head>
        <title>MarkDown Blog</title>
      </Head>
      <div className="posts">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  //get files from Post folder
  const files = fs.readdirSync(path.join("posts"));
  //Get Slug and details from posts
  const posts = files.map((filename) => {
    //create Slug
    const slug = filename.replace(".md", "");

    //get details
    const MarkDownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const {data: frontmatter} = matter(MarkDownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
