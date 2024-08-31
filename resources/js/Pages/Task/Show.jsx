import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from '@inertiajs/react';
import {TASK_STATUS_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP} from "../../constants.jsx";

export default function Show({auth,task}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        {`Project : "${task.data.name}"`}
                    </h2> 
                    <Link href={route('tasks.edit', task.data.id)} className="ml-10 font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                        <button className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-700 font-bold'>Edit</button>
                    </Link>
                </div>
                }
                
        >

            <Head title={`Project : "${task.data.name}"`} />


            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="">
                            <img src={task.data.image_path} alt="" 
                            className="w-full h-64 object-cover"
                            />
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
   
                            {/* <pre>{JSON.stringify(project, undefined, 2)}</pre> */}

                            {/* <div className="">
                                <img src={project.image_path} alt="" 
                                className="w-full h-64 object-cover"
                                />
                            </div> */}
                            <div className="p-3 mt-2 grid gap-1 grid-cols-2 bg-gray-800 text-gray-200">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg"> ID</label>
                                        <p className="mt-1 text-gray-400"> {task.data.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg"> Name</label>
                                        <p className="mt-1 text-gray-400"> {task.data.name}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label  className="font-bold text-lg"> Status</label>
                                        <p className="mt-1">
                                        <span className={"px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.data.status]}> {TASK_STATUS_TEXT_MAP[task.data.status]}</span>
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <label  className="font-bold text-lg"> Priority</label>
                                        <p className="mt-1">
                                        <span className={"px-2 py-1 rounded text-white " + TASK_PRIORITY_CLASS_MAP[task.data.priority]}> {TASK_PRIORITY_TEXT_MAP[task.data.priority]}</span>
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Task Creator</label>
                                        <p className="mt-1 text-gray-400"> {task.data.createdBy.name}</p>
                                    </div>
                                </div>
                                <div>
                                <div>
                                        <label className="font-bold text-lg">Created Date</label>
                                        <p className="mt-1 text-gray-400"> {task.data.created_at}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">  Due Date</label>
                                        <p className="mt-1 text-gray-400"> {task.data.due_date}</p>
                                    </div>


                                    <div className="mt-4">
                                        <label className="font-bold text-lg">  Updated By</label>
                                        <p className="mt-1 text-gray-400"> {task.data.updatedBy.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">  Assigned User</label>
                                        <p className="mt-1 text-gray-400"> {task.data.assignedUser.name}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">  Task Project</label>
                                        <p className="mt-1 text-gray-400"> 
                                            <Link href={route("projects.show",task.data.project.id)} 
                                                className="text-white text-nowrap underline dark:text-gray-100  shadow transition-all hover:text-gray-400 hover:bg-gray-700  mx-1">
                                                {task.data.project.name}
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                                            <hr/>
                            <div className="mt-4">
                                <label  className="font-bold text-lg">Task Description</label>
                                <p className="mt-1">
                                    <span className="px-2 py-1 rounded  text-gray-400 "> {task.data.description}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </AuthenticatedLayout>
    );
}