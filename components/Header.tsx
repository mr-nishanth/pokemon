// pokemon-explorer/components/Header.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import SearchForm from './SearchForm';

function Header() {
  const router = useRouter();

  const pathname = usePathname();

  return (
    <header className="min-h-[10vh] px-16 py-6 w-full bg-white flex justify-between items-center shadow-sm">
      <Link href="/">
        <Image src={'/pokemon--logo.png'} width={120} height={90} alt="logo" />
      </Link>
      <SearchForm />
    </header>
  );
}

export default Header;
