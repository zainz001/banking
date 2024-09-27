"use client"
//in this using zod form and also merge with the inputsfile (custom inputs form) first install using shadecn
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../components/ui/button"
import {
    Form
} from "@/components/ui/form"
import Inputs from './Inputs'
import { authformSchema } from '../lib/utils'
import { Loader2 } from 'lucide-react'
import { getLoggedInUser, Signin, SignUp } from '../lib/actions/user.actions'
import { useRouter } from 'next/navigation';

const Auth = ({ type }: { type: string }) => {
    const router = useRouter();
    const [user, setUser] = useState(null)
    const [Loading, setLoading] = useState(false)
    const formSchema = authformSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // Submit handler
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setLoading(true);
    
        try {
            if (type === 'sign-up') {
                const userData = {
                    firstName: data.firstName!,
                    lastName: data.lastName!,
                    address1: data.address1!,
                    city: data.city!,
                    state: data.state!,
                    postalCode: data.postalCode!,
                    dateOfBirth: data.dateOfBirth!,
                    ssn: data.ssn!,
                    email: data.email,
                    password: data.password
                };
    
                const newUser = await SignUp(userData);
                setUser(newUser);
            }
            if(type === 'sign-in') {
                const response = await Signin({
                  email: data.email,
                  password: data.password,
                  
                })
                console.log(getLoggedInUser);
      
                if(response) router.push('/')
              }
            } catch (error) {
              console.log(error);
            } finally {
              setLoading(false);
            }
          }
    

    return (
        <section className="auth-form">
            <header className="flex flex-col gap-5 md:gap-8 ">
                <Link href="/" className="px-4 cursor-pointer items-center gap-1 flex">
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="UPL Logo"
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">UPL</h1>
                </Link>
                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user
                            ? 'Link Account' :
                            type === 'sign-in' ?
                                'Sign In'
                                : 'Sign Up'
                        }
                    </h1>
                    <p>
                        {user
                            ? 'Link your account to get started' :
                            'Please enter your details'}
                    </p>
                </div>
            </header>

            {!user && (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {
                                type === 'sign-up' && (
                                    <>
                                        <div className="flex gap-4">
                                            <Inputs control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' />
                                            <Inputs control={form.control} name='lastName' label="Last Name" placeholder='Enter your first name' />
                                        </div>
                                        <Inputs control={form.control} name='address1' label="Address" placeholder='Enter your specific address' />
                                        <Inputs control={form.control} name='city' label="City" placeholder='Enter your city' />
                                        <div className="flex gap-4">
                                            <Inputs control={form.control} name='state' label="State" placeholder='Example: NY' />
                                            <Inputs control={form.control} name='postalCode' label="Postal Code" placeholder='Example: 11101' />
                                        </div>
                                        <div className="flex gap-4">
                                            <Inputs control={form.control} name='dateOfBirth' label="Date of Birth" placeholder='YYYY-MM-DD' />
                                            <Inputs control={form.control} name='ssn' label="SSN" placeholder='Example: 1234' />
                                        </div>
                                    </>
                                )
                            }


                            <Inputs control={form.control} name="email" placeholder="Enter your email" label="Email" />
                            <Inputs control={form.control} name="password" placeholder="Enter your password" label="Password" />
                            <div className='flex flex-col gap-5'>
                                <Button type="submit" disabled={Loading} className='form-btn'>
                                    {Loading ? (
                                        <>
                                            <Loader2 size={20} className='animate-spin' /> &nbsp; ...Loading
                                        </>
                                    ) : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                                </Button>
                            </div>
                            {/* Conditional Sign In/Sign Up Link */}
                            <div className="text-center mt-4">
                                {type === 'sign-in' ? (
                                    <p className="text-sm">
                                        Don't have an account?{' '}
                                        <Link href="/sign_up" className="text-blue-500 hover:underline">
                                            Sign Up
                                        </Link>
                                    </p>
                                ) : (
                                    <p className="text-sm">
                                        Already have an account?{' '}
                                        <Link href="/sign_in" className="text-blue-500 hover:underline">
                                            Sign In
                                        </Link>
                                    </p>
                                )}
                            </div>
                        </form>
                    </Form>
                </>
            )}
        </section>
    )
}

export default Auth
