import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Fragment } from 'react'

import { Tables } from '@/@types/supabase'
import { ROUTES } from '@/constants/routes'
import { cn, getItemImage, getMonsterImage } from '@/lib/utils'
import supabase from '@/lib/utils/supabase'

interface Props {
  params: {
    slug: string
  }
}

type DropMonstersReturnType =
  | {
      drop_chance: Tables<'monster_drops'>['drop_chance']
      monsters: Tables<'monsters'>
    }[]
  | null

const JOB: Record<number, string[]> = {
  0: ['초보자'],
  1: ['전사'],
  2: ['마법사'],
  3: ['전사', '마법사'],
  4: ['궁수'],
  8: ['도적'],
  9: ['전사', '도적'],
} as const

export default async function Page({ params }: Readonly<Props>) {
  const { slug } = params

  const { data: item } = await supabase.from('items').select().match({ maple_item_id: slug }).single()

  if (!item) return notFound()

  const { data: dropMonsters } = await supabase
    .from('monster_drops')
    .select(
      `
    drop_chance,
    monsters ( id, maple_mob_id, name_kor, name_eng )
  `
    )
    .match({
      item_id: item.id,
    })
    .returns<DropMonstersReturnType>()

  return (
    <Fragment>
      <div className='mt-24 flex w-[500px] max-w-full flex-col bg-[#06062C] bg-opacity-50 px-2 pb-5 text-white shadow-md'>
        <div className='mt-5 flex w-full flex-col items-center gap-1 p-2'>
          <h1 className='text-3xl font-semibold'>{item.name_kor}</h1>
        </div>

        <div className='flex gap-12 px-4 py-4 max-md:gap-8'>
          <div className='h-fit bg-white bg-opacity-30 p-2'>
            <Image
              className='aspect-square object-contain max-md:hidden'
              src={getItemImage(item.maple_item_id)}
              width={160}
              height={160}
              alt={item.name_kor}
            />
            <Image
              className='aspect-square object-contain md:hidden'
              src={getItemImage(item.maple_item_id)}
              width={80}
              height={80}
              alt={item.name_kor}
            />
          </div>
          <div className='flex flex-col'>
            <span className='mb-2 text-sm'>REQ LEV : {item.req_level}</span>
            <span className='mb-2 text-sm'>REQ STR : {item.req_str}</span>
            <span className='mb-2 text-sm'>REQ DEX : {item.req_dex}</span>
            <span className='mb-2 text-sm'>REQ INT : {item.req_int}</span>
            <span className='mb-2 text-sm'>REQ LUK : {item.req_luk}</span>
            <span className='mb-2 text-sm'>REQ POP : {item.req_pop}</span>
          </div>
        </div>

        <div className='mb-5 flex justify-center gap-14 border-b-2 border-b-white pb-2 max-md:gap-4'>
          {['초보자', '전사', '마법사', '궁수', '도적'].map((job) => (
            <span
              key={job}
              className={cn('text-lg', item.req_job !== 0 && !JOB[item.req_job].includes(job) && 'text-red-500')}
            >
              {job}
            </span>
          ))}
        </div>

        <div className='flex flex-col gap-10 px-4'>
          <div className='flex flex-col gap-1'>
            {Boolean(item.inc_ph_attack) && (
              <span>
                물리공격력: +{item.inc_ph_attack}{' '}
                {item.overall_category === 'Equip' && `(${item.inc_ph_attack - 5} ~ ${item.inc_ph_attack + 5})`}
              </span>
            )}
            {Boolean(item.inc_mg_attack) && (
              <span>
                마법공격력: +{item.inc_mg_attack}{' '}
                {item.overall_category === 'Equip' && `(${item.inc_mg_attack - 5} ~ ${item.inc_mg_attack + 5})`}
              </span>
            )}
            {Boolean(item.inc_ph_defence) && <span>물리방어력: +{item.inc_ph_defence}</span>}
            {Boolean(item.inc_mg_defence) && <span>마법방어력: +{item.inc_mg_defence}</span>}
            {Boolean(item.inc_str) && <span>STR: +{item.inc_str}</span>}
            {Boolean(item.inc_dex) && <span>DEX: +{item.inc_dex}</span>}
            {Boolean(item.inc_int) && <span>INT: +{item.inc_int}</span>}
            {Boolean(item.inc_luk) && <span>LUK: +{item.inc_luk}</span>}
            {Boolean(item.inc_hp) && <span>HP: +{item.inc_hp}</span>}
            {Boolean(item.inc_mp) && <span>MP: +{item.inc_mp}</span>}
            <span>업그레이드 가능 횟수 : {item.upgradable_count}</span>
            <span>상점 거래가 : {item.price_shop.toLocaleString()} 메소</span>
            <span>거래 시세가 : {item.price_average ? `${item.price_average} 메소` : `데이터 준비중입니다.`}</span>
          </div>
        </div>
      </div>

      {dropMonsters && dropMonsters.length > 0 && (
        <div className='mt-4 flex w-full flex-col items-center gap-5'>
          <span className='text-xl font-semibold'>드랍 몬스터</span>
          {dropMonsters.map((dropMonster) => (
            <Link
              className='flex w-[500px] items-center gap-7 bg-[#06062C] bg-opacity-50 px-8 py-2 max-md:w-full max-md:max-w-[500px]'
              href={ROUTES.MONSTER(dropMonster.monsters.maple_mob_id)}
              key={dropMonster.monsters.maple_mob_id}
            >
              <Image
                className='aspect-square object-contain'
                src={getMonsterImage(dropMonster.monsters.maple_mob_id)}
                width={70}
                height={70}
                alt={dropMonster.monsters.name_kor}
              />
              <div className='flex flex-col gap-1'>
                <span className='text-white'>{dropMonster.monsters.name_kor}</span>
                <span className='text-[#FB9E48]'>드랍율: {dropMonster.drop_chance}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Fragment>
  )
}
