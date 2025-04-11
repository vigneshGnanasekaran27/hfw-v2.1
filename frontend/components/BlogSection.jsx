"use client";
import React, { useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import { blogPosts } from "../data/blogPosts";
import { Rss } from "lucide-react";

const LandingBlogSection = () => {
  const [visiblePosts, setVisiblePosts] = useState(5);

  const handleViewMore = () => {
    // Redirect to full blog page
    window.location.href = "/blog";
  };

  return (
    // <section id="blog" className="py-16 bg-gray-50">
    <section id="blog" className="py-16  mt-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-fuchsia-100 rounded-full mb-6 shadow-sm border border-fuchsia-200">
            <Rss className="w-8 h-8 text-fuchsia-600  " />
          </div>
          <h2 className="text-3xl font-bold  mb-4">Latest Fitness Insights</h2>
          <p className="  max-w-2xl mx-auto">
            Stay informed with expert insights, workout tips, and nutrition
            advice to support your fitness journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.slice(0, visiblePosts).map((post) => (
            <div
              key={post.id}
              className="  rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl dark:shadow-[0px_4px_12px_rgba(102,126,234,0.4)]"
            >
              <Link href={`/blog/${post.id}`}>
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image.src}
                    alt={post.title}
                    layout="fill"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold   mb-3">{post.title}</h3>
                  <p className="  mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm  0">{post.author}</span>
                      <span className="mx-2  ">|</span>
                      <span className="text-sm  ">{post.date}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                      Read More
                    </button>
                  </div>
                  {/* Topics */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.topics.map((topic) => (
                      <span
                        key={topic}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={handleViewMore}
            className="px-6 py-3 bg-white text-blue-700 rounded-lg border border-blue-200 flex items-center mx-auto justify-center gap-2 hover:bg-blue-50 transition-colors shadow-sm
              dark:bg-black dark:text-blue-300 dark:border-blue-800 dark:hover:bg-gray-900"
          >
            View All Blog Posts
          </button>
        </div>
      </div>
    </section>
  );
};

export default LandingBlogSection;
