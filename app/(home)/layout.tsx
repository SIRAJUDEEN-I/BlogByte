import  Navbar  from "@/components/home/header/navbar";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
 
  const user = await currentUser();
  console.log('Current user:', user?.id, user?.fullName)
  
  if (!user) {
    // Don't redirect if user is not logged in, just show the page without creating user
    return (

      <div>
        <Navbar />
        {children}
      </div>
    );
  }
  
  try {
    const loggedInUser = await prisma.user.findUnique({
      where: { clerkUserId: user.id },
    });
    
    if (!loggedInUser) {
      console.log('Creating new user for:', user.id);
      
      const newUser = await prisma.user.create({
        data: {
          name: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Anonymous User',
          clerkUserId: user.id,
          email: user.emailAddresses[0].emailAddress,
          imageUrl: user.imageUrl,
        },
      });
      
      console.log('User created successfully:', newUser.id);
    } else {
      console.log('User already exists:', loggedInUser.id);
    }
  } catch (error) {
    console.error('Database error:', error);
    // Don't throw error, just log it to prevent page crash
  }
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default layout;