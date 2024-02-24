import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SignUp } from "@/components/user-auth-form";
import { cn } from "@/lib/utils";

import { signup } from "./actions";

const logo = require('..\..\assets\memeThing.png');

export const metadata: Metadata = {
  title: "WarriorSad",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/signin"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8",
          )}
        >
          Sign in
        </Link>
        <div className="bg-muted relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1750 806.55"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path fill="white" d="M1081.2,0c147.6,0,295.2,0,442.8,0c0.8,0.2,1.7,0.5,2.5,0.5c16.5,1.2,32.6,4.5,48.2,9.8c29.8,10.2,55.2,26.8,74.6,51.9
                c20.7,26.7,30.8,57.5,34.7,90.6c3.7,30.6,3.2,61.1-1.2,91.6c-5.2,36.6-15.9,71.4-33.4,104c-4.8,8.9-10.2,17.4-15.4,26.2
                c0,0,0,0.2,0.2,0.3c1.8,1.3,3.7,2.6,5.5,3.9c37,25.6,65.3,58.5,83.5,99.8c15.2,34.4,22.7,70.6,25.4,107.9c0.4,5.5,0.8,11.1,1.3,16.7
                v29c-0.2,1-0.5,2.1-0.6,3.1c-1.4,24.2-6.7,47.6-16.3,69.9c-15,34.8-37.6,63.5-70.2,83.6c-16.8,10.4-34.9,17-55,17
                c-220.9,0-441.7,0-662.6,0h-3.5c6.6-38.2,13.1-75.8,19.6-113.5c6.6-37.9,13.2-75.8,19.7-113.7c6.6-37.9,13.1-75.8,19.7-113.7
                c6.2-35.6,12.3-71.1,18.5-106.7c6.3-36.5,12.6-73,18.9-109.5c6.2-35.6,12.3-71.1,18.5-106.7c5.9-34.2,11.8-68.3,17.8-102.5
                C1076.8,26.5,1079,13.2,1081.2,0L1081.2,0z M1104.5,664h3.7c135,0,270,0,405,0c17.7,0,34.6-3.3,50.6-11
                c15.3-7.3,28.3-17.5,37.1-32.4c4.9-8.4,8.1-17.4,7.6-27.2c-0.3-6.3-1.3-12.6-2.4-18.8c-7.1-40.4-28.6-69.8-66.8-86.1
                c-13-5.6-26.5-10.1-40.7-10.1c-119.7-0.2-239.5-0.1-359.2-0.1h-3.6C1125.3,540.2,1114.9,601.9,1104.5,664L1104.5,664z M1195.7,145.8
                c-10.9,62.1-21.7,123.8-32.5,185.8c1.5,0,2.7,0,4,0c85.6,0,171.2,0,256.9,0c13,0,25.7-1.9,38.2-5.2c34.3-9.1,57.2-31.4,71.1-63.2
                c7.1-16.3,7.8-34.3,8.6-51.9c0.8-18.7-5.7-35.7-16.6-50.8c-7.1-9.9-16.3-14.9-29.3-14.9c-98.6,0.4-197.3,0.2-295.9,0.2L1195.7,145.8
                L1195.7,145.8z"/>
              <path fill="white" d="M885,0c47.5,0,95.1,0,142.7,0c-6.7,38.4-13.3,76.8-20,115.2c-6.3,36.6-12.7,73.2-19,109.8c-6.3,36.6-12.7,73.2-19,109.8
                c-6.3,36.5-12.7,73-19,109.5c-6.4,36.7-12.7,73.4-19.1,110.2c-6.3,36.5-12.7,73-19,109.5c-6.4,36.7-12.7,73.4-19.1,110.2
                c-1.8,10.5-3.6,20.9-5.5,31.7h-4c-29.7,0-59.4-0.1-89.1,0.1c-3.3,0-5-1-6.7-3.9c-90.4-153.5-180.9-306.8-271.4-460.2
                c-0.7-1.2-1.4-2.3-2.3-3.7c-0.9,1.5-1.6,2.6-2.2,3.7c-90.3,153.8-180.6,307.5-270.8,461.4c-1.2,2-2.4,2.8-4.8,2.8
                c-30.9-0.1-61.8-0.1-92.6-0.1h-3.1c-0.3-0.9-0.5-1.5-0.6-2.2c-2.4-14-4.8-27.9-7.2-41.9c-6.1-35.2-12.2-70.5-18.3-105.7
                c-6.4-36.6-12.7-73.2-19.1-109.8s-12.7-73.2-19.1-109.8c-6.3-36.5-12.7-73-19-109.5c-6.4-36.6-12.7-73.2-19.1-109.8
                c-6.3-36.5-12.7-73-19-109.5C13.1,71.7,6.9,35.9,0.6,0h142.7c0.1,1,0.2,1.9,0.3,2.9c1.8,10.5,3.7,20.9,5.5,31.4
                c6.8,38.4,13.5,76.8,20.2,115.2c7,39.8,14,79.5,21,119.3c6.8,38.7,13.6,77.4,20.4,116.1c7,39.8,14,79.5,20.9,119.3
                c1.1,6.2,2.2,12.5,3.5,19.6c1.1-1.9,1.8-3,2.4-4c72.5-119.6,145-239.2,217.4-358.9c1.4-2.2,2.8-2.9,5.4-2.9
                c35.9,0.1,71.9,0.1,107.8,0c2.8,0,4.2,0.9,5.5,3.2c72.2,119.6,144.6,239.2,216.9,358.9c0.6,1,1.3,2.1,2.3,3.7
                c1.3-7.1,2.4-13.4,3.5-19.7c6.3-36.2,12.7-72.4,19-108.5c6.6-37.5,13.2-75.1,19.8-112.6c6.6-37.4,13.2-74.9,19.7-112.3
                c6.8-38.6,13.5-77.2,20.3-115.8C878.5,36.4,881.8,18.2,885,0z"/>
              <path fill="white" d="M251.1,0c1.7,9.3,3.5,18.5,5.1,27.9c6.6,37.1,13.1,74.2,19.7,111.3c6.4,35.9,12.7,71.9,19.1,107.8
                c4.2,23.6,8.3,47.2,12.4,70.8c0.2,1.2,0.1,2.6-0.4,3.6c-15,25.2-30,50.4-45.1,75.5c-0.2,0.4-0.5,0.6-1.1,1.4
                c-1.1-6.5-2.2-12.6-3.2-18.7c-6.8-39.1-13.6-78.3-20.4-117.4c-6.3-36.5-12.6-73-19-109.5c-6.6-37.9-13.1-75.8-19.6-113.6
                c-2.3-13-4.6-26-6.8-39C211.5,0,231.3,0,251.1,0z"/>
              <path fill="white" d="M292.5,805.7c73.7-125.5,147.3-250.8,221.1-376.5c0.7,1,1.3,1.7,1.8,2.5c10.2,17.2,20.4,34.4,30.6,51.5c1,1.7,1.1,2.9,0,4.6
                c-61.7,105.2-123.3,210.4-185,315.6c-0.9,1.5-1.6,2.5-3.6,2.5c-21.1-0.1-42.2-0.1-63.2-0.1C293.8,805.9,293.4,805.8,292.5,805.7
                L292.5,805.7z"/>
              <path fill="white" d="M772.4,396.5c-48-79.5-95.6-158.3-143.5-237.6c1.3-0.1,2.2-0.2,3.1-0.2c16.1,0,32.3,0,48.4-0.1c2.1,0,3.2,0.6,4.3,2.4
                c32.9,54.4,65.9,108.8,98.8,163.2c0.9,1.5,1.2,3.6,0.9,5.4c-3.6,21.4-7.4,42.7-11.1,64.1C773,394.5,772.8,395.2,772.4,396.5
                L772.4,396.5z"/>
              <path fill="white" d="M1500.4,629.6c4.8-15,2.8-29.8,0.7-44.6c-1.5-10.6-4.4-20.8-9-30.5c-6.1-13-15.7-22.7-28.5-29.2c-1.3-0.7-2.7-1.3-4.7-2.4
                c1.5-0.1,2.4-0.2,3.2-0.2c9.7,0,19.4-0.2,29,0c24.7,0.5,55.4,15.5,63.1,50.2c1.4,6.3,2.7,13,2.2,19.4c-1,12.2-8.7,20.7-18.6,27.2
                C1527.5,626.5,1512.5,630.5,1500.4,629.6L1500.4,629.6z"/>
              <path fill="white" d="M1438.7,182c11.3,0,22.7-0.1,34.1,0c4.9,0.1,8.9,2.6,12,6.2c8.8,10.2,13.4,21.9,11.8,35.6c-0.8,6.8-1.1,13.9-3.2,20.3
                c-6.1,19.5-19.3,32.6-38.3,39.8c-9.4,3.6-19.3,5-29.4,5.2c-6.6,0.1-13.1,0-19.7,0c-0.3-0.3-0.5-0.6-0.8-0.9c0.6-0.2,1.2-0.3,1.7-0.6
                c19.8-12.6,30-31,33.2-53.8c2-14.2,1.8-28.5,0.7-42.8C1440.6,188,1439.4,185.2,1438.7,182L1438.7,182z"/>
            </svg>
            WarriorBorgs 3256
          </div>
          
          {/* Dont touch the quote... or else -patrick */}
          <div className="relative z-20 mt-auto">
            <div className="item-centered">
              
            </div>
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Bro, your git commit message says &lsquo;good boy&rsquo;&rdquo;
              </p>
              <footer className="text-sm">Lucas</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-muted-foreground text-sm">
                Enter your email below to create your account
              </p>
            </div>
            <SignUp action={signup} />
            <p className="text-muted-foreground px-8 text-center text-sm">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="hover:text-primary underline underline-offset-4"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="hover:text-primary underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
