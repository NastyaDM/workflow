import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex justify-center py-8 mt-auto">
      <div className="flex flex-col items-center gap-8">
        <Link href="/">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 22H20C20.5304 22 21.0391 21.7893 21.4142 21.4142C21.7893 21.0391 22 20.5304 22 20V8C22 7.46957 21.7893 6.96086 21.4142 6.58579C21.0391 6.21071 20.5304 6 20 6H8C7.46957 6 6.96086 6.21071 6.58579 6.58579C6.21071 6.96086 6 7.46957 6 8V20C6 20.5304 6.21071 21.0391 6.58579 21.4142C6.96086 21.7893 7.46957 22 8 22ZM10 10H18V18H10V10ZM40 6H28C27.4696 6 26.9609 6.21071 26.5858 6.58579C26.2107 6.96086 26 7.46957 26 8V20C26 20.5304 26.2107 21.0391 26.5858 21.4142C26.9609 21.7893 27.4696 22 28 22H40C40.5304 22 41.0391 21.7893 41.4142 21.4142C41.7893 21.0391 42 20.5304 42 20V8C42 7.46957 41.7893 6.96086 41.4142 6.58579C41.0391 6.21071 40.5304 6 40 6ZM38 18H30V10H38V18ZM20 42C20.5304 42 21.0391 41.7893 21.4142 41.4142C21.7893 41.0391 22 40.5304 22 40V28C22 27.4696 21.7893 26.9609 21.4142 26.5858C21.0391 26.2107 20.5304 26 20 26H8C7.46957 26 6.96086 26.2107 6.58579 26.5858C6.21071 26.9609 6 27.4696 6 28V40C6 40.5304 6.21071 41.0391 6.58579 41.4142C6.96086 41.7893 7.46957 42 8 42H20ZM10 30H18V38H10V30ZM36 28H32V32H28V36H32V40H36V36H40V32H36V28Z"
              fill="black"
            />
          </svg>
        </Link>
        <div className="flex flex-wrap justify-center gap-6 text-xl">
          <Link href="/">Главная</Link>
          <Link href="/resume">Резюме</Link>
          <Link href="/orders">Заказы</Link>
          <Link href="/profile">Профиль</Link>
          <Link href="/login">Войти</Link>
        </div>
        <hr className="h-[2px] w-full max-w-[400px] bg-black" />
        <p className="text-xl">© 2024 WorkFlow</p>
      </div>
    </footer>
  )
}