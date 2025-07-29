"use client";
import { FormEvent, startTransition, useActionState, useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PenTool, Image, Type, FolderOpen, FileText, Save } from "lucide-react";
import "react-quill-new/dist/quill.snow.css";
import { createArticles } from "@/actions/create-article";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
 
export default function CreateArticles() {
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [formState, action, isPending] = useActionState(createArticles, {
    errors: {},
  });
 
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("content", content);
    formData.append("category", selectedCategory);

    startTransition(() => {
      action(formData);
    });
  };
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50/30 to-gray-50/30 dark:from-zinc-950/30 dark:to-gray-950/30 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <PenTool className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            Create New Article
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Share your thoughts and expertise with the world
          </p>
        </div>

        <Card className="border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm shadow-sm">
          <CardHeader className="border-b border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-800/20">
            <CardTitle className="text-xl text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <FileText className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              Article Details
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title Input */}
              <div className="space-y-3">
                <Label htmlFor="title" className="text-zinc-700 dark:text-zinc-300 font-medium flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Article Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter an engaging title for your article..."
                  className="border-zinc-200/60 dark:border-zinc-700/60 bg-white dark:bg-zinc-900/50 focus:border-blue-300 dark:focus:border-blue-600 focus:ring-blue-200/20 dark:focus:ring-blue-800/20"
                />
                {formState.errors.title && (
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                    <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                    {formState.errors.title}
                  </div>
                )}
              </div>

              {/* Category Selection */}
              <div className="space-y-3">
                <Label htmlFor="category" className="text-zinc-700 dark:text-zinc-300 font-medium flex items-center gap-2">
                  <FolderOpen className="h-4 w-4" />
                  Category
                </Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-zinc-200/60 dark:border-zinc-700/60 bg-white dark:bg-zinc-900/50 focus:border-blue-300 dark:focus:border-blue-600 focus:ring-blue-200/20 dark:focus:ring-blue-800/20">
                    <SelectValue placeholder="Choose a category for your article" />
                  </SelectTrigger>
                  <SelectContent className="border-zinc-200/60 dark:border-zinc-700/60 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm">
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="productivity">Productivity</SelectItem>
                    <SelectItem value="career">Career</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" name="category" value={selectedCategory} />
                {formState.errors.category && (
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                    <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                    {formState.errors.category}
                  </div>
                )}
              </div>

              {/* Featured Image */}
              <div className="space-y-3">
                <Label htmlFor="featuredImage" className="text-zinc-700 dark:text-zinc-300 font-medium flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Featured Image
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">(Max 5MB)</span>
                </Label>
                <div className="relative">
                  <Input
                    id="featuredImage"
                    name="featuredImage"
                    type="file"
                    accept="image/*"
                    className="border-zinc-200/60 dark:border-zinc-700/60 bg-white dark:bg-zinc-900/50 focus:border-blue-300 dark:focus:border-blue-600 focus:ring-blue-200/20 dark:focus:ring-blue-800/20 file:mr-4 file:py-1 file:px-5 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-950/30 dark:file:text-blue-400 "
                  />
                </div>
                {formState.errors.featuredImage && (
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                    <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                    {formState.errors.featuredImage}
                  </div>
                )}
              </div>

              {/* Content Editor */}
              <div className="space-y-3">
                <Label className="text-zinc-700 dark:text-zinc-300 font-medium flex items-center gap-2">
                  <PenTool className="h-4 w-4" />
                  Article Content
                </Label>
                <div className="border border-zinc-200/60 dark:border-zinc-700/60 rounded-lg overflow-hidden bg-white dark:bg-zinc-900/50">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    style={{
                      backgroundColor: 'transparent',
                    }}
                    modules={{
                      toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['blockquote', 'code-block'],
                        ['link', 'image'],
                        ['clean']
                      ],
                    }}
                    
                    placeholder="Start writing your article content here..."
                  />
                </div>
                {formState.errors.content && (
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                    <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                    {formState.errors.content[0]}
                  </div>
                )}
              </div>

              {/* Form Errors */}
              {formState.errors.formErrors && (
                <div className="border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-950/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="font-medium text-sm">
                      {formState.errors.formErrors}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-zinc-200/50 dark:border-zinc-800/50">
                <Button 
                  type="button" 
                  variant="outline"
                  className="border-zinc-200/60 dark:border-zinc-700/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                >
                  Cancel
                </Button>
                <Button 
                  disabled={isPending} 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-sm"
                >
                  {isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Publish Article
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}