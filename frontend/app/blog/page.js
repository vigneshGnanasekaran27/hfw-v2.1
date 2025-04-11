"use client";
import React, { useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import { blogPosts, searchBlogs } from "../../data/blogPosts";

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredPosts(searchBlogs(query));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Fitness Blog</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore insights, tips, and inspiration for your fitness journey
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-12 max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search blogs by title or topic..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
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
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-500">
                        {post.author}
                      </span>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    <div className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                      Read More
                    </div>
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
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600 text-xl">
              No blogs found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
