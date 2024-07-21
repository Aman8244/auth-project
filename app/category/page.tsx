"use client";
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import { useUser, useCategories } from '@/hooks/customhooks'; // Adjust the path as necessary
import { QueryClient, QueryClientProvider } from 'react-query';

interface Categories {
  id: number;
  title: string;
}

interface User {
  id: number;
  name: string;
  categories: Categories[];
}

const CategoryContent = () => {
  const router = useRouter();
  const query = useSearchParams();
  const pageNo = query.get("page");
  const [user, setUser] = useState<User | null>(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  const { data: userData } = useUser(token);
  const { data: categoriesData } = useCategories(pageNo);

  useEffect(() => {
    if (!token) {
      router.push("/");
    } else {
      setUser(userData!);
    }
  }, [userData, token, router]);

  const updateCategory = async (target: any, id: number, title: string) => {
    if (!token) return;

    try {
      if (target.checked) {
        await axios.put("/api/categories", { id, title }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(prevUser => ({
          ...prevUser!,
          categories: [...(prevUser?.categories || []), { id, title }]
        }));
      } else {
        await axios.delete(`/api/categories?id=${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(prevUser => ({
          ...prevUser!,
          categories: (prevUser?.categories || []).filter(cat => cat.id !== id)
        }));
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const isChecked = (categoryId: number) => {
    return user?.categories.some(cat => cat.id === categoryId) || false;
  };

  return (
    <main>
      <header>
        <Navbar />
      </header>
      <section>
        <div className='flex flex-row my-2'>
          <div className='w-4/5 md:w-11/12'>
            <h1 className='text-xl font-semibold px-4'>
              Hi {user && user.name} !!
            </h1>
          </div>
          <div>
            <Button onClick={() => {
              localStorage.removeItem("token");
              router.push("/");
            }}>Logout</Button>
          </div>
        </div>
      </section>
      <section>
        <div>
          <div className='flex justify-center items-center'>
            <Card className='md:w-2/6'>
              <CardHeader>
                <CardTitle>
                  Please Mark your interest!
                </CardTitle>
                <CardDescription>
                  We will keep you notified
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <div>
                    <p>
                      My saved interests!
                    </p>
                  </div>
                  <div>
                    {categoriesData?.map((el) => (
                      <div key={el.id}>
                        <div className='flex space-x-3 my-2'>
                          <input
                            type='checkbox'
                            onChange={(e) => updateCategory(e.target, el.id, el.title)}
                            id={`${el.id}`}
                            checked={isChecked(el.id)}
                          />
                          <label htmlFor={`${el.id}`}>{el.title}</label>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href={(pageNo !== "1") ? `/category?page=${parseInt(pageNo!) - 1}` : `#`} />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href={(parseInt(pageNo!) !== 1) ? `/category?page=${parseInt(pageNo!) - 1}` : `#`}>{parseInt(pageNo!) - 1}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive>
                            {pageNo}
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href={(parseInt(pageNo!) <= 16) ? `/category?page=${parseInt(pageNo!) + 1}` : `#`}>{parseInt(pageNo!) + 1}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href={(parseInt(pageNo!) <= 16) ? `/category?page=${parseInt(pageNo!) + 1}` : `#`} />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

const queryClient = new QueryClient();

const Category = () => (
  <QueryClientProvider client={queryClient}>
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryContent />
    </Suspense>
  </QueryClientProvider>
);

export default Category;
