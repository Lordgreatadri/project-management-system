import InputError from '../../Components/InputError';
import InputLabel from '../../Components/InputLabel';
import SelectInput from '../../Components/SelectInput.jsx';
import TextAreaInput from '../../Components/TextAreaInput.jsx';
import TextInput from '../../Components/TextInput.jsx';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Textarea } from '@headlessui/react'; This too can be used or user defined component
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({auth, users,projects, errors}) {

    const {data, setData, post, error, reset} = useForm({
        image: "",
        name: "",
        status: "",
        description: "",
        due_date: "",
        project_id: "",
        assigned_to: "",
    })


    const onSubmit = (e) => {
        e.preventDefault();

        post(route("tasks.store"));
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">New Task Entry</h2>
                    <Link 
                    href={route("tasks.index")}
                    className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-700 font-bold'>
                        Task List
                    </Link>
                </div>
                
            }
        >
            <Head title="New Task Entry" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form 
                        onSubmit={onSubmit}
                        className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" encType="multipart/form-data">
                            {/* <div className="p-3 mt-2 grid gap-1 grid-cols-2 bg-gray-800 text-gray-200">  */}

                                <div className='mt-4 p-2 py-2'>
                                    <InputLabel htmlFor="task_project_id" value="Task Project"/>
                                    <SelectInput className="w-full mt-1" 
                                        id="task_project_id"
                                        name="project_id"
                                        value={data.project_id}
                                        onChange={e => setData('project_id', e.target.value)}
                                    >
                                        <option value="">select project</option>
                                        {projects.data.map(project => (
                                            <option key={project.id} value={project.id}>{project.name}</option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.project_id} className='mt-2'/>
                                </div>


                                <div className='mt-4 p-2 py-2'> 
                                    <InputLabel htmlFor="task_image_path" value="Task Image"/>
                                    <TextInput className="mt-1 block w-full p-2 py-2" 
                                            id="task_image_path"
                                            name="image_path"
                                            type="file"
                                            // value={data.image}
                                            onChange={e => setData('image', e.target.files[0])}
                                            accept="image/png, image/jpeg, image/bmp" 
                                        />
                                    <InputError message={errors.image} className='mt-2'/>
                                </div>
                                <div className='mt-4 p-2 py-2'>
                                    <InputLabel htmlFor="task_name" value="Task Name"/>
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
                                    <InputLabel htmlFor="task_description" value="Task Description"/>
                                    <TextAreaInput className="w-full mt-1 rounded bg-gray-950" 
                                        id="task_description"
                                        name='description'
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} className='mt-2'/>
                                </div>
                                <div className='mt-4 p-2 py-2'>
                                    <InputLabel htmlFor="task_due_date" value="Task Deadline"/>
                                    <TextInput className="w-full mt-1" 
                                        id="task_due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        isFocused="true"
                                        onChange={e => setData('due_date', e.target.value)}
                                    />
                                    <InputError message={errors.due_date} className='mt-2'/>
                                </div>

                                <div className='mt-4 p-2 py-2'>
                                    <InputLabel htmlFor="task_status" value="Task Status"/>
                                    <SelectInput className="w-full mt-1" 
                                        id="task_status"
                                        name="status"
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                    >
                                        <option value="">select status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In progress</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </SelectInput>
                                    <InputError message={errors.status} className='mt-2'/>
                                </div>
                                <div className='mt-4 p-2 py-2'>
                                    <InputLabel htmlFor="task_priority" value="Task Priority"/>
                                    <SelectInput className="w-full mt-1" 
                                        id="task_priority"
                                        name="priority"
                                        value={data.priority}
                                        onChange={e => setData('priority', e.target.value)}
                                    >
                                        <option value="">select priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </SelectInput>
                                    <InputError message={errors.priority} className='mt-2'/>
                                </div>

                                <div className='mt-4 p-2 py-2'>
                                    <InputLabel htmlFor="task_assigned_user" value="Assigned User"/>
                                    <SelectInput className="w-full mt-1" 
                                        id="task_assigned_user"
                                        name="assigned_to"
                                        value={data.assigned_to}
                                        onChange={e => setData('assigned_to', e.target.value)}
                                    >
                                        <option value="">select user</option>
                                        {users.data.map(user => (
                                            <option  value={user.id}>{user.name}</option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.assigned_to} className='mt-2'/>
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