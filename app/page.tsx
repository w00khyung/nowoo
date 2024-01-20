import Image from 'next/image';
import { transformItems } from './http';
import { monsters } from './mock';

export default async function Home() {
  const items = await transformItems(monsters, 'monster');

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='grid grid-cols-3 gap-4 w-full'>
        {items.map((item) => (
          <div
            key={item.mobId}
            className='flex flex-col gap-1 items-center p-4 bg-gray-100 rounded-xl shadow-xl
          '
          >
            <Image
              className='min-w-20 min-h-20  max-w-20 max-h-20 object-contain'
              src={`https://maplestory.io/api/gms/62/mob/animated/${item.mobId}/move`}
              width={80}
              height={80}
              alt={item.mobName}
            />
            <h1 className='text-2xl font-bold'>{item.mobName}</h1>
            <span>Level: {item.mobMeta.level}</span>
            <span>maxHP: {item.mobMeta.maxHP}</span>
            <p className='text-xs mt-4 line-clamp-4'>{item.mobDescription}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
