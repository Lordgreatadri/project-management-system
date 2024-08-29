import InputError from '../../Components/InputError';
import InputLabel from '../../Components/InputLabel';
import SelectInput from '../../Components/SelectInput.jsx';
import TextAreaInput from '../../Components/TextAreaInput.jsx';
import TextInput from '../../Components/TextInput.jsx';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Textarea } from '@headlessui/react'; This too can be used or user defined component
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({auth, errors}) {

    const {data, setData, post, error, reset} = useForm({
        image: "",
        name: "",
        status: "",
        description: "",
        due_date: ""
    })


    const onSubmit = (e) => {
        e.preventDefault();

        post(route("projects.store"));
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">New Project Entry</h2>
                    <Link 
                    href={route("projects.index")}
                    className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-700 font-bold'>
                        Project List
                    </Link>
                </div>
                
            }
        >
            <Head title="New Project Entry" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form 
                        onSubmit={onSubmit}
                        className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" encType="multipart/form-data">
                            {/* <div className="p-3 mt-2 grid gap-1 grid-cols-2 bg-gray-800 text-gray-200">  */}
                                <div className='mt-4 p-2 py-2'> 
                                    <InputLabel htmlFor="project_image_path" value="Project Image"/>
                                    <TextInput className="mt-1 block w-full p-2 py-2" 
                                            id="project_image_path"
                                            name="image_path"
                                            type="file"
                                            // value={data.image}
                                            onChange={e => setData('image', e.target.files[0])}
                                            accept="image/png, image/jpeg, image/bmp" 
                                        />
                                    <InputError message={errors.image} className='mt-2'/>
                                </div>
                                <div className='mt-4 p-2 py-2'>
                                    <InputLabel htmlFor="project_name" value="Project Name"/>
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
                                    <InputLabel htmlFor="project_description" value="Project Description"/>
                                    <TextAreaInput className="w-full mt-1 rounded bg-gray-950" 
                                        id="project_description"
                                        name='description'
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} className='mt-2'/>
                                </div>
                                <div className='mt-4 p-2 py-2'>
                                    <InputLabel htmlFor="project_due_date" value="Project Deadline"/>
                                    <TextInput className="w-full mt-1" 
                                        id="project_due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        isFocused="true"
                                        onChange={e => setData('due_date', e.target.value)}
                                    />
                                    <InputError message={errors.due_date} className='mt-2'/>
                                </div>

                                <div className='mt-4 p-2 py-2'>
                                    <InputLabel htmlFor="project_status" value="Project Status"/>
                                    <SelectInput className="w-full mt-1" 
                                        id="project_status"
                                        name="status"
                                        value={data.status}
                                        isFocused="true"
                                        onChange={e => setData('status', e.target.value)}
                                    >
                                        <option value="">select status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In progress</option>
                                        <option value="complete">Complete</option>
                                        <option value="cancelled">Cancelled</option>
                                    </SelectInput>
                                    <InputError message={errors.status} className='mt-2'/>
                                </div>
                                {/* <div className='mt-4 p-2 py-2'>
                                    <InputLabel htmlFor="project_priority" value="Project Priority"/>
                                    <SelectInput className="w-full mt-1" 
                                        id="project_priority"
                                        name="priority"
                                        value={data.priority}
                                        isFocused="true"
                                        onChange={e => setData('priority', e.target.value)}
                                    >
                                        <option value="">select priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </SelectInput>
                                    <InputError message={errors.priority} className='mt-2'/>
                                </div> */}

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