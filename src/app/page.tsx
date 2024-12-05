import Navbar from "@/Components/navbar";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { pricingCards } from "@/constants/pricingplans";
import clsx from "clsx";
import { Check} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
      <main>
        <Navbar />
        <section>
              <div className="flex items-center justify-center flex-col mt-[80px]">
                <span className="text-white bg-black px-4 rounded-full text-base mb-8">
                An AI powered sales assistant chatbot
                </span>
                <Image
                    src="/images/AthenaAi.png"
                    alt="LOGO"
                    sizes="100vw"
                    style= {{
                    width: '750px',
                    height: '80px'
                    }}
                    width={0}
                    height={0}
                />
                <p className="text-center max-w-[500px] mt-8 p-1">Your AI powered sales assistant!  Embed Athena AI into any website with just a snippet of code!</p>
                <Button className="bg-black font-bold text-white px-4 mt-4">
                  Start for free
                </Button>
                <Image 
                     src="/images/iphone.png"
                     alt="phone"
                     width={400}
                     height={100}
                     className='max-w-lg object-contain mt-10'
                    />
              </div>
        </section>
        <section className="flex justify-center items-center flex-col gap-4 mt-10">
             <h2 className="text-4xl text-center">Choose what fits you right</h2>
             <p className="text-muted-foreground text-center max-w-lg">
             Our simple pricing plans are designed to fit your needs perfectly. Not ready to commit? Start for free and explore all we have to offer.
             </p>
        </section>
        <div className="flex flex-wrap justify-center gap-4 mt-5">
             {pricingCards.map((card)=>(
              <Card key={card.title} className={clsx('w-[300px] flex flex-col justify-between',{'border-2 border-primary' : card.title === 'Unlimited' ,})}>
                <CardHeader>
                  <CardTitle className="text-gravel">{card.title}</CardTitle>
                  <CardDescription>{pricingCards.find((c) => c.title === card.title)?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-4xl font-bold">{card.price}</span>
                  <span className="text-muted-foreground"><span>/ month</span></span>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                  <div>
                  {card.features.map((feature)=>(
                    <div key={feature} className="flex gap-2">
                      <Check />
                      <p>{feature}</p>
                    </div>
                  ))}
                  </div>
                  <Link href={`/dashboard?plan=${card.title}`} className="bg-black text-white border-gravel border-2 p-2 w-full text-center font-bold rounded-md">
                  Get Started
                  </Link>
                </CardFooter>
              </Card>
             ))}
        </div>
      </main>
  );
}
