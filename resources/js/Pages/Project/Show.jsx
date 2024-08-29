import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from '@inertiajs/react';
import {PROJECT_STATUS_TEXT_MAP, PROJECT_STATUS_CLASS_MAP} from "../../constants.jsx";
import TasksTabale from "../Task/TasksTable.jsx";

export default function Show({auth, project, tasks, queryParams}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        {`Project : "${project.name}"`}
                    </h2> 
                    <Link href={route('projects.edit', project.id)} className="ml-10 font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                        <button className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-700 font-bold'>Edit</button>
                    </Link>
                </div>
                }
                
        >

            <Head title={`Project : "${project.name}"`} />


            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="">
                            <img src={project.image_path} alt="" 
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
                                        <label className="font-bold text-lg">Project ID</label>
                                        <p className="mt-1 text-gray-400"> {project.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Project Name</label>
                                        <p className="mt-1 text-gray-400"> {project.name}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label  className="font-bold text-lg">Project Status</label>
                                        <p className="mt-1">
                                        <span className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}> {PROJECT_STATUS_TEXT_MAP[project.status]}</span>
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Project Creator</label>
                                        <p className="mt-1 text-gray-400"> {project.createdBy.name}</p>
                                    </div>
                                </div>
                                <div>
                                <div>
                                        <label className="font-bold text-lg">Created Date</label>
                                        <p className="mt-1 text-gray-400"> {project.created_at}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">  Due Date</label>
                                        <p className="mt-1 text-gray-400"> {project.due_date}</p>
                                    </div>

                                    <div className="mt-4">
                                        {/* <label  className="font-bold text-lg">Project Description</label>
                                        <p className="mt-1">
                                        <span className="px-2 py-1 rounded  text-gray-400 "> {project.description}</span>
                                        </p> */}
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">  Updated By</label>
                                        <p className="mt-1 text-gray-400"> {project.updatedBy.name}</p>
                                    </div>
                                </div>
                            </div>
                                            <hr/>
                            <div className="mt-4">
                                <label  className="font-bold text-lg">Project Description</label>
                                <p className="mt-1">
                                    <span className="px-2 py-1 rounded  text-gray-400 "> {project.description}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
    
                            Project Task Details
                            <hr className="mt-4 py-6"/>
                            <TasksTabale  tasks={tasks} queryParams={queryParams} hideProjectColumn={true}/>
                             {/* <pre>{JSON.stringify(tasks, undefined, 2)}</pre>  */}
                        </div>
                    </div>
                </div>
            </div>
            
        </AuthenticatedLayout>
    );
}