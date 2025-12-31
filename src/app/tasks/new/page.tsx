'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Block from '../../components/layout/block';
import { TaskItemType } from '../../components/types/tasks';
import { categories, priorities, statuses } from '../../constants/filters';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type FormData = Omit<TaskItemType, 'taskId' | 'createdAt' | 'dueDate'> & {
  dueDate: string;
};

const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const NewTaskPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
      dueDate: formatDateForInput(new Date()),
      priority: 'medium',
      status: 'notStarted',
      category: 'personal',
    },
  });

  const onSubmit = (data: FormData) => {
    // Convert dueDate string to Date object
    const formData = {
      ...data,
      dueDate: new Date(data.dueDate),
    };

    // Here you would typically save the task to your state management or API
    // For now, we'll just navigate back to the home page
    // In a real app, you'd want to add the task to the list
    console.log('New task:', formData);
    
    // Navigate back to home page
    router.push('/');
  };

  return (
    <div className="container mx-auto p-8 pb-20">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>بازگشت به صفحه اصلی</span>
        </Link>

        <Block>
          <h1 className="text-2xl font-bold mb-6">افزودن وظیفه جدید</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                عنوان وظیفه <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                {...register('title', {
                  required: 'عنوان وظیفه الزامی است',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'عنوان وظیفه الزامی است';
                    }
                    return true;
                  },
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="عنوان وظیفه را وارد کنید"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                توضیحات <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                {...register('description', {
                  required: 'توضیحات الزامی است',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'توضیحات الزامی است';
                    }
                    return true;
                  },
                })}
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="توضیحات وظیفه را وارد کنید"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  دسته‌بندی
                </label>
                <select
                  id="category"
                  {...register('category')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories
                    .filter((cat) => cat.value !== 'all')
                    .map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                  تاریخ سررسید <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="dueDate"
                  {...register('dueDate', {
                    required: 'تاریخ سررسید الزامی است',
                    valueAsDate: false,
                    validate: (value) => {
                      if (!value) {
                        return 'تاریخ سررسید الزامی است';
                      }
                      const date = new Date(value);
                      if (isNaN(date.getTime())) {
                        return 'تاریخ سررسید معتبر نیست';
                      }
                      return true;
                    },
                  })}
                  defaultValue={formatDateForInput(new Date())}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.dueDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.dueDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.dueDate.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                  اولویت
                </label>
                <select
                  id="priority"
                  {...register('priority')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {priorities
                    .filter((p) => p.value !== 'all')
                    .map((priority) => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  وضعیت
                </label>
                <select
                  id="status"
                  {...register('status')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statuses
                    .filter((s) => s.value !== 'all')
                    .map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4 justify-end pt-4">
              <Link
                href="/"
                className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                انصراف
              </Link>
              <button
                type="submit"
                className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
              >
                ایجاد وظیفه
              </button>
            </div>
          </form>
        </Block>
      </div>
    </div>
  );
};

export default NewTaskPage;

