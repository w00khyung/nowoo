import supabase from '@/utils/supabase';
import Image from 'next/image';

export default async function Home() {
  const { data: monsters } = await supabase.from('monsters').select();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='grid grid-cols-3 gap-4 w-full'>
        {monsters?.map((item) => (
          <div
            key={item.id}
            className='flex flex-col gap-1 items-center p-4 bg-gray-100 rounded-xl shadow-xl
          '
          >
            <Image
              className='min-w-20 min-h-20  max-w-20 max-h-20 object-contain'
              src={`https://maplestory.io/api/gms/62/mob/animated/${item.maple_mob_id}/move`}
              width={80}
              height={80}
              alt={item.name_kor ?? 'No Name'}
            />
            <h1 className='text-2xl font-bold'>{item.name_kor}</h1>
            <span>Level: {item.level}</span>
            <span>HP: {item.hp}</span>
            <p className='text-xs mt-4 line-clamp-4'>{item.description_kor}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
