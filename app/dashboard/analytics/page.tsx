import { Chart } from '@/app/components/Chart';
import Graph from '@/app/components/Graph';
import Tables from '@/app/components/Table';
import React from 'react';

const Page = () => {
  return (
    <div className='w-full h-screen px-4 sm:px-8 lg:px-12'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4 items-center'>
        <div className='w-full'><Chart /></div>
        <div className='w-full'><Graph /></div>
      </div>
      <div className='mt-6'><Tables /></div>
    </div>
  );
}

export default Page;