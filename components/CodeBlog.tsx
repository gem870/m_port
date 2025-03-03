"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, animate } from "framer-motion";
import DOMPurify from "dompurify";
import Link from "next/link";

const MOGODB_URL = process.env.NEXT_PUBLIC_BACKEND_BLOG_URL as string;

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const CodeBlog = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const color = useMotionValue(COLORS_TOP[0]);
  const borderColor = useMotionValue(COLORS_TOP[0]);
  const [currentColor, setCurrentColor] = useState(COLORS_TOP[0]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${MOGODB_URL}/api/blogs`);
        if (!response.ok) throw new Error("Failed to fetch");
  
        const data = await response.json();
        console.log("API Response:", data); // Log the full response
  
        setProjects(data.projects || data); // Adjust if needed
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const controls = animate(color, COLORS_TOP, { ease: "easeInOut", duration: 10, repeat: Infinity, repeatType: "mirror" });
    const borderControls = animate(borderColor, COLORS_TOP, { ease: "easeInOut", duration: 10, repeat: Infinity, repeatType: "mirror" });

    return () => {
      controls.stop();
      borderControls.stop();
    };
  }, []);

  useMotionValueEvent(color, "change", (latest) => {
    setCurrentColor(latest);
  });

  const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);
  const getMediaUrl = (file: string | undefined) => (file ? `${MOGODB_URL}${file}` : "");
  
  

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.9 }}
      className="pb-[12%] text-[#2df7ad] pt-12"
    >
      <div className="mx-auto shadow-xl">
        <motion.section id="portfolio" className="pt-14 text-[#10c2aa]">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8">
            <div className="px-2">
              <h2 className="text-5xl font-bold">
                Code<span className="text-gray-500"> Blog</span>
              </h2>
              <h4 className="mb-8 text-gray-400 text-lg">Explore my codes and feel free to run them. Each section of the blogs has a snipped details on how the code works.</h4>

              {projects.length === 0 ? (
                <p className="text-[#10c2aa]">Please reload the page after 20sec.</p>
              ) : (
                projects.map((project) => (
                  <div
                    key={project._id}
                    onClick={() => setSelectedProject(selectedProject === project._id ? null : project._id)}
                    className="cursor-pointer py-2 group"
                  >
                    <p className="text-gray-400 text-md ">
                      {project.createdAt
                        ? new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date(project.createdAt))
                        : "Date N/A"}
                    </p>
                    <h3
                      className={`text-2xl font-semibold transition-colors duration-300 ${
                        selectedProject === project._id ? "text-gray-600" : "group-hover:text-gray-400"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={selectedProject === project._id ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-b-2 border-gray-400 my-4"></div>
                      <p className="text-gray-500" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.description) }} />
                      <Link href={`/blogpage/${project._id}`}>
                      <motion.button
                        style={{ border: `2px solid`, borderColor: borderColor, boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.3)" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex w-fit items-center p-1 gap-2 rounded-md my-4 ml-2 text-[#22ac99] transition-all"
                      >
                        Review
                      </motion.button>
                      </Link>
                    </motion.div>
                  </div>
                ))
              )}
            </div>

            {selectedProject !== null && (
              <motion.div
                key={selectedProject}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex h-[40%]"
              >
                {(() => {
                  const selectedMedia = projects.find((p) => p._id === selectedProject)?.file;

                  if (!selectedMedia) return null;

                  return isVideo(selectedMedia) ? (
                    <video
                      src={getMediaUrl(selectedMedia)}
                      controls
                      className="rounded-md shadow-lg transition-opacity duration-500 w-full h-auto"
                    />
                  ) : (
                    <div>
                      <img
                      src={getMediaUrl(selectedMedia)}
                      alt={projects.find((p) => p._id === selectedProject)?.title || ""}
                      className="rounded-md shadow-lg transition-opacity duration-500"
                      width="700"
                      height="700"
                    />
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </div>
        </motion.section>
      </div>
    </motion.section>
  );
};

export default CodeBlog;
