import Link from "next/link";
import { OrderItem } from "@/app/components/order-item";
import { ResumeItem } from "@/app/components/resume-item";
import { Button } from "@/app/components/ui/button";
import {
  BiChevronDown,
  BiChevronRight,
  BiDonateHeart,
  BiGlobe,
  BiHourglass,
  BiSolidStar,
} from "react-icons/bi";
import Image from "next/image";
import IntroImage from "@/public/intro.png";
import AboutImage from "@/public/about.png";
import ResumeImage from "@/public/resume.png";
import { getOrders } from "../actions/getOrders";
import { getResumes } from "../actions/getResumes";

export default async function Home() {
  const orders = await getOrders();
  const resumes = await getResumes();

  return (
    <main>
      <section className="container grid place-items-center">
        <div className="flex items-center justify-center gap-8 max-lg:flex-wrap">
          <div className="flex flex-col max-w-xl gap-y-6">
            <h1 className="text-4xl font-medium">
              Найдите идеального исполнителя для вашего проекта с помощью биржи
              идей для IT-компетенций
            </h1>
            <p className="text-description">
              Добро пожаловать на нашу биржу идей для IT-компетенций, где вы
              найдете опытных специалистов по различным направлениям
              IT-индустрии для успешного сотрудничества.
            </p>
            <div className="flex items-center max-xs:justify-center flex-wrap gap-x-6 gap-y-2">
              <Button asChild>
                <Link
                  href="#orders"
                  className="flex items-start py-4 text-white rounded-lg gap-x-2 bg-primary px-7"
                >
                  Вперед
                  <BiChevronDown className="text-2xl" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="hover:bg-primary/10 hover:text-primary"
              >
                <Link
                  href="/register"
                  className="flex items-center gap-x-2 text-primary"
                >
                  Я исполнитель
                  <BiChevronRight className="text-2xl" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="max-w-[30rem] lg:max-w-[46rem]">
            <Image src={IntroImage} alt="" />
          </div>
        </div>
      </section>
      <section className="pt-8 pb-16 bg-gradient" id="orders">
        <div className="container">
          <div className="text-center text-white mx-auto max-w-[37rem] mb-10">
            <h2 className="mb-4 text-4xl">Заказы</h2>
            <p>
              Просматривайте и управляйте вашими заказами с легкостью в нашем
              удобном разделе. Здесь вы найдете все необходимые детали заказов и
              сможете быстро реагировать на новые запросы от клиентов.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {orders.slice(0, 3).map((order) => (
              <OrderItem
                key={order.id}
                className="basis-[20rem]"
                title={order.title}
                description={order.description}
                tags={order.tags.map(({ tag }) => tag.label)}
                price={order.price}
                id={order.id}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="container">
        <div className="flex items-center justify-center mt-4 max-xl:flex-wrap gap-14">
          <div className="max-w-[35rem] xl:max-w-[46rem] max-xl:order-2">
            <Image src={AboutImage} alt="" />
          </div>
          <div className="flex flex-col max-w-xl gap-y-6 max-xl:order-1">
            <h3 className="text-3xl font-medium">
              Почему именно&nbsp;
              <span className="font-medium text-primary">WorkFlow</span>?
            </h3>
            <div className="flex gap-6">
              <span className="bg-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center text-3xl shrink-0">
                <BiHourglass />
              </span>
              <div>
                <h5 className="text-xl font-medium">
                  Быстрый и эффективный поиск
                </h5>
                <p className="text-description">
                  На нашем сайты вы легко найдете специалистов и заказы,
                  отвечающих вашим требованиям
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <span className="bg-primary text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center shrink-0">
                <BiDonateHeart className="text-3xl" />
              </span>
              <div>
                <h5 className="text-xl font-medium">Удобство</h5>
                <p className="text-description">
                  Удобная платформа для презентации своих навыков и опыта для
                  исполнителей, а для работодателей легкое размещение заказов
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <span className="bg-primary text-primary-foreground flex items-center justify-center w-14 h-14 rounded-full shrink-0">
                <BiGlobe className="text-3xl" />
              </span>
              <div>
                <h5 className="text-xl font-medium">Новинки из мира IT</h5>
                <p className="text-description">
                  Возможность проводить поиск идей, трендов и лучших практик в
                  IT-сфере, чтобы быть в курсе последних технологических
                  разработок и новинок на рынке.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-8 pb-16 bg-gradient">
        <div className="container">
          <div className="text-center text-white mx-auto max-w-[37rem] mb-10">
            <h2 className="mb-4 text-4xl">Резюме</h2>
            <p className="">
              Познакомьтесь с нашими талантливыми IT специалистами, готовыми
              укрепить вашу команду и привнести новые идеи в ваш проект. Ищите
              идеального кандидата? Начните здесь.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {resumes.slice(0, 3).map((resume) => (
              <ResumeItem
                key={resume.id}
                className="basis-[20rem]"
                title={resume.special}
                description={resume.description}
                tags={resume.tags.map(({ tag }) => tag.label)}
                level={resume.level}
                id={resume.id}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="container grid pt-6 place-items-center">
        <div className="flex items-center justify-center gap-8 max-xl:flex-wrap">
          <div className="flex flex-col max-w-2xl gap-y-6">
            <h1 className="text-4xl font-medium leading-tight [overflow-wrap:anywhere]">
              Если вы&nbsp;
              <span className="text-primary">
                сертифицированный специалист в области IT,
              </span>
              то скорее отправляйте резюме
            </h1>
            <p className="text-description">
              Вы ищете новые возможности для проявления своего таланта и
              развития профессиональных навыков? Тогда мы приглашаем вас
              оставить свое резюме на нашем сайте WorkFlow
            </p>
            <div className="flex flex-col gap-3">
              <h4 className="text-xl font-medium">У нас вы получите</h4>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <li className="before:content-[''] before:block flex before:shrink-0 before:mt-2 before:w-3 before:h-3 before:bg-primary before:mr-2 before:rounded-full">
                  Большое разнообразие заказов
                </li>
                <li className="before:content-[''] before:block flex before:shrink-0 before:mt-2 before:w-3 before:h-3 before:bg-primary before:mr-2 before:rounded-full">
                  Профессиональное развитие
                </li>
                <li className="before:content-[''] before:block flex before:shrink-0 before:mt-2 before:w-3 before:h-3 before:bg-primary before:mr-2 before:rounded-full">
                  Гибкий график
                </li>
                <li className="before:content-[''] before:block flex before:shrink-0 before:mt-2 before:w-3 before:h-3 before:bg-primary before:mr-2 before:rounded-full">
                  Возможность для налаживания контактов
                </li>
                <li className="before:content-[''] before:block flex before:shrink-0 before:mt-2 before:w-3 before:h-3 before:bg-primary before:mr-2 before:rounded-full">
                  Творческая свобода
                </li>
                <li className="before:content-[''] before:block flex before:shrink-0 before:mt-2 before:w-3 before:h-3 before:bg-primary before:mr-2 before:rounded-full">
                  Монетизирование вашей деятельности
                </li>
              </ul>
            </div>
            <div className="flex items-center gap-x-6">
              <Button asChild>
                <Link
                  href="/register"
                  className="flex items-start py-4 text-white rounded-lg gap-x-2 bg-primary px-7"
                >
                  Отправить резюме
                </Link>
              </Button>
            </div>
          </div>
          <div className="max-w-[28rem] xl:max-w-[35rem]">
            <Image src={ResumeImage} alt="" />
          </div>
        </div>
      </section>
      <section className="pt-8 pb-16 bg-gradient">
        <div className="container">
          <div className="text-center text-white mx-auto max-w-[37rem] mb-10">
            <h2 className="mb-4 text-4xl">Отзывы</h2>
            <p className="">
              В этом разделе вы найдете множество положительных отзывов от наших
              клиентов, которые довольны нашими услугами и качеством наших идей.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <article className="p-6 bg-background rounded-xl basis-[30rem]">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 relative rounded-full overflow-hidden">
                    <Image src="/avatar.png" fill alt="" />
                  </div>
                  <div>
                    <h6 className="text-xl font-medium text-primary">
                      Иван Иванов
                    </h6>
                    <span className="text-description">Заказчик</span>
                    <div className="flex gap-1">
                      <BiSolidStar className="text-warning" />
                      <BiSolidStar className="text-warning" />
                      <BiSolidStar className="text-warning" />
                      <BiSolidStar className="text-warning" />
                      <BiSolidStar className="text-warning" />
                    </div>
                  </div>
                </div>
                <span className="line-clamp-3">
                  Я очень доволен результатом работы с сайтом WorkFlow!
                  Благодаря этой бирже идей у меня была возможность быстро и
                  эффективно найти специалистов в области IT...
                </span>
              </div>
            </article>
            <article className="p-6 bg-background rounded-xl basis-[30rem]">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 relative rounded-full overflow-hidden">
                    <Image src="/women_avatar.png" fill alt="" />
                  </div>
                  <div>
                    <h6 className="text-xl font-medium text-primary">
                    Катерина Павловна
                    </h6>
                    <span className="text-description">Исполнитель</span>
                    <div className="flex gap-1">
                      <BiSolidStar className="text-warning" />
                      <BiSolidStar className="text-warning" />
                      <BiSolidStar className="text-warning" />
                      <BiSolidStar className="text-warning" />
                      <BiSolidStar className="text-warning" />
                    </div>
                  </div>
                </div>
                <span className="line-clamp-3">
                  Благодаря WorkFlow у меня есть постоянный заработок, а также возможность совмещать работу с учебой. К тому же, на сайте достаточно много новых идей, которые я бы хотела воплотить в жизнь.
                </span>
              </div>
            </article>
            <article className="p-6 bg-background rounded-xl basis-[30rem]">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 relative rounded-full overflow-hidden">
                    <Image src="/man.png" fill alt="" />
                  </div>
                  <div>
                    <h6 className="text-xl font-medium text-primary">
                      Роман Петров
                    </h6>
                    <span className="text-description">Заказчик</span>
                    <div className="flex gap-1">
                      <BiSolidStar className="text-warning" />
                      <BiSolidStar className="text-warning" />
                      <BiSolidStar className="text-warning" />
                      <BiSolidStar className="text-warning" />
                      <BiSolidStar className="text-warning" />
                    </div>
                  </div>
                </div>
                <span className="line-clamp-3">
                  Работа с сайтом WorkFlow оказалась очень приятной! Здесь я смог подобрать необходимых мне исполнителей, в силах которых я уверен. Теперь мне не страшно за свои проекты, ведь их выполнять квалифицированные специалисты.
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
