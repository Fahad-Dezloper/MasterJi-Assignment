import { redirect } from 'next/navigation'
const page = () => {
  redirect('/dashboard/weather-news')
  return null;
}

export default page
