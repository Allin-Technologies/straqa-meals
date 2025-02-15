import Link from "next/link";
import Logo from "@/components/logo";
import { HeaderClient } from "./component.client";

export async function Header() {
  return (
    <HeaderClient>
      <nav className='px-4 xl:px-0 py-6 lg:py-8 container relative z-20 flex justify-between items-center'>
        <Link href='/'>
          <Logo className='max-w-[6rem] lg:max-w-[9.375rem]' />
        </Link>

        <Link
          href='https://straqa.com/'
          target='_blank'
          className='text-[hsla(300,_3%,_60%,_1)] hover:text-[#c1bac1] transition-colors ease-linear duration-150'
        >
          About
        </Link>
      </nav>
    </HeaderClient>
  );
}
