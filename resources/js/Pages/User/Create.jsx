import InputError from '../../Components/InputError.jsx';
import InputLabel from '../../Components/InputLabel.jsx';
import TextInput from '../../Components/TextInput.jsx';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Textarea } from '@headlessui/react'; This too can be used or user defined component
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({auth, errors}) {

    const {data, setData, post, error, reset} = useForm({
        email: "",
        name: "",
        password: "",
        password_confirmation: ""
    })


    const onSubmit = (e) => {
        e.preventDefault();

        post(route("users.store"));
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">New User Entry</h2>
                    <Link 
                    href={route("users.index")}
                    className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-700 font-bold'>
                        User List
                    </Link>
                </div>
                
            }
        >
            <Head title="New User Entry" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form 
                        onSubmit={onSubmit}
                        className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" encType="multipart/form-data">
                            {/* <div className="p-3 mt-2 grid gap-1 grid-cols-2 bg-gray-800 text-gray-200">  */}
                                 
                                <div className='mt-4 p-2 py-2'>
                                    <InputLabel htmlFor="user_name" value="User Name"/>
                                    <TextInput className="w-full mt-1" 
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        isFocused="true"
                                        onChange={e => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className='mt-2'/>
                                </div>
                                <div className='mt-4 p-2 py-2'>
                                    <InputLabel htmlFor="user_email" value="Email Address"/>
                                    <TextInput className="w-full mt-1 rounded bg-gray-950" 
                                        id="user_email"
                                        name='email'
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                    />
                                    <InputError message={errors.email} className='mt-2'/>
                                </div>
                                <div className='mt-4 p-2 py-2'>
                                    <InputLabel htmlFor="user_password" value="Password"/>
                                    <TextInput className="w-full mt-1" 
                                        id="user_password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                    />
                                    <InputError message={errors.password} className='mt-2'/>
                                </div>

                                <div className='mt-4 p-2 py-2'>
                                    <InputLabel htmlFor="user_password_confirmation" value="Confirmed Password"/>
                                    <TextInput className="w-full mt-1" 
                                        id="user_password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={e => setData('password_confirmation', e.target.value)}
                                    />
                                    <InputError message={errors.password_confirmation} className='mt-2'/>
                                </div>
                                 
                                <div className='mt-4 text-right'>
                                    <button className='bg-emerald-500 py-1 px-3 mr-4 text-white rounded shadow transition-all hover:by-emerald-700'
                                    type='submit'>Submit</button>
                                    <Link className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">
                                        Cancel
                                    </Link>
                                </div>
                            {/* </div>  */}
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}