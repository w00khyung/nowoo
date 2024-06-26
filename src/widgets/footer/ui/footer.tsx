export function Footer() {
  return (
    <footer className='flex h-[200px] items-center justify-center bg-[#2C2F36] px-24 py-16 text-[#9B9B9B] max-md:p-4'>
      <div className='flex w-full max-w-7xl items-center justify-between gap-2 max-lg:flex-col max-lg:gap-4 '>
        <div className='flex flex-col gap-1 max-md:text-center'>
          <span>© 2024 NOWOO | nolangwoosan@gmail.com</span>
          <p>
            Nowoo is not associated with Nexon Korea Corp & Toben Studio. <br />
            Data based on NEXON Open API.
          </p>
        </div>
        <div className='flex items-center gap-2'>
          {/* <a className='rounded-full bg-white p-2' href='https://twitter.com/yoowo16' rel='noreferrer' target='_blank'>
            <Image src={icon.x} width={16} height={16} alt='X' />
          </a>
          <a
            className='rounded-full bg-white p-2'
            href='https://www.instagram.com/nowoo.kr'
            rel='noreferrer'
            target='_blank'
          >
            <Image src={icon.instagram} width={16} height={16} alt='instagram' />
          </a>
          <a
            className='rounded-full bg-white p-2'
            href='https://open.kakao.com/o/sYgOAa7f'
            rel='noreferrer'
            target='_blank'
          >
            <Image src={icon.kakao} width={16} height={16} alt='kakao' />
          </a> */}
        </div>
        <div className='flex items-center gap-2 max-lg:gap-4'>
          <a href='mailto:nolangwoosan@gmail.com' rel='noreferrer' target='_blank'>
            비지니스 및 광고문의
          </a>
          <div className='h-4 w-[1px] bg-[#9B9B9B]' />
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  )
}
