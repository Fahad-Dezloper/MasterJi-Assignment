"use client"
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

interface Task {
  title: string;
  description: string;
  date: string | undefined;
}

const Page = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTodoTasks = localStorage.getItem('todoTasks');
    const storedInProgressTasks = localStorage.getItem('inProgressTasks');
    const storedCompletedTasks = localStorage.getItem('completedTasks');

    if (storedTodoTasks) setTodoTasks(JSON.parse(storedTodoTasks));
    if (storedInProgressTasks) setInProgressTasks(JSON.parse(storedInProgressTasks));
    if (storedCompletedTasks) setCompletedTasks(JSON.parse(storedCompletedTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
    localStorage.setItem('inProgressTasks', JSON.stringify(inProgressTasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [todoTasks, inProgressTasks, completedTasks]);

  function saveTodoTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newTask: Task = { title, description, date: date?.toISOString() };
    setTodoTasks([...todoTasks, newTask]);
    resetForm();
  }

  function saveInProgressTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newTask: Task = { title, description, date: date?.toISOString() };
    setInProgressTasks([...inProgressTasks, newTask]);
    resetForm();
  }

  function saveCompletedTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newTask: Task = { title, description, date: date?.toISOString() };
    setCompletedTasks([...completedTasks, newTask]);
    resetForm();
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setDate(new Date());
  }

  return (
    <>
      <div className='px-4 sm:px-12 py-8 w-full flex flex-col gap-6 h-screen bg-white'>
        <h1 className='text-xl font-semibold'>Kanban Board</h1>
        <div className='flex flex-col sm:flex-row gap-6'>
          {/* To Do Column */}
          <div className='h-fit w-full sm:w-1/3 flex flex-col gap-3 p-4 bg-[#F3F4F6] shadow-lg rounded-md'>
            <h1 className='text-lg font-semibold'>To Do</h1>
            <Dialog>
              {todoTasks.map((task, index) => (
                <div key={index} className='w-full p-4 flex flex-col gap-2 rounded-md bg-white shadow-md'>
                  <h2 className='font-semibold'>{task.title}</h2>
                  <p>{task.description}</p>
                  <p className='text-gray-500 text-sm'>Due: {task.date ? new Date(task.date).toLocaleDateString() : ""}</p>
                </div>
              ))}
              <DialogTrigger className='w-full flex items-center gap-2 justify-center shadow-md bg-white rounded-md py-3'>
                <Plus className='w-5 h-5' /> Add a new task
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                  <form className="mt-4 space-y-4" onSubmit={saveTodoTask}>
                    {/* Title Input */}
                    <div className="flex items-center gap-4">
                      <Label htmlFor="title" className="w-36">Title</Label>
                      <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Go for a walk" className="flex-1" />
                    </div>
                    <div className="flex items-center gap-4">
                      <Label htmlFor="description" className="w-36">Description</Label>
                      <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Type your description here." className="flex-1" />
                    </div>
                    <div className="flex items-center gap-4">
                      <Label htmlFor="calendar" className="w-36">Due Date</Label>
                      <Calendar mode="single" selected={date} onSelect={setDate} className="flex-1 rounded-md border" />
                    </div>
                    <div className="flex justify-end gap-6 pt-4">
                      <DialogClose>Cancel</DialogClose>
                      <Button type="submit">Add Task</Button>
                    </div>
                  </form>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

          {/* In Progress Column */}
          <div className='h-fit w-full sm:w-1/3 flex flex-col gap-3 p-4 bg-[#F3F4F6] shadow-lg rounded-md'>
            <h1 className='text-lg font-semibold'>In Progress</h1>
            <Dialog>
              {inProgressTasks.map((task, index) => (
                <div key={index} className='w-full p-4 flex flex-col gap-2 rounded-md bg-white shadow-md'>
                  <h2 className='font-semibold'>{task.title}</h2>
                  <p>{task.description}</p>
                  <p className='text-gray-500 text-sm'>Due: {task.date ? new Date(task.date).toLocaleDateString() : ""}</p>
                </div>
              ))}
              <DialogTrigger className='w-full flex items-center gap-2 justify-center shadow-md bg-white rounded-md py-3'>
                <Plus className='w-5 h-5' /> Add a new task
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                 <form className="mt-4 space-y-4" onSubmit={saveInProgressTask}>
                    <div className="flex items-center gap-4">
                      <Label htmlFor="title" className="w-36">Title</Label>
                      <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Go for a walk" className="flex-1" />
                    </div>
                    <div className="flex items-center gap-4">
                      <Label htmlFor="description" className="w-36">Description</Label>
                      <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Type your description here." className="flex-1" />
                    </div>
                    <div className="flex items-center gap-4">
                      <Label htmlFor="calendar" className="w-36">Due Date</Label>
                      <Calendar mode="single" selected={date} onSelect={setDate} className="flex-1 rounded-md border" />
                    </div>
                    <div className="flex justify-end gap-6 pt-4">
                      <DialogClose>Cancel</DialogClose>
                      <Button type="submit">Add Task</Button>
                    </div>
                  </form>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

          {/* Completed Column */}
          <div className='h-fit w-full sm:w-1/3 flex flex-col gap-3 p-4 bg-[#F3F4F6] shadow-lg rounded-md'>
            <h1 className='text-lg font-semibold'>Completed</h1>
            <Dialog>
              {completedTasks.map((task, index) => (
                <div key={index} className='w-full p-4 flex flex-col gap-2 rounded-md bg-white shadow-md'>
                  <h2 className='font-semibold'>{task.title}</h2>
                  <p>{task.description}</p>
                  <p className='text-gray-500 text-sm'>Due: {task.date ? new Date(task.date).toLocaleDateString() : ""}</p>
                </div>
              ))}
              <DialogTrigger className='w-full flex items-center gap-2 justify-center shadow-md bg-white rounded-md py-3'>
                <Plus className='w-5 h-5' /> Add a new task
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                  <form className="mt-4 space-y-4" onSubmit={saveCompletedTask}>
                    <div className="flex items-center gap-4">
                      <Label htmlFor="title" className="w-36">Title</Label>
                      <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Go for a walk" className="flex-1" />
                    </div>
                    <div className="flex items-center gap-4">
                      <Label htmlFor="description" className="w-36">Description</Label>
                      <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Type your description here." className="flex-1" />
                    </div>
                    <div className="flex items-center gap-4">
                      <Label htmlFor="calendar" className="w-36">Due Date</Label>
                      <Calendar mode="single" selected={date} onSelect={setDate} className="flex-1 rounded-md border" />
                    </div>
                    <div className="flex justify-end gap-6 pt-4">
                      <DialogClose>Cancel</DialogClose>
                      <Button type="submit">Add Task</Button>
                    </div>
                  </form>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

        </div> 
      </div> 
    </>
  );
}

export default Page;